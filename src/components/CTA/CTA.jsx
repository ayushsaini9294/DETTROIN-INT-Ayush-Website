import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiPhoneLine,
  RiCalendarLine,
  RiCheckLine,
  RiAlarmWarningLine,
} from 'react-icons/ri'
import styles from './CTA.module.css'

const INFO_ITEMS = [
  {
    icon: RiCalendarLine,
    label: 'Session Starts',
    value: 'April 2026',
  },
  {
    icon: RiPhoneLine,
    label: 'Admissions Helpline',
    value: '+91 98765 43210',
  },
  {
    icon: RiCheckLine,
    label: 'Classes Available',
    value: 'Nursery to Class XII',
  },
]

/**
 * CTA — Admission call-to-action section.
 *
 * Full-width primary gradient background with:
 * - Left: session deadline pill, headline, subtitle, dual CTAs
 * - Right: glassy info card with session date, phone, and available classes
 */
export default function CTA() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="cta-heading"
    >
      <div className={`container ${styles.inner}`}>

        {/* Left content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          {/* Deadline badge */}
          <div className={styles.deadline}>
            <RiAlarmWarningLine size={14} aria-hidden="true" />
            Admissions Open — Session 2025‑26
          </div>

          <h2 className={styles.title} id="cta-heading">
            <span>Start Your Child's</span>
            <span className="text-gold">Success Story</span>
            <span>at Pavna School</span>
          </h2>

          <p className={styles.subtitle}>
            Seats are limited. Secure your child's place in Aligarh's most trusted
            CBSE school and give them the future they deserve.
          </p>

          <div className={styles.actions}>
            <Link to="/admissions" className="btn btn-primary btn-lg">
              Apply Online Now
              <RiArrowRightLine aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              <RiPhoneLine aria-hidden="true" />
              Talk to Admissions
            </Link>
          </div>
        </motion.div>

        {/* Right info card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: 0.2 }}
          aria-label="Admissions information"
        >
          <p className={styles['card-title']}>Quick Info</p>

          {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles['card-item']}>
              <div className={styles['card-item__icon']} aria-hidden="true">
                <Icon size={16} />
              </div>
              <div className={styles['card-item__text']}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
