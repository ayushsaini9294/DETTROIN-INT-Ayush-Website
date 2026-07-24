import { motion } from 'framer-motion'
import {
  RiSeedlingLine,
  RiBookLine,
  RiSchoolLine,
  RiUserStarLine,
  RiGraduationCapLine,
} from 'react-icons/ri'
import styles from './Programs.module.css'

const PROGRAMS = [
  {
    icon: RiSeedlingLine,
    title: 'Pre-Primary',
    grades: 'Nursery – KG',
    desc: 'Play-based learning that builds curiosity, motor skills, and social confidence.',
  },
  {
    icon: RiBookLine,
    title: 'Primary',
    grades: 'Class I – V',
    desc: 'Strong foundational skills in literacy, numeracy, science, and the arts.',
    featured: true,
    badge: 'Popular',
  },
  {
    icon: RiSchoolLine,
    title: 'Middle School',
    grades: 'Class VI – VIII',
    desc: 'Deepening subject expertise with project-based and inquiry-led learning.',
  },
  {
    icon: RiUserStarLine,
    title: 'Secondary',
    grades: 'Class IX – X',
    desc: 'Comprehensive CBSE preparation with board exam coaching and counselling.',
  },
  {
    icon: RiGraduationCapLine,
    title: 'Senior Secondary',
    grades: 'Class XI – XII',
    desc: 'Science & Commerce streams with dedicated JEE, NEET, and CUET guidance.',
  },
]

/**
 * Programs — 5 academic level cards.
 *
 * The "Primary" card is featured (gold gradient) to highlight the most popular
 * enrolment point. All cards are equal-width on desktop — they scale down to
 * 3-col on tablet and 1-col on mobile.
 */
export default function Programs() {
  const cardVariants = {
    hidden:  { opacity: 0, y: 40, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0, 0, 0.2, 1], delay: i * 0.09 },
    }),
  }

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="programs-heading"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title" id="programs-heading">
            Academic <span className="text-gold">Programmes</span>
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            From Nursery through Class XII, Pavna offers a seamless, enriching
            educational journey for every stage of childhood.
          </p>
        </motion.div>

        <div className={styles.grid} role="list">
          {PROGRAMS.map(({ icon: Icon, title, grades, desc, featured, badge }, i) => (
            <motion.article
              key={title}
              role="listitem"
              className={[styles.card, featured ? styles['card--featured'] : ''].join(' ')}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {badge && <span className={styles.badge}>{badge}</span>}

              <div className={styles.icon} aria-hidden="true">
                <Icon size={24} />
              </div>

              <h3 className={styles.title}>{title}</h3>
              <p className={styles.grades}>{grades}</p>
              <p className={styles.desc}>{desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
