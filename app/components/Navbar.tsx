"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "ABOUT" },
    { href: "#skills", label: "SKILLS" },
  { href: "#work", label: "WORK" },

 
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Detect active section
      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[index].href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Main Navbar - hidden when scrolled */}
      <header className={`navbar-minimal ${scrolled ? "hidden" : ""}`}>
        {/* Logo */}
        <Link href="/" className="nav-logo-minimal">
          <span className="logo-char">Mehedi</span>
          <span className="logo-char">Hasan</span>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links-minimal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link-minimal ${
                activeSection === link.href ? "active" : ""
              }`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              <span className="link-dot" />
              <span className="link-text">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" className="nav-cta-minimal" onClick={(e) => handleLinkClick(e, "#contact")}>
          <span className="cta-text-minimal">LET&apos;S TALK</span>
          <span className="cta-icon-minimal">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 15L15 1M15 1H5M15 1V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </header>

      {/* Floating Pill - visible when scrolled */}
      <div className={`nav-floating-pill ${scrolled ? "visible" : ""}`}>
        <Link href="/" className="pill-logo">
          Mehedi Hasan
        </Link>
        <div className="pill-divider" />
        <div className="pill-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`pill-link ${
                activeSection === link.href ? "active" : ""
              }`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="pill-divider" />
        <a href="#contact" className="pill-cta" onClick={(e) => handleLinkClick(e, "#contact")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 15L15 1M15 1H5M15 1V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
