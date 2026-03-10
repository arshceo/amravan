'use client';

import { useState, useEffect } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', category: '', description: '', price: '', originalPrice: '', image: '', badge: '', rating: '', reviews: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', description: '', price: '', originalPrice: '', image: '', badge: '', rating: '', reviews: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      badge: product.badge || '',
      rating: product.rating,
      reviews: product.reviews
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Admin Panel...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--font-main)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Admin: Product Management</h1>
        <a href="/" style={{ padding: '10px 20px', background: '#e2e4dc', color: '#1a1a1a', textDecoration: 'none', fontWeight: 600 }}>Back to Store</a>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Form Section */}
        <div style={{ flex: '1 1 350px', background: '#f4f5f0', padding: '30px', border: '1px solid #e2e4dc' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Product Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Category</label>
              <input required name="category" value={formData.category} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Selling Price (₹)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Original Price (₹)</label>
                <input required type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Image URL</label>
              <input required name="image" value={formData.image} onChange={handleChange} placeholder="/images/product-name.png" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Badge (Optional)</label>
                <input name="badge" value={formData.badge} onChange={handleChange} placeholder="e.g. Bestseller" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Rating</label>
                <input required type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>Reviews</label>
                <input required type="number" name="reviews" value={formData.reviews} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', background: '#1a1a1a', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ padding: '12px', background: 'transparent', border: '1px solid #1a1a1a', color: '#1a1a1a', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div style={{ flex: '2 1 600px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e4dc' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f4f5f0', borderBottom: '2px solid #e2e4dc', textAlign: 'left' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Product</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No products found</td></tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #e2e4dc' }}>
                      <td style={tdStyle}>{product.id}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#f4f5f0' }} />
                          <span style={{ fontWeight: 500 }}>{product.name}</span>
                        </div>
                      </td>
                      <td style={tdStyle}>₹{product.price}</td>
                      <td style={tdStyle}>{product.category}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleEdit(product)} style={actionBtnStyle}>Edit</button>
                        <button onClick={() => handleDelete(product.id)} style={{ ...actionBtnStyle, color: '#e74c3c' }}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #cfd3c7',
  background: '#fff',
  fontFamily: 'inherit',
  fontSize: '0.95rem'
};

const thStyle = {
  padding: '16px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  color: '#6b7280',
  letterSpacing: '0.05em'
};

const tdStyle = {
  padding: '16px',
  verticalAlign: 'middle'
};

const actionBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#274b1e',
  fontWeight: 600,
  cursor: 'pointer',
  marginRight: '12px',
  textDecoration: 'underline'
};
