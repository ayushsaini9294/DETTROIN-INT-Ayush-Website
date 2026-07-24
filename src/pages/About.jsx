import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiLightbulbLine,
  RiHeartLine,
  RiTrophyLine,
  RiLeafLine,
  RiUserStarLine,
  RiBookOpenLine,
} from 'react-icons/ri'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in:      { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } },
  out:     { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const scrollReveal = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] } },
}

const TIMELINE = [
  { year: '2000', event: 'Pavna School founded with 120 students and a vision for excellence' },
  { year: '2004', event: 'Expanded to Class X and received CBSE affiliation' },
  { year: '2008', event: 'Launched Senior Secondary (Class XI–XII) with Science & Commerce streams' },
  { year: '2012', event: 'New science and computer labs inaugurated; student strength crosses 2,000' },
  { year: '2016', event: 'Smart classroom project rolled out across all grades' },
  { year: '2020', event: 'Celebrated 20 years — 5,000+ alumni across India and abroad' },
  { year: '2024', event: 'Awarded Best CBSE School in Western UP for the third consecutive year' },
]

const VALUES = [
  { icon: RiLightbulbLine, title: 'Curiosity',      desc: 'We foster a love for learning that extends far beyond textbooks.' },
  { icon: RiHeartLine,     title: 'Compassion',     desc: 'Character and empathy are as important as academic achievement.' },
  { icon: RiTrophyLine,    title: 'Excellence',     desc: 'We set high standards and support every student to reach them.' },
  { icon: RiLeafLine,      title: 'Sustainability', desc: 'We educate students to be responsible citizens of the earth.' },
]

/**
 * About page — School story, mission, values, principal's message, and timeline.
 */
export default function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">

      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="about-page-heading">
        <div className="container">
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="about-page-heading"
          >
            About Pavna School
          </motion.h1>
          <p className="page-hero__breadcrumb">
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span aria-hidden="true"> / </span>
            About Us
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" aria-labelledby="mission-heading">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scrollReveal}
          >
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title" id="mission-heading">
              Mission, Vision & <span className="text-gold">Values</span>
            </h2>
            <div className="divider divider--center" />
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-16)',
          }}>
            {[
              {
                icon: RiBookOpenLine,
                title: 'Our Mission',
                text: 'To provide every child with a transformative education that combines academic rigour with ethical values, creativity, and a global outlook.',
                bg: 'var(--gradient-primary)',
                light: true,
              },
              {
                icon: RiLightbulbLine,
                title: 'Our Vision',
                text: 'To be Aligarh\'s most respected educational institution — a place where every student discovers their potential and graduates ready to lead.',
                bg: 'var(--gradient-gold)',
                light: false,
              },
            ].map(({ icon: Icon, title, text, bg, light }) => (
              <motion.div
                key={title}
                style={{
                  background: bg,
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-10)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-lg)',
                }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scrollReveal}
              >
                <Icon size={32} color={light ? 'white' : 'var(--color-primary-dark)'} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--fw-bold)',
                  color: light ? 'white' : 'var(--color-primary-dark)',
                }}>
                  {title}
                </h3>
                <p style={{
                  color: light ? 'rgba(255,255,255,0.80)' : 'rgba(10,36,99,0.75)',
                  lineHeight: 'var(--lh-relaxed)',
                }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-5)',
          }}>
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="card"
                style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-lg)' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-relaxed)' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="section" style={{ background: 'var(--color-surface-alt)' }} aria-labelledby="principal-heading">
        <div className="container">
          <motion.div
            style={{
              background: 'var(--gradient-dark)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-12)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'var(--space-10)',
              alignItems: 'start',
            }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scrollReveal}
          >
            {/* Avatar */}
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'var(--gradient-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'var(--shadow-gold)',
            }}>
              <RiUserStarLine size={52} color="var(--color-primary-dark)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <span className="section-label section-label--gold">Principal's Message</span>
              <h2 id="principal-heading" style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--fw-bold)', color: 'white',
              }}>
                A Word From Our Principal
              </h2>
              <blockquote style={{
                fontStyle: 'italic', fontSize: 'var(--text-lg)',
                color: 'rgba(255,255,255,0.75)', lineHeight: 'var(--lh-relaxed)',
                borderLeft: '3px solid var(--color-gold)', paddingLeft: 'var(--space-5)',
              }}>
                "At Pavna School, we believe every child is gifted. Our role is to discover
                that gift and nurture it through an environment of care, challenge, and
                celebration. We are not just building students — we are building leaders,
                thinkers, and compassionate human beings."
              </blockquote>
              <p style={{ color: 'white', fontWeight: 'var(--fw-semibold)' }}>
                Dr. Anita Sharma, M.Ed., Ph.D.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>
                Principal, Pavna CBSE School · 18 years of educational leadership
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* School Timeline */}
      <section className="section" aria-labelledby="timeline-heading">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scrollReveal}
          >
            <span className="section-label">Our Journey</span>
            <h2 className="section-title" id="timeline-heading">
              25 Years of <span className="text-gold">Milestones</span>
            </h2>
            <div className="divider divider--center" />
          </motion.div>

          <div style={{ position: 'relative', maxWidth: 700, margin: 'auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 90, top: 0, bottom: 0,
              width: 2, background: 'var(--color-border)',
            }} aria-hidden="true" />

            {TIMELINE.map(({ year, event }, i) => (
              <motion.div
                key={year}
                style={{
                  display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)',
                  alignItems: 'flex-start', position: 'relative',
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {/* Year */}
                <div style={{
                  minWidth: 80, textAlign: 'right',
                  fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)',
                  color: 'var(--color-primary)', fontSize: 'var(--text-sm)',
                  paddingTop: 4,
                }}>
                  {year}
                </div>

                {/* Dot */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--gradient-gold)',
                  border: '3px solid white',
                  boxShadow: '0 0 0 3px var(--color-primary-light)',
                  flexShrink: 0, marginTop: 4,
                }} aria-hidden="true" />

                {/* Event */}
                <p style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--lh-relaxed)',
                  paddingTop: 2,
                }}>
                  {event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-surface-alt)', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scrollReveal}
          >
            <h2 className="section-title">Ready to Join the Pavna Family?</h2>
            <p className="section-subtitle" style={{ margin: 'var(--space-4) auto var(--space-8)', display: 'block' }}>
              Explore our admission process and secure your child's future today.
            </p>
            <Link to="/admissions" className="btn btn-primary btn-lg">
              View Admissions
              <RiArrowRightLine />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
