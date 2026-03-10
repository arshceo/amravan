'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StarSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
  </svg>
);

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-off-white)' }}>
        <div className="container" style={{ paddingBottom: '80px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', background: '#fff', padding: '40px', borderRadius: '0' }}>
            
            {/* Image Section */}
            <motion.div 
              style={{ flex: '1 1 400px', backgroundColor: '#f8f9f5', position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.badge && (
                <span className="product-badge" style={{ position: 'absolute', top: '20px', left: '20px' }}>{product.badge}</span>
              )}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                style={{ objectFit: 'contain', padding: '40px' }} 
              />
            </motion.div>

            {/* Details Section */}
            <motion.div 
              style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '8px' }}>
                {product.category}
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: 'var(--color-accent)', opacity: i < Math.floor(product.rating) ? 1 : 0.3 }}>
                    <StarSVG />
                  </span>
                ))}
                <span style={{ color: 'var(--color-gray-500)', marginLeft: '8px', fontSize: '1rem' }}>({product.reviews} reviews)</span>
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-500)', lineHeight: 1.6, marginBottom: '32px' }}>
                {product.description}
              </p>

              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '32px' }}>
                ₹{product.price}
                <span style={{ fontSize: '1.2rem', color: 'var(--color-gray-400)', textDecoration: 'line-through', marginLeft: '12px', fontWeight: 400 }}>
                  ₹{product.originalPrice}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-gray-200)', height: '56px' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'transparent', border: 'none', padding: '0 20px', fontSize: '1.2rem', cursor: 'pointer' }}
                  >-</button>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem', width: '30px', textAlign: 'center' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ background: 'transparent', border: 'none', padding: '0 20px', fontSize: '1.2rem', cursor: 'pointer' }}
                  >+</button>
                </div>

                <motion.button 
                  className="btn btn-primary"
                  onClick={() => addToCart(product, quantity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1, padding: '0', height: '56px', fontSize: '1.1rem' }}
                >
                  Add to Cart
                </motion.button>
              </div>

              <div style={{ borderTop: '1px solid var(--color-gray-100)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-gray-500)', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>
                  100% Natural Ingredients
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>
                  Cruelty Free & Vegan
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>
                  Free Shipping over ₹999
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
