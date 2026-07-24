import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHomeLine,
  RiInformationLine,
  RiFileTextLine,
  RiGalleryLine,
  RiPhoneLine,
  RiGraduationCapLine,
} from 'react-icons/ri'
import styles from './Navbar.module.css'

// ── Navigation link definitions — single source of truth ──
const NAV_LINKS = [
  { to: '/',           label: 'Home',       icon: RiHomeLine },
  { to: '/about',      label: 'About',      icon: RiInformationLine },
  { to: '/admissions', label: 'Admissions', icon: RiFileTextLine },
  { to: '/gallery',    label: 'Gallery',    icon: RiGalleryLine },
  { to: '/contact',    label: 'Contact',    icon: RiPhoneLine },
]

// ── Framer Motion variants ──
const drawerVariants = {
  hidden: {
    x: '100%',
    transition: { type: 'tween', duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
  visible: {
    x: 0,
    transition: { type: 'tween', duration: 0.35, ease: [0, 0, 0.2, 1] },
  },
}

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
}

const navItemVariants = {
  hidden:  { x: 30, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.06 + 0.1, duration: 0.3, ease: [0, 0, 0.2, 1] },
  }),
}

/**
 * Navbar — sticky, context-aware navigation component.
 *
 * Key behaviours:
 * - Transparent on hero sections, solid white on scroll (≥ 80px)
 * - Active route highlighted via React Router's NavLink
 * - Mobile: slide-in drawer with staggered nav items
 * - Hamburger animates into × when drawer is open
 * - Closes drawer on route change or Escape key
 * - No useEffect abuse — scroll listener added once via useCallback
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  // Scroll detection — throttled with requestAnimationFrame
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 80)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  const navbarClass = [
    styles.navbar,
    isScrolled ? styles['navbar--solid'] : styles['navbar--transparent'],
  ].join(' ')

  const hamburgerClass = [
    styles.hamburger,
    isDrawerOpen ? styles['hamburger--open'] : '',
  ].join(' ')

  return (
    <>
      {/* ── Main Navbar ── */}
      <header className={navbarClass} role="banner">
        <div className={styles.navbar__inner}>

          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Pavna School — Home">
            <div className={styles.logo__crest} aria-hidden="true">
              <RiGraduationCapLine size={22} color="white" />
            </div>
            <div className={styles.logo__text}>
              <span className={styles.logo__name}>Pavna School</span>
              <span className={styles.logo__tagline}>CBSE · Aligarh</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className={styles.nav} aria-label="Primary navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [styles.nav__link, isActive ? styles['nav__link--active'] : ''].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link to="/admissions" className={styles.nav__cta} aria-label="Apply now">
            Apply Now
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className={hamburgerClass}
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span className={styles.hamburger__line} />
            <span className={styles.hamburger__line} />
            <span className={styles.hamburger__line} />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div
            className={styles['mobile-drawer']}
            id="mobile-nav-drawer"
            style={{ pointerEvents: 'auto' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Backdrop */}
            <motion.div
              className={styles['mobile-drawer__backdrop']}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className={styles['mobile-drawer__panel']}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <nav className={styles['mobile-nav']} aria-label="Mobile navigation">
                {NAV_LINKS.map(({ to, label, icon: Icon }, i) => (
                  <motion.div
                    key={to}
                    custom={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        [
                          styles['mobile-nav__link'],
                          isActive ? styles['mobile-nav__link--active'] : '',
                        ].join(' ')
                      }
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Icon className={styles['mobile-nav__icon']} aria-hidden="true" />
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                <div className={styles['mobile-nav__divider']} />

                <motion.div
                  custom={NAV_LINKS.length}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to="/admissions"
                    className={styles['mobile-nav__cta']}
                    onClick={() => setDrawerOpen(false)}
                  >
                    Apply Now — 2025‑26
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
