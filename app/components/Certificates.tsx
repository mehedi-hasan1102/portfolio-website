"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    id: 1,
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    date: "2025",
    credentialId: "AWS-DEV-XXXXX",
   
    icon: "🌐",
    color: "#FF6A00",
    image: "/assets/images/certificates/ph.jpg",
  },
  



  {
    id: 2,
    title: "Voluntary Blood Donation Program",
    issuer: "Quantum Foundation",
    date: "2022",
    credentialId: "META-FE-XXXXX",
    color: "#0668E1",
    icon: "🩸 ",
    image: "/assets/images/certificates/blood.jpg",
  }
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

  const openLightbox = (image: string, title: string) => {
    setActiveImage(image);
    setActiveTitle(title);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardElements = cards.querySelectorAll(".cert-card");
    
    gsap.fromTo(
      cardElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
        },
      }
    );

    cardElements.forEach((card) => {
      const cardEl = card as HTMLElement;
      
      cardEl.addEventListener("mouseenter", () => {
        gsap.to(cardEl, { y: -10, duration: 0.3, ease: "power2.out" });
      });

      cardEl.addEventListener("mouseleave", () => {
        gsap.to(cardEl, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    // Close lightbox on escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} id="certificates" className="cert-section">
        <div className="cert-container">
          {/* Header */}
          <div className="cert-header">
            <span className="cert-tag">ACHIEVEMENTS</span>
            <h2 className="cert-heading">CERTIFICATES</h2>
            <p className="cert-desc">
              Professional certifications that validate my expertise
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={cardsRef} className="cert-cards">
            {certificates.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div 
                  className="cert-accent-line"
                  style={{ background: cert.color }}
                />
                
                {/* Certificate Image Preview */}
                <div 
                  className="cert-image-preview"
                  onClick={() => openLightbox(cert.image, cert.title)}
                >
                  <div className="cert-image-placeholder">
                    <span className="cert-placeholder-icon">{cert.icon}</span>
                    <span className="cert-placeholder-text">Click to view</span>
                  </div>
                  <div className="cert-image-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-issuer">{cert.issuer}</p>
                
                {/* Meta */}
                <div className="cert-card-meta">
                  <span className="cert-card-date">📅 {cert.date}</span>
                  <span className="cert-card-id">{cert.credentialId}</span>
                </div>

                {/* Button */}
                <a href="#" className="cert-card-btn">
                  Verify →
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          {/* <div className="cert-footer">
            <a href="#" className="cert-all-btn">
              <span>VIEW ALL CREDENTIALS</span>
              <span>→</span>
            </a>
          </div> */}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && activeImage && (
        <div className="cert-lightbox" onClick={closeLightbox}>
          <button className="cert-lightbox-close" onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-image">
              <Image
                src={activeImage}
                alt={activeTitle}
                fill
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.5);">
                      <span style="font-size:4rem;margin-bottom:1rem;">📜</span>
                      <span>Certificate image not found</span>
                      <span style="font-size:0.8rem;margin-top:0.5rem;opacity:0.6;">Add image to: ${activeImage}</span>
                    </div>
                  `;
                }}
              />
            </div>
            <h3 className="cert-lightbox-title">{activeTitle}</h3>
          </div>
        </div>
      )}
    </>
  );
}
