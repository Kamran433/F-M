import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { PAGE_DATA } from "../lib/home-page-data";
import React, { useRef, Suspense, useMemo, isLoading } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  Float,
  TorusKnot,
  Icosahedron,
  Environment,
  SpotLight,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowRightIcon,
  CpuChipIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import { PlayCircle } from "lucide-react";
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- CORE LAYOUT & ANIMATION VARIANTS ---

const Chatbot = dynamic(
  () => import("../components/Chatbot"), // <-- 2. The path to your Chatbot component
  { ssr: false } // <-- 3. This is the magic part!
);

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

// --- 3D SCENES ---
function BackgroundStars({ count = 5000 }) {
  return (
    <Stars
      radius={100}
      depth={50}
      count={count}
      factor={5}
      saturation={0}
      fade
      speed={1.5}
    />
  );
}

const DynamicAIGlobe = () => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
    ref.current.scale.setScalar(Math.sin(t * 0.5) * 0.1 + 1);
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <Icosahedron args={[2.2, 8]}>
          <meshStandardMaterial
            wireframe
            color="#f472b6"
            emissive="#db2777"
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>
        <Icosahedron args={[1, 8]} scale={0.8} rotation-y={Math.PI / 4}>
          <meshStandardMaterial
            wireframe
            color="#a855f7"
            emissive="#a855f7"
            roughness={0.1}
            metalness={1}
          />
        </Icosahedron>
      </Float>
    </group>
  );
};

const InteractiveShape = ({ color }) => {
  const meshRef = useRef();
  const { viewport } = useThree(); // Gets screen dimensions

  // This hook runs on every frame
  useFrame((state) => {
    if (meshRef.current) {
      // Get mouse position (normalized from -1 to 1)
      const { mouse } = state;
      const targetX = (mouse.x * viewport.width) / 8;
      const targetY = (mouse.y * viewport.height) / 8;

      // Smoothly interpolate the mesh rotation towards the mouse position
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        -targetX,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -targetY,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <TorusKnot args={[1.5, 0.5, 128, 32]} scale={0.8}>
          {/* This is the new "amazing" material. It creates a glassy,
            refractive look that's far more complex and beautiful.
          */}
          <MeshTransmissionMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transmission={0.98} // How much light passes through (0-1)
            roughness={0.05}
            metalness={0.05}
            ior={1.2} // Index of Refraction
            thickness={1.5}
            chromaticAberration={0.06} // Adds rainbow-like color separation
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
          />
        </TorusKnot>
      </Float>
    </group>
  );
};

const TestimonialScene = ({ color = "#8A2BE2" }) => {
  return (
    <>
      <color attach="background" args={["#100520"]} />
      <fog attach="fog" args={["#100520", 5, 25]} />
      <Stars
        radius={50}
        depth={10}
        count={3000}
        factor={4}
        saturation={1}
        fade
        speed={1.5}
      />

      <Environment preset="city" />

      <ambientLight intensity={1} />
      <SpotLight
        penumbra={1}
        position={[8, 8, 8]}
        angle={0.3}
        intensity={10}
        color={color}
        castShadow
      />
      <directionalLight intensity={3} position={[-5, -5, -5]} color="#ff80ff" />

      <InteractiveShape color={color} />

      {/*
        FIX: The EffectComposer and its children (Bloom, Vignette)
        have been completely removed to resolve the ReferenceError.
        Atmospheric effects are now handled by fog and enhanced lighting.
      */}
    </>
  );
};

// --- REDESIGNED COMPONENTS ---

const Section = ({ children, className = "", ...props }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
    className={`relative container mx-auto px-4 py-24 md:py-32 ${className}`}
    {...props}
  >
    {children}
  </motion.section>
);

const titleAnimation = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 },
  },
};

const SectionPreamble = ({ subtitle, title, description }) => (
  <motion.div
    variants={FADE_IN_VARIANTS}
    className="text-center max-w-3xl mx-auto mb-16"
  >
    {subtitle && (
      <p className="text-base font-semibold text-purple-600 dark:text-purple-400 tracking-wider uppercase mb-3">
        {subtitle}
      </p>
    )}
    <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
        {description}
      </p>
    )}
  </motion.div>
);

const HeroSection = () => {
  const heroRef = useRef(null);

  // Values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smoother parallax
  const smoothX = useSpring(x, { stiffness: 400, damping: 40 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 40 });

  // Parallax transformations for different layers
  const gridTransform = useTransform(smoothY, [0.5, -0.5], ["-20px", "20px"]);
  const textTransform = useTransform(smoothY, [0.5, -0.5], ["15px", "-15px"]);
  const buttonsTransform = useTransform(
    smoothY,
    [0.5, -0.5],
    ["25px", "-25px"]
  );

  const handleMouseMove = (event) => {
    if (heroRef.current) {
      const { clientX, clientY } = event;
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const xPercent = (clientX - left) / width - 0.5;
      const yPercent = (clientY - top) / height - 0.5;
      x.set(xPercent);
      y.set(yPercent);
    }
  };

  return (
    // FIX 1: The outer section is now `h-screen` (full viewport height) and most importantly,
    // `overflow-hidden` has been REMOVED. This allows the background to fill the space
    // without being clipped. The top padding has also been removed from this element.
    <motion.section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center text-center px-4"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* All background elements are absolutely positioned to fill this container */}
      <motion.div
        style={{ translateY: gridTransform }}
        className="absolute inset-0 z-[-2] h-full w-full bg-white dark:bg-[#0A0A10] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [animation:animate-grid_10s_linear_infinite]"
      />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(168,85,247,0.15),transparent)]" />

      {/* This is the container for the 3D mesh Canvas */}
      <div className="absolute inset-0 z-[-1] opacity-30 dark:opacity-40">
        <Suspense fallback={null}>
          <Canvas>
            <DynamicAIGlobe />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0A0A10]"></div>

      {/* --- FOREGROUND CONTENT --- */}
      {/* FIX 2: The content is in a separate container. The top padding (`pt-24 sm:pt-32`)
          is applied HERE to push the text and buttons down, below your navbar. */}
      <motion.div
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center pt-24 sm:pt-32"
      >
        <motion.div
          style={{ translateY: textTransform }}
          className="flex flex-col items-center"
        >
          <motion.div variants={FADE_IN_VARIANTS} className="mb-8">
            <p className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 dark:bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600 dark:bg-purple-500"></span>
              </span>
              Currently in Production Mode
            </p>
          </motion.div>

          <motion.h1
            variants={FADE_IN_VARIANTS}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            <span className="inline-block overflow-hidden">
              <motion.span variants={titleAnimation} className="inline-block">
                {PAGE_DATA.hero.title}
              </motion.span>
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              <span className="inline-block overflow-hidden">
                <motion.span variants={titleAnimation} className="inline-block">
                  {PAGE_DATA.hero.titleGradient}
                </motion.span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={FADE_IN_VARIANTS}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {PAGE_DATA.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ translateY: buttonsTransform }}
          variants={FADE_IN_VARIANTS}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            <span className="relative flex items-center">
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="/demo"
            className="group inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-transparent hover:bg-gray-900/5 dark:hover:bg-white/10 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300"
          >
            <PlayCircle className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            Request a Demo
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const techStack = [
  {
    name: "Gemini",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg",
  },
  {
    name: "OpenAI",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/openai-icon.svg",
  },
  {
    name: "Claude",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.svg", // Assuming a white version for dark backgrounds
  },
  {
    name: "TensorFlow",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-tensorflow-icon.svg",
  },
  {
    name: "Kubernetes",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/kubernetes-icon.svg",
  },
  {
    name: "Docker",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/docker-icon.svg",
  },
  {
    name: "React",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/react-js-icon.svg",
  },
  {
    name: "Next.js",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.svg",
  },
  {
    name: "Figma",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/figma-icon.svg",
  },
  {
    name: "Google Cloud",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-google-cloud-logo-icon-download-in-svg-png-gif-file-formats--weather-storage-data-pack-logos-icons-1721675.png?f=webp&w=512",
  },
  {
    name: "AWS",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-aws-logo-icon-download-in-svg-png-gif-file-formats--cloud-computing-network-server-database-brand-pack-logos-icons-1583149.png?f=webp&w=512",
  },
  {
    name: "Azure",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/azure-icon.svg",
  },
  {
    name: "Tableau",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-tableau-icon-download-in-svg-png-gif-file-formats--software-logo-freebies-pack-logos-icons-4489897.png?f=webp&w=512",
  },
  {
    name: "Power BI",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/power-bi-icon.svg",
  },
];

const TrustedBySection = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 600, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-8 tracking-wider uppercase">
          OUR TECHNOLOGY STACK
        </p>
        <Slider {...settings}>
          {techStack.map((tech) => (
            <div key={tech.name} className="px-2 mt-8">
              <div className="flex flex-col items-center justify-center gap-4 transition-transform duration-300 hover:scale-110 group">
                {/*
                  FIX: The wrapper now uses a solid, light slate background in BOTH light and dark modes.
                  This provides a high-contrast, neutral canvas that ensures every logo is 100% visible.
                */}
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center p-2.5 transition-all duration-300 group-hover:bg-slate-200 shadow-sm">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, name, description }) => (
  <motion.div
    variants={FADE_IN_VARIANTS}
    className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200/80 dark:border-white/10 transition-all duration-300 overflow-hidden hover:shadow-xl dark:hover:border-purple-500/30"
  >
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="mb-5 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const ServicesSection = () => (
  <Section>
    <SectionPreamble
      subtitle="Our Services"
      title={PAGE_DATA.services.title}
      description={PAGE_DATA.services.description}
    />
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {PAGE_DATA.services.items.map((service) => (
        <FeatureCard key={service.name} icon={service.icon} {...service} />
      ))}
    </motion.div>
  </Section>
);

const TechStackSection = () => (
  <Section>
    <SectionPreamble
      subtitle="Our Technology"
      title={PAGE_DATA.techStack.title}
      description="We leverage the best and latest technologies to deliver robust, scalable, and cutting-edge solutions for your business."
    />
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {PAGE_DATA.techStack.items.map((tech) => (
        <motion.div
          key={tech.name}
          variants={FADE_IN_VARIANTS}
          /*
            THE FIX:
            - `relative` is added to enable z-index stacking.
            - `hover:z-10` lifts the card above its container on hover, preventing it from being clipped.
          */
          className="relative p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200/80 dark:border-white/10 transition-all duration-300 hover:border-purple-600/30 dark:hover:border-purple-500/30 hover:shadow-lg hover:scale-[0.95] hover:-translate-y-1 hover:z-10"
        >
          <div className="flex items-center mb-4">
            {/* Kept the improved dark mode visibility for the icon background */}
            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center mr-4">
              <tech.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {tech.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            {tech.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-900/40 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const TestimonialsSection = () => (
  <Section>
    <SectionPreamble subtitle="Testimonials" title="Loved by Teams Worldwide" />
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {PAGE_DATA.testimonials.items.map((testimonial) => (
        <motion.div
          key={testimonial.name}
          variants={FADE_IN_VARIANTS}
          className="relative p-8 rounded-2xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200/50 dark:border-white/10 backdrop-blur-md"
        >
          <div className="h-48 w-full mb-8 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                gl={{ antialias: true }}
              >
                <TestimonialScene color={testimonial.color} />
              </Canvas>
            </Suspense>
          </div>
          <p className="relative text-lg italic text-gray-700 dark:text-gray-300 z-10">
            "{testimonial.quote}"
          </p>
          <div className="relative z-10 mt-6 pt-4 border-t border-gray-200/50 dark:border-white/10">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {testimonial.name}
            </p>
            <p className="font-semibold" style={{ color: testimonial.color }}>
              {testimonial.title}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const CallToActionSection = () => (
  <Section className="text-center">
    <motion.div
      variants={FADE_IN_VARIANTS}
      className="relative p-10 md:p-16 rounded-3xl overflow-hidden bg-white dark:bg-transparent border border-gray-200/50 dark:border-purple-500/20"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(138, 43, 226, 0.1), transparent 70%)",
      }}
    >
      <div className="absolute inset-0 z-[-1] bg-gray-50 dark:bg-gray-900/50 rounded-3xl"></div>
      <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {PAGE_DATA.cta.title}
      </h2>
      <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {PAGE_DATA.cta.subtitle}
      </p>
      <div className="mt-10">
        <Link href="/contact" legacyBehavior>
          <a className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all duration-300">
            {PAGE_DATA.cta.buttonText}
            <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </Link>
      </div>
    </motion.div>
  </Section>
);

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #a855f7,
            #f472b6,
            #ef4444,
            #a855f7
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-flow 3s ease infinite;
        }
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .group-hover\\:pause:hover .animate-scroll {
          animation-play-state: paused;
        }
        .chat {
          display: grid;
          grid-template-columns: 1fr;
          margin-bottom: 1rem;
        }
        .chat-start {
          justify-items: start;
        }
        .chat-end {
          justify-items: end;
        }
        .chat-bubble {
          max-width: 90%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          word-wrap: break-word;
        }
      `}</style>
      <div className="bg-white dark:bg-[#0A0A10] text-gray-800 dark:text-gray-300 font-sans antialiased transition-colors duration-300">
        {/* Background Gradients & Effects */}
        <div
          className="fixed inset-0 z-[-2] bg-white dark:bg-[#0A0A10]"
          style={{
            background:
              "radial-gradient(circle at top center, rgba(120, 80, 220, 0.05), transparent 50%)",
            // The dark mode version of this gradient is applied via a sibling div below for simplicity
          }}
        ></div>
        <div
          className="fixed inset-0 z-[-2] hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at top center, rgba(168, 85, 247, 0.1), transparent 40%)",
          }}
        ></div>
        <div className="fixed inset-0 z-[-1] opacity-50 dark:opacity-60">
          <Suspense fallback={null}>
            <Canvas>
              <BackgroundStars />
            </Canvas>
          </Suspense>
        </div>

        {/* Page Content */}
        <main className="relative z-10">
          <HeroSection />
          <TrustedBySection />
          <ServicesSection />
          <TechStackSection />
          <TestimonialsSection />
          <CallToActionSection />
        </main>
        <Chatbot />
      </div>
    </>
  );
}
