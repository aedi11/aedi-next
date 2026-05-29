import {
  Settings, Brain, Layers, Code, Cpu,
  Battery, Plane, Car, Speaker,
  Timer, Wrench, Factory, Zap,
  Award, GraduationCap, BarChart3, Briefcase,
} from "lucide-react";

// ─── Colors ─────────────────────────────────────
export const ACCENT = {
  gold: "#EAC97C",
  goldDark: "#826015",
  teal: "#0E7490",
  emerald: "#059669",
  text1: "#B7AA91",
  text2: "#C8BAA6",
  text3: "#8F7E5E",
  panel: "#514733",
};

// ─── Workflow Steps ──────────────────────────────
export const WORKFLOW_STEPS = [
  {
    label: "Engineers & Reviewers",
    description: "Human experts define requirements and review outputs",
    accent: "#EAC97C",
    Icon: Settings,
  },
  {
    label: "AI-Based Reasoning Layer",
    description: "Design-time assistant powered by large reasoning models",
    accent: "#0E7490",
    Icon: Brain,
  },
  {
    label: "Design Artifacts",
    description: "",
    accent: "#059669",
    Icon: Layers,
    bullets: [
      "Requirements Analysis & Validation",
      "Architecture Models & Hardware Design",
      "Code Skeletons",
      "In-loop Verification & Validation through Simulation",
      "Test Cases",
      "Safety Analyses",
    ],
  },
  {
    label: "Embedded Software",
    description: "Deterministic, verified firmware ready for deployment",
    accent: "#EAC97C",
    Icon: Code,
  },
  {
    label: "Target Hardware / HIL",
    description: "Hardware-in-the-loop testing and final target deployment",
    accent: "#0E7490",
    Icon: Cpu,
  },
];

// ─── Scope Items ─────────────────────────────────
export const SCOPE_ITEMS = [
  {
    Icon: Battery,
    image: "/images/BMS.png",
    title: "Battery & Mobility Systems",
    description:
      "AEDI automates mechanical, thermal, and electronic (BMS) battery designs for portable packs, two-wheelers, and three-wheelers.",
    accent: "#059669",
  },
  {
    Icon: Plane,
    image: "/images/DroneCircuit.jpg",
    title: "Aerospace & Defence",
    description:
      "Our designs power drones, night vision devices, and radar systems.",
    accent: "#0E7490",
  },
  {
    Icon: Car,
    image: "/images/automotive.png",
    title: "Automotive Integration",
    description:
      "We build optimized simple as well as complex controllers for various interdependent automotive applications.",
    accent: "#EAC97C",
  },
  {
    Icon: Speaker,
    image: "/images/ESS.png",
    title: "Industrial & Consumer Power Electronics",
    description:
      "AEDI solutions to automate telecom power, home power storage systems, renewable energy systems, ESS...",
    accent: "#059669",
  },
];

// ─── Impact Stats ────────────────────────────────
export const IMPACT_STATS = [
  {
    Icon: Timer,
    stat: ">60%",
    title: "Massive Time Savings",
    description: "Experience greater than 60% reduction in design and iteration time.",
    accent: "#0E7490",
    small: false,
  },
  {
    Icon: Wrench,
    stat: "~70%",
    title: "Development Cost Reduction",
    description: "AEDI drives up to 70% reduction in engineering efforts.",
    accent: "#EAC97C",
    small: false,
  },
  {
    Icon: Factory,
    stat: "Optimized Designs",
    title: "Automated Customization",
    description:
      "Cost and time optimized, rule-based design developments with reduced judgment and bias errors.",
    accent: "#059669",
    small: true,
  },
  {
    Icon: Zap,
    stat: "Dynamic Solutions",
    title: "3-5X logic path variants",
    description:
      "Multiple logic path concurrence based decisions to ensure Robustness, Reliability & Safety.",
    accent: "#0E7490",
    small: true,
  },
];

// ─── Team Members ────────────────────────────────
export const TEAM_MEMBERS = [
  {
    Icon: Award,
    image: "/images/bhim_singh.jpg",
    name: "Prof. Bhim Singh",
    dept: "Dept. of Electrical Engineering, IIT Delhi",
    role: "Mentor, Shareholder",
    accent: "#EAC97C",
    bio: [
      "ANRF National Science Chair & Emeritus Professor. FNAE, FNA, FNASc, FASc, FTWAS, FIEEE, FIET, FIETE, FIE(I)",
      "Dean, Academics at IIT Delhi. August 2016 - August 2019.",
      "72 patents granted + 37 patents filed. Executed >90 sponsored consultancy projects. Published 1326 research papers. Guided 134 Ph.D. dissertations and 183 M.E./M.Tech./M.S.(R) theses.",
      "Recipient of Rashtriya Vigyan Puraskar — Vigyan Shri by the President of India, 2024.",
      "Co-authored: Power Quality Problems and Mitigation Techniques (John Wiley & Sons Ltd. 2015).",
    ],
  },
  {
    Icon: GraduationCap,
    image: "/images/amit_gupta.png",
    name: "Prof. Amit Gupta",
    dept: "Dept. of Mechanical Engineering, IIT Delhi",
    role: "Mentor, Shareholder",
    accent: "#EAC97C",
    bio: [
      "Holds the Mehra Chair as a Professor in Mechanical Engineering at IIT Delhi. Also serving as Associate Dean (Infrastructure) since September 2024.",
      "Formerly held the NTPC Chair Professorship from January 2019 till December 2023.",
      "Post-doctoral research fellow at GM/UM Advanced Battery Coalition for Drivetrains (ABCD), University of Michigan.",
      "M.S. & Ph.D. at the University of Central Florida (UCF); B.Tech. from IIT Delhi in 2004.",
      "Research interests: Lithium-based technologies, microfluidics and flapping wing aerodynamics.",
    ],
  },
  {
    Icon: Brain,
    image: "/images/santanu_chaudhury.png",
    name: "Prof. Santanu Chaudhury",
    dept: "Dept. of Electrical Engineering, IIT Delhi & IIT Jodhpur",
    role: "Master System Architect, Shareholder",
    accent: "#EAC97C",
    bio: [
      "Retired from IIT Delhi on 31 January 2026. Former Director, IIT Jodhpur and Director CSIR-CEERI.",
      "Former Dean, Undergraduate Studies, IIT Delhi.",
      "Awarded INSA medal for young scientists in 1993.",
      "Fellow of INAE, NASI and International Association of Pattern Recognition (IAPR).",
      ">350 publications. 15 patents with technologies commercialized by global industries.",
      "B.Tech (1984) and Ph.D (1989) from I.I.T, Kharagpur, India.",
    ],
  },

  {
    Icon: Briefcase,
    image: "/images/chunchreek_singhvi.jpg",
    name: "Chunchreek Singhvi",
    dept: "",
    role: "Shareholder",
    accent: "#EAC97C",
    bio: [
      "Identified the opportunity after 10+ years of hands-on industry experience in embedded engineering management.",
      ">20 years as part of startup initiatives across innovative technologies, venture capital and private equity in 15 industries across 10 countries.",
      ">USD 700 Mn in business development, global tech JVs, technology adaptation, product development & operations experiences.",
      "USD 500 Mn VC-PE fund raising, investment & portfolio management experiences.",
      "Smurfit, UC Dublin - Masters in Business; Bachelors in Law; B.A. Economics; Scholar at Eton & Reims.",
    ],
  },

];

// ─── Demo Prompts ────────────────────────────────
export const DEMO_PROMPTS = [
  {
    label: "48V 100Ah Rack-Mount LiFePO4 Battery Pack",
    prompt:
      "Design a 48V 100Ah rack-mount LiFePO4 battery pack for telecom backup power (BTS/tower application). The pack must have integrated BMS with 100A continuous discharge, MCB protection (125A), WiFi remote monitoring capability, LCD display interface, and 19-inch rack-mount enclosure. Target use: outdoor telecom cabinets requiring -48V DC UPS backup",
  },
  {
    label: "72V Heavy-Duty Motorcycle",
    prompt:
      "Design a 72V battery pack and BMS for a heavy-duty electric motorcycle targeting 150+ km highway range. The powertrain uses an 8.0 kW nominal motor with peak surges up to 18 kW for overtaking. The battery requires ~6.0 kWh energy capacity. Total pack weight must remain under 35 kg. Use forced air cooling with aluminum heatsink fins. BMS must support continuous discharge at 8.0 kW nominal and brief 18 kW peak bursts (≤5 seconds). Include CAN bus communication for vehicle ECU integration.",
  },
  {
    label: "48V Delivery Scooter",
    prompt:
      "Design a 48V swappable battery pack and BMS for a light-duty delivery electric scooter targeting 80 km urban range. The powertrain uses a 1.5 kW nominal hub motor with peak load up to 3.5 kW on inclines. The battery requires ~2.0 kWh energy capacity. Total pack weight must remain strictly under 12 kg for easy manual swapping. Use passive cooling only. BMS must handle continuous 1.5 kW discharge with 3.5 kW peaks during hill climbs.",
  },
];

// ─── Variant Config ──────────────────────────────
export const VARIANT_CONFIG: Record<
  string,
  { color: string; bg: string; ring: string; glow: string }
> = {
  "Cost Optimized": {
    color: "#EAC97C",
    bg: "rgba(130,96,21,0.12)",
    ring: "rgba(130,96,21,0.4)",
    glow: "0 0 20px rgba(130,96,21,0.15)",
  },
  "Performance Optimized": {
    color: "#0E7490",
    bg: "rgba(14,116,144,0.08)",
    ring: "rgba(14,116,144,0.4)",
    glow: "0 0 20px rgba(14,116,144,0.15)",
  },
  "Space Optimized": {
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    ring: "rgba(5,150,105,0.4)",
    glow: "0 0 20px rgba(5,150,105,0.15)",
  },
};
