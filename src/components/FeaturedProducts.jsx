'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const StarSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
  </svg>
);

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching featured products:', err));
  }, []);

  return (
    <section className="products-section" id="products">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Bestsellers
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Handcrafted with ancient Ayurvedic wisdom and the purest natural ingredients
        </motion.p>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {products.map((product) => (
            <motion.div key={product.id} className="product-card" variants={itemVariants}>
              <div className="product-image">
                <Link href={`/products/${product.id}`} style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain', padding: '20px' }}
                    sizes="(max-width: 580px) 100vw, (max-width: 968px) 50vw, 33vw"
                  />
                </Link>
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <button className="product-wishlist" aria-label={`Add ${product.name} to wishlist`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star" style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.3 }}>
                      <StarSVG />
                    </span>
                  ))}
                  <span className="rating-count">({product.reviews})</span>
                </div>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <div className="product-price">
                    ₹{product.price}
                    <span className="original">₹{product.originalPrice}</span>
                  </div>
                  <button 
                    className="product-add-btn" 
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
