'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    { label: 'Products', href: '/#products' },
    { label: 'Why Amravan', href: '/#benefits' },
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Contact', href: '/#contact' },
  ];

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update transparency (isScrolled)
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update visibility (isVisible) - disappear on down, reappear on up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling Down
        setIsVisible(false);
      } else {
        // Scrolling Up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <nav 
      className={`navbar ${isScrolled ? 'nav-scrolled' : ''} ${!isVisible ? 'nav-hidden' : ''}`} 
      id="navbar"
    >
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">Amravan</Link>

        <div className="navbar-links">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>{link.label}</Link>
          ))}
        </div>

        <div className="navbar-icons">
          <button className="navbar-icon mobile-hidden" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="navbar-icon" aria-label="Cart" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, background: '#8baf62', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="navbar-icon menu-toggle" 
            aria-label="Menu" 
            onClick={() => setIsMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              className="menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="menu-header">
                <span className="navbar-logo" style={{ color: 'var(--color-black)' }}>Amravan</span>
                <button className="menu-close" onClick={() => setIsMenuOpen(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="menu-body">
                {links.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="menu-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="menu-footer">
                <p>Pure Nature In Every Capsule</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
