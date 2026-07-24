import { Link } from 'react-router-dom'
import {
  RiGraduationCapLine,
  RiArrowRightSLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiTwitterXLine,
} from 'react-icons/ri'
import styles from './Footer.module.css'

const QUICK_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About Us' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/contact',    label: 'Contact Us' },
]

const PROGRAMMES = [
  { to: '/admissions', label: 'Pre-Primary (Nursery–KG)' },
  { to: '/admissions', label: 'Primary (Class I–V)' },
  { to: '/admissions', label: 'Middle School (VI–VIII)' },
  { to: '/admissions', label: 'Secondary (IX–X)' },
  { to: '/admissions', label: 'Senior Secondary (XI–XII)' },
]

const CONTACT = [
  {
    icon: RiMapPin2Line,
    text: '123, Civil Lines, Near Collectorate, Aligarh, Uttar Pradesh — 202001',
  },
  { icon: RiPhoneLine, text: '+91 98765 43210' },
  { icon: RiMailLine,  text: 'admissions@pavnaschool.edu.in' },
  { icon: RiTimeLine,  text: 'Mon – Sat: 8:00 AM – 4:00 PM' },
]

const SOCIAL = [
  { icon: RiFacebookCircleLine, href: '#', label: 'Facebook' },
  { icon: RiInstagramLine,      href: '#', label: 'Instagram' },
  { icon: RiYoutubeLine,        href: '#', label: 'YouTube' },
  { icon: RiTwitterXLine,       href: '#', label: 'X (Twitter)' },
]

/**
 * Footer — 4-column layout: Brand | Quick Links | Programmes | Contact.
 *
 * Uses semantic <footer> with aria-label. Social links have descriptive
 * aria-labels. The bottom bar includes copyright and policy links.
 * The gold top border line is a pure CSS ::before pseudo-element.
 */
export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className="container">
        <div className={styles.grid}>

          {/* ── Column 1: Brand ── */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Pavna School — Home">
              <div className={styles.logo__crest} aria-hidden="true">
                <RiGraduationCapLine size={22} color="#0A2463" />
              </div>
              <div>
                <div className={styles.logo__name}>Pavna School</div>
                <div className={styles.logo__tagline}>CBSE · Aligarh, UP</div>
              </div>
            </Link>

            <div className={styles.cbse__badge || ''}>
              <span className={styles['cbse-badge']}>
                ✓ CBSE Affiliated · Reg. No. 2130165
              </span>
            </div>

            <p className={styles.brand__desc}>
              Nurturing bright minds since 2000. A premier CBSE institution in Aligarh
              committed to academic excellence, character, and holistic student development.
            </p>

            <div className={styles.social} aria-label="Social media links">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.social__link}
                  aria-label={`Follow us on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className={styles.column}>
            <h3 className={styles.column__title}>Quick Links</h3>
            <nav className={styles.column__links} aria-label="Footer quick links">
              {QUICK_LINKS.map(({ to, label }) => (
                <Link key={to + label} to={to} className={styles.column__link}>
                  <RiArrowRightSLine size={14} aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Programmes ── */}
          <div className={styles.column}>
            <h3 className={styles.column__title}>Programmes</h3>
            <nav className={styles.column__links} aria-label="Academic programmes">
              {PROGRAMMES.map(({ to, label }) => (
                <Link key={label} to={to} className={styles.column__link}>
                  <RiArrowRightSLine size={14} aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 4: Contact ── */}
          <div className={styles.column}>
            <h3 className={styles.column__title}>Contact Us</h3>
            <address className={styles.column__links} style={{ fontStyle: 'normal' }}>
              {CONTACT.map(({ icon: Icon, text }) => (
                <div key={text} className={styles['contact-item']}>
                  <Icon
                    size={16}
                    className={styles['contact-item__icon']}
                    aria-hidden="true"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <p className={styles.bottom__copy}>
            © {new Date().getFullYear()} Pavna CBSE School, Aligarh. All rights reserved.
          </p>
          <nav className={styles.bottom__links} aria-label="Legal links">
            <a href="#" className={styles.bottom__link}>Privacy Policy</a>
            <a href="#" className={styles.bottom__link}>Terms of Use</a>
            <a href="#" className={styles.bottom__link}>Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
