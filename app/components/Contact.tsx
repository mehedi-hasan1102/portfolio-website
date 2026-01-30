"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const socialLinks = [
//   { name: "GH", fullName: "GITHUB", url: "https://github.com" },
//   { name: "LI", fullName: "LINKEDIN", url: "https://linkedin.com" },
//   { name: "TW", fullName: "TWITTER", url: "https://twitter.com" },
//   { name: "IG", fullName: "INSTAGRAM", url: "https://instagram.com" },
// ];

const socialLinks = [
  { name: "GH", fullName: "GitHub", url: "https://github.com/mehedi-hasan1102" },
  { name: "DEV", fullName: "Dev.to", url: "https://dev.to/mehedihasan1102" },
  { name: "X", fullName: "TWITTER", url: "https://x.com/mehedihasan1102" },
  { name: "LI", fullName: "LinkedIn", url: "https://www.linkedin.com/in/mehedi-hasan1102/" },
 
];


export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const emailContainer = emailContainerRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !emailContainer || !cta) return;

    // Split text animation for title
    const chars = title.querySelectorAll(".char");
    gsap.set(chars, { y: 100, opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
        });
      },
    });

    // Email reveal
    gsap.set(emailContainer, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: emailContainer,
      start: "top 85%",
      onEnter: () => {
        gsap.to(emailContainer, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    // CTA reveal
    gsap.set(cta.children, { y: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: cta,
      start: "top 85%",
      onEnter: () => {
        gsap.to(cta.children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });

    // Custom cursor follow
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleEmailHover = (isHovering: boolean) => {
    setCursorActive(isHovering);
    setCursorText(isHovering ? "SEND" : "");
  };

  const titleText = "LET'S TALK";

  return (
    <section ref={sectionRef} className="contact-v2" id="contact">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`contact-cursor ${cursorActive ? "active" : ""}`}
      >
        <span>{cursorText}</span>
      </div>

      {/* Background Elements */}
      <div className="contact-v2-bg">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-noise" />
      </div>

      <div className="contact-v2-container">
        {/* Eyebrow */}
        <div className="contact-v2-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">CONTACT</span>
          <span className="eyebrow-line" />
        </div>

        {/* Main Title */}
        <h2 ref={titleRef} className="contact-v2-title">
          {titleText.split("").map((char, i) => (
            <span key={i} className="char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        {/* Email Section */}
        <div
          ref={emailContainerRef}
          className="contact-v2-email"
          onMouseEnter={() => handleEmailHover(true)}
          onMouseLeave={() => handleEmailHover(false)}
        >
          <a href="mailto:mehedi.hasan11023@gmail.com" className="email-giant">
            <span className="email-text">mehedi.hasan11023@gmail.com</span>
            <span className="email-underline" />
          </a>
        </div>

        {/* CTA Grid */}
        <div ref={ctaRef} className="contact-v2-cta">
          {/* Social Links */}
          <div className="cta-socials">
            <span className="cta-label">SOCIALS</span>
            <div className="social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                >
                  <span className="social-abbr">{social.name}</span>
                  <span className="social-full">{social.fullName}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="cta-location">
            <span className="cta-label">LOCATION</span>
            <div className="location-info">
              <span className="location-city">DHAKA</span>
              <span className="location-country">BANGLADESH</span>
            </div>
          </div>

          {/* Availability */}
          <div className="cta-availability">
            <span className="cta-label">AVAILABILITY</span>
            <div className="availability-status">
              <span className="status-indicator" />
              <span className="status-text">OPEN FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>

        {/* Large CTA Button */}
        <a href="/resume.pdf" className="contact-v2-resume">
          <span className="resume-text">DOWNLOAD CV</span>
          <span className="resume-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4V20M12 20L6 14M12 20L18 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer className="contact-v2-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-name">MEHEDI HASAN</span>
          </div>
          <div className="footer-center">
            <span className="footer-copyright">
              © {new Date().getFullYear()} — ALL RIGHTS RESERVED
            </span>
          </div>
          <div className="footer-right">
            <span className="footer-credit">DESIGNED & BUILT WITH NEXT.JS</span>
          </div>
        </div>

        {/* Big Text Footer */}
        <div className="footer-big-text">
          <span className="big-text-scroll">
            CREATIVE DEVELOPER • OPEN TO WORK • LET&apos;S BUILD TOGETHER •
            CREATIVE DEVELOPER • OPEN TO WORK • LET&apos;S BUILD TOGETHER •
          
          </span>
        </div>
      </footer>
    </section>
  );
}
