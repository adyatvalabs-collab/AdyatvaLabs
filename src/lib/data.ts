export type Project = {
  name: string;
  type: "BUILT BY US" | "CLIENT WORK";
  scope: string;
  desc: string;
  tags: string[];
  visual: "pathwatch" | "werkz" | "mount";
};

export const PROJECTS: Project[] = [
  {
    name: "PathWatch",
    type: "BUILT BY US",
    scope: "Branding · Content · Product",
    desc: "A civic technology venture Adyatva owns and operates. Cities are becoming harder to walk because pedestrian infrastructure is broken, obstructed or ignored — PathWatch turns scattered complaints into street-level data people can act on.",
    tags: ["Civic tech", "Street data", "Citizen reporting", "Product"],
    visual: "pathwatch",
  },
  {
    name: "Werkz de Square",
    type: "CLIENT WORK",
    scope: "Website · Digital Experience · Project Management",
    desc: "A digital presence for a project management consultancy. Positioning, a site that actually explains what they do, and the content system to keep it alive.",
    tags: ["Positioning", "Website", "Content system"],
    visual: "werkz",
  },
  {
    name: "Mount",
    type: "CLIENT WORK",
    scope: "Email Deliverability · Systems · Infrastructure",
    desc: "A system-level engagement around email deliverability and operational infrastructure — monitoring, recovery flows, and the plumbing that lets mail actually get delivered.",
    tags: ["Deliverability", "Monitoring", "Infrastructure"],
    visual: "mount",
  },
];

export const NOTES = [
  {
    n: "01",
    title: "The difference between a brand and a brand system",
    category: "Brand",
    read: "6 min",
  },
  {
    n: "02",
    title: "Distribution is a feature, not an afterthought",
    category: "Distribution",
    read: "4 min",
  },
  {
    n: "03",
    title: "What building PathWatch taught us about city data",
    category: "Ventures",
    read: "9 min",
  },
  {
    n: "04",
    title: "Agents are not a product. The workflow is.",
    category: "Systems",
    read: "5 min",
  },
  {
    n: "05",
    title: "Why most ideas die between strategy and execution",
    category: "First principles",
    read: "7 min",
  },
];
