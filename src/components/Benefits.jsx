'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '100% Natural',
    description: 'Every ingredient is sourced from certified organic farms. No synthetics, no fillers, no compromise.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    title: 'Clinically Tested',
    description: 'Rigorously tested in certified labs for purity, potency, and safety with documented results.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2 1.5 2 3 2" />
        <path d="M7 10.5V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4.5" />
        <path d="M6 14h12" />
        <path d="M5 18h14" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    ),
    title: 'Sustainably Sourced',
    description: 'Ethically harvested with eco-friendly practices that support local communities and biodiversity.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.5c-1.75-2.87-5-4-7.5-2s-2.98 5.7-.5 8.5L12 21l8-8c2.48-2.8 2-6.5-.5-8.5S13.75 3.63 12 6.5z" />
      </svg>
    ),
    title: 'Ancient Wisdom',
    description: 'Formulated using 5000-year-old Ayurvedic traditions, honoring the timeless path to holistic health.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Benefits() {
  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Amravan
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We blend the best of nature and science to bring you supplements you can trust
        </motion.p>

        <motion.div
          className="benefits-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div key={idx} className="benefit-card" variants={itemVariants}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
