import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const QuillEditor = ({ value, onChange, placeholder, style }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const isSettingValue = useRef(false);

  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    import('quill').then((mod) => {
      const Quill = mod.default;
      if (!containerRef.current) return;

      const editorDiv = document.createElement('div');
      containerRef.current.appendChild(editorDiv);

      const q = new Quill(editorDiv, {
        theme: 'snow',
        placeholder: placeholder || '',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }
      });

      q.on('text-change', () => {
        if (!isSettingValue.current) {
          onChangeRef.current(q.root.innerHTML);
        }
      });

      quillRef.current = q;

      if (value) {
        isSettingValue.current = true;
        q.clipboard.dangerouslyPasteHTML(value);
        isSettingValue.current = false;
      }
    });

    return () => {
      quillRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      const currentContent = quillRef.current.root.innerHTML;
      if (currentContent !== value && value !== null) {
        isSettingValue.current = true;
        quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
        isSettingValue.current = false;
      }
    }
  }, [value]);

  return <div ref={containerRef} style={style} />;
};

const BlogEditor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = Boolean(postId);

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
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/blog/posts/${postId}`, { withCredentials: true });
      setFormData({
        title_fr: data.title_fr || '',
        title_en: data.title_en || '',
        content_fr: data.content_fr || '',
        content_en: data.content_en || '',
        excerpt_fr: data.excerpt_fr || '',
        excerpt_en: data.excerpt_en || '',
        featured_image: data.featured_image || '',
        category: data.category || 'Développement personnel',
        status: data.status || 'draft',
        share_to_social: false
      });
    } catch (err) {
      setError("Erreur lors du chargement de l'article");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        const { share_to_social, ...updateData } = formData;
        await axios.put(`${API_URL}/api/blog/posts/${postId}`, updateData, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/blog/posts`, formData, { withCredentials: true });
      }
      navigate('/admin/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || (isEditing ? "Erreur lors de la mise a jour" : "Erreur lors de la creation");
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#CAF0F8] flex items-center justify-center">
        <p className="text-[#023E8A]">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? "Modifier l'article - Admin" : "Nouvel article - Admin"}</title>
      </Helmet>

      <div className="min-h-screen bg-[#CAF0F8] py-12 px-6" data-testid="blog-editor">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-[#48CAE4] hover:text-[#0077B6] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour au tableau de bord
          </button>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h1 className="text-3xl font-serif text-[#03045E] mb-4">
              {isEditing ? "Modifier l'article" : "Nouvel article de blog"}
            </h1>
            <p className="text-sm text-[#023E8A] mb-8">
              Utilisez les outils ci-dessous pour formater votre texte facilement
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Titre (Francais) *
                  </label>
                  <input
                    type="text"
                    name="title_fr"
                    value={formData.title_fr}
                    onChange={handleChange}
                    required
                    data-testid="title-fr-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleChange}
                    required
                    data-testid="title-en-input"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Extrait (Francais) *
                  </label>
                  <textarea
                    name="excerpt_fr"
                    value={formData.excerpt_fr}
                    onChange={handleChange}
                    required
                    rows={3}
                    data-testid="excerpt-fr-input"
                    placeholder="Court resume de article"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Excerpt (English) *
                  </label>
                  <textarea
                    name="excerpt_en"
                    value={formData.excerpt_en}
                    onChange={handleChange}
                    required
                    rows={3}
                    data-testid="excerpt-en-input"
                    placeholder="Brief article summary"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#03045E] mb-2">
                  Contenu (Francais) *
                </label>
                <div className="bg-white rounded-xl border border-[#ADE8F4] overflow-hidden" data-testid="content-fr-editor">
                  <QuillEditor
                    value={formData.content_fr}
                    onChange={(val) => setFormData(prev => ({ ...prev, content_fr: val }))}
                    placeholder="Ecrivez votre article ici..."
                    style={{ height: '442px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#03045E] mb-2">
                  Content (English) *
                </label>
                <div className="bg-white rounded-xl border border-[#ADE8F4] overflow-hidden" data-testid="content-en-editor">
                  <QuillEditor
                    value={formData.content_en}
                    onChange={(val) => setFormData(prev => ({ ...prev, content_en: val }))}
                    placeholder="Write your article here..."
                    style={{ height: '442px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Image a la une (URL)
                  </label>
                  <input
                    type="url"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleChange}
                    data-testid="featured-image-input"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#03045E] mb-2">
                    Categorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    data-testid="category-select"
                    className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors"
                  >
                    <option value="Développement personnel">Developpement personnel</option>
                    <option value="Coaching">Coaching</option>
                    <option value="Parentalité">Parentalite</option>
                    <option value="Bien-être">Bien-etre</option>
                    <option value="Organisation">Organisation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#03045E] mb-2">Statut *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  data-testid="status-select"
                  className="w-full px-4 py-3 rounded-xl border border-[#ADE8F4] focus:outline-none focus:border-[#0077B6] transition-colors"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publie</option>
                </select>
              </div>

              {!isEditing && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#E0F2FE] to-[#CCFBF1] rounded-xl border border-[#48CAE4]">
                  <input
                    type="checkbox"
                    id="share_to_social"
                    name="share_to_social"
                    checked={formData.share_to_social}
                    onChange={(e) => setFormData({...formData, share_to_social: e.target.checked})}
                    data-testid="share-social-checkbox"
                    className="w-5 h-5 rounded border-[#48CAE4] text-[#0077B6] focus:ring-[#0077B6]"
                  />
                  <label htmlFor="share_to_social" className="text-sm font-medium text-[#03045E] cursor-pointer flex-1">
                    Partager sur les reseaux sociaux
                  </label>
                </div>
              )}

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
                  className="flex-1 bg-[#0077B6] text-white hover:bg-[#0096C7] rounded-full px-8 py-4 transition-all duration-300 font-medium shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  {loading
                    ? (isEditing ? 'Mise a jour...' : 'Creation...')
                    : (isEditing ? 'Mettre a jour' : 'Creer article')
                  }
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-8 py-4 border border-[#ADE8F4] text-[#023E8A] hover:bg-[#CAF0F8] rounded-full transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #ADE8F4 !important;
          background: #F0F9FF;
          border-radius: 12px 12px 0 0;
        }
        
        .ql-container {
          border: none !important;
          font-family: 'Nunito', sans-serif;
          font-size: 16px;
        }
        
        .ql-editor {
          min-height: 400px;
          padding: 20px;
        }
        
        .ql-editor.ql-blank::before {
          color: #90E0EF;
          font-style: italic;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar button.ql-active {
          color: #0077B6 !important;
        }
        
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #0077B6 !important;
        }
        
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button.ql-active .ql-fill {
          fill: #0077B6 !important;
        }
      `}</style>
    </>
  );
};

export default BlogEditor;
