import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiMapPin2Line,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
  RiSendPlaneLine,
  RiCheckLine,
} from 'react-icons/ri'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in:      { opacity: 1, y: 0, transition: { duration: 0.45 } },
  out:     { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const INFO_CARDS = [
  {
    icon: RiMapPin2Line,
    title: 'Our Address',
    lines: ['123, Civil Lines,', 'Near Collectorate,', 'Aligarh, UP – 202001'],
    bg: 'var(--gradient-primary)',
  },
  {
    icon: RiPhoneLine,
    title: 'Phone & WhatsApp',
    lines: ['+91 98765 43210', '+91 87654 32109', '(Mon–Sat: 8 AM – 4 PM)'],
    bg: 'linear-gradient(135deg, #E8B84B 0%, #C49A2E 100%)',
    dark: true,
  },
  {
    icon: RiMailLine,
    title: 'Email Us',
    lines: ['admissions@pavnaschool.edu.in', 'principal@pavnaschool.edu.in'],
    bg: 'var(--gradient-primary)',
  },
  {
    icon: RiTimeLine,
    title: 'School Hours',
    lines: ['Monday – Friday: 7:30 AM – 2:30 PM', 'Saturday: 7:30 AM – 12:30 PM', 'Sunday & Public Holidays: Closed'],
    bg: 'linear-gradient(135deg, #061540 0%, #0A2463 100%)',
  },
]

const INIT = { name: '', email: '', phone: '', subject: '', message: '' }

/**
 * Contact page — Info cards, contact form with validation, and map placeholder.
 *
 * Form uses controlled inputs with simple required validation.
 * On submit, a success state is shown (no real API — ready to wire up).
 */
export default function Contact() {
  const [form, setForm]       = useState(INIT)
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                              e.email   = 'Valid email is required'
    if (!form.phone.trim() || form.phone.trim().length < 10)
                              e.phone   = 'Valid phone number is required'
    if (!form.subject.trim()) e.subject = 'Please enter a subject'
    if (!form.message.trim()) e.message = 'Please enter your message'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e_ = validate()
    if (Object.keys(e_).length) { setErrors(e_); return }

    setLoading(true)
    // Simulated API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
    setForm(INIT)
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${errors[field] ? '#EF4444' : 'var(--color-border)'}`,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: 'white',
  })

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">

      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="contact-page-heading">
        <div className="container">
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="contact-page-heading"
          >
            Contact Us
          </motion.h1>
          <p className="page-hero__breadcrumb">
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span aria-hidden="true"> / </span>Contact
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section" aria-labelledby="contact-info-heading">
        <div className="container">
          <h2 className="sr-only" id="contact-info-heading">Contact information</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-16)',
          }}>
            {INFO_CARDS.map(({ icon: Icon, title, lines, bg, dark }, i) => (
              <motion.div
                key={title}
                style={{
                  background: bg, borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-7)', display: 'flex',
                  flexDirection: 'column', gap: 'var(--space-3)',
                  boxShadow: 'var(--shadow-md)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: dark ? 'var(--color-primary-dark)' : 'white',
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)',
                  fontSize: 'var(--text-base)',
                  color: dark ? 'var(--color-primary-dark)' : 'white',
                }}>
                  {title}
                </h3>
                {lines.map((l, j) => (
                  <p key={j} style={{
                    fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-snug)',
                    color: dark ? 'rgba(10,36,99,0.75)' : 'rgba(255,255,255,0.75)',
                  }}>
                    {l}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Two-column: Form + Map */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-10)',
            alignItems: 'start',
          }}>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--fw-extrabold)', marginBottom: 'var(--space-2)',
              }}>
                Send Us a <span className="text-gold">Message</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
                Fill the form and our team will respond within one working day.
              </p>

              {submitted ? (
                <div style={{
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)',
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#10B981',
                  }}>
                    <RiCheckLine size={30} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 'var(--fw-bold)' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                    {[
                      { name: 'name',  label: 'Full Name',    type: 'text',  placeholder: 'Rajesh Kumar' },
                      { name: 'phone', label: 'Phone Number', type: 'tel',   placeholder: '+91 98765 43210' },
                    ].map(({ name, label, type, placeholder }) => (
                      <div key={name}>
                        <label htmlFor={name} style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-text-secondary)' }}>
                          {label} *
                        </label>
                        <input
                          id={name} name={name} type={type}
                          placeholder={placeholder}
                          value={form[name]}
                          onChange={handleChange}
                          style={inputStyle(name)}
                          aria-describedby={errors[name] ? `${name}-error` : undefined}
                          aria-invalid={!!errors[name]}
                        />
                        {errors[name] && <p id={`${name}-error`} style={{ color: '#EF4444', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }} role="alert">{errors[name]}</p>}
                      </div>
                    ))}
                  </div>

                  {[
                    { name: 'email',   label: 'Email Address', type: 'email', placeholder: 'rajesh@example.com' },
                    { name: 'subject', label: 'Subject',       type: 'text',  placeholder: 'Admission Enquiry for Class V' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label htmlFor={name} style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-text-secondary)' }}>
                        {label} *
                      </label>
                      <input
                        id={name} name={name} type={type}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={handleChange}
                        style={inputStyle(name)}
                        aria-describedby={errors[name] ? `${name}-error` : undefined}
                        aria-invalid={!!errors[name]}
                      />
                      {errors[name] && <p id={`${name}-error`} style={{ color: '#EF4444', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }} role="alert">{errors[name]}</p>}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-text-secondary)' }}>
                      Message *
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle('message'), resize: 'vertical' }}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p id="message-error" style={{ color: '#EF4444', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }} role="alert">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                    aria-busy={loading}
                    style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.75 : 1 }}
                  >
                    {loading ? 'Sending…' : (
                      <>Send Message <RiSendPlaneLine aria-hidden="true" /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--fw-extrabold)', marginBottom: 'var(--space-8)',
              }}>
                Find <span className="text-gold">Us Here</span>
              </h2>

              {/* Map embed (replace src with real embed URL) */}
              <div style={{
                borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)', aspectRatio: '4/3',
                background: 'var(--gradient-primary)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-3)', color: 'rgba(255,255,255,0.40)',
              }}>
                <RiMapPin2Line size={48} />
                <p style={{ fontSize: 'var(--text-sm)', textAlign: 'center', padding: '0 var(--space-6)' }}>
                  Google Maps embed will appear here.
                  <br />
                  Replace with an &lt;iframe&gt; from Google Maps.
                </p>
              </div>

              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
                📍 123, Civil Lines, Near Collectorate, Aligarh, Uttar Pradesh — 202001
                <br />
                Easily accessible from NH-19 and Aligarh Railway Station.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
