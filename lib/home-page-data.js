// lib/home-page-data.js

import {
  BrainCircuit, // For AI/ML
  PanelsTopLeft, // For Frontend
  ServerCog, // For Backend & APIs
  DatabaseZap, // For Databases
  CloudCog, // For Cloud & DevOps
  ShieldCheck, // For Security & Compliance
  Cpu,
  Quote,
  Lightbulb,
  FunctionSquare,
  LayoutDashboard,
  AppWindow,
  Palette,
} from "lucide-react";

export const PAGE_DATA = {
  hero: {
    title: "From Data to Dominance.",
    titleGradient: "We Build Strategic AI.",
    subtitle:
      "We partner with industry leaders to architect and deploy bespoke AI models, robust data platforms, and intelligent applications that drive measurable ROI and create defensible market advantages.",
  },
  services: {
    title: "Our Core Capabilities",
    items: [
      {
        icon: BrainCircuit,
        name: "Generative AI & LLM Integration",
        description:
          "We architect and fine-tune custom generative models and integrate large language models (LLMs) into your core business processes. The result is automated complex workflows, novel content generation, and intelligent agents that redefine operational efficiency.",
        visual: "GenerativeAIScene",
      },
      {
        icon: CloudCog,
        name: "Cloud Architecture & Data Engineering",
        description:
          "Our expertise lies in building fault-tolerant, scalable cloud infrastructure and high-throughput ETL/ELT pipelines. We turn your raw, disparate data into a pristine, queryable asset ready to power analytics and machine learning.",
        visual: "DataStreamScene",
      },
      {
        icon: PanelsTopLeft,
        name: "Intelligent Web & BI Dashboards",
        description:
          "We design and develop high-performance web applications and business intelligence dashboards with an obsessive focus on user experience. We make complex data intuitive, actionable, and visually compelling for stakeholders at every level.",
        visual: "LiveChartScene",
      },
    ],
  },
  techStack: {
    title: "Our End-to-End Service Offerings",
    items: [
      {
        icon: Lightbulb,
        name: "AI & Digital Transformation Strategy",
        description:
          "Before a line of code is written, we partner with you to create a winning strategy. We conduct AI readiness assessments, map out technology roadmaps, and identify high-ROI use cases to ensure your investment translates directly into a competitive advantage.",
        tags: [
          "AI Maturity Assessment",
          "Use-Case Prioritization",
          "Technology Roadmap",
          "Data Governance Strategy",
          "Digital Transformation Consulting",
        ],
      },
      {
        icon: BrainCircuit,
        name: "Generative AI & LLM Solutions",
        description:
          "We go beyond generic API calls to build bespoke Generative AI solutions. This includes fine-tuning Large Language Models (LLMs) on your proprietary data, building robust Retrieval-Augmented Generation (RAG) pipelines, and developing intelligent agents to automate complex workflows.",
        tags: [
          "Custom LLM Fine-Tuning",
          "Retrieval-Augmented Generation (RAG)",
          "Intelligent Agent Development",
          "Semantic Search Engines",
          "OpenAI & Anthropic API Integration",
        ],
      },
      {
        icon: FunctionSquare,
        name: "Custom Machine Learning Models",
        description:
          "For challenges requiring predictive power, we build custom machine learning models from the ground up. Our end-to-end service covers data preprocessing, feature engineering, model training, and deployment for tasks like forecasting, classification, and anomaly detection.",
        tags: [
          "Predictive Analytics & Forecasting",
          "Recommender Systems",
          "Fraud & Anomaly Detection",
          "Natural Language Processing (NLP)",
          "Computer Vision (CV) Solutions",
        ],
      },
      {
        icon: LayoutDashboard,
        name: "Business Intelligence & Data Visualization",
        description:
          "We transform raw data into interactive, real-time dashboards and BI platforms. Our solutions provide a single source of truth, enabling data-driven decision-making at every level of your organization through intuitive KPI tracking and deep-dive analytics.",
        tags: [
          "Executive Dashboards",
          "Real-time Analytics Platforms",
          "Tableau & Power BI Integration",
          "Looker & Metabase Solutions",
          "Custom D3.js & WebGL Visualizations",
        ],
      },
      {
        icon: CloudCog,
        name: "Cloud-Native Engineering & MLOps",
        description:
          "We architect and build scalable, resilient, and secure cloud foundations on AWS, GCP, and Azure. Our expertise in Infrastructure as Code, containerization, and MLOps ensures your applications and models are deployed efficiently and operate reliably at scale.",
        tags: [
          "Cloud Architecture (AWS, GCP, Azure)",
          "Kubernetes & Docker Orchestration",
          "Infrastructure as Code (Terraform, Pulumi)",
          "CI/CD for ML (MLOps)",
          "Serverless Computing",
        ],
      },
      {
        icon: AppWindow,
        name: "Enterprise Web Application Development",
        description:
          "Our full-stack development teams build high-performance, mission-critical web applications. From customer-facing SaaS platforms to internal operational tools, we deliver secure, scalable, and intuitive products that are a pleasure to use.",
        tags: [
          "Full-Stack SaaS Platform Development",
          "Internal Tooling & Admin Panels",
          "Customer Portals & B2B Platforms",
          "API Design & Development (REST, GraphQL)",
          "Performance Optimization",
        ],
      },
      {
        icon: Palette,
        name: "UI/UX Design & Prototyping",
        description:
          "We believe world-class technology deserves a world-class user experience. Our design process focuses on user research, intuitive information architecture, and creating beautiful, high-fidelity interactive prototypes that reduce friction and drive user adoption.",
        tags: [
          "User Research & Persona Development",
          "Wireframing & Information Architecture",
          "Interactive Prototyping (Figma)",
          "Component-Based Design Systems",
          "Accessibility (WCAG) Compliance",
        ],
      },
      {
        icon: ShieldCheck,
        name: "Cybersecurity & Compliance",
        description:
          "We embed security into every stage of development. Our services include proactive threat modeling, vulnerability assessments, and implementing controls to meet industry compliance standards like SOC 2, HIPAA, and GDPR, protecting both your data and your reputation.",
        tags: [
          "Application Security Audits",
          "Cloud Security Posture Management",
          "DevSecOps Integration",
          "Penetration Testing",
          "Compliance-as-Code",
        ],
      },
    ],
  },
  testimonials: {
    title: "Trusted by Industry Leaders",
    icon: Quote,
    items: [
      {
        quote:
          "Their team didn't just deliver a model; they delivered a strategic asset. Our data-driven decision-making has improved by over 60% since the engagement. Truly an elite partner.",
        name: "Jian Li",
        title: "CTO, DataSphere Analytics",
        color: "#fb923c",
        visual: "TestimonialScene",
      },
      {
        quote:
          "The professionalism and technical depth are unmatched. They navigated a complex legacy system migration to a modern cloud architecture flawlessly, on time and under budget.",
        name: "Marcus Thorne",
        title: "VP of Engineering, InnovateX",
        color: "#f472b6",
        visual: "TestimonialScene",
      },
    ],
  },
  cta: {
    title: "Ready to Build Your Strategic Advantage?",
    subtitle:
      "An ambitious idea needs an expert partner. Let's discuss your vision and architect a solution that delivers results.",
    buttonText: "Book an Introductory Call",
  },
};
