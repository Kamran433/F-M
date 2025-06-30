import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/Layout";
import "../styles/globals.css"; // Your global styles + Tailwind
import { MotionConfig, AnimatePresence } from "framer-motion"; // AnimatePresence for page transitions
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps, router }) {
  // router prop for AnimatePresence key
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        {" "}
        {/* Respect user's motion preference */}
        <Layout>
          <AnimatePresence mode="wait" initial={false}>
            {/* Using router.route as key for page transitions */}
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  );
}
export default MyApp;
