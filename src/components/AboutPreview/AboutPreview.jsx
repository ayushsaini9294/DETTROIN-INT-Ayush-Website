import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiBookOpenLine,
  RiTeamLine,
  RiTrophyLine,
  RiLeafLine,
  RiBuildingLine,
} from 'react-icons/ri'
import styles from './AboutPreview.module.css'

// Shared scroll-reveal variant used across all sections
export const scrollReveal = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] },
  },
}

const HIGHLIGHTS = [
  {
    icon: RiBookOpenLine,
    title: 'Academic Excellence',
    desc: 'Consistently 98%+ board results with top rankers across Aligarh division.',
  },
  {
    icon: RiTeamLine,
    title: 'Expert Faculty',
    desc: '150+ qualified teachers with passion for student-centred learning.',
  },
  {
    icon: RiTrophyLine,
    title: 'Award Winning',
    desc: 'Recognised as Best CBSE School in Western UP — three years running.',
  },
  {
    icon: RiLeafLine,
    title: 'Holistic Growth',
    desc: 'Sports, arts, music, and cultural activities alongside academics.',
  },
]

/**
 * AboutPreview — Teaser section on the homepage.
 *
 * Shows the school's core values in a split-column layout:
 * - Left: section label, heading, description, 4 highlight cards, CTA link
 * - Right: decorative image card with floating experience/achievement badges
 */
export default function AboutPreview() {
  return (
    <section
      id="about-preview"
      className={`section ${styles.section}`}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className={styles.grid}>

          {/* ── Text content ── */}
          <motion.div
            className={styles.content}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={scrollReveal}
          >
            <span className="section-label">Our Story</span>

            <h2 className="section-title" id="about-heading">
              Two Decades of Shaping{' '}
              <span className="text-gold">Brilliant Minds</span>
            </h2>

            <div className="divider" />

            <p className="section-subtitle">
              Founded in 2000, Pavna School has grown from a single classroom to Aligarh's
              most trusted CBSE institution — nurturing over 5,000 students with a
              curriculum that balances rigour, creativity, and character.
            </p>

            {/* Highlight grid */}
            <div className={styles.highlights}>
              {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={styles.highlight}>
                  <div className={styles.highlight__icon} aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className={styles.highlight__title}>{title}</p>
                    <p className={styles.highlight__desc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about" className={styles.link} aria-label="Learn more about Pavna School">
              Discover Our Story
              <RiArrowRightLine aria-hidden="true" />
            </Link>
          </motion.div>

          {/* ── Visual / image card ── */}
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1], delay: 0.2 }}
            aria-hidden="true"
          >
            <div className={styles['image-card']}>
              <div className={styles['image-placeholder']}>
                <RiBuildingLine size={64} />
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  School Campus
                </span>
              </div>
            </div>

            {/* Experience badge — bottom left */}
            <div className={styles['experience-badge']}>
              <span className={styles['experience-badge__num']}>25+</span>
              <span className={styles['experience-badge__text']}>Years of Excellence</span>
            </div>

            {/* Achievement badge — top right */}
            <div className={styles['achievement-badge']}>
              <span className={styles['achievement-badge__num']}>98%</span>
              <span className={styles['achievement-badge__text']}>Board Results</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
