"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
}

const experiences: ExperienceItem[] = [
  {
  id: 1,
  type: "work",
  title: "Junior Web Developer (Self-Taught)",
  company: "Independent Projects",
  location: "Remote",
  period: "2024 - Present",
  description:
    "Building full-stack web applications with a focus on clean code, performance, and modern web technologies.",
  achievements: [
    "Developed full-stack applications using React, Next.js, Node.js, and MongoDB",
    "Implemented RESTful APIs and connected frontend with backend services",
    "Optimized application performance and maintained code quality",
  ],
  tech: ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "REST APIs", "Tailwind CSS"],
}
,
  
 {
  "id": 2,
  "type": "education",
  "title": "Complete Web Development Course",
  "company": "Programming Hero",
  "location": "Dhaka, Bangladesh",
  "period": "6 months",
  "description": "Completed an intensive 6-month web development course, gaining practical skills in programming, front-end and back-end development, and project implementation.",
  "achievements": [
    "Built multiple web projects during the course",
    "Learned programming languages such as HTML, CSS, JavaScript, and basic backend technologies",
    "Enhanced problem-solving, logical thinking, and teamwork skills"
  ]
}
,
  {
  id: 3,
  type: "education",
  title: "Bachelor in Physics",
  company: "National University",
  location: "Dhaka, Bangladesh",
  period: "Expected 2026",
  description: "Completed a Bachelor's degree in Physics, gaining strong analytical thinking, problem-solving, and research skills.",
  achievements: [
    "Graduated with honors",
    "Actively participated in university projects and research",
    "Developed strong teamwork and critical thinking skills",
  ],
}

];

const TimelineItem = ({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const content = contentRef.current;

    if (!el || !line || !dot || !content) return;

    // Initial states
    gsap.set(line, { scaleY: 0 });
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(content, { opacity: 0, x: index % 2 === 0 ? -50 : 50 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(line, {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.out",
        })
          .to(
            dot,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
            },
            "-=0.3"
          )
          .to(
            content,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.2"
          );
      },
    });
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
    >
      {/* Timeline Line & Dot */}
      <div className="timeline-marker">
        <div ref={lineRef} className="timeline-line" />
        <div ref={dotRef} className="timeline-dot">
          <span className="dot-inner" />
          <span className="dot-pulse" />
        </div>
      </div>

      {/* Content Card */}
      <div ref={contentRef} className="timeline-content">
        <div className="timeline-card">
          {/* Card Header */}
          <div className="card-header">
            <span className={`card-type ${item.type}`}>
              {item.type === "work" ? "💼 WORK" : "🎓 EDUCATION"}
            </span>
            <span className="card-period">{item.period}</span>
          </div>

          {/* Card Body */}
          <h3 className="card-title">{item.title}</h3>
          <div className="card-company">
            <span className="company-name">{item.company}</span>
            <span className="company-divider">•</span>
            <span className="company-location">{item.location}</span>
          </div>

          <p className="card-description">{item.description}</p>

          {/* Achievements */}
          <ul className="card-achievements">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="achievement-item">
                <span className="achievement-arrow">→</span>
                {achievement}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          {item.tech && (
            <div className="card-tech">
              {item.tech.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Card Number */}
          <span className="card-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;

    if (!header) return;

    // Header animation
    gsap.set(header.children, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    // Progress line animation
    if (progress && timeline) {
      gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="experience-section">
      {/* Background Elements */}
      <div className="exp-bg-gradient" />
      <div className="exp-bg-lines" />

      <div className="experience-container">
        {/* Section Header */}
        <div ref={headerRef} className="experience-header">
          <span className="experience-label">MY JOURNEY</span>
          <h2 className="experience-title">
            EXPERIENCE & <span className="text-accent">EDUCATION</span>
          </h2>
          <p className="experience-subtitle">
            A timeline of my professional growth and academic achievements
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="timeline">
          {/* Center Progress Line */}
          <div className="timeline-progress-track">
            <div ref={progressRef} className="timeline-progress-fill" />
          </div>

          {/* Timeline Items */}
          {experiences.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="experience-cta">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="download-resume-btn"
          >
            <span className="btn-icon">📄</span>
            <span className="btn-text">DOWNLOAD CV</span>
            <span className="btn-arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
