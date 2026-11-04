// Content of the About page. Layout lives in app/about/page.tsx.
// Only confirmed facts: entries without a known value are left out.

export type ProjectLink =
  | { kind: "external"; href: string; label: string }
  | { kind: "internal"; href: string; label: string };

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  link?: ProjectLink;
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

export type ContactLink =
  | { kind: "external"; label: string; href: string; display: string }
  | { kind: "email"; label: string; address: string };

export const intro: string[] = [
  "I like building things, with code and with my hands.",
  "I also like art. This contrast is the idea behind this site.",
];

/** Short handwritten margin note next to the intro (decorative). */
export const introNote = "code + pencil";

export const projects: Project[] = [
  {
    title: "Turbofan RUL Prediction",
    summary:
      "Predicting remaining useful life on the NASA C-MAPSS dataset, with a physics-informed loss function. MLOps with uv, DVC and MLflow.",
    stack: ["Python", "uv", "DVC", "MLflow"],
    link: {
      kind: "external",
      href: "https://github.com/SahanDurak/turbofan-rul-prediction",
      label: "View on GitHub",
    },
  },
  {
    title: "This website",
    summary:
      "Built together with AI agents, with CI/CD and a human in the loop.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    link: {
      kind: "external",
      href: "https://github.com/SahanDurak/meine-website",
      label: "View on GitHub",
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
    period: "2026 – present",
    highlights: [
      "Built a RAG system for internal documents (FastAPI, PostgreSQL + pgvector, Azure containers) that saves about 8 hours of research per request.",
      "Rebuilt the SOP project list and made it available to the team.",
    ],
  },
];

/** Newest first. */
export const education: Education[] = [
  {
    degree: "B.Sc. Industrial Engineering, focus on Mechanical Engineering",
    school: "TH Lübeck",
    period: "2024 – 2028 (expected)",
  },
  {
    degree: "Abitur",
    school: "Leibniz-Gymnasium Bad Schwartau",
    period: "2024",
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

export const contactEmail = "SahanDurak1@gmail.com";

export const contact: ContactLink[] = [
  {
    kind: "external",
    label: "GitHub",
    href: "https://github.com/SahanDurak",
    display: "github.com/SahanDurak",
  },
  {
    kind: "external",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahan-durak-a89281357/",
    display: "Sahan Durak",
  },
  { kind: "email", label: "E-mail", address: contactEmail },
];
