import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  RiTeamLine,
  RiTimeLine,
  RiUserStarLine,
  RiMedalLine,
} from 'react-icons/ri'
import styles from './Statistics.module.css'

const STATS = [
  {
    icon: RiTeamLine,
    iconBg: 'rgba(21,101,192,0.25)',
    iconColor: '#6EC1E4',
    end: 5000,
    suffix: '+',
    label: 'Students Enrolled',
    sublabel: 'Active learners across all classes',
  },
  {
    icon: RiTimeLine,
    iconBg: 'rgba(232,184,75,0.20)',
    iconColor: '#E8B84B',
    end: 25,
    suffix: '+',
    label: 'Years of Excellence',
    sublabel: 'Trusted since 2000',
  },
  {
    icon: RiUserStarLine,
    iconBg: 'rgba(16,185,129,0.20)',
    iconColor: '#10B981',
    end: 150,
    suffix: '+',
    label: 'Expert Faculty',
    sublabel: 'Dedicated to student success',
  },
  {
    icon: RiMedalLine,
    iconBg: 'rgba(239,68,68,0.20)',
    iconColor: '#F87171',
    end: 98,
    suffix: '%',
    label: 'Board Pass Rate',
    sublabel: 'Consistent academic excellence',
  },
]

/**
 * AnimatedCounter — counts from 0 to `end` once the element enters viewport.
 *
 * Uses requestAnimationFrame for smooth counting with an ease-out curve.
 * Stops the animation and cleans up properly when the component unmounts.
 */
function AnimatedCounter({ end, suffix }) {
  const [count, setCount] = useState(0)
  const ref              = useRef(null)
  const isInView         = useInView(ref, { once: true, margin: '-80px' })
  const rafRef           = useRef(null)

  useEffect(() => {
    if (!isInView) return

    const duration  = 1800 // ms
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, end])

  return (
    <span ref={ref} className={styles.stat__value}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/**
 * Statistics — Dark navy section with 4 animated counters.
 *
 * AnimatedCounter uses RAF + ease-out cubic for smooth number animation.
 * The section background uses two overlapping radial gradients to create
 * a subtle blue + gold lighting effect without external images.
 */
export default function Statistics() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="stats-heading"
    >
      <div className={`container ${styles.inner}`}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          <span className="section-label section-label--gold">By The Numbers</span>
          <h2 className="section-title section-title--white" id="stats-heading">
            A Legacy Built on <span className="text-gold">Results</span>
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle section-subtitle--white">
            Numbers that reflect 25 years of dedicated education and student achievement.
          </p>
        </motion.div>

        <div className={styles.grid} role="list">
          {STATS.map(({ icon: Icon, iconBg, iconColor, end, suffix, label, sublabel }, i) => (
            <motion.div
              key={label}
              className={styles.stat}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0, 0, 0.2, 1], delay: i * 0.10 }}
              aria-label={`${end}${suffix} ${label}`}
            >
              <div
                className={styles.stat__icon}
                style={{ background: iconBg }}
                aria-hidden="true"
              >
                <Icon size={26} color={iconColor} />
              </div>

              <AnimatedCounter end={end} suffix={suffix} />

              <p className={styles.stat__label}>{label}</p>
              <p className={styles.stat__sublabel}>{sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
