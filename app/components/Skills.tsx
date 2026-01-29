"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    description: "Building beautiful, responsive interfaces",
    skills: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Next.js", icon: "▲", color: "#ffffff" },
      { name: "TypeScript", icon: "TS", color: "#3178C6" },
      { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
      { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
      { name: "GSAP", icon: "●", color: "#88CE02" },
    ],
  },
  {
    title: "BACKEND",
    description: "Scalable server-side solutions",
    skills: [
      { name: "Node.js", icon: "⬢", color: "#339933" },
      { name: "Express", icon: "Ex", color: "#ffffff" },
      
      { name: "REST API", icon: "{ }", color: "#06B6D4" },
      { name: "GraphQL", icon: "◈", color: "#E10098" },
      
    ],
  },
  {
    title: "DATABASE",
    description: "Data storage & management",
    skills: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "PostgreSQL", icon: "🐘", color: "#4169E1" },
      { name: "MySQL", icon: "🐬", color: "#4479A1" },
     
      { name: "Firebase", icon: "🔥", color: "#FFCA28" },
    ],
  },
  {
    title: "TOOLS",
    description: "Development & deployment",
    skills: [
      { name: "Git", icon: "⎇", color: "#F05032" },
      
      { name: "Linux", icon: "🐧", color: "#FCC624" },
      { name: "Figma", icon: "◐", color: "#F24E1E" },
      { name: "VS Code", icon: "◆", color: "#007ACC" },
    ],
  },
];

const MagneticSkillTag = ({
  skill,
}: {
  skill: Skill;
}) => {
  const tagRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tagRef.current) return;
    const rect = tagRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(tagRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!tagRef.current) return;
    gsap.to(tagRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={tagRef}
      className="magnetic-skill-tag"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--skill-color": skill.color } as React.CSSProperties}
    >
      <span className="skill-tag-icon">{skill.icon}</span>
      <span className="skill-tag-name">{skill.name}</span>
    </div>
  );
};

const BentoCard = ({
  category,
  index,
  isLarge,
}: {
  category: SkillCategory;
  index: number;
  isLarge: boolean;
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
      className={`bento-card ${isLarge ? "bento-card-large" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className="bento-glow" />
      <div className="bento-content">
        <div className="bento-header">
          <span className="bento-number">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="bento-title">{category.title}</h3>
        </div>
        <p className="bento-description">{category.description}</p>
        <div className="bento-skills">
          {category.skills.map((skill) => (
            <MagneticSkillTag key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
      <div className="bento-border" />
    </div>
  );
};

const OrbitingSkill = ({ skill, index, total }: { skill: string; index: number; total: number }) => {
  const skillRef = useRef<HTMLDivElement>(null);
  const angle = (index / total) * 360;
  const radius = 140;

  useEffect(() => {
    const el = skillRef.current;
    if (!el) return;

    // Set initial position
    gsap.set(el, {
      rotation: -angle,
    });

    // Continuous orbit animation
    gsap.to(el.parentElement, {
      rotation: "+=360",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, [angle]);

  return (
    <div
      ref={skillRef}
      className="orbiting-skill"
      style={{
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      }}
    >
      <span>{skill}</span>
    </div>
  );
};

const orbitSkills = ["CREATIVE", "INNOVATIVE", "DEDICATED", "CURIOUS", "ADAPTABLE", "FOCUSED"];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const orbitContainer = orbitContainerRef.current;

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

    // Orbit animation
    if (orbitContainer) {
      gsap.to(orbitContainer, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="skills-section-v2" id="skills">
      {/* Gradient Orbs Background */}
      <div className="skills-orb skills-orb-1" />
      <div className="skills-orb skills-orb-2" />
      <div className="skills-orb skills-orb-3" />

      <div className="skills-container-v2">
        {/* Section Header */}
        <div ref={headerRef} className="skills-header-v2">
          <span className="skills-label-v2">WHAT I WORK WITH</span>
          <h2 className="skills-title-v2">
            MY <span className="text-accent">TOOLKIT</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {skillCategories.map((category, index) => (
            <BentoCard
              key={category.title}
              category={category}
              index={index}
              isLarge={index === 0 || index === 3}
            />
          ))}

          {/* Center Orbit Card */}
          <div className="bento-orbit-card">
            <div className="orbit-wrapper">
              <div ref={orbitContainerRef} className="orbit-container">
                {orbitSkills.map((skill, index) => (
                  <OrbitingSkill
                    key={skill}
                    skill={skill}
                    index={index}
                    total={orbitSkills.length}
                  />
                ))}
              </div>
              <div className="orbit-center">
                <span className="orbit-text">SOFT</span>
                <span className="orbit-text-accent">SKILLS</span>
              </div>
              <div className="orbit-ring" />
              <div className="orbit-ring orbit-ring-2" />
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="skills-tagline">
          <span className="tagline-line" />
          <p className="tagline-text">
            ALWAYS LEARNING • ALWAYS GROWING • ALWAYS BUILDING
          </p>
          <span className="tagline-line" />
        </div>
      </div>
    </section>
  );
}
