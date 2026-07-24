import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiCheckLine,
  RiDownloadLine,
  RiAddLine,
  RiSubtractLine,
  RiPhoneLine,
} from 'react-icons/ri'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in:      { opacity: 1, y: 0, transition: { duration: 0.45 } },
  out:     { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const STEPS = [
  { num: '01', title: 'Fill Online Form', desc: 'Complete the online registration form with student and parent details. Takes less than 5 minutes.' },
  { num: '02', title: 'Document Submission', desc: 'Submit required documents: Birth Certificate, previous school TC, Aadhaar, and passport photos.' },
  { num: '03', title: 'Entrance Assessment', desc: 'Students appearing for Classes II–XII appear for a brief assessment (English, Maths, and GK).' },
  { num: '04', title: 'Interaction & Counselling', desc: 'An informal interaction with the Principal and academic counsellor for the parent and student.' },
  { num: '05', title: 'Fee Payment & Enrollment', desc: 'On selection, pay the first installment of fees and receive your admission confirmation and Welcome Kit.' },
]

const FAQS = [
  {
    q: 'What are the age criteria for Nursery admission?',
    a: 'A child should be at least 3 years old as on 31st March of the year of admission to be eligible for Nursery.',
  },
  {
    q: 'Does the school offer a sibling discount?',
    a: 'Yes. A 10% discount on tuition fees is offered for the second child enrolled in Pavna School.',
  },
  {
    q: 'What documents are required for Class XI admission?',
    a: 'Class X mark sheet, Transfer Certificate from previous school, Character Certificate, Aadhaar card, and three passport-sized photographs.',
  },
  {
    q: 'Are scholarships available for meritorious students?',
    a: 'Yes. Students scoring above 95% in Class X CBSE boards are eligible for a merit scholarship for Class XI and XII fees.',
  },
  {
    q: 'Is there a hostel facility?',
    a: 'We currently do not have an in-campus hostel, but we can recommend trusted PG accommodations near the school for outstation students.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      border: `1px solid ${open ? 'rgba(10,36,99,0.15)' : 'var(--color-border-subtle)'}`,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 'var(--space-5) var(--space-6)',
          background: open ? 'rgba(10,36,99,0.03)' : 'white',
          border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)',
          fontWeight: 'var(--fw-semibold)', color: 'var(--color-text-primary)',
          transition: 'background 0.2s',
          gap: 'var(--space-4)',
        }}
        aria-expanded={open}
      >
        {q}
        {open
          ? <RiSubtractLine size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
          : <RiAddLine size={18} color="var(--color-primary-light)" style={{ flexShrink: 0 }} />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 var(--space-6) var(--space-5)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-relaxed)',
              fontSize: 'var(--text-sm)',
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Admissions page — Steps stepper, fee overview, FAQ accordion, and enquiry CTA.
 */
export default function Admissions() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">

      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="admissions-page-heading">
        <div className="container">
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="admissions-page-heading"
          >
            Admissions 2025–26
          </motion.h1>
          <p className="page-hero__breadcrumb">
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span aria-hidden="true"> / </span>
            Admissions
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <span className="section-label">How To Apply</span>
            <h2 className="section-title" id="process-heading">
              5 Simple <span className="text-gold">Steps to Enrol</span>
            </h2>
            <div className="divider divider--center" />
            <p className="section-subtitle" style={{ margin: 'auto' }}>
              Our admission process is designed to be smooth, transparent, and stress-free for families.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 760, margin: 'auto' }}>
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 'var(--space-6)',
                  alignItems: 'flex-start',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  background: 'white',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-black)',
                  fontSize: 'var(--text-xl)', color: 'white', flexShrink: 0,
                  boxShadow: 'var(--shadow-blue)',
                }}>
                  {num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section" style={{ background: 'var(--color-surface-alt)' }} aria-labelledby="fees-heading">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <span className="section-label">Fee Structure</span>
            <h2 className="section-title" id="fees-heading">Transparent <span className="text-gold">Fee Structure</span></h2>
            <div className="divider divider--center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ overflowX: 'auto' }}
          >
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              background: 'white', borderRadius: 'var(--radius-xl)',
              overflow: 'hidden', boxShadow: 'var(--shadow-md)',
            }}>
              <thead>
                <tr style={{ background: 'var(--gradient-primary)' }}>
                  {['Class', 'Admission Fee', 'Annual Fee', 'Monthly Tuition', 'Transport (Monthly)'].map((h) => (
                    <th key={h} style={{
                      padding: 'var(--space-4) var(--space-5)', textAlign: 'left',
                      color: 'white', fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--fw-semibold)', fontSize: 'var(--text-sm)',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nursery – KG',   '₹5,000',  '₹12,000', '₹2,500', '₹1,200'],
                  ['Class I – V',    '₹6,000',  '₹14,000', '₹3,000', '₹1,200'],
                  ['Class VI – VIII','₹7,000',  '₹16,000', '₹3,500', '₹1,400'],
                  ['Class IX – X',   '₹8,000',  '₹18,000', '₹4,000', '₹1,400'],
                  ['Class XI – XII', '₹10,000', '₹22,000', '₹4,500', '₹1,600'],
                ].map(([cls, adm, ann, mon, trn], i) => (
                  <tr key={cls} style={{ background: i % 2 === 0 ? 'white' : 'var(--color-surface-alt)' }}>
                    {[cls, adm, ann, mon, trn].map((cell, j) => (
                      <td key={j} style={{
                        padding: 'var(--space-4) var(--space-5)',
                        fontSize: 'var(--text-sm)',
                        color: j === 0 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontWeight: j === 0 ? 'var(--fw-semibold)' : 'var(--fw-regular)',
                        borderBottom: '1px solid var(--color-border-subtle)',
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p style={{
            marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)', textAlign: 'center',
          }}>
            * Fees are indicative and subject to revision. Please contact admissions for the latest fee schedule.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            <a href="#" className="btn btn-outline" download aria-label="Download fee brochure PDF">
              <RiDownloadLine aria-hidden="true" />
              Download Brochure (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <span className="section-label">FAQ</span>
            <h2 className="section-title" id="faq-heading">Frequently Asked <span className="text-gold">Questions</span></h2>
            <div className="divider divider--center" />
          </motion.div>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
            maxWidth: 760, margin: 'auto',
          }}>
            {FAQS.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="section" style={{ background: 'var(--gradient-dark)', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <span className="section-label section-label--gold">Get In Touch</span>
            <h2 className="section-title section-title--white">
              Still Have Questions? <span className="text-gold">Talk to Us.</span>
            </h2>
            <p className="section-subtitle section-subtitle--white" style={{ textAlign: 'center' }}>
              Our admissions counsellors are available Mon–Sat, 9 AM to 4 PM.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Send an Enquiry
                <RiArrowRightLine />
              </Link>
              <a href="tel:+919876543210" className="btn btn-secondary btn-lg">
                <RiPhoneLine />
                Call Admissions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
