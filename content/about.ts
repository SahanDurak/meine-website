// Content of the About page. Layout lives in app/about/page.tsx.
// Anything not known yet is marked [TODO] and shown as plain text.

export type ProjectLink =
  | { kind: "external"; href: string; label: string }
  | { kind: "internal"; href: string; label: string }
  | { kind: "todo"; label: string };

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  link: ProjectLink;
};

export type Role = {
  company: string;
  location: string;
  /** Short context line about the company. */
  companyNote: string;
  title: string;
  period: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export type Interest = {
  label: string;
  detail?: string;
};

export type Book = {
  title: string;
  author: string;
};

export type ContactLink =
  | { kind: "external"; label: string; href: string; display: string }
  | { kind: "email"; label: string; address: string }
  | { kind: "todo"; label: string; display: string };

export const intro: string[] = [
  "I like building things, with code and with my hands.",
  "I also like to draw. This contrast is the idea behind this site.",
];

/** Short handwritten margin note next to the intro (decorative). */
export const introNote = "code & pencil";

export const projects: Project[] = [
  {
    title: "Turbofan RUL Prediction",
    summary:
      "Predicting remaining useful life on the NASA C-MAPSS dataset, with a physics-informed loss function. MLOps with uv, DVC and MLflow.",
    stack: ["Python", "uv", "DVC", "MLflow"],
    link: { kind: "todo", label: "[TODO] GitHub link" },
  },
  {
    title: "Home Lab",
    summary:
      "A playground with a Raspberry Pi 5 and ESP32 for networking and security exercises.",
    stack: ["Raspberry Pi 5", "ESP32", "Networking", "Security"],
    link: { kind: "todo", label: "[TODO] GitHub link" },
  },
  {
    title: "This website",
    summary:
      "Built together with AI agents, with CI/CD and a human in the loop.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    link: {
      kind: "todo",
      label: "[TODO] GitHub link (repo is private)",
    },
  },
  {
    title: "The Ball",
    summary: "A pencil animation made in Procreate.",
    stack: ["Procreate"],
    link: {
      kind: "internal",
      href: "/creative",
      label: "See it in the Creative Outlet",
    },
  },
];

/** Newest first. */
export const career: Role[] = [
  {
    company: "Sika Automotive",
    location: "Hamburg",
    companyNote:
      "Part of Sika, a company with about 34,000 employees worldwide.",
    title: "Working student, Product Management and R&D / Technical Service",
    period: "[TODO] period",
    highlights: [
      "Built a RAG system for internal documents (FastAPI, PostgreSQL + pgvector, Azure containers) that saves about 8 hours of research per request.",
      "Rebuilt the SOP project list and made it available to the team.",
      "[TODO] more highlights?",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "B.Eng. Industrial Engineering (Mechanical Engineering)",
    school: "TH Lübeck",
    period: "[TODO] period",
  },
];

export const interests: Interest[] = [
  { label: "Robotics", detail: "C++, Python, ROS 2" },
  { label: "Cybersecurity" },
  { label: "Hardware tinkering" },
  { label: "Drawing" },
  { label: "Running" },
  { label: "Motorcycles" },
  { label: "Books" },
  { label: "Music" },
  { label: "Nature" },
];

export const books: Book[] = [
  { title: "[TODO] Title", author: "[TODO] Author" },
  { title: "[TODO] Title", author: "[TODO] Author" },
  { title: "[TODO] Title", author: "[TODO] Author" },
];

// TODO: replace the placeholder address once the new one exists.
export const contactEmail = "todo@example.com";

export const contact: ContactLink[] = [
  {
    kind: "external",
    label: "GitHub",
    href: "https://github.com/SahanDurak",
    display: "github.com/SahanDurak",
  },
  { kind: "todo", label: "LinkedIn", display: "[TODO] LinkedIn URL" },
  { kind: "email", label: "E-mail", address: contactEmail },
];
