from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import os
import logging
import bcrypt
import jwt
import secrets

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Auth utilities
JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    name: str
    role: str
    model_config = ConfigDict(populate_by_name=True)

class BlogPostCreate(BaseModel):
    title_fr: str
    title_en: str
    content_fr: str
    content_en: str
    excerpt_fr: str
    excerpt_en: str
    featured_image: Optional[str] = None
    category: str
    status: str = "draft"

class BlogPostUpdate(BaseModel):
    title_fr: Optional[str] = None
    title_en: Optional[str] = None
    content_fr: Optional[str] = None
    content_en: Optional[str] = None
    excerpt_fr: Optional[str] = None
    excerpt_en: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title_fr: str
    title_en: str
    content_fr: str
    content_en: str
    excerpt_fr: str
    excerpt_en: str
    featured_image: Optional[str]
    category: str
    status: str
    slug: str
    created_at: str
    updated_at: str

class TestimonialCreate(BaseModel):
    name: str
    text_fr: str
    text_en: str
    rating: int = Field(ge=1, le=5)
    photo: Optional[str] = None

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    text_fr: Optional[str] = None
    text_en: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    photo: Optional[str] = None

class TestimonialResponse(BaseModel):
    id: str
    name: str
    text_fr: str
    text_en: str
    rating: int
    photo: Optional[str]
    created_at: str

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

# Auth endpoints
@api_router.post("/auth/login")
async def login(credentials: LoginRequest, response: Response):
    user = await db.users.find_one({"email": credentials.email.lower()})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(str(user["_id"]), user["email"])
    refresh_token = create_refresh_token(str(user["_id"]))
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user["name"],
        "role": user["role"]
    }

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

# Blog endpoints
@api_router.get("/blog/posts")
async def get_blog_posts(status: Optional[str] = None, limit: int = 100):
    query = {}
    if status:
        query["status"] = status
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    return posts

@api_router.get("/blog/posts/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@api_router.post("/blog/posts", dependencies=[Depends(get_current_user)])
async def create_blog_post(post: BlogPostCreate, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    slug = post.title_fr.lower().replace(" ", "-").replace("'", "")[:50]
    post_dict = post.model_dump()
    post_dict["slug"] = slug
    post_dict["id"] = slug
    post_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    post_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    post_dict["author_id"] = user["_id"]
    
    await db.blog_posts.insert_one(post_dict)
    post_dict.pop("_id", None)
    return post_dict

@api_router.put("/blog/posts/{post_id}", dependencies=[Depends(get_current_user)])
async def update_blog_post(post_id: str, post_update: BlogPostUpdate, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    update_data = {k: v for k, v in post_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return updated_post

@api_router.delete("/blog/posts/{post_id}", dependencies=[Depends(get_current_user)])
async def delete_blog_post(post_id: str, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return {"message": "Blog post deleted successfully"}

# Testimonials endpoints
@api_router.get("/testimonials")
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return testimonials

@api_router.post("/testimonials", dependencies=[Depends(get_current_user)])
async def create_testimonial(testimonial: TestimonialCreate, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    testimonial_dict = testimonial.model_dump()
    testimonial_dict["id"] = secrets.token_urlsafe(8)
    testimonial_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.testimonials.insert_one(testimonial_dict)
    testimonial_dict.pop("_id", None)
    return testimonial_dict

@api_router.put("/testimonials/{testimonial_id}", dependencies=[Depends(get_current_user)])
async def update_testimonial(testimonial_id: str, testimonial_update: TestimonialUpdate, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    update_data = {k: v for k, v in testimonial_update.model_dump().items() if v is not None}
    result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_data})
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    return updated

@api_router.delete("/testimonials/{testimonial_id}", dependencies=[Depends(get_current_user)])
async def delete_testimonial(testimonial_id: str, request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return {"message": "Testimonial deleted successfully"}

# Contact endpoint
@api_router.post("/contact")
async def submit_contact(contact: ContactRequest):
    contact_dict = contact.model_dump()
    contact_dict["id"] = secrets.token_urlsafe(8)
    contact_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    contact_dict["status"] = "new"
    
    await db.contact_requests.insert_one(contact_dict)
    return {"message": "Message envoyé avec succès"}

@api_router.get("/contact/requests", dependencies=[Depends(get_current_user)])
async def get_contact_requests(request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    requests = await db.contact_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return requests

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await db.users.create_index("email", unique=True)
    await db.blog_posts.create_index("slug", unique=True)
    
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@sophielamour.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "SophieAdmin2025!")
    existing = await db.users.find_one({"email": admin_email})
    
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Sophie Lamour",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
    
    # Write credentials
    Path("/app/memory").mkdir(exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"# Test Credentials\n\n")
        f.write(f"## Admin Account\n")
        f.write(f"- Email: {admin_email}\n")
        f.write(f"- Password: {admin_password}\n")
        f.write(f"- Role: admin\n\n")
        f.write(f"## Auth Endpoints\n")
        f.write(f"- POST /api/auth/login\n")
        f.write(f"- GET /api/auth/me\n")
        f.write(f"- POST /api/auth/logout\n")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)