import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogEditor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title_fr: '',
    title_en: '',
    content_fr: '',
    content_en: '',
    excerpt_fr: '',
    excerpt_en: '',
    featured_image: '',
    category: 'Développement personnel',
    status: 'draft',
    share_to_social: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/api/blog/posts`, formData, { withCredentials: true });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la création de l’article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Nouvel article - Admin</title>
      </Helmet>

      <div className="min-h-screen bg-[#F3EFEA] py-12 px-6" data-testid="blog-editor">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-[#9EAB9A] hover:text-[#D9A098] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour au tableau de bord
          </button>

          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(44,44,42,0.04)]">
            <h1 className="text-3xl font-serif text-[#2C2C2A] mb-8">Nouvel article de blog</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Titre (Français) *</label>
                  <input
                    type="text"
                    name="title_fr"
                    value={formData.title_fr}
                    onChange={handleChange}
                    required
                    data-testid="title-fr-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Title (English) *</label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleChange}
                    required
                    data-testid="title-en-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Extrait (Français) *</label>
                  <textarea
                    name="excerpt_fr"
                    value={formData.excerpt_fr}
                    onChange={handleChange}
                    required
                    rows={3}
                    data-testid="excerpt-fr-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Excerpt (English) *</label>
                  <textarea
                    name="excerpt_en"
                    value={formData.excerpt_en}
                    onChange={handleChange}
                    required
                    rows={3}
                    data-testid="excerpt-en-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Contenu (Français) *</label>
                <textarea
                  name="content_fr"
                  value={formData.content_fr}
                  onChange={handleChange}
                  required
                  rows={10}
                  data-testid="content-fr-input"
                  placeholder="Vous pouvez utiliser du HTML basique: <p>, <strong>, <em>, <ul>, <li>, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Content (English) *</label>
                <textarea
                  name="content_en"
                  value={formData.content_en}
                  onChange={handleChange}
                  required
                  rows={10}
                  data-testid="content-en-input"
                  placeholder="You can use basic HTML: <p>, <strong>, <em>, <ul>, <li>, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors resize-none font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Image à la une (URL)</label>
                  <input
                    type="url"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleChange}
                    data-testid="featured-image-input"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Catégorie *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    data-testid="category-select"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                  >
                    <option value="Développement personnel">Développement personnel</option>
                    <option value="Coaching">Coaching</option>
                    <option value="Parentalité">Parentalité</option>
                    <option value="Bien-être">Bien-être</option>
                    <option value="Organisation">Organisation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2C2A] mb-2">Statut *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  data-testid="status-select"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#E0F2FE] to-[#CCFBF1] rounded-xl border border-[#06B6D4]">
                <input
                  type="checkbox"
                  id="share_to_social"
                  name="share_to_social"
                  checked={formData.share_to_social}
                  onChange={(e) => setFormData({...formData, share_to_social: e.target.checked})}
                  data-testid="share-social-checkbox"
                  className="w-5 h-5 rounded border-[#06B6D4] text-[#06B6D4] focus:ring-[#06B6D4]"
                />
                <label htmlFor="share_to_social" className="text-sm font-medium text-[#083344] cursor-pointer flex-1">
                  📱 Partager automatiquement sur les réseaux sociaux (Facebook, Instagram, LinkedIn) lors de la publication
                </label>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl" data-testid="blog-editor-error">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="blog-submit-btn"
                  className="flex-1 bg-[#D9A098] text-white hover:bg-[#C48A7E] rounded-full px-8 py-4 transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer l’article'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-8 py-4 border border-[#E8E2D9] text-[#5C5A56] hover:bg-[#F3EFEA] rounded-full transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;