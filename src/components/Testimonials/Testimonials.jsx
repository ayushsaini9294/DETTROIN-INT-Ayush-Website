import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    quote: "Pavna School gave my daughter the confidence and academic foundation to secure a seat in IIT. The faculty's dedication goes far beyond the classroom.",
    name: 'Rajesh Kumar Sharma',
    role: 'Parent, Class XII Graduate 2024',
    initials: 'RS',
    color: '#0A2463',
  },
  {
    quote: 'I joined Pavna in Class VI and it completely transformed how I think. The project-based learning and science labs made me fall in love with biology.',
    name: 'Priya Agarwal',
    role: 'Student, Class XI Science',
    initials: 'PA',
    color: '#1565C0',
  },
  {
    quote: "The school's emphasis on both academics and values has shaped our son into a well-rounded individual. We couldn't have chosen a better institution.",
    name: 'Sunita & Rakesh Verma',
    role: 'Parents, Class IX Student',
    initials: 'SV',
    color: '#E8B84B',
  },
  {
    quote: 'As an alumnus, I can say that the skills and discipline I learnt at Pavna gave me an unbeatable advantage in my engineering entrance exams.',
    name: 'Aman Gupta',
    role: 'Alumni, NIT Allahabad 2023',
    initials: 'AG',
    color: '#0D47A1',
  },
  {
    quote: 'The sports facilities and coaching staff at Pavna helped me represent UP in the national inter-school athletics championship.',
    name: 'Kavya Singh',
    role: 'Student, Class X',
    initials: 'KS',
    color: '#1A237E',
  },
  {
    quote: 'The transport service is excellent — always on time, safe, and supervised. As working parents, this peace of mind is invaluable.',
    name: 'Deepa & Vikas Malhotra',
    role: 'Parents, Class IV Student',
    initials: 'VM',
    color: '#C49A2E',
  },
]

// Cards visible per slide on each breakpoint
function useCardsPerSlide() {
  const [cards, setCards] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600) setCards(1)
      else if (window.innerWidth < 900) setCards(2)
      else setCards(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return cards
}

/**
 * Testimonials — Auto-advancing testimonial carousel.
 *
 * Architecture:
 * - CSS `transform: translateX` drives the slide — no external lib needed
 * - Auto-advances every 4 seconds, pauses on mouse enter
 * - Responsive: 3 cards → 2 → 1 depending on viewport
 * - Dot navigation + prev/next arrows
 * - Infinite loop wraps from last → first slide
 */
export default function Testimonials() {
  const cardsPerSlide = useCardsPerSlide()
  const maxIndex      = TESTIMONIALS.length - cardsPerSlide
  const [index, setIndex]   = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef         = useRef(null)

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  // Auto-advance — restarts whenever index, pause state, or cardsPerSlide changes
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 4000)
    return () => clearInterval(intervalRef.current)
  }, [next, paused])

  // Reset index if it's out of bounds after resize
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const translateX = `calc(-${index * 100}% / ${cardsPerSlide} - ${index} * var(--space-6) / ${cardsPerSlide})`

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">What Parents Say</span>
          <h2 className="section-title" id="testimonials-heading">
            Trusted by <span className="text-gold">5,000+ Families</span>
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            Real words from parents and students who are part of the Pavna family.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className={styles['track-wrapper']}
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * (100 / cardsPerSlide)}%)` }}
          >
            {TESTIMONIALS.map(({ quote, name, role, initials, color }) => (
              <article key={name} className={styles.card}>
                {/* Star rating */}
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={styles.star} aria-hidden="true">★</span>
                  ))}
                </div>

                <p className={styles.quote}>{quote}</p>

                <div className={styles.author}>
                  <div
                    className={styles.author__avatar}
                    style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)` }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <p className={styles.author__name}>{name}</p>
                    <p className={styles.author__role}>{role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="Testimonials navigation">
          <button
            className={styles.nav__btn}
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <RiArrowLeftLine size={18} aria-hidden="true" />
          </button>

          <div className={styles.dots} role="tablist">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={[styles.dot, i === index ? styles['dot--active'] : ''].join(' ')}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial group ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>

          <button
            className={styles.nav__btn}
            onClick={next}
            aria-label="Next testimonial"
          >
            <RiArrowRightLine size={18} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </section>
  )
}
