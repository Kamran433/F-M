import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MOCK_DATA from "../lib/data"; // Assuming this file exports your contact email etc.
import {
  Send,
  MailCheck,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// --- ANIMATION VARIANTS ---
const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// --- REFINED FLOATING INPUT COMPONENT ---
const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  as = "input",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const InputElement = as;

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none origin-top-left
          ${
            isFocused || hasValue
              ? "text-xs -translate-y-2.5 scale-95 bg-white dark:bg-[#111118] px-1 text-purple-600 dark:text-purple-400"
              : "translate-y-3.5 text-base text-gray-500 dark:text-gray-400"
          }`}
      >
        {label}
      </motion.label>
      <InputElement
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={as === "textarea" ? 5 : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/20 border-2 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-0 outline-none transition-colors duration-300"
      />
    </div>
  );
};

// --- MAIN CONTACT PAGE COMPONENT ---
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const promise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    toast.promise(promise, {
      loading: "Sending your message...",
      success: (res) => {
        if (!res.ok) {
          // If the server responds with an error status, throw an error to be caught by the .error block
          throw new Error("Something went wrong on the server.");
        }
        setIsLoading(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
        setTimeout(() => setIsSubmitted(false), 5000); // Reset to show form again after 5s
        return "Message sent successfully!";
      },
      error: (err) => {
        setIsLoading(false);
        return err.toString() || "An unexpected error occurred.";
      },
    });
  };

  const socialIconProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className:
      "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
  };

  const submitButtonProps = {
    className:
      "w-full px-8 py-4 text-base sm:text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/20 transform transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed",
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A10] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[5%] left-[5%] w-[50%] h-[50%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-teal-400/20 dark:bg-teal-500/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
      </div>

      <main className="relative z-10 pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER_VARIANTS}
        >
          {/* Page Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            variants={FADE_IN_VARIANTS}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
                Connect
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to learn more? We're here to talk
              and help you build the future.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form / Success Message Column */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 sm:p-12 rounded-2xl text-center h-full flex flex-col justify-center items-center"
                  >
                    <MailCheck className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      Message Sent!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for reaching out. We'll be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 sm:p-10 rounded-2xl"
                    variants={FADE_IN_VARIANTS}
                  >
                    <FloatingInput
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <FloatingInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <FloatingInput
                      label="Subject / Project Inquiry"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <FloatingInput
                      label="Your Message"
                      name="message"
                      as="textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        {...submitButtonProps}
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-t-2 border-white"></div>
                        ) : (
                          <>
                            Send Message{" "}
                            <Send className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Info Column */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              variants={STAGGER_CONTAINER_VARIANTS}
            >
              <motion.div
                variants={FADE_IN_VARIANTS}
                className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />{" "}
                  Location
                </h3>
                <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-white/10 opacity-70">
                  <img
                    src="images/maps amazing.jpg"
                    alt="Abstract world map"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                variants={FADE_IN_VARIANTS}
                className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />{" "}
                  General Inquiries
                </h3>
                <a
                  href={`mailto:${MOCK_DATA.contactEmail}`}
                  className="font-medium text-purple-600 dark:text-purple-400 hover:underline break-all"
                >
                  {MOCK_DATA.contactEmail}
                </a>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Mon - Fri, 9:00 AM - 6:00 PM (IST)
                </p>
              </motion.div>
              <motion.div
                variants={FADE_IN_VARIANTS}
                className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-5">
                  <motion.a href="#" {...socialIconProps}>
                    <Twitter size={24} />
                  </motion.a>
                  <motion.a href="#" {...socialIconProps}>
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a href="#" {...socialIconProps}>
                    <Github size={24} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
