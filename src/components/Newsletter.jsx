'use client';

import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Join Our Wellness Community</h2>
          <p>
            Subscribe to receive exclusive offers, Ayurvedic health tips, and early access
            to our newest formulations. Your journey to natural balance starts here.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
            id="newsletter-form"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              id="newsletter-email"
            />
            <button type="submit" id="newsletter-submit">Subscribe</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
