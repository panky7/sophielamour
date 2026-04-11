from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, timezone
import secrets

from routes import db
from routes.auth import get_current_user

router = APIRouter(prefix="/contact")


class ContactRequest(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = None
    interestedServices: List[str] = []
    message: str
    consent: bool = False


@router.post("")
async def submit_contact(contact: ContactRequest):
    contact_dict = contact.model_dump()
    contact_dict["id"] = secrets.token_urlsafe(8)
    contact_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    contact_dict["status"] = "new"
    await db.contact_requests.insert_one(contact_dict)
    return {"message": "Message envoy\u00e9 avec succ\u00e8s"}

@router.get("/requests", dependencies=[Depends(get_current_user)])
async def get_contact_requests(request: Request):
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    requests_list = await db.contact_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return requests_list
