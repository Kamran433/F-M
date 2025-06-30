import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import MOCK_DATA from "../lib/data";

// --- ANIMATION VARIANTS ---
// Re-using the same consistent animations for a cohesive feel.
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

// --- SUB-COMPONENTS ---

const FounderCard = ({ founder }) => {
  const socialIconProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className:
      "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      className="group relative h-full flex flex-col rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 backdrop-blur-lg p-8 text-center transition-all duration-300 hover:border-purple-600/50 dark:hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className="relative mb-6 mx-auto">
        <img
          src={founder.imageUrl}
          alt={founder.name}
          className="w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-900/50 transition-all duration-300 group-hover:ring-purple-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/128x128/444/FFF?text=Profile";
          }}
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {founder.name}
      </h3>
      <p className="font-medium text-purple-600 dark:text-purple-400 mb-4">
        {founder.title}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
        {founder.bio}
      </p>

      <div className="mt-6 pt-6 border-t border-gray-200/80 dark:border-white/10 flex justify-center space-x-5">
        {founder.social.linkedin && (
          <motion.a href={founder.social.linkedin} {...socialIconProps}>
            <Linkedin size={20} />
          </motion.a>
        )}
        {founder.social.twitter && (
          <motion.a href={founder.social.twitter} {...socialIconProps}>
            <Twitter size={20} />
          </motion.a>
        )}
        {founder.social.github && (
          <motion.a href={founder.social.github} {...socialIconProps}>
            <Github size={20} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function AboutUsPage() {
  return (
    <div className="bg-white dark:bg-[#0A0A10] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Aurora Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[50%] h-[50%] bg-pink-400/20 dark:bg-pink-500/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
      </div>

      <main className="relative z-10 overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER_VARIANTS}
          className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24"
        >
          <motion.h1
            variants={FADE_IN_VARIANTS}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              {MOCK_DATA.companyName}
            </span>
          </motion.h1>
          <motion.p
            variants={FADE_IN_VARIANTS}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            The minds and mission fueling a revolution in artificial
            intelligence.
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <section className="py-24 sm:py-32 bg-gray-100 dark:bg-gray-900/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={FADE_IN_VARIANTS}
            className="max-w-screen-md mx-auto px-4 text-center"
          >
            <h2 className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-4 tracking-widest uppercase">
              Our Mission
            </h2>
            <p className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white leading-tight">
              "{MOCK_DATA.companyMission}"
            </p>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 sm:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={STAGGER_CONTAINER_VARIANTS}
            className="max-w-screen-lg mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <motion.div variants={FADE_IN_VARIANTS}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Beyond the Code: Our Guiding Philosophy
              </h2>
            </motion.div>
            <motion.div
              variants={FADE_IN_VARIANTS}
              className="space-y-6 text-gray-600 dark:text-gray-400 text-lg"
            >
              <p>
                We believe technology's true power is not in its complexity, but
                in its ability to amplify human potential. Our work is grounded
                in the conviction that AI should be a collaborative partner—a
                tool for insight, creativity, and progress.
              </p>
              <p>
                Every algorithm we design and every system we build is infused
                with a deep sense of responsibility. We are committed to
                creating transparent, ethical, and accessible AI that empowers
                communities and solves meaningful, real-world problems.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Founders Section */}
        <section className="py-24 sm:py-32 bg-gray-50 dark:bg-black/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={STAGGER_CONTAINER_VARIANTS}
            className="max-w-screen-xl mx-auto px-4"
          >
            <motion.div
              className="text-center mb-16"
              variants={FADE_IN_VARIANTS}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Meet The Founders
              </h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-cod-gray-400">
                The architects of our vision.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {MOCK_DATA.founders.map((founder) => (
                <FounderCard key={founder.name} founder={founder} />
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
