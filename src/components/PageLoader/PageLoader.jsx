import styles from './PageLoader.module.css'

/**
 * PageLoader — Suspense fallback shown while lazy pages load.
 * Uses a CSS-only spinner so no JS is needed before hydration.
 */
export default function PageLoader() {
  return (
    <div className={styles.loader} aria-label="Loading page…" role="status">
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>Loading…</span>
    </div>
  )
}
