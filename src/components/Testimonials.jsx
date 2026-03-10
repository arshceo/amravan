'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Yoga Instructor',
    initials: 'PS',
    review: 'Amravan\'s Ashwagandha has truly transformed my energy levels. As a yoga instructor, I need sustained energy throughout the day, and this product delivers every single time.',
    rating: 5,
  },
  {
    name: 'Rajesh Mehta',
    role: 'Software Engineer',
    initials: 'RM',
    review: 'I was skeptical about Ayurvedic supplements, but the Turmeric Curcumin has significantly reduced my joint pain. The quality is evident in every capsule. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    role: 'Nutritionist',
    initials: 'AD',
    review: 'As a nutritionist, I\'m very particular about supplement quality. Amravan meets the highest standards. Their Triphala blend has been a game-changer for my clients\' digestive health.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Fitness Trainer',
    initials: 'VS',
    review: 'The Moringa supplement has become an essential part of my daily routine. The natural energy boost without any jitters is exactly what I was looking for. Clean and effective!',
    rating: 4,
  },
  {
    name: 'Kavya Nair',
    role: 'Homemaker',
    initials: 'KN',
    review: 'My entire family has switched to Amravan products. The Neem Purifier has done wonders for my skin, and the kids love the Moringa capsules. Pure nature in every bottle!',
    rating: 5,
  },
  {
    name: 'Siddharth Rao',
    role: 'Marathon Runner',
    initials: 'SR',
    review: 'Recovery time is crucial for me. Since starting on Amravan\'s pure supplements, my joint inflammation is down and my stamina is incredible. Pure architectural perfection in health.',
    rating: 5,
  }
];

const StarSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <motion.h2
            className="section-title dark-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Proof in Practice
          </motion.h2>
          <motion.p
            className="section-subtitle dark-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real results from our community of wellness seekers and professionals.
          </motion.p>
        </div>

        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className={`testimonial-card grid-item-${idx}`}
              variants={itemVariants}
            >
              <div className="testimonial-quote-icon">"</div>
              
              <div className="testimonial-content-wrapper">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ opacity: i < t.rating ? 1 : 0.2 }}>
                      <StarSVG />
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">{t.review}</p>
              </div>
              
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-author-name">{t.name}</div>
                  <div className="testimonial-author-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
