import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowUpLine } from 'react-icons/ri'
import styles from './BackToTop.module.css'

/**
 * BackToTop — appears after 400px of scroll, smooth scrolls to top.
 * AnimatePresence handles mount/unmount animation cleanly.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.btn}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          whileTap={{ scale: 0.9 }}
        >
          <RiArrowUpLine size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
