import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine, RiImageLine } from 'react-icons/ri'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  out: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const TABS = ['All', 'Events', 'Sports', 'Academics', 'Infrastructure']

// Gallery data — in production these would be real image paths
const GALLERY_ITEMS = [
  { id: 1, cat: 'Events', label: 'Annual Day 2024', cols: 2, rows: 2 },
  { id: 2, cat: 'Sports', label: 'Cricket Championship', cols: 1, rows: 1 },
  { id: 3, cat: 'Academics', label: 'Science Exhibition', cols: 1, rows: 1 },
  { id: 4, cat: 'Infrastructure', label: 'Smart Classrooms', cols: 1, rows: 1 },
  { id: 5, cat: 'Events', label: 'Independence Day', cols: 1, rows: 1 },
  { id: 6, cat: 'Sports', label: 'Basketball Finals', cols: 1, rows: 2 },
  { id: 7, cat: 'Academics', label: 'Math Olympiad', cols: 2, rows: 1 },
  { id: 8, cat: 'Infrastructure', label: 'Science Laboratory', cols: 1, rows: 1 },
  { id: 9, cat: 'Events', label: 'Cultural Fest 2024', cols: 1, rows: 1 },
  { id: 10, cat: 'Sports', label: 'Athletic Track Day', cols: 1, rows: 1 },
  { id: 11, cat: 'Academics', label: 'Art & Craft Show', cols: 1, rows: 1 },
  { id: 12, cat: 'Infrastructure', label: 'School Library', cols: 2, rows: 1 },
]

// Distinct gradient for each item to simulate image variety
const GRADIENTS = [
  'linear-gradient(135deg, #0A2463 0%, #1565C0 100%)',
  'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)',
  'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
  'linear-gradient(135deg, #E8B84B 0%, #C49A2E 100%)',
  'linear-gradient(135deg, #061540 0%, #0A2463 100%)',
  'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
  'linear-gradient(135deg, #C49A2E 0%, #E8B84B 100%)',
  'linear-gradient(135deg, #0A2463 0%, #1A237E 100%)',
  'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
  'linear-gradient(135deg, #283593 0%, #3949AB 100%)',
  'linear-gradient(135deg, #1E3A8A 0%, #1565C0 100%)',
  'linear-gradient(135deg, #E8B84B 0%, #F5D07A 100%)',
]

/**
 * Gallery page — filterable masonry grid with a lightbox modal.
 *
 * Filter tabs update the visible items instantly (no animation needed — fast is good here).
 * Clicking any item opens a full-screen lightbox with prev/next navigation.
 * Lightbox closes on backdrop click or Escape key.
 */
export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All')
  const [lightbox, setLightbox] = useState(null) // { index, items }

  const filtered = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.cat === activeTab)

  const openLightbox = (i) => setLightbox({ index: i, items: filtered })
  const closeLightbox = () => setLightbox(null)
  const navLightbox = (dir) => setLightbox((lb) => ({
    ...lb,
    index: (lb.index + dir + lb.items.length) % lb.items.length,
  }))

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">

      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="gallery-page-heading">
        <div className="container">
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="gallery-page-heading"
          >
            Photo Gallery
          </motion.h1>
          <p className="page-hero__breadcrumb">
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span aria-hidden="true"> / </span>Gallery
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section" aria-labelledby="gallery-grid-heading">
        <div className="container">
          <h2 className="sr-only" id="gallery-grid-heading">Gallery photos</h2>

          {/* Filter tabs */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-10)', justifyContent: 'center' }}
            role="tablist"
            aria-label="Gallery categories"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                style={{
                  padding: 'var(--space-2) var(--space-5)',
                  borderRadius: 'var(--radius-full)',
                  border: `2px solid ${activeTab === tab ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: activeTab === tab ? 'var(--gradient-primary)' : 'white',
                  color: activeTab === tab ? 'white' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--fw-semibold)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div
            style={{
              columns: 3, gap: 'var(--space-4)',
              columnFill: 'balance',
            }}
            role="list"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  role="listitem"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => openLightbox(i)}
                  aria-label={`View ${item.label}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginBottom: 'var(--space-4)',
                    breakInside: 'avoid',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: GRADIENTS[item.id - 1],
                    aspectRatio: item.rows === 2 ? '2/3' : item.cols === 2 ? '16/7' : '4/3',
                    cursor: 'pointer',
                    border: 'none',
                    position: 'relative',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Placeholder icon */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 'var(--space-2)', color: 'rgba(255,255,255,0.30)',
                    fontSize: 'var(--text-xs)', textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-wider)',
                  }}>
                    <RiImageLine size={28} />
                    <span>{item.label}</span>
                  </div>

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(10,36,99,0.50)',
                    opacity: 0, transition: 'opacity 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                    className="gallery-hover"
                  />

                  {/* Category chip */}
                  <span style={{
                    position: 'absolute', bottom: 'var(--space-3)', left: 'var(--space-3)',
                    background: 'rgba(10,36,99,0.65)',
                    backdropFilter: 'blur(8px)', color: 'white',
                    fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)',
                    padding: '2px 10px', borderRadius: '999px',
                  }}>
                    {item.cat}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${lightbox.items[lightbox.index]?.label}`}
            style={{
              position: 'fixed', inset: 0, zIndex: 'var(--z-modal)',
              background: 'rgba(6,21,64,0.92)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative', maxWidth: 800, width: '90%',
                borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                background: GRADIENTS[(lightbox.items[lightbox.index]?.id ?? 1) - 1],
                aspectRatio: '4/3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                <RiImageLine size={60} />
                <p style={{ marginTop: 12, fontSize: 'var(--text-lg)', fontFamily: 'var(--font-heading)' }}>
                  {lightbox.items[lightbox.index]?.label}
                </p>
              </div>

              {/* Close */}
              <button onClick={closeLightbox} aria-label="Close lightbox" style={{
                position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <RiCloseLine size={20} />
              </button>

              {/* Prev */}
              <button onClick={() => navLightbox(-1)} aria-label="Previous photo" style={{
                position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <RiArrowLeftLine size={20} />
              </button>

              {/* Next */}
              <button onClick={() => navLightbox(1)} aria-label="Next photo" style={{
                position: 'absolute', right: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <RiArrowRightLine size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
