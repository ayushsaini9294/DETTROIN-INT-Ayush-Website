import { motion } from 'framer-motion'
import {
  RiMicroscopeLine,
  RiBookLine,
  RiRunLine,
  RiComputerLine,
  RiBusLine,
  RiRestaurantLine,
  RiPaletteLine,
  RiMusic2Line,
} from 'react-icons/ri'
import styles from './Facilities.module.css'

const SPORTS_TAGS = ['Cricket Ground', 'Basketball', 'Volleyball', 'Athletics', 'Yoga Hall', 'Swimming Pool']

/**
 * Facilities — Bento-grid layout showcasing school infrastructure.
 *
 * Cards vary in size (wide/tall) to create visual interest without a carousel.
 * The "Sports Complex" cell spans 2 rows with sport tags.
 * Two coloured cells (primary blue, gold) break the monotony of white cards.
 */
export default function Facilities() {
  const cellVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0, 0, 0.2, 1], delay: i * 0.07 },
    }),
  }

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="facilities-heading"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Infrastructure</span>
          <h2 className="section-title" id="facilities-heading">
            World-Class <span className="text-gold">Facilities</span>
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            Modern infrastructure designed to support every dimension of learning — academic,
            creative, physical, and social.
          </p>
        </motion.div>

        <div className={styles.bento}>
          {/* Science Labs — wide */}
          <motion.div
            className={`${styles.cell} ${styles['cell--wide']} ${styles['cell--primary']}`}
            custom={0} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--white']}`} aria-hidden="true">
              <RiMicroscopeLine size={26} />
            </div>
            <h3 className={styles.cell__title}>Science Laboratories</h3>
            <p className={styles.cell__desc}>
              Fully equipped Physics, Chemistry, and Biology labs with modern apparatus,
              digital displays, and safety-first design.
            </p>
          </motion.div>

          {/* Library */}
          <motion.div
            className={styles.cell}
            custom={1} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiBookLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Digital Library</h3>
            <p className={styles.cell__desc}>
              10,000+ books, e-journals, and a dedicated reading room for research and leisure.
            </p>
          </motion.div>

          {/* Sports — tall */}
          <motion.div
            className={`${styles.cell} ${styles['cell--tall']}`}
            custom={2} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiRunLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Sports Complex</h3>
            <p className={styles.cell__desc}>
              Multi-sport facilities maintained to tournament standards, with certified
              coaches for each sport.
            </p>
            <div className={styles.tags}>
              {SPORTS_TAGS.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Computer Lab */}
          <motion.div
            className={styles.cell}
            custom={3} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiComputerLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Smart Classrooms</h3>
            <p className={styles.cell__desc}>
              100% of classrooms equipped with interactive whiteboards and high-speed Wi-Fi.
            </p>
          </motion.div>

          {/* Transport */}
          <motion.div
            className={styles.cell}
            custom={4} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiBusLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Safe Transport</h3>
            <p className={styles.cell__desc}>
              GPS-tracked buses covering all major areas of Aligarh with trained lady attendants.
            </p>
          </motion.div>

          {/* Canteen — gold */}
          <motion.div
            className={`${styles.cell} ${styles['cell--gold']}`}
            custom={5} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--gold']}`} aria-hidden="true">
              <RiRestaurantLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Healthy Canteen</h3>
            <p className={styles.cell__desc}>
              Nutritionist-approved meals, hygienic kitchen, and a variety of healthy snack options.
            </p>
          </motion.div>

          {/* Arts */}
          <motion.div
            className={styles.cell}
            custom={6} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiPaletteLine size={22} />
            </div>
            <h3 className={styles.cell__title}>Art Studio</h3>
            <p className={styles.cell__desc}>
              Dedicated space for painting, craft, pottery, and fine arts with professional guidance.
            </p>
          </motion.div>

          {/* Music — wide */}
          <motion.div
            className={`${styles.cell} ${styles['cell--wide']}`}
            custom={7} variants={cellVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <div className={`${styles.cell__icon} ${styles['cell__icon--primary']}`} aria-hidden="true">
              <RiMusic2Line size={22} />
            </div>
            <h3 className={styles.cell__title}>Music & Performing Arts</h3>
            <p className={styles.cell__desc}>
              Soundproofed music rooms, vocal and instrumental training, and a 500-seat auditorium
              for cultural events and annual day performances.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
