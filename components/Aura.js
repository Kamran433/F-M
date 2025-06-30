// components/Aura.js

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";

// --- CONFIGURATION & DATA ---
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5 || hour >= 22) return "Working late";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// DATA STRUCTURE NOW INCLUDES A `component` TYPE FOR RICH CONTENT
const AURA_DATA = {
  initial: "intro",
  states: {
    intro: {
      messages: [
        `${getGreeting()}. I'm Aura, the AI assistant for Future&More Inc.`,
        "How can I assist you today?",
      ],
      options: [
        { text: "Services & Solutions", next: "services_overview" },
        { text: "Project Workflow", next: "process_overview" },
        { text: "Company Information", next: "company_overview" },
      ],
    },
    services_overview: {
      messages: [
        "We specialize in three core areas of AI-driven enterprise solutions. Which would you like to explore?",
      ],
      options: [
        { text: "AI-Powered Automation", next: "services_automation" },
        { text: "Advanced Data Analytics", next: "services_analytics" },
        { text: "Custom AI Development", next: "services_custom" },
        { text: "Back", next: "intro" },
      ],
    },
    process_overview: {
      // THIS STATE NOW TRIGGERS A CUSTOM REACT COMPONENT
      component: "ProjectTimeline",
      messages: [
        "We follow a structured, four-phase process to ensure project success and alignment.",
      ],
      options: [
        { text: "Tell me about pricing", next: "pricing" },
        { text: "Contact an expert", next: "escalate" },
        { text: "Go back", next: "intro" },
      ],
    },
    company_overview: {
      messages: [
        "Our mission is to integrate intelligent automation to solve complex business challenges. We are a team of expert engineers, data scientists, and strategists.",
      ],
      options: [
        { text: "Explore services", next: "services_overview" },
        { text: "Back", next: "intro" },
      ],
    },
    // Fallback for when the bot can't handle free text
    fallback: {
      messages: [
        "I'm still learning to process complex queries. My capabilities are currently focused on guiding you through our services.",
        "Please select one of the options, or rephrase your question.",
      ],
      options: [
        { text: "Services & Solutions", next: "services_overview" },
        { text: "Project Workflow", next: "process_overview" },
        { text: "Contact Us", next: "escalate" },
      ],
    },
    escalate: {
      messages: [
        "The best way to get detailed answers is to speak with a human expert. How would you like to connect?",
      ],
      options: [
        { text: "Schedule a Call", action: "callback" },
        { text: "Send an Email", action: "email" },
      ],
    },
    // ... other states from previous example can be added here
  },
};

// --- ADVANCED UI & VISUAL COMPONENTS ---

const InteractiveAuroralBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 -z-10 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsla(210, 80%, 30%, 0.2), transparent 40%)`,
      }}
    />
  );
};

// --- RICH CONTENT COMPONENT EXAMPLE ---

const ProjectTimeline = memo(() => {
  const phases = [
    {
      name: "Phase 1: Discovery",
      duration: "1-2 Weeks",
      description: "Deep dive into goals, data, and infrastructure.",
    },
    {
      name: "Phase 2: Strategy",
      duration: "1 Week",
      description: "Architect solution & define project roadmap.",
    },
    {
      name: "Phase 3: Development",
      duration: "4-8 Weeks",
      description: "Agile sprints for building and integration.",
    },
    {
      name: "Phase 4: Deployment",
      duration: "Ongoing",
      description: "Launch, monitor, and provide support.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      className="bg-slate-700/30 dark:bg-slate-800/50 p-4 rounded-lg border border-white/10 mt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {phases.map((phase, index) => (
        <motion.div
          key={phase.name}
          className="relative flex items-start pb-4"
          variants={itemVariants}
        >
          <div className="absolute top-3 left-[18px] -ml-px h-full w-0.5 bg-slate-500/30"></div>
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center ring-4 ring-slate-800/50 dark:ring-slate-900/50 font-bold">
              {index + 1}
            </div>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-slate-800 dark:text-white">
              {phase.name}{" "}
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                ({phase.duration})
              </span>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {phase.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
});

// --- MEMOIZED & OPTIMIZED UI SUB-COMPONENTS ---

const AuraAvatar = memo(() => (
  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center ring-4 ring-white dark:ring-slate-950 flex-shrink-0">
    <SparklesIcon className="w-5 h-5 text-blue-500" />
  </div>
));

const MessageBubble = memo(({ entry, theme }) => {
  const isBot = entry.sender === "bot";
  const bubbleClass = isBot
    ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
    : "bg-blue-600 text-white";

  return (
    <div className={`chat ${isBot ? "chat-start" : "chat-end"}`}>
      {isBot && (
        <div className="chat-image">
          <AuraAvatar />
        </div>
      )}
      <div className={`chat-bubble ${bubbleClass} shadow-md`}>
        {entry.messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
        {entry.component && entry.component === "ProjectTimeline" && (
          <ProjectTimeline theme={theme} />
        )}
      </div>
    </div>
  );
});

const OptionButton = memo(({ option, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-full text-left flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors duration-200"
    whileTap={{ scale: 0.98 }}
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <span className="text-slate-700 dark:text-slate-200">{option.text}</span>
    <ChevronRightIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
  </motion.button>
));

const TypingIndicator = memo(() => (
  <div className="chat chat-start">
    <div className="chat-image">
      <AuraAvatar />
    </div>
    <div className="chat-bubble bg-slate-200 dark:bg-slate-800 flex items-center gap-1.5 p-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 bg-slate-400 dark:bg-slate-600 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </div>
));

const ChatInput = memo(({ onSend, isTyping }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSend(input);
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSend}
      className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800"
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
});

// --- MAIN AURA COMPONENT ---

export default function Aura() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("dark");
  const messagesEndRef = useRef(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startConversation = () => {
    setIsTyping(true);
    setTimeout(() => {
      const initialState = AURA_DATA.states[AURA_DATA.initial];
      setHistory([
        {
          sender: "bot",
          messages: initialState.messages,
          options: initialState.options,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const processBotResponse = (nextStateKey) => {
    const nextState = AURA_DATA.states[nextStateKey];
    if (!nextState) return;

    const botMessage = {
      sender: "bot",
      messages: nextState.messages,
      options: nextState.options,
      component: nextState.component, // Pass component info
    };

    setHistory((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleUserMessage = (text, type = "text") => {
    const userMessage = { sender: "user", messages: [text] };
    setHistory((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      if (type === "option") {
        processBotResponse(text); // 'text' here is the 'next' key
      } else {
        // Basic check for keywords, replace with actual NLP later
        if (text.toLowerCase().includes("service")) {
          processBotResponse("services_overview");
        } else {
          processBotResponse("fallback");
        }
      }
    }, 1200);
  };

  // Auto-scroll on new messages
  useEffect(scrollToBottom, [history, isTyping]);

  // Start conversation when opened for the first time
  useEffect(() => {
    if (isOpen && history.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const containerVariants = {
    closed: { opacity: 0, y: 20, scale: 0.95 },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: `dark:bg-slate-700 dark:text-white`,
        }}
      />

      {/* --- Chat Toggle Button --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-lg dark:shadow-blue-900/50 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7 text-slate-600 dark:text-slate-300" />
              ) : (
                <SparklesIcon className="w-7 h-7 text-blue-500" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <div className={`fixed bottom-24 right-6 z-40 ${theme}`}>
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <InteractiveAuroralBackground />
              {/* Header */}
              <div className="flex-shrink-0 p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                  Aura Assistant
                </h3>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {theme === "light" ? (
                    <MoonIcon className="w-5 h-5 text-slate-600" />
                  ) : (
                    <SunIcon className="w-5 h-5 text-yellow-400" />
                  )}
                </button>
              </div>

              {/* Message Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <AnimatePresence initial={false}>
                  {history.map((entry, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <MessageBubble entry={entry} theme={theme} />
                      {entry.sender === "bot" && entry.options && (
                        <motion.div
                          className="mt-4 space-y-2"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                          }}
                        >
                          {entry.options.map((opt) => (
                            <OptionButton
                              key={opt.next || opt.action}
                              option={opt}
                              onClick={() =>
                                handleUserMessage(
                                  opt.next || opt.action,
                                  "option"
                                )
                              }
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <ChatInput
                onSend={(text) => handleUserMessage(text, "text")}
                isTyping={isTyping}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
