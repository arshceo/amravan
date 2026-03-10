'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero-bg" style={{ overflow: 'hidden' }}>
        <video
          src="/images/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'scale(1.05)', /* Slightly larger to hide blur bleeding on edges and watermark */
            filter: 'blur(5px)'
          }}
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="container hero-content">
        {/* Text Side */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>
            The Power <span className="light-text">of</span><br />
            Nature <span className="light-text">in Every</span><br />
            Capsule
            <span className="hero-badge-check">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </h1>

          <div className="hero-bottom-row">
            <motion.a
              href="#products"
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Now ↗
            </motion.a>

            <p>
              Discover our new plant-<br />based supplements for daily<br />balance and clean energy.
            </p>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-image-wrapper">
            <div className="hero-image-glow" />
            <Image
              src="/images/hero-product-amravan.png"
              alt="Amravan ayurvedic capsule bottle"
              width={500}
              height={600}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
