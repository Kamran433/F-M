import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  Mic,
  ShieldCheck,
  Search,
  Activity,
  LockKeyhole,
  Mail,
  ArrowLeft, // --- NEW: Imported an icon for the dialog
} from "lucide-react";
import MOCK_DATA from "../../lib/data";
import { useRef, useState, useMemo } from "react"; // --- MODIFIED: Imported useState

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

const DIALOG_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};
// --- ICON MAPPING ---
const productIcons = { Bot, Mic, ShieldCheck, Search, Activity };

// --- LIST OF ALLOWED EMAILS ---
// --- NEW: Add your list of allowed email addresses here
const getallowedEmails = () => {
  const emailsStr = process.env.NEXT_PUBLIC_ALLOWED_EMAILS || "";
  if (!emailsStr) {
    console.warn("ALLOWED_EMAILS environment variable is not set.");
    return new Set();
  }
  return new Set(
    emailsStr.split(",").map((email) => email.trim().toLowerCase())
  );
};

// --- NEW: VERIFICATION DIALOG COMPONENT ---
const VerificationDialog = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a network delay for a realistic feel
    setTimeout(() => {
      const success = onVerify(email);
      if (!success) {
        setError("Access Denied. Please check your email and try again.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Full-screen backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Dialog Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="relative z-10 w-full max-w-md p-8 overflow-hidden bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-xl"
      >
        <motion.div
          variants={DIALOG_VARIANTS}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex items-center justify-center w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full"
          >
            <LockKeyhole className="w-7 h-7 text-purple-500 dark:text-purple-400" />
          </motion.div>

          {/* Text Content */}
          <motion.h2
            variants={ITEM_VARIANTS}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Internal Preview
          </motion.h2>
          <motion.p
            variants={ITEM_VARIANTS}
            className="mt-2 text-sm text-gray-700 dark:text-gray-300"
          >
            Please enter your company email to access our new product suite.
          </motion.p>
          <motion.p
            variants={ITEM_VARIANTS}
            className="mt-3 px-4 text-xs text-gray-500 dark:text-gray-400"
          >
            These innovations are in a private beta for internal testing and
            feedback before our public launch.
          </motion.p>

          {/* Form */}
          <motion.form
            variants={ITEM_VARIANTS}
            onSubmit={handleSubmit}
            className="mt-6 text-left"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@futuremoreai.com"
                required
                className="w-full pl-10 pr-4 py-3 text-gray-900 bg-white/80 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 placeholder:text-gray-500 dark:text-white"
              />
            </div>

            {error && (
              <p className="mt-2 text-xs text-center text-rose-500 dark:text-rose-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:ring-offset-gray-900 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? "Verifying..." : "Verify Access"}
            </button>
          </motion.form>

          {/* Go Home Button */}
          <motion.div variants={ITEM_VARIANTS} className="mt-6">
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-500/10 dark:bg-gray-800/20 rounded-md hover:bg-gray-500/20 dark:hover:bg-gray-800/40 transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" />
                Go back to Home
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- REDESIGNED PRODUCT CARD ---
const ProductCard = ({ product }) => {
  const IconComponent = productIcons[product.icon];
  const themeColorClasses = {
    indigo: "from-indigo-500/50",
    sky: "from-sky-500/50",
    rose: "from-rose-500/50",
    amber: "from-amber-500/50",
    teal: "from-teal-500/50",
  };
  const currentTheme =
    themeColorClasses[product.themeColor] || themeColorClasses.indigo;
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // For 3D Tilt Effect
  const springConfig = { stiffness: 150, damping: 20 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-100, 100], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    springConfig
  );

  const handleMouseMove3D = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };
  const handleMouseLeave3D = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove3D}
      onMouseLeave={handleMouseLeave3D}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={FADE_IN_VARIANTS}
      className="relative h-full"
    >
      <Link href={`/products/${product.id}`} legacyBehavior>
        <a className="group block h-full">
          <div
            onMouseMove={handleMouseMove}
            className="relative h-full flex flex-col rounded-2xl bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 p-1 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            {/* Interactive Glow Effect */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                      400px circle at ${mouseX}px ${mouseY}px,
                      rgba(168, 85, 247, 0.1),
                      transparent 80%
                  )
                `,
              }}
            />

            {/* Card Content */}
            <div className="relative h-full flex flex-col rounded-xl bg-white dark:bg-[#111118] overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/111/FFF?text=Image";
                  }}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      product.themeColor
                        ? `text-${product.themeColor}-500 dark:text-${product.themeColor}-400`
                        : "text-indigo-500 dark:text-indigo-400"
                    }`}
                  >
                    {product.category}
                  </p>
                  {IconComponent && (
                    <div className="bg-gray-100 dark:bg-gray-900/70 p-2.5 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <IconComponent
                        className={`w-5 h-5 ${
                          product.themeColor
                            ? `text-${product.themeColor}-500 dark:text-${product.themeColor}-400`
                            : "text-indigo-500 dark:text-indigo-400"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {product.tagline}
                </p>
                <div className="mt-4 flex items-center font-semibold text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

// --- MAIN PRODUCTS PAGE COMPONENT ---
export default function ProductsPage() {
  const ALLOWED_EMAILS = useMemo(() => getallowedEmails(), []);

  const [isVerified, setIsVerified] = useState(false);

  // Pass the set down to the dialog component
  const onVerify = (email) => {
    if (ALLOWED_EMAILS.has(email.toLowerCase())) {
      setIsVerified(true);
      return true;
    }
    return false;
  }; // --- NEW: State to control access

  const flagshipProducts = MOCK_DATA.products.filter(
    (p) => p.type === "flagship"
  );
  const secondaryProducts = MOCK_DATA.products.filter(
    (p) => p.type === "secondary"
  );

  return (
    // --- MODIFIED: Added a wrapper fragment and the dialog
    <>
      {!isVerified && <VerificationDialog onVerify={onVerify} />}

      {/* --- MODIFIED: Added conditional blur and transition class */}
      <div
        className={`min-h-screen bg-white dark:bg-[#0A0A10] text-gray-800 dark:text-gray-200 transition-all duration-500 ${!isVerified ? "blur-md" : "blur-none"}`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-400/20 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[5%] left-[-15%] w-[50%] h-[50%] bg-rose-400/20 dark:bg-rose-500/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
        </div>

        <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER_VARIANTS}
          >
            <motion.div
              className="text-center mb-20"
              variants={FADE_IN_VARIANTS}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-500 to-pink-600">
                  Innovations
                </span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore the advanced AI products and platforms meticulously
                engineered by {MOCK_DATA.companyName} to redefine the future.
              </p>
            </motion.div>

            <motion.section
              className="mb-24"
              variants={STAGGER_CONTAINER_VARIANTS}
            >
              <motion.h2
                variants={FADE_IN_VARIANTS}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center tracking-tight"
              >
                Flagship Platforms
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                {flagshipProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.section>

            <motion.section variants={STAGGER_CONTAINER_VARIANTS}>
              <motion.h2
                variants={FADE_IN_VARIANTS}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center tracking-tight"
              >
                Specialized AI Tools
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {secondaryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </>
  );
}
