import { useEffect, useState } from 'react'
import { APPBARBER_URL } from './data'
import './navbar.css'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#pacotes', label: 'Pacotes' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#top" className="navbar__brand">
          <span className="navbar__pole" aria-hidden="true" />
          BP <span>Barbearia Prime</span>
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={APPBARBER_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-solid navbar__cta"
        >
          Agendar horário
        </a>

        <button
          className="navbar__burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="navbar__links navbar__links--mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={APPBARBER_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid"
          >
            Agendar horário
          </a>
        </nav>
      )}

      <span className="navbar__progress" style={{ width: `${progress}%` }} />
    </header>
  )
}
