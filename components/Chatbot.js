// components/Chatbot.js
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  PhoneArrowUpRightIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";

// --- VERSION 2.1: Light & Dark Mode Aware Genie Avatar ---
const GenieAvatarV2 = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200" // Control wisps/glow color
  >
    <defs>
      <radialGradient
        id="genie-gradient-v2"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop
          offset="0%"
          stopColor="#D1D5DB"
          className="dark:stop-color-[#4A5568]"
        />
        <stop
          offset="100%"
          stopColor="#9CA3AF"
          className="dark:stop-color-[#1A202C]"
        />
      </radialGradient>
      <filter
        id="glow-v2"
        x="-75%"
        y="-75%"
        width="250%"
        height="250%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <clipPath id="eye-clip">
        <circle cx="50" cy="46" r="5" />
      </clipPath>
    </defs>

    <motion.g
      filter="url(#glow-v2)"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ethereal, smoky wisps */}
      <motion.path
        d="M 50,85 C 30,95 20,75 35,65 C 50,55 60,75 50,85 Z"
        className="fill-purple-300/30 dark:fill-purple-400/30"
        animate={{
          d: [
            "M 50,85 C 30,95 20,75 35,65 C 50,55 60,75 50,85 Z",
            "M 50,88 C 35,98 25,78 40,68 C 55,58 65,78 50,88 Z",
            "M 50,85 C 30,95 20,75 35,65 C 50,55 60,75 50,85 Z",
          ],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 60,40 C 75,30 85,50 70,60 C 55,70 45,50 60,40 Z"
        className="fill-cyan-300/30 dark:fill-cyan-400/30"
        animate={{
          d: [
            "M 60,40 C 75,30 85,50 70,60 C 55,70 45,50 60,40 Z",
            "M 62,42 C 77,32 87,52 72,62 C 57,72 47,52 62,42 Z",
            "M 60,40 C 75,30 85,50 70,60 C 55,70 45,50 60,40 Z",
          ],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.g>

    <motion.g
      animate={{ y: [-1, 1, -1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Main Face */}
      <circle cx="50" cy="50" r="30" fill="url(#genie-gradient-v2)" />
      <path
        d="M50 80C66.57 80 80 66.57 80 50C80 33.43 66.57 20 50 20C33.43 20 20 33.43 20 50C20 66.57 33.43 80 50 80Z"
        className="stroke-cyan-400/80 dark:stroke-cyan-400/50"
        strokeWidth="1.5"
      />

      {/* Intelligent Eyes */}
      <g>
        <circle
          cx="38"
          cy="46"
          r="6"
          className="fill-gray-100 dark:fill-[#1A202C]"
        />
        <circle
          cx="62"
          cy="46"
          r="6"
          className="fill-gray-100 dark:fill-[#1A202C]"
        />
        <motion.g transform="translate(-12, 0)">
          <circle
            cx="38"
            cy="46"
            r="3"
            className="fill-gray-800 dark:fill-white"
          />
        </motion.g>
        <motion.g transform="translate(12, 0)">
          <circle
            cx="62"
            cy="46"
            r="3"
            className="fill-gray-800 dark:fill-white"
          />
        </motion.g>
      </g>

      {/* Smile */}
      <motion.path
        d="M44 62 C46 65, 54 65, 56 62"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-gray-800 dark:stroke-white"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.g>
  </svg>
);

// --- NEW: A more enchanting peek animation from the side ---
const PeekFromSideAnimation = () => (
  <motion.div
    className="absolute bottom-0 -right-4"
    initial={{ x: "100%", opacity: 0 }}
    animate={{
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    }}
    exit={{
      x: "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    }}
    style={{ transformPerspective: "800px" }}
  >
    {/* Speech Bubble */}
    <motion.div
      className="absolute -top-12 -left-28 w-max bg-white/50 dark:bg-black/30 backdrop-blur-md text-gray-800 dark:text-white px-4 py-2 rounded-xl rounded-bl-none shadow-2xl shadow-cyan-500/20 border border-black/10 dark:border-white/10"
      initial={{ scale: 0, opacity: 0, rotateY: -90 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotateY: 0,
        transition: {
          delay: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      }}
    >
      <p className="font-bold text-sm tracking-wide">Hey! Let's Chat</p>
      <div
        className="absolute bottom-0 left-0 w-3 h-3 bg-white/50 dark:bg-black/30"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }}
      />
    </motion.div>

    <motion.div
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <GenieAvatarV2 />
    </motion.div>
  </motion.div>
);

// --- NEW: A beautiful Aurora background for the chat window ---
const AuroraBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, rgba(56, 189, 248, 0) 25%), " + // Light mode cyan
          "radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.1) 0%, rgba(167, 139, 250, 0) 25%)", // Light mode purple
      }}
      // Use a class to apply dark mode styles conditionally
      // In dark mode, the opacities are higher for more vibrance
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.3)_0%,rgba(56,189,248,0)_25%),radial-gradient(circle_at_80%_80%,rgba(167,139,250,0.3)_0%,rgba(167,139,250,0)_25%)] opacity-0 dark:opacity-100 transition-opacity duration-500" />
    </motion.div>
  </div>
);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
const CHATBOT_DATA = {
  initial: "intro",
  states: {
    intro: {
      messages: [
        `${getGreeting()}! I'm Genie, a cosmic AI guide. How can I illuminate the path to Future&More Inc. for you?`,
      ],
      options: [
        { text: "Explore Services & Solutions", next: "services_overview" },
        { text: "Learn About the Company", next: "company_overview" },
        { text: "Discuss Our Technology", next: "tech_overview" },
        { text: "How does a project work?", next: "process_overview" },
        { text: "I have a specific question", next: "escalate" },
      ],
    },
    who_are_you: {
      messages: [
        "I'm Genie, a conversational AI woven from stardust and code by the innovators at Future&More Inc.",
        "My purpose is to guide you. While my knowledge is vast, I'm always learning from the cosmos!",
      ],
      options: [
        { text: "That's amazing!", next: "intro" },
        { text: "Back to the main menu", next: "intro" },
      ],
    },
    company_overview: {
      messages: ["What would you like to know about our constellation?"],
      options: [
        { text: "What is your mission?", next: "about_us" },
        { text: "How does your process work?", next: "process_overview" },
        { text: "What are your pricing models?", next: "pricing_philosophy" },
        { text: "Are you hiring?", next: "careers" },
        { text: "Back to main menu", next: "intro" },
      ],
    },
    about_us: {
      messages: [
        "Our mission at Future&More Inc. is to empower businesses by integrating intelligent automation and data-driven insights, turning earthly challenges into cosmic opportunities.",
        "We believe in building practical, scalable, and impactful AI solutions.",
      ],
      options: [
        { text: "Tell me about your process", next: "process_overview" },
        { text: "Go back", next: "company_overview" },
      ],
    },
    process_overview: {
      messages: [
        "We follow a collaborative, four-step journey to ensure success:",
        "1.  Discovery: We dive deep to understand your universe of goals and challenges.",
        "2. Strategy & Design: We architect a bespoke solution and a roadmap to the stars.",
        "3. Development & Integration: Our team builds and seamlessly integrates the solution.",
        "4. Deployment & Support: We launch, monitor, and provide stellar support.",
      ],
      options: [
        { text: "What about pricing?", next: "pricing_philosophy" },
        { text: "I'm ready to talk to a human", next: "escalate" },
        { text: "Go back", next: "company_overview" },
      ],
    },
    pricing_philosophy: {
      messages: [
        "Every project is a unique galaxy, so we don't offer one-size-fits-all pricing.",
        "Our pricing is based on scope, complexity, and the resources required.",
        "We provide a detailed, transparent proposal after our initial discovery call. Shall we schedule one?",
      ],
      options: [
        { text: "Yes, let's schedule a call", next: "escalate" },
        { text: "What are your services?", next: "services_overview" },
        { text: "Go back", next: "company_overview" },
      ],
    },
    careers: {
      messages: [
        "We're always looking for bright new stars in AI, data science, and engineering!",
        "For the latest openings, check our LinkedIn page or email us your resume.",
      ],
      options: [
        { text: "Okay, I'll email you", action: "email" },
        { text: "Go back", next: "company_overview" },
      ],
    },
    services_overview: {
      messages: [
        "We offer a range of solutions centered around AI and Data. Which area sparks your curiosity?",
      ],
      options: [
        { text: "AI-Powered Automation", next: "services_automation" },
        { text: "Advanced Data Analytics", next: "services_analytics" },
        { text: "Custom AI Solutions", next: "services_custom" },
        { text: "Back to main menu", next: "intro" },
      ],
    },
    services_automation: {
      messages: [
        "Our AI Automation services help streamline your business by automating repetitive tasks, freeing your team for higher-level missions.",
        "This includes intelligent document processing, workflow automation, and building customer service chatbots (like me!).",
      ],
      options: [
        { text: "Tell me about Data Analytics", next: "services_analytics" },
        { text: "How do you build these?", next: "tech_overview" },
        { text: "I have a project in mind", next: "escalate" },
        { text: "Go back to services", next: "services_overview" },
      ],
    },
    services_analytics: {
      messages: [
        "We turn your raw data into a strategic asset. Our services include:",
        "• Predictive Modeling: Forecasting trends and customer behavior.",
        "• Business Intelligence: Creating interactive dashboards (Tableau, Power BI).",
        "• Data Warehousing: Building robust systems to store and access your data.",
      ],
      options: [
        { text: "What are Custom AI Solutions?", next: "services_custom" },
        { text: "I need a dashboard built", next: "escalate" },
        { text: "Go back to services", next: "services_overview" },
      ],
    },
    services_custom: {
      messages: [
        "For unique challenges, we build bespoke AI models from the ground up.",
        "Our expertise covers areas like:",
        "• Natural Language Processing (NLP)",
        "• Computer Vision",
        "• Recommendation Engines",
      ],
      options: [
        { text: "What technology do you use?", next: "tech_overview" },
        { text: "This sounds complex, can we talk?", next: "escalate" },
        { text: "Go back to services", next: "services_overview" },
      ],
    },
    tech_overview: {
      messages: [
        "Our technology stack is modern, scalable, and robust. What part are you curious about?",
      ],
      options: [
        { text: "AI Models & Frameworks", next: "tech_ai_models" },
        { text: "Cloud & Infrastructure", next: "tech_cloud" },
        { text: "Just give me the summary", next: "tech_stack_summary" },
        { text: "Back to main menu", next: "intro" },
      ],
    },
    tech_ai_models: {
      messages: [
        "We leverage a mix of state-of-the-art models and proven frameworks:",
        "• LLMs: We build on top of powerful models like Google's Gemini and OpenAI's GPT series.",
        "• Custom Models: We use TensorFlow and PyTorch for custom deep learning.",
        "• Anthropic's Claude: For tasks requiring large context windows and safety.",
      ],
      options: [
        { text: "How do you deploy these?", next: "tech_cloud" },
        { text: "Go back", next: "tech_overview" },
      ],
    },
    tech_cloud: {
      messages: [
        "We are cloud-agnostic and design for scalability on major platforms.",
        "• Containerization: Docker and Kubernetes for consistent, scalable deployments.",
        "• Major Providers: Expertise in Google Cloud (GCP), AWS, and Microsoft Azure.",
      ],
      options: [
        { text: "What about the front-end?", next: "tech_frontend" },
        { text: "Go back", next: "tech_overview" },
      ],
    },
    tech_frontend: {
      messages: [
        "For UIs, like our website and client dashboards, we prioritize speed and modern UX.",
        "Our go-to stack is Next.js with React, styled with Tailwind CSS, and animated with Framer Motion.",
      ],
      options: [
        { text: "That's this website, right?", next: "who_are_you" },
        { text: "Go back", next: "tech_overview" },
      ],
    },
    tech_stack_summary: {
      messages: [
        "We use a modern stack including Gemini, OpenAI, TensorFlow, and cloud platforms like GCP, AWS, and Azure to deliver powerful solutions.",
      ],
      options: [
        { text: "Tell me more details", next: "tech_overview" },
        { text: "Back to main menu", next: "intro" },
      ],
    },
    escalate: {
      messages: [
        "It seems we've reached the edge of my known universe, or you need to speak with a human expert.",
        "How would you like to proceed?",
      ],
      options: [
        { text: "Chat with an associate", action: "live_chat" },
        { text: "Request a callback", action: "callback" },
        { text: "Send a message through the cosmos", action: "email" },
        { text: "Back to main menu", next: "intro" },
      ],
    },
  },
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="chat chat-start"
  >
    <div className="chat-bubble bg-transparent flex items-center gap-1.5 p-3">
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        className="h-2 w-2 bg-cyan-500 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-2 w-2 bg-cyan-500 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 0.9,
          delay: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-2 w-2 bg-cyan-500 rounded-full"
      />
    </div>
  </motion.div>
);

const ThemedFormButton = ({ children, isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 dark:text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      {isLoading ? "Please wait..." : children}
    </span>
  </button>
);

const ThemedFormInput = (props) => (
  <input
    {...props}
    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded-md p-3 mb-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:focus:ring-cyan-400 dark:focus:border-cyan-400 outline-none transition-all"
  />
);

const ThemedFormTextarea = (props) => (
  <textarea
    {...props}
    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/20 rounded-md p-3 mb-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:focus:ring-cyan-400 dark:focus:border-cyan-400 outline-none transition-all"
  />
);

const ActionViewWrapper = ({
  icon: Icon,
  title,
  children,
  onBack,
  buttonText,
}) => (
  <div className="p-4 text-center">
    <Icon className="w-16 h-16 mx-auto text-cyan-500 dark:text-cyan-400 mb-4" />
    <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
      {title}
    </h4>
    {children}
    <button
      onClick={onBack}
      className="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
    >
      {buttonText}
    </button>
  </div>
);

const LiveChatView = ({ onBack }) => (
  <ActionViewWrapper
    icon={UserGroupIcon}
    title="Connecting..."
    onBack={onBack}
    buttonText="Cancel Request"
  >
    <p className="text-sm text-gray-600 dark:text-gray-300">
      An associate will be with you shortly. Thank you for your patience.
    </p>
  </ActionViewWrapper>
);

const CallbackForm = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: "Submitting request...",
      success: () => {
        setSubmitted(true);
        setIsLoading(false);
        return "Request received! We will call you back soon.";
      },
      error: () => {
        setIsLoading(false);
        return "Something went wrong. Please try again.";
      },
    });
  };
  if (submitted) {
    return (
      <ActionViewWrapper
        icon={PhoneArrowUpRightIcon}
        title="Request Received!"
        onBack={onBack}
        buttonText="Close"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          One of our associates will call you back within 24 hours.
        </p>
      </ActionViewWrapper>
    );
  }
  return (
    <div className="p-4">
      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 text-center">
        Request a Callback
      </h4>
      <form onSubmit={handleSubmit}>
        <ThemedFormInput
          name="name"
          type="text"
          placeholder="Your Name"
          required
        />
        <ThemedFormInput
          name="phone"
          type="tel"
          placeholder="Your Phone Number"
          required
        />
        <ThemedFormButton isLoading={isLoading}>
          Submit Request
        </ThemedFormButton>
      </form>
      <button
        onClick={onBack}
        className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full text-center"
      >
        Cancel
      </button>
    </div>
  );
};

const EmailForm = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      from: email,
      subject: `New Message from ${email}`,
      htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;"><h2>New Chatbot Message</h2><p><strong>From:</strong> ${email}</p><p><strong>Message:</strong></p><blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin-left: 0;">${message.replace(/\n/g, "<br>")}</blockquote></div>`,
      confirmationSubject: "Thank you for your message!",
      confirmationHtml: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;"><h2>We've Received Your Message</h2><p>Hi there,</p><p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p><p><strong>Your original message:</strong></p><blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin-left: 0; background-color: #f9f9f9; padding: 10px;">${message.replace(/\n/g, "<br>")}</blockquote><p>Sincerely,<br>The Future&More Inc. Team</p></div>`,
    };
    const promise = fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
    toast.promise(promise, {
      loading: "Sending transmission...",
      success: (data) => {
        setSubmitted(true);
        setIsLoading(false);
        return "Message sent successfully!";
      },
      error: (err) => {
        setIsLoading(false);
        return "Transmission failed. Please try again.";
      },
    });
  };

  if (submitted) {
    return (
      <ActionViewWrapper
        icon={PaperAirplaneIcon}
        title="Message Sent!"
        onBack={onBack}
        buttonText="Close"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Thank you for your message. We'll get back to you soon.
        </p>
      </ActionViewWrapper>
    );
  }

  return (
    <div className="p-4">
      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 text-center">
        Send a Message
      </h4>
      <form onSubmit={handleSubmit}>
        <ThemedFormInput
          name="email"
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <ThemedFormTextarea
          name="message"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
        />
        <ThemedFormButton isLoading={isLoading}>Send Message</ThemedFormButton>
      </form>
      <button
        onClick={onBack}
        className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full text-center"
      >
        Cancel
      </button>
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [actionView, setActionView] = useState(null);
  const messagesEndRef = useRef(null);

  const [showPeek, setShowPeek] = useState(false);
  const peekIntervalRef = useRef(null);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      if (!isOpen) setShowPeek(true);
    }, 3000);
    peekIntervalRef.current = setInterval(() => {
      if (!isOpen) {
        setShowPeek(true);
        setTimeout(() => setShowPeek(false), 5000);
      }
    }, 15000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(peekIntervalRef.current);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startConversation = () => {
    setIsTyping(true);
    setTimeout(() => {
      const initialState = CHATBOT_DATA.states[CHATBOT_DATA.initial];
      setHistory([
        {
          sender: "bot",
          messages: initialState.messages,
          options: initialState.options,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen && history.length === 0) {
      startConversation();
    }
    if (isOpen) {
      setShowPeek(false);
    }
  }, [isOpen, history.length]);

  useEffect(() => {
    scrollToBottom();
  }, [history, actionView, isTyping]);

  const handleOptionClick = (option) => {
    const userMessage = {
      sender: "user",
      messages: [option.text],
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setIsTyping(true);
    setActionView(null);
    setTimeout(() => {
      if (option.next) {
        const nextState = CHATBOT_DATA.states[option.next];
        const botMessage = {
          sender: "bot",
          messages: nextState.messages,
          options: nextState.options,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setHistory([...newHistory, botMessage]);
      } else if (option.action) {
        setActionView(option.action);
      }
      setIsTyping(false);
    }, 1200);
  };

  const resetToMainMenu = () => {
    setActionView(null);
    const returnMessage = {
      sender: "user",
      messages: ["Take me back to the main menu."],
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const newHistory = [...history, returnMessage];
    setHistory(newHistory);
    setIsTyping(true);
    setTimeout(() => {
      const nextState = CHATBOT_DATA.states.intro;
      const botMessage = {
        sender: "bot",
        messages: ["Of course, let's go back. What would you like to explore?"],
        options: nextState.options,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setHistory([...newHistory, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const renderActionView = () => {
    switch (actionView) {
      case "live_chat":
        return <LiveChatView onBack={resetToMainMenu} />;
      case "callback":
        return <CallbackForm onBack={resetToMainMenu} />;
      case "email":
        return <EmailForm onBack={resetToMainMenu} />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const optionsContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };
  const optionVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "!bg-white/80 dark:!bg-gray-800/90 !text-gray-900 dark:!text-white !backdrop-blur-md !border !border-black/10 dark:!border-white/10",
          style: {
            // Deprecated in favor of className for Tailwind support
          },
        }}
      />
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative w-20 h-20">
          <AnimatePresence>
            {!isOpen && showPeek && <PeekFromSideAnimation />}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-20 h-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md text-gray-800 dark:text-white rounded-full shadow-2xl shadow-cyan-500/30 flex items-center justify-center overflow-hidden border border-black/10 dark:border-white/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <XMarkIcon className="w-8 h-8" />
                ) : (
                  <SparklesIcon className="w-8 h-8 text-cyan-500 dark:text-cyan-300" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-32 right-8 z-40 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-white/30 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden border border-black/10 dark:border-white/20"
          >
            <AuroraBackground />
            <div className="p-4 bg-white/30 dark:bg-black/30 border-b border-black/10 dark:border-white/10 flex items-center justify-center gap-2 flex-shrink-0">
              <SparklesIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-300" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                Genie-AI Assistant
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <AnimatePresence initial={false}>
                {actionView ? (
                  <motion.div
                    key="action-view"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderActionView()}
                  </motion.div>
                ) : (
                  history.map((entry, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-4"
                    >
                      <div
                        className={`chat ${entry.sender === "bot" ? "chat-start" : "chat-end"}`}
                      >
                        <div
                          className={`chat-bubble ${entry.sender === "bot" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"} font-normal shadow-md`}
                        >
                          {entry.messages.map((msg, i) => (
                            <p key={i} className="prose-sm whitespace-pre-wrap">
                              {msg}
                            </p>
                          ))}
                          <div
                            className={`text-xs mt-2 text-right ${entry.sender === "bot" ? "text-white/70" : "text-gray-500 dark:text-white/50"}`}
                          >
                            {entry.timestamp}
                          </div>
                        </div>
                      </div>
                      {entry.sender === "bot" &&
                        index === history.length - 1 &&
                        entry.options && (
                          <motion.div
                            variants={optionsContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-start gap-2 mt-4 ml-2"
                          >
                            {entry.options.map((opt, i) => (
                              <motion.button
                                key={i}
                                variants={optionVariant}
                                onClick={() => handleOptionClick(opt)}
                                className="px-4 py-2 text-sm bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:bg-cyan-100/50 dark:hover:bg-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400 text-gray-900 dark:text-white rounded-lg transition-all"
                              >
                                {opt.text}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                    </motion.div>
                  ))
                )}
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
