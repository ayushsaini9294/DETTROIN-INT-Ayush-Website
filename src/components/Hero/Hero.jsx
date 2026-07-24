import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiPlayCircleLine,
  RiCheckLine,
  RiMedalLine,
  RiTeamLine,
  RiBookOpenLine,
} from 'react-icons/ri'
import styles from './Hero.module.css'

// ── Animation variants ──
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1], delay },
  }),
}

const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1], delay: 0.3 },
  },
}

const KEY_FEATURES = [
  { icon: RiCheckLine, text: 'CBSE Affiliated' },
  { icon: RiCheckLine, text: 'Smart Classrooms' },
  { icon: RiCheckLine, text: 'Sports Complex' },
  { icon: RiCheckLine, text: 'Transport Facility' },
]

/**
 * Hero — The first section users see.
 *
 * Layout:
 * - Left column: Animated heading, subtitle, dual CTA buttons, feature list
 * - Right column: Glassmorphism card with mini stat dashboard (hidden on mobile)
 * - Background: Deep navy gradient + radial mesh dots + glowing CSS orbs
 * - Bottom: Scroll-down indicator
 *
 * Framer Motion: Each content block fades up with staggered delay.
 * The card fades in from the right at 300ms offset.
 */
export default function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById('about-preview')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} aria-label="Hero banner">

      {/* ── Background decoration ── */}
      <div className={styles.hero__bg} aria-hidden="true">
        <div className={`${styles.orb} ${styles['orb--1']}`} />
        <div className={`${styles.orb} ${styles['orb--2']}`} />
        <div className={`${styles.orb} ${styles['orb--3']}`} />
      </div>

      <div className={styles.hero__container}>

        {/* ── Left: Text content ── */}
        <div className={styles.hero__content}>

          {/* Pill badge */}
          <motion.div
            className={styles.hero__badge}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className={styles.hero__badge_dot} aria-hidden="true" />
            Aligarh's Premier CBSE School
          </motion.div>

          {/* Main heading — split for gold accent */}
          <motion.h1
            className={styles.hero__heading}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span>Shaping Tomorrow's</span>
            <span className={styles['hero__heading-accent']}>Leaders Today</span>
            <span>at Pavna School</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.hero__subtitle}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            A world-class CBSE institution in Aligarh committed to academic excellence,
            character building, and preparing students for a rapidly changing world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className={styles.hero__actions}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <Link
              to="/admissions"
              className="btn btn-primary btn-lg"
              aria-label="Apply for admission"
            >
              Apply for 2025–26
              <RiArrowRightLine aria-hidden="true" />
            </Link>
            <Link
              to="/about"
              className="btn btn-secondary btn-lg"
              aria-label="Learn about Pavna School"
            >
              <RiPlayCircleLine aria-hidden="true" />
              Explore School
            </Link>
          </motion.div>

          {/* Feature checklist */}
          <motion.ul
            className={styles.hero__features}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            aria-label="Key school features"
          >
            {KEY_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className={styles.hero__feature}>
                <Icon size={14} className={styles['hero__feature-icon']} aria-hidden="true" />
                {text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Right: Glassmorphism card ── */}
        <motion.div
          className={styles.hero__visual}
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          aria-hidden="true" /* decorative — content is in text column */
        >
          <div className={styles.hero__card}>
            {/* Floating badge */}
            <span className={styles['hero__float-badge']}>Est. 2000</span>

            {/* School graphic placeholder */}
            <div className={styles['hero__image-wrapper']}>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <RiBookOpenLine size={56} color="rgba(255,255,255,0.25)" />
                <span style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Pavna School Campus
                </span>
              </div>
              <div className={styles['hero__image-overlay']} />
            </div>

            {/* School details */}
            <p className={styles['hero__card-name']}>Pavna CBSE School</p>
            <p className={styles['hero__card-affil']}>
              Affiliated to CBSE, New Delhi · Aligarh, UP
            </p>

            {/* Mini stats grid */}
            <div className={styles['hero__card-stats']} role="list">
              {[
                { icon: RiTeamLine,  value: '5000+',  label: 'Students' },
                { icon: RiMedalLine, value: '25+',    label: 'Years' },
                { icon: RiCheckLine, value: '98%',    label: 'Board Result' },
              ].map(({ value, label }) => (
                <div key={label} className={styles['hero__card-stat']} role="listitem">
                  <span className={styles['hero__stat-value']}>{value}</span>
                  <span className={styles['hero__stat-label']}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        className={styles['scroll-indicator']}
        onClick={scrollToContent}
        aria-label="Scroll down to main content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className={styles['scroll-indicator__mouse']} aria-hidden="true">
          <div className={styles['scroll-indicator__wheel']} />
        </div>
        <span>Scroll</span>
      </motion.button>
    </section>
  )
}
