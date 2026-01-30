"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  year: string;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 80, rotateX: -15 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
        });
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="bento-card project-card"
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className="bento-glow" />
      <div className="bento-content">
        <div className="relative h-40 rounded-lg overflow-hidden mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-2 right-2 px-2 py-1 bg-accent text-black text-xs font-bold rounded">
            {project.category}
          </span>
        </div>
        <div className="bento-header">
          <span className="bento-number">{String(project.id).padStart(2, "0")}</span>
          <h3 className="bento-title project-title">{project.title}</h3>
        </div>
        <p className="bento-description project-description">{project.description}</p>
        <div className="bento-skills project-tech-container">
          {project.tech.map((tech) => (
            <a
              key={tech}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tech-tag"
            >
              {tech}
            </a>
          ))}
        </div>
        <div className="project-buttons-group">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn-primary"
          >
            <span>Live Demo</span>
            <svg className="project-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn-secondary"
          >
            <span>View Code</span>
            <svg className="project-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="bento-border" />
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    // Fetch projects from JSON
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="skills-section-v2" id="portfolio">
      {/* Gradient Orbs Background */}
      <div className="skills-orb skills-orb-1" />
      <div className="skills-orb skills-orb-2" />
      <div className="skills-orb skills-orb-3" />

      <div className="skills-container-v2">
        {/* Section Header */}
        <div ref={headerRef} className="skills-header-v2">
          <span className="skills-label-v2">Portfolio</span>
          <h2 className="skills-title-v2">
            MY <span className="text-accent">PROJECTS</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="project-filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`project-filter-btn ${
                filter === category ? "project-filter-btn-active" : "project-filter-btn-inactive"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Bottom Tagline */}
        <div className="skills-tagline">
          <span className="tagline-line" />
          <p className="tagline-text">
            BUILDING SCALABLE • CREATING EXPERIENCES • SOLVING PROBLEMS
          </p>
          <span className="tagline-line" />
        </div>

        {/* GitHub CTA Button */}
        <div className="project-github-cta">
          <a
            href="https://github.com/mehedi-hasan1102"
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-btn"
          >
            <svg className="github-btn-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="github-btn-span">MORE PROJECTS</span>
            <svg className="github-btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
