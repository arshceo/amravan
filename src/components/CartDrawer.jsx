'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, isInitialized } = useCart();

  // Prevent hydration mismatch
  if (!isInitialized) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
            }}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#fff',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    style={{ 
                      marginTop: '20px', 
                      background: '#000', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '12px 24px', 
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', width: '80px', height: '80px', background: '#f8f9f5', borderRadius: '8px', flexShrink: 0 }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '8px' }} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ color: '#274b1e', fontWeight: 700, marginBottom: '8px' }}>₹{item.price}</div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ border: 'none', background: '#f5f5f5', padding: '4px 12px', cursor: 'pointer' }}
                            >-</button>
                            <span style={{ padding: '0 12px', fontSize: '0.9rem', fontWeight: 500 }}>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ border: 'none', background: '#f5f5f5', padding: '4px 12px', cursor: 'pointer' }}
                            >+</button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'transparent', border: 'none', color: '#e74c3c', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid #eee', background: '#fcfcfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 700 }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <button 
                  style={{ 
                    width: '100%', 
                    background: '#000', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '16px', 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    borderRadius: '0', /* Sharp edges */
                  }}
                  onClick={() => alert('Checkout flow triggered! This is a demo.')}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
