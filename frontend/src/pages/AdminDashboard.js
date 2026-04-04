import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Plus, Edit2, Trash2, LogOut, FileText, MessageSquare, Mail } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('blog');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, testimonialsRes, contactRes] = await Promise.all([
        axios.get(`${API_URL}/api/blog/posts`, { withCredentials: true }),
        axios.get(`${API_URL}/api/testimonials`, { withCredentials: true }),
        axios.get(`${API_URL}/api/contact/requests`, { withCredentials: true })
      ]);
      setBlogPosts(postsRes.data);
      setTestimonials(testimonialsRes.data);
      setContactRequests(contactRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article?')) return;
    try {
      await axios.delete(`${API_URL}/api/blog/posts/${postId}`, { withCredentials: true });
      fetchData();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage?')) return;
    try {
      await axios.delete(`${API_URL}/api/testimonials/${testimonialId}`, { withCredentials: true });
      fetchData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Sophie Lamour</title>
      </Helmet>

      <div className="min-h-screen bg-[#F3EFEA]" data-testid="admin-dashboard">
        <header className="bg-white border-b border-[#E8E2D9] sticky top-0 z-50">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-serif text-[#2C2C2A]">Panneau d'administration</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#5C5A56]">{user?.email}</span>
              <button
                onClick={handleLogout}
                data-testid="admin-logout-btn"
                className="flex items-center gap-2 text-[#D9A098] hover:text-[#C48A7E] transition-colors"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-12 py-8">
          <div className="flex gap-4 mb-8 border-b border-[#E8E2D9]">
            <button
              onClick={() => setActiveTab('blog')}
              data-testid="tab-blog"
              className={`pb-4 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'blog' ? 'border-[#D9A098] text-[#D9A098]' : 'border-transparent text-[#5C5A56]'
              }`}
            >
              <FileText size={18} />
              Articles de blog
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              data-testid="tab-testimonials"
              className={`pb-4 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'testimonials' ? 'border-[#D9A098] text-[#D9A098]' : 'border-transparent text-[#5C5A56]'
              }`}
            >
              <MessageSquare size={18} />
              Témoignages
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              data-testid="tab-contact"
              className={`pb-4 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'contact' ? 'border-[#D9A098] text-[#D9A098]' : 'border-transparent text-[#5C5A56]'
              }`}
            >
              <Mail size={18} />
              Messages ({contactRequests.length})
            </button>
          </div>

          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2C2A]">Articles de blog</h2>
                <Link
                  to="/admin/blog/new"
                  data-testid="new-blog-post-btn"
                  className="flex items-center gap-2 bg-[#D9A098] text-white hover:bg-[#C48A7E] rounded-full px-6 py-3 transition-all duration-300"
                >
                  <Plus size={18} />
                  Nouvel article
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F3EFEA]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C2C2A]">Titre</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C2C2A]">Statut</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#2C2C2A]">Date</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-[#2C2C2A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post, idx) => (
                      <tr key={idx} className="border-t border-[#E8E2D9]">
                        <td className="px-6 py-4 text-[#2C2C2A]">{post.title_fr}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#5C5A56] text-sm">
                          {new Date(post.created_at).toLocaleDateString('fr')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/blog/edit/${post.id}`}
                              className="p-2 text-[#9EAB9A] hover:text-[#D9A098] transition-colors"
                              data-testid={`edit-post-${idx}`}
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-red-400 hover:text-red-600 transition-colors"
                              data-testid={`delete-post-${idx}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2C2A]">Témoignages</h2>
                <Link
                  to="/admin/testimonials/new"
                  data-testid="new-testimonial-btn"
                  className="flex items-center gap-2 bg-[#D9A098] text-white hover:bg-[#C48A7E] rounded-full px-6 py-3 transition-all duration-300"
                >
                  <Plus size={18} />
                  Nouveau témoignage
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm" data-testid={`testimonial-card-${idx}`}>
                    <p className="text-[#5C5A56] mb-4 line-clamp-3">{testimonial.text_fr}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#D9A098]">★</span>
                      ))}
                    </div>
                    <p className="font-semibold text-[#2C2C2A] mb-4">{testimonial.name}</p>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/testimonials/edit/${testimonial.id}`}
                        className="flex-1 text-center px-4 py-2 bg-[#9EAB9A]/10 text-[#9EAB9A] rounded-lg hover:bg-[#9EAB9A]/20 transition-colors"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-serif text-[#2C2C2A] mb-6">Messages de contact</h2>
              <div className="space-y-4">
                {contactRequests.map((request, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm" data-testid={`contact-request-${idx}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-[#2C2C2A] text-lg">{request.name}</h3>
                        <p className="text-sm text-[#5C5A56]">{request.email} • {request.phone}</p>
                      </div>
                      <span className="text-xs text-[#9EAB9A]">
                        {new Date(request.created_at).toLocaleString('fr')}
                      </span>
                    </div>
                    <p className="font-medium text-[#2C2C2A] mb-2">{request.subject}</p>
                    <p className="text-[#5C5A56]">{request.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;