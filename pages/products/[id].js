import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import MOCK_DATA from "../../lib/data";
import { Zap, ArrowRight, ChevronLeft } from "lucide-react";

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

// --- HELPER COMPONENTS ---
const FeatureCard = ({ feature, color }) => (
  <motion.div
    variants={FADE_IN_VARIANTS}
    className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-2xl flex items-start gap-4"
  >
    <div
      className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full ${color.bg}/20 flex items-center justify-center ring-4 ${color.ring}/20`}
    >
      <Zap className={`${color.text} w-4 h-4`} />
    </div>
    <span className="text-base text-gray-700 dark:text-gray-300">
      {feature}
    </span>
  </motion.div>
);

// --- MAIN PRODUCT DETAIL PAGE ---
export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = MOCK_DATA.products.find((p) => p.id === id);

  // --- THEME & COLOR LOGIC ---
  const themeClasses = {
    indigo: {
      text: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-500",
      ring: "ring-indigo-500",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-500",
    },
    sky: {
      text: "text-sky-500 dark:text-sky-400",
      bg: "bg-sky-500",
      ring: "ring-sky-500",
      gradientFrom: "from-sky-500",
      gradientTo: "to-cyan-500",
    },
    rose: {
      text: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-500",
      ring: "ring-rose-500",
      gradientFrom: "from-rose-500",
      gradientTo: "to-pink-500",
    },
    amber: {
      text: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500",
      ring: "ring-amber-500",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-500",
    },
    teal: {
      text: "text-teal-500 dark:text-teal-400",
      bg: "bg-teal-500",
      ring: "ring-teal-500",
      gradientFrom: "from-teal-500",
      gradientTo: "to-emerald-500",
    },
  };
  const color = product
    ? themeClasses[product.themeColor] || themeClasses.indigo
    : themeClasses.indigo;

  // --- PRODUCT NOT FOUND STATE ---
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6 bg-white dark:bg-[#0A0A10]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Not Found
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We couldn't find the product you're looking for.
          </p>
          <Link href="/products" legacyBehavior>
            <a className="mt-8 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-semibold">
              <ChevronLeft size={18} />
              Return to All Products
            </a>
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="bg-white dark:bg-[#0A0A10] transition-colors duration-300">
      <main>
        {/* --- Hero Section --- */}
        <section className=" min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1920x1080/111/FFF?text=Visual";
              }}
            />
            <div
              className={`absolute inset-0 z-10 bg-gradient-to-t ${color.gradientFrom}/30 via-transparent to-transparent opacity-70`}
            ></div>
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-white dark:from-[#0A0A10] to-transparent"></div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER_VARIANTS}
            className="relative z-30 w-full text-center px-6 sm:px-8 lg:px-12"
          >
            <motion.div variants={FADE_IN_VARIANTS}>
              <Link href="/products" legacyBehavior>
                <a className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group bg-white/50 dark:bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-white/10">
                  <ChevronLeft
                    size={16}
                    className="transform transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  All Products
                </a>
              </Link>
            </motion.div>
            <motion.p
              variants={FADE_IN_VARIANTS}
              className={`mt-8 text-base font-bold uppercase tracking-widest ${color.text}`}
            >
              {product.category}
            </motion.p>
            <motion.h1
              variants={FADE_IN_VARIANTS}
              className="mt-4 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              {product.name}
            </motion.h1>
          </motion.div>
        </section>

        {/* --- Content Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER_CONTAINER_VARIANTS}
          className="w-full px-6 sm:px-8 lg:px-12 pb-24 sm:pb-32 -mt-16 md:-mt-24"
        >
          <motion.div
            variants={FADE_IN_VARIANTS}
            className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 sm:p-12 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Product Overview
            </h2>
            <div className="mt-6 prose prose-lg sm:prose-xl dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
              <p>{product.longDescription || product.description}</p>
            </div>
          </motion.div>

          {product.features && product.features.length > 0 && (
            <motion.div variants={FADE_IN_VARIANTS} className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight text-center">
                Key Features
              </h2>
              <motion.div
                variants={STAGGER_CONTAINER_VARIANTS}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {product.features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} color={color} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* --- CTA Section --- */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 dark:bg-black/20"
        >
          <div className="text-center px-6 sm:px-8 lg:px-12 py-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ready to innovate with {product.name}?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Let's discuss how our technology can be integrated into your
              workflow to drive exceptional results.
            </p>
            <div className="mt-10">
              <Link href="/contact" legacyBehavior>
                <motion.a
                  className={`group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-gradient-to-r ${color.gradientFrom} ${color.gradientTo} shadow-lg transform transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Our Team
                  <ArrowRight className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
