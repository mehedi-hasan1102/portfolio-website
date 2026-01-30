export interface Project {
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

export const projects: Project[] = [
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
