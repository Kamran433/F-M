import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  CloudCog,
  Sparkles,
  UsersRound,
  ArrowRight,
  Target,
  Users,
  Zap,
  ArrowDown,
} from "lucide-react";
import MOCK_DATA from "../lib/data";

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

// --- ICON MAPPING ---
const serviceIcons = { Cpu, CloudCog, Sparkles, UsersRound };
const benefitIcons = { Target, Users, Zap };

// --- REDESIGNED COMPONENTS ---

const ServiceCard = ({ service }) => {
  const IconComponent = serviceIcons[service.icon];
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      onMouseMove={handleMouseMove}
      className="group relative h-full flex flex-col rounded-2xl bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 p-8 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
                    radial-gradient(
                        350px circle at ${mouseX}px ${mouseY}px,
                        rgba(168, 85, 247, 0.15),
                        transparent 80%
                    )
                `,
        }}
      />
      <div className="mb-6 self-start p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-200/80 dark:border-white/10">
        {IconComponent && (
          <IconComponent
            size={32}
            className="text-purple-600 dark:text-purple-400"
          />
        )}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 text-left">
        {service.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow text-left">
        {service.description}
      </p>
      <Link href="/contact" legacyBehavior>
        <a className="group/link mt-6 self-start inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-300">
          Inquire Now
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </Link>
    </motion.div>
  );
};

const BenefitCard = ({ icon, title, children }) => {
  const IconComponent = benefitIcons[icon];
  return (
    <motion.div variants={FADE_IN_VARIANTS}>
      <div className="flex items-center mb-4">
        <div className="p-3 mr-4 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
          {IconComponent && <IconComponent size={24} />}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 md:pl-16">{children}</p>
    </motion.div>
  );
};

// --- MAIN SERVICES PAGE COMPONENT ---
export default function ServicesPage() {
  const ctaButtonProps = {
    className:
      "inline-block px-8 py-4 text-lg font-bold rounded-lg text-white transition-all duration-300",
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.98 },
  };

  // Helper component for full-screen sections
  const FullScreenSection = ({ children, className = "" }) => (
    <section
      className={`min-h-screen w-full flex flex-col justify-center snap-start relative ${className}`}
    >
      {children}
    </section>
  );

  return (
    <div className="bg-white dark:bg-[#0A0A10] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <main className="h-screen w-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        {/* Background Gradients - persistent across all sections */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-400/20 dark:bg-teal-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-15%] w-[50%] h-[50%] bg-sky-400/20 dark:bg-sky-500/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
        </div>

        {/* Hero Section */}
        <FullScreenSection>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER_VARIANTS}
            className="relative text-center px-4"
          >
            <motion.h1
              variants={FADE_IN_VARIANTS}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
            >
              End-to-End{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500">
                AI Solutions
              </span>
            </motion.h1>
            <motion.p
              variants={FADE_IN_VARIANTS}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              We architect and deploy intelligent systems that unlock new
              efficiencies, drive innovation, and future-proof your business.
            </motion.p>
            <motion.div variants={FADE_IN_VARIANTS} className="mt-10">
              <Link href="/contact" legacyBehavior>
                <motion.a
                  {...ctaButtonProps}
                  className={`${ctaButtonProps.className} bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-cyan-500/20`}
                >
                  Get a Free Consultation
                </motion.a>
              </Link>
            </motion.div>
            <motion.div
              variants={FADE_IN_VARIANTS}
              className="absolute bottom-[-15vh] sm:bottom-[-20vh] left-1/2 -translate-x-1/2"
            >
              <ArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-600 animate-bounce" />
            </motion.div>
          </motion.div>
        </FullScreenSection>

        {/* Core Services Section */}
        <FullScreenSection className="py-24 bg-gray-50 dark:bg-black/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={STAGGER_CONTAINER_VARIANTS}
            className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          >
            <motion.div
              className="text-center mb-16"
              variants={FADE_IN_VARIANTS}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Our Core Offerings
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We provide a comprehensive suite of services to meet your every
                AI need.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_DATA.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </motion.div>
        </FullScreenSection>

        {/* Why Partner With Us? Section */}
        <FullScreenSection className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={STAGGER_CONTAINER_VARIANTS}
            className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={FADE_IN_VARIANTS}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Strategic AI Partner
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Choosing the right partner is critical. We combine technical
                excellence with a deep commitment to your success, ensuring your
                AI initiatives deliver measurable results.
              </p>
            </motion.div>
            <div className="space-y-10">
              <BenefitCard icon="Target" title="Bespoke Solutions">
                We don't do one-size-fits-all. Every solution is meticulously
                crafted to align with your specific business context and
                objectives.
              </BenefitCard>
              <BenefitCard icon="Users" title="Expert-Led Teams">
                Your project will be handled by a dedicated team of leading AI
                researchers, engineers, and strategists at every stage.
              </BenefitCard>
              <BenefitCard icon="Zap" title="Future-Proof Technology">
                We build with scalability and adaptability in mind, ensuring
                your investment remains valuable as technology evolves.
              </BenefitCard>
            </div>
          </motion.div>
        </FullScreenSection>

        {/* Final CTA Section */}
        <FullScreenSection className="py-24 bg-gray-50 dark:bg-black/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={FADE_IN_VARIANTS}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Let's discuss how our AI solutions can help you achieve your
              goals. Schedule a complimentary consultation with our experts
              today.
            </p>
            <div className="mt-8">
              <Link href="/contact" legacyBehavior>
                <motion.a
                  {...ctaButtonProps}
                  className={`${ctaButtonProps.className} bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/20`}
                >
                  Schedule Your Call
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </FullScreenSection>
      </main>
    </div>
  );
}
