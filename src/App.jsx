import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout components — always loaded (critical path)
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import PageLoader from './components/PageLoader/PageLoader'

// Pages — lazy loaded for code splitting
const Home       = lazy(() => import('./pages/Home'))
const About      = lazy(() => import('./pages/About'))
const Admissions = lazy(() => import('./pages/Admissions'))
const Gallery    = lazy(() => import('./pages/Gallery'))
const Contact    = lazy(() => import('./pages/Contact'))

/**
 * AnimatedRoutes — separated into its own component so it can use
 * useLocation() (which requires BrowserRouter context from parent).
 * AnimatePresence needs the location key to detect route changes
 * and trigger exit animations.
 */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/gallery"    element={<Gallery />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

/**
 * App — root application shell.
 * Structure: BrowserRouter > Navbar > Suspense(Routes) > Footer > BackToTop
 *
 * Navbar and Footer are outside Suspense so they render immediately
 * and don't flash away on page transitions.
 */
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}

export default App
