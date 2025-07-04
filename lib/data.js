// MOCK_DATA (lib/data.js - to be replaced by API calls)
const MOCK_DATA = {
  companyName: "Future&more Inc",
  tagline: "Pioneering the Next Era of Artificial Intelligence.",
  hero: {
    titleMain: "Engineer the",
    titleGradient: "Impossible.",
    subtitle:
      "Future&more Inc builds autonomous AI ecosystems and intelligent tools that redefine what's possible in technology and business.",
    cta1: "Explore FutureOS",
    cta2: "Our Innovations",
  },
  products: [
    {
      id: "future-os",
      name: "FutureOS",
      category: "AI Developer Ecosystem",
      tagline: "The AI-First Autonomous Development Environment.",
      description:
        "FutureOS is not just an operating system; it's a revolutionary AI-first ecosystem. It hosts autonomous agents that replicate entire technical teams—from UI generation and full-stack development (React, FastAPI, PostgreSQL) to self-reviewing code agents and automated SaaS builders. Designed for enterprises, startups, and power users to create production-ready applications without traditional engineering overhead.",
      longDescription:
        "Imagine a world where software builds itself, guided by intelligent agents. That's the promise of FutureOS. Our platform orchestrates a symphony of specialized AI agents, each an expert in its domain. The UI Agent crafts intuitive interfaces based on high-level requirements. The Full-Stack Agent materializes backend logic and frontend components. The QA Agent rigorously tests and refines code. The Deployment Agent seamlessly pushes applications to production. FutureOS is the ultimate force multiplier for innovation, enabling rapid prototyping and scalable deployment of sophisticated digital products.",
      icon: "Bot", // Corresponds to Bot icon from lucide-react
      imageUrl:
        "https://images.unsplash.com/photo-1611095562057-2e70d5bf3f0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      features: [
        "Autonomous Agent Orchestration",
        "AI-Powered UI/UX Generation",
        "Automated Full-Stack Development",
        "Self-Correcting Code Agents",
        "Integrated SaaS Building Blocks",
        "Zero-Touch Deployment Systems",
        "Scalable for Enterprise Use",
        "Intuitive Orchestrator Interface",
      ],
      type: "flagship",
      themeColor: "indigo",
    },
    {
      id: "notes-asr",
      name: "Notes ASR",
      category: "AI Study & Productivity Tool",
      tagline: "Transform Information into Insight, Effortlessly.",
      description:
        "Notes ASR is an advanced AI-powered assistant that converts audio, PDFs, and documents into personalized study materials and actionable notes. It features cutting-edge ASR, generative AI for summarization and Q&A, and integrated testing tools.",
      longDescription:
        "Notes ASR redefines how you interact with information. Lectures become structured notes, dense PDFs transform into digestible summaries, and complex documents unveil their core concepts through AI-driven chat. Our platform leverages state-of-the-art Automatic Speech Recognition for unparalleled accuracy in audio processing. Generative AI then crafts personalized study guides, extracts key formulas, identifies references, and even generates practice questions to solidify your understanding. The intuitive dashboard makes managing your knowledge base a breeze, turning learning and research into an efficient and engaging experience.",
      icon: "Mic",
      imageUrl:
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      features: [
        "High-Accuracy ASR",
        "Personalized Note Generation",
        "AI-Powered Summarization",
        "Contextual Chat for Clarification",
        "Automated Quiz Generation",
        "PDF & Document Analysis",
        "Multi-Format Input Support",
        "User-Friendly Dashboard",
      ],
      type: "flagship",
      themeColor: "sky",
    },
    {
      id: "pcos-predictor",
      name: "PCOS Predictor",
      category: "AI Health & Wellness",
      tagline: "Early Insights for Women's Health.",
      description:
        "An ML-driven tool providing early-stage PCOS prediction, empowering proactive health management.",
      icon: "ShieldCheck",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      type: "secondary",
      themeColor: "rose",
    },
    {
      id: "yolo-plate-detector",
      name: "YOLOv11 Plate Detector",
      category: "AI Computer Vision",
      tagline: "High-Accuracy License Plate Recognition.",
      description:
        "Utilizing YOLOv11 for robust and real-time license plate detection for security and traffic applications.",
      icon: "Search",
      imageUrl:
        "https://images.unsplash.com/photo-1555585648-f1a91cac6970?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      type: "secondary",
      themeColor: "amber",
    },
    {
      id: "skin-lesion-classifier",
      name: "Skin Lesion Classifier",
      category: "AI Diagnostic Support",
      tagline: "AI-Assisted Early Skin Anomaly Detection.",
      description:
        "An image classification tool for early detection of skin lesions, aiding in proactive dermatological care.",
      icon: "Activity",
      imageUrl:
        "https://images.unsplash.com/photo-1600950705487-5e4590939751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      type: "secondary",
      themeColor: "teal",
    },
  ],
  services: [
    {
      id: "ai-tools",
      name: "Bespoke AI Tools",
      description:
        "Crafting custom AI-powered tools and agents to automate complex tasks and unlock unique capabilities for your business.",
      icon: "Cpu",
    },
    {
      id: "saas-solutions",
      name: "Intelligent SaaS Platforms",
      description:
        "Developing scalable, AI-enhanced SaaS solutions that deliver exceptional value and user experiences.",
      icon: "CloudCog",
    },
    {
      id: "generative-ai",
      name: "Generative AI Applications",
      description:
        "Leveraging cutting-edge generative models to build innovative applications for content creation, data synthesis, and more.",
      icon: "Sparkles",
    },
    {
      id: "custom-agents",
      name: "Autonomous Agent Systems",
      description:
        "Designing and implementing autonomous agent ecosystems, like FutureOS, tailored to your specific operational needs.",
      icon: "UsersRound",
    },
  ],
  founders: [
    {
      name: "Zubair Ahmad",
      title: "CEO & Co-founder",
      bio: "Zubair is a visionary technologist and the driving force behind Future&more's AI-first strategy. With deep expertise in autonomous systems and software architecture, he leads the charge in creating technologies that redefine industry boundaries.",
      imageUrl: "https://placehold.co/400x400/22252A/E0E0E0?text=Zubair+A",
      social: { linkedin: "#", twitter: "#", github: "#" },
    },
    {
      name: "Parvez Bhat",
      title: "CTO & Co-founder",
      bio: "Parvez is a master architect of complex AI systems. His profound understanding of machine learning, full-stack development, and scalable infrastructure ensures that Future&more's products are not only innovative but also robust and enterprise-ready.",
      imageUrl: "https://placehold.co/400x400/2A2225/E0E0E0?text=Parvez+B",
      social: { linkedin: "#", twitter: "#", github: "#" },
    },
    ,
    {
      name: "Shabir qazi",
      title: "COO & Co-founder",
      bio: "Shabir is a visionary data architect, masterfully bridging the gap between raw data and strategic insight. His profound understanding of robust ETL pipelining and user-centric wireframing ensures that the company's initiatives are not only built on a foundation of scalable data but are also guided by clear, actionable analytics.",
      imageUrl: "https://placehold.co/400x400/2A2225/E0E0E0?text=Qazi+S",
      social: { linkedin: "#", twitter: "#", github: "#" },
    },
    {
      name: "Moomin",
      title: "VP Marketing",
      bio: "Moomin is a visionary architect of brand experiences. His profound understanding of go-to-market strategy and world-class UI/UX development ensures that the company's products are not only strategically positioned in the market but are also engineered for an intuitive and delightful user journey.",
      imageUrl: "https://placehold.co/400x400/2A2225/E0E0E0?text=Moomin+B",
      social: { linkedin: "#", twitter: "#", github: "#" },
    },
  ],
  contactEmail: "info.futuremore@gmail.com",
  companyMission:
    "To empower humanity by creating autonomous intelligence that solves complex problems and unlocks unprecedented levels of creativity and productivity.",
};

export default MOCK_DATA;
