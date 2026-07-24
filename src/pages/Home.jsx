import { motion } from 'framer-motion'
import Hero from '../components/Hero/Hero'
import AboutPreview from '../components/AboutPreview/AboutPreview'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import Programs from '../components/Programs/Programs'
import Facilities from '../components/Facilities/Facilities'
import Statistics from '../components/Statistics/Statistics'
import GalleryPreview from '../components/GalleryPreview/GalleryPreview'
import Testimonials from '../components/Testimonials/Testimonials'
import CTA from '../components/CTA/CTA'

// Page transition variants — shared across all pages
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in:      { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } },
  out:     { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

/**
 * Home — Assembles all homepage sections in order.
 *
 * Section order:
 * 1. Hero (full viewport)
 * 2. AboutPreview (split layout)
 * 3. WhyChooseUs (3-col card grid)
 * 4. Programs (5 academic levels)
 * 5. Facilities (bento grid)
 * 6. Statistics (dark section, animated counters)
 * 7. GalleryPreview (masonry grid)
 * 8. Testimonials (auto carousel)
 * 9. CTA (admission call-to-action)
 *
 * The motion.main wrapper handles the page enter/exit animation
 * triggered by AnimatePresence in App.jsx.
 */
export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <Programs />
      <Facilities />
      <Statistics />
      <GalleryPreview />
      <Testimonials />
      <CTA />
    </motion.div>
  )
}
