"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, Flip);

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

const projects: Project[] = [
  {
    id: 1,
    title: "Plant Care",
    category: "FULL-STACK",
    description: "Helps users manage and track plant care routines with reminders and notes.",
    image: "/assets/images/projects/plantsc.png",
    tech: ["React", "MongoDB", "Firebase", "Node.js"],
    liveUrl: "https://plant-care-tracker-bd.web.app",
    githubUrl: "https://github.com/mehedi-hasan1102/Plant-Care-Client",
    year: "2025",
  },
  {
    id: 2,
    title: "Food Tracker",
    category: "FULL-STACK",
    description: "A production-ready food management app featuring real-time synchronization, JWT authentication, and optimized performance.",
    image: "/assets/images/projects/food.png",
    tech: ["React", "Tailwind CSS", "Firebase", "Express.js"],
    liveUrl: "https://food-garden-bd.web.app",
    githubUrl: "https://github.com/mehedi-hasan1102/Food-Garden-Client",
    year: "2025",
  },
  {
    id: 3,
    title: "Duranta Online",
    category: "FULL-STACK",
    description: "Provides high-speed internet and cable services with responsive UI, support center, and admin dashboard.",
    image: "/assets/images/projects/duranta.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
    liveUrl: "https://duranta-online.vercel.app/",
    githubUrl: "https://github.com/mehedi-hasan1102/Duranta-Online-Client",
    year: "2024",
  },
  {
    id: 4,
    title: "Task Manager",
    category: "FULL-STACK",
    description: "Responsive Task Management app with real-time updates, optimized state management, and robust validation.",
    image: "/assets/images/projects/task.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Express.js", "Zod", "TanStack Query"],
    liveUrl: "https://meheditodo.vercel.app",
    githubUrl: "https://github.com/mehedi-hasan1102/task-manager-client",
    year: "2025",
  },
  {
    id: 5,
    title: "Active Arena",
    category: "FULL-STACK",
    description: "Playground management app with real-time synchronization, JWT authentication, and payment integration.",
    image: "/assets/images/projects/aarena.png",
    tech: ["React", "Stripe", "Firebase", "Tailwind CSS"],
    liveUrl: "https://buildbox-a12.web.app",
    githubUrl: "https://github.com/mehedi-hasan1102/Active-Arena-Client",
    year: "2024",
  },
  {
    id: 6,
    title: "Event Explorer",
    category: "FRONTEND",
    description: "Event booking platform where users can browse and reserve seats for local events.",
    image: "/assets/images/projects/events.png",
    tech: ["React", "Firebase", "Node.js"],
    liveUrl: "https://event-explorer-bd.netlify.app",
    githubUrl: "https://github.com/mehedi-hasan1102/Event-Explorer",
    year: "2024",
  },
  {
    id: 7,
    title: "Phudu Medical Appointment App",
    category: "FRONTEND",
    description: "Modern and responsive medical appointment booking app with smooth animations and booking system.",
    image: "/assets/images/projects/phudu.png",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://phudu-medical.netlify.app/",
    githubUrl: "https://github.com/mehedi-hasan1102/Phudu-Medical-Apoinment-App",
    year: "2024",
  },
  {
    id: 8,
    title: "Auction Gallery",
    category: "FRONTEND",
    description: "React-based auction app with real-time bid system.",
    image: "/assets/images/projects/action.png",
    tech: ["React", "Tailwind CSS", "DaisyUI"],
    liveUrl: "https://auctiongallerybd.netlify.app",
    githubUrl: "https://github.com/mehedi-hasan1102/Auction-Gallery",
    year: "2024",
  }
];



import React from "react";
import Image from "next/image";

export default function Projects() {
  gsap.registerPlugin(Flip);
  gsap.defaults({
    ease: "cubic-bezier(0.625, 0.05, 0, 1)",
    duration: 0.725,
  });
  const titles = projects.map((p) => p.title);
  const overcontent = projects.map((p) => ({
    description: p.description,
    tools: p.tech,
    img1: p.image,
    img2: p.image,
    live: p.liveUrl,
    github: p.githubUrl,
    category: p.category,
    year: p.year,
    title: p.title,
  }));
  const imgSrc = projects.map((p) => p.image);
  const [num, setNum] = useState(0);
  const activeListItemRef = useRef<Element | null>(null);

  const titlehandler = (idx: number) => {
    const imageItems = document.querySelectorAll(".main-img-items");
    gsap.set(imageItems, { autoAlpha: 0 });
    gsap.set(imageItems[idx], { autoAlpha: 1 });
  };

  const openoverlay = (idx: number) => {
    setNum(idx);
    gsap.defaults({
      ease: "cubic-bezier(0.625, 0.05, 0, 1)",
      duration: 0.725,
    });
    const items = document.querySelectorAll(".main-title-item");
    let title;
    items.forEach((elem) => {
      elem.classList.remove("active");
      activeListItemRef.current = items[idx];
      activeListItemRef.current.classList.add("active");
      title = activeListItemRef.current.querySelector(".main-title");
    });
    const titleState = title ? Flip.getState(title, { props: "fontSize" }) : undefined;
    const imageItems = document.querySelectorAll(".main-img-items");
    const image = imageItems[idx].querySelector(".image");
    const imageState = image ? Flip.getState(image) : undefined;
    const overlayItems = document.querySelectorAll(".overlay-items");
    const overlayItem = overlayItems[idx];
    const content = overlayItem.querySelector(".overlay-row");
    gsap.set(overlayItem, { display: "block", autoAlpha: 110 });
    gsap.fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.5 });
    const textTarget = overlayItem.querySelector("[data-overlay='text-target']");
    const imgTarget = overlayItem.querySelector("[data-overlay='img-target']");
    if (textTarget && title) {
      textTarget.appendChild(title);
    }
    if (imgTarget && image) {
      imgTarget.appendChild(image);
    }
    if (titleState) Flip.from(titleState);
    if (imageState) Flip.from(imageState);
    gsap.set(".overlay-nav", { display: "flex" });
    gsap.fromTo(
      "[data-overlay='nav-item']",
      { yPercent: 110 },
      { yPercent: 0, stagger: 0.1 }
    );
    gsap.set(imageItems, { autoAlpha: 0 });
    items.forEach((listItem, i) => {
      if (i !== idx) {
        const otherTitle = listItem.querySelector(".main-title");
        gsap.to(otherTitle, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.45,
          delay: 0.2 - i * 0.05,
        });
        gsap.to(".work", {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.45,
        });
      }
    });
  };

  const closeOverlay = () => {
    gsap.defaults({
      ease: "cubic-bezier(0.625, 0.05, 0, 1)",
      duration: 0.525,
    });
    const items = document.querySelectorAll(".main-title-item");
    const overlayItems = document.querySelectorAll(".overlay-items");
    if (!activeListItemRef.current) return;
    const index = Array.from(items).indexOf(activeListItemRef.current);
    const overlayItem = overlayItems[index];
    if (!overlayItem) return;
    const title = overlayItem.querySelector("[data-overlay='text-target'] .main-title");
    const image = overlayItem.querySelector("[data-overlay='img-target'] .image");
    const overlayContent = overlayItem.querySelector(".overlay-row");
    const titleState = Flip.getState(title, { props: "fontSize" });
    const imageState = Flip.getState(image);
    const navItems = document.querySelectorAll("[data-overlay='nav-item']");
    const overlayNav = document.querySelector(".overlay-nav");
    gsap.to(navItems, {
      yPercent: 110,
      onComplete: () => {
        if (overlayNav) {
          (overlayNav as HTMLElement).style.display = "none";
        }
      },
    });
    gsap.to(overlayContent, {
      autoAlpha: 0,
      onComplete: () => {
        (overlayItem as HTMLElement).style.display = "none";
      },
    });
    if (title) {
      activeListItemRef.current.appendChild(title);
    }
    const imageItems = document.querySelectorAll(".main-img-items");
    if (image) {
      imageItems[index].appendChild(image);
    }
    gsap.set(imageItems[index], { autoAlpha: 1 });
    Flip.from(titleState);
    Flip.from(imageState);
    if (activeListItemRef.current) {
      activeListItemRef.current.classList.remove("active");
      activeListItemRef.current = null;
    }
    gsap.to(".main-title,.work,.main-title::after", {
      yPercent: 0,
      autoAlpha: 1,
      delay: 0.3,
      stagger: 0.05,
    });
  };

  return (
    <div className="works w-full bg-black relative flex items-center justify-center">
      <div className="bgimage h-screen w-full ">
        <Image
          src="/assets/images/bgImage5.png"
          alt=""
          className="h-full w-full object-cover"
          fill
          priority
        />
      </div>
      <div className="page3container p-6 md:p-12 h-screen w-full top-0 left-0 z-[2] absolute ">
        <div className="main flex flex-col-reverse lg:flex-row opacity-[1] h-full w-full ">
          <div className="main-col h-[50%] w-full lg:h-full lg:w-[50%] ">
            <div className="main-img-list relative h-[60vw] w-[46vw] lg:h-[35vw] lg:w-[25vw] rounded-md ">
              {imgSrc.map((elem, idx) => (
                <div
                  key={idx}
                  className="main-img-items grayscale overflow-hidden z-[1] absolute h-full w-full "
                >
                  <img
                    className="image h-full w-full object-cover"
                    src={elem}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="main-col h-[50%] w-full lg:h-full lg:w-[50%] ">
            <div className="main-title-list pr-12 flex flex-col h-full w-full justify-center items-start pr-0 lg:pr-8 ">
              <h1 className="work text-white overflow-hidden text-[17vw] mb-4 md:mb-0 lg:text-[10vw] leading-[1.2]">
                <span className="inline-block">Projects</span>
              </h1>
              {titles.map((elem, idx) => (
                <div
                  key={idx}
                  onClick={() => openoverlay(idx)}
                  onMouseOver={() => titlehandler(idx)}
                  className="main-title-item relative active:scale-[0.98] leading-[1.35] lg:leading-[1.2] origin-left cursor-pointer text-white text-[6.5vw] md:text-[4.4vw] lg:text-[3.5vw] "
                >
                  <h2 className="main-title overflow-hidden ">{elem}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="overlay h-[140vh] lg:h-screen w-full pointer-events-none top-0 left-0 absolute z-[4] ">
          {overcontent.map((elem, idx) => (
            <div
              key={idx}
              className="overlay-items h-full w-full z-[3] pointer-events-none absolute hidden "
            >
              <div className="overlay-hero bg-[#10151c] w-full flex flex-col items-center justify-start ">
                <div
                  data-overlay="text-target"
                  className="overlay-text-wrap text-center leading-[1.05] text-white text-[15vw] py-4 md:py-8 lg:py-12 md:text-[9vw] w-full h-[30%] flex items-center justify-center "
                ></div>
                <div
                  data-overlay="img-target"
                  className="overlay-img-wrap h-[100%] w-[80%] md:h-[75%] md:w-[60%] lg:h-[60%] lg:w-[30%] "
                ></div>
              </div>
              <div className="overlay-row px-6 md:px-12 pt-12 lg:pb-12 bg-[#10151c] h-full w-full ">
                <div className="rowpart h-[50%] w-full flex flex-col lg:flex-row item-center justify-end ">
                  <div className="rowchild flex flex-col md:flex-row items-start md:items-center justify-between text-white h-full w-full lg:w-[60%]">
                    <div className="textsection flex flex-col gap-5 justify-center h-[50%] md:h-full w-full md:w-[50%] ">
                      <h1 className="text-4xl lg:text-3xl">Description</h1>
                      <p className=" text-xl lg:text-lg md:text-xl font-[helvetica] text-pretty leading-[1.3] md:leading-[1.15]">
                        {elem.description}
                      </p>
                    </div>
                    <div className="imgsection mt-8 md:mt-0 md:aspect-auto self-center h-[40%] md:h-[80%] md:self-left py-0 md:py-0 rounded-md w-[100%] md:w-[45%] flex items-center justify-end">
                      <img className="h-full w-full object-cover" src={elem.img1} alt="" />
                    </div>
                  </div>
                </div>
                <div className="rowpart h-[50%] w-full flex item-center justify-start">
                  <div className="rowchild flex flex-col-reverse lg:flex-row items-start justify-end lg:items-center lg:justify-between text-white h-full w-full lg:w-[40%]">
                    <div className="imgsection h-[80vw] lg:h-[20vw] rounded-md w-[60%] lg:w-[35%] flex items-center justify-end">
                      <img className="h-full w-full object-cover" src={elem.img2} alt="" />
                    </div>
                    <div className="textsection text-left flex flex-col gap-5 justify-center h-full w-[45%] md:w-[50%] ">
                      <h1 className="text-3xl lg:text-3xl md:text-5xl ">Tools Used</h1>
                      <ul className="text-white md:text-2xl font-[helvetica] ">
                        {elem.tools.map((e, id) => (
                          <li key={id}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="overlay-nav pointer-events-auto absolute px-12 z-[4] top-[38%] lg:bottom-[10%] left-0 right-0 overflow-hidden flex items-center justify-between hidden ">
            <h3
              onClick={() => closeOverlay()}
              data-overlay="nav-item"
              className="text-white font-[satoshiregular] cursor-pointer text-2xl"
            >
              Back to list
            </h3>
            {overcontent.map((e, id) =>
              id === num ? (
                <h3
                  key={id}
                  data-overlay="nav-item"
                  className="text-white font-[satoshiregular] cursor-pointer text-2xl"
                >
                  <a target="_blank" href={e.live}>
                    Live Link
                  </a>
                  <a target="_blank" href={e.github} className="ml-6">
                    GitHub
                  </a>
                </h3>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
