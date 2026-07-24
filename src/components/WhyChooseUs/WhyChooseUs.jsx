import { motion } from 'framer-motion'
import {
  RiMedalLine,
  RiTeamLine,
  RiComputerLine,
  RiHeartPulseLine,
  RiGlobalLine,
  RiBusLine,
} from 'react-icons/ri'
import styles from './WhyChooseUs.module.css'

const REASONS = [
  {
    icon: RiMedalLine,
    title: 'Academic Excellence',
    desc: 'Top ranks in CBSE boards with personalised mentoring and focused exam preparation for every student.',
  },
  {
    icon: RiTeamLine,
    title: 'Expert Faculty',
    desc: 'Over 150 experienced, dedicated teachers who go beyond textbooks to inspire curiosity and critical thinking.',
  },
  {
    icon: RiComputerLine,
    title: 'Smart Infrastructure',
    desc: 'State-of-the-art smart classrooms, high-speed internet, and modern science and computer labs.',
  },
  {
    icon: RiHeartPulseLine,
    title: 'Holistic Development',
    desc: 'Sports, arts, yoga, music, and leadership programmes to nurture the whole child — not just the student.',
  },
  {
    icon: RiGlobalLine,
    title: 'Global Perspective',
    desc: 'Language labs, international events, and inter-school competitions that open minds to the wider world.',
  },
  {
    icon: RiBusLine,
    title: 'Safe Transport',
    desc: 'GPS-tracked, air-conditioned school buses covering all major areas of Aligarh with trained attendants.',
  },
]

/**
 * WhyChooseUs — 6-card grid section.
 *
 * Each card features a large icon, title, description, and a decorative
 * background number. On hover, a gold underline sweeps in from the left —
 * a subtle differentiator that rewards exploration.
 *
 * Cards stagger in on scroll using a `custom` delay index.
 */
export default function WhyChooseUs() {
  const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0, 0, 0.2, 1], delay: i * 0.08 },
    }),
  }

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="why-choose-heading"
    >
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          <span className="section-label">Why Pavna</span>
          <h2 className="section-title" id="why-choose-heading">
            Why Families Choose <span className="text-gold">Pavna School</span>
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            We combine rigorous academics with a nurturing environment to help every child
            discover their potential and achieve their dreams.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className={styles.grid} role="list">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              className={styles.card}
              role="listitem"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Background number decoration */}
              <span className={styles['card-num']} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className={styles['icon-wrap']} aria-hidden="true">
                <Icon size={26} />
              </div>

              <h3 className={styles['card-title']}>{title}</h3>
              <p className={styles['card-desc']}>{desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
