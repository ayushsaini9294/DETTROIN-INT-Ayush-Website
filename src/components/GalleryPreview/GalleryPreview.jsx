import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiZoomInLine, RiImageLine } from 'react-icons/ri'
import styles from './GalleryPreview.module.css'

const GALLERY_ITEMS = [
  { label: 'Annual Day 2024', icon: RiImageLine },
  { label: 'Science Exhibition', icon: RiImageLine },
  { label: 'Sports Day', icon: RiImageLine },
  { label: 'Cultural Fest', icon: RiImageLine },
  { label: 'Smart Classrooms', icon: RiImageLine },
  { label: 'Campus Life', icon: RiImageLine },
]

/**
 * GalleryPreview — 6-item grid teaser for the Gallery page.
 *
 * The first item spans 2 rows for visual variety.
 * On hover: dark overlay fades in + zoom icon scales up + category label slides up.
 * Each cell has a distinct gradient so the section feels colourful even without real photos.
 * Real photos would simply replace the gradient backgrounds with <img> tags.
 */
export default function GalleryPreview() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="gallery-preview-heading"
    >
      <div className="container">
        {/* Header row with "View All" CTA aligned right */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles['header-text']}>
            <span className="section-label">School Life</span>
            <h2 className="section-title" id="gallery-preview-heading">
              Life at <span className="text-gold">Pavna School</span>
            </h2>
            <div className="divider" />
          </div>
          <Link
            to="/gallery"
            className="btn btn-outline"
            aria-label="View the full photo gallery"
          >
            View All Photos
            <RiArrowRightLine aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Photo grid */}
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="list"
          aria-label="Gallery preview"
        >
          {GALLERY_ITEMS.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              className={styles['grid-item']}
              role="listitem"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              aria-label={label}
            >
              {/* Placeholder content (replace with <img> when real photos available) */}
              <div className={styles['grid-item__inner']} aria-hidden="true">
                <Icon size={32} />
                <span>{label}</span>
              </div>

              {/* Hover overlay */}
              <div className={styles['grid-item__overlay']} aria-hidden="true">
                <div className={styles['grid-item__hover-icon']}>
                  <RiZoomInLine size={22} />
                </div>
              </div>

              {/* Category label */}
              <span className={styles['grid-item__label']}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
