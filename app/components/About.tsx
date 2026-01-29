"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "GSAP",
  "Git & GitHub",
];


const stats = [
  { number: "2+", label: "YEARS OF CODING PRACTICE" },
  { number: "20+", label: "PROJECTS BUILT" },
  { number: "10+", label: "TECHNOLOGIES USED" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const curve = curveRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const tech = techRef.current;
    const statsEl = statsRef.current;

    if (!section || !curve || !content || !image || !text || !tech || !statsEl)
      return;

    // Initial states
    gsap.set(curve, {
      attr: { d: "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z" },
    });
    gsap.set(content, { opacity: 0 });
    gsap.set(image, { scale: 1.3, opacity: 0 });
    gsap.set(text.children, { y: 60, opacity: 0 });
    gsap.set(tech.children, { y: 40, opacity: 0 });
    gsap.set(statsEl.children, { y: 40, opacity: 0 });

    // Curve swipe animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Curve reveal animation
    tl.to(
      curve,
      {
        attr: { d: "M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z" },
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    // Content reveal timeline (after curve)
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
        end: "top 0%",
        scrub: 1,
      },
    });

    contentTl
      .to(content, { opacity: 1, duration: 0.3 }, 0)
      .to(image, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)
      .to(
        text.children,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.1
      )
      .to(
        tech.children,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.3
      )
      .to(
        statsEl.children,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.4
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      {/* Curve SVG Overlay */}
      <svg
        className="about-curve"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={curveRef}
          d="M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z"
          fill="#111"
        />
      </svg>

      {/* About Content */}
      <div ref={contentRef} className="about-content">
        <div className="about-grid">
          {/* Left Side - Image */}
          <div ref={imageRef} className="about-image-wrapper">
            <div className="about-image-container">
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                className="about-image"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="image-border" />
          </div>

          {/* Right Side - Text Content */}
          <div className="about-text-content">
            <div ref={textRef} className="about-text">
              <span className="about-label">ABOUT ME</span>
              <h2 className="about-title">
                MEHEDI <span className="text-accent">HASAN</span>
              </h2>
              <p className="about-description">
                I&apos;m a passionate{" "}
                <span className="highlight">Full-Stack Developer</span> from{" "}
                <span className="highlight">Bangladesh</span> with over 2 years
                of hands-on programming experience. I specialize in building
                high-performance web applications with clean, maintainable code
                and exceptional user experiences.
              </p>
              <p className="about-description-secondary">
                I&apos;m actively seeking a full-time developer role where I can
                contribute to innovative projects, collaborate with talented
                teams, and continue growing as an engineer. I thrive in
                fast-paced environments and love solving complex problems.
              </p>
            </div>

            {/* Technologies */}
            <div className="about-tech">
              <h3 className="tech-title">TECHNOLOGIES I USE</h3>
              <div ref={techRef} className="tech-grid">
                {technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="about-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
