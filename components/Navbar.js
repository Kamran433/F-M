import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu as MenuIcon,
  X as XIcon,
  Briefcase,
  Home,
  Users,
  Mail,
  Cpu,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import MOCK_DATA from "../lib/data";

// Navigation items configuration
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Briefcase },
  { href: "/services", label: "Services", icon: Cpu },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

// Main Navbar Component
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Animation variants for the mobile menu container
  const mobileMenuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Animate children one by one
        ease: "easeOut",
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Animation variants for individual mobile menu items
  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <>
      {/* HEADER: Main container with refined glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6">
        <div
          className="
            max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16
            bg-white/60 dark:bg-cod-gray-950/60 backdrop-blur-xl
            border border-white/20 dark:border-cod-gray-800/80
            rounded-full shadow-lg dark:shadow-cod-gray-900/50"
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight transform transition-transform duration-300 hover:scale-105"
            aria-label="Homepage"
          >
            <div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                {MOCK_DATA.companyName.split(" ")[0]}
              </span>
              <span className="text-cod-gray-800 dark:text-cod-gray-200">
                {MOCK_DATA.companyName.split(" ")[1]}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION: With active link indicator */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    pathname === item.href
                      ? "text-cod-gray-900 dark:text-white"
                      : "text-cod-gray-600 dark:text-cod-gray-400 hover:text-cod-gray-900 dark:hover:text-white"
                  }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute inset-0 bg-cod-gray-100 dark:bg-cod-gray-800 rounded-full -z-10"
                    layoutId="active-pill"
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT-SIDE CONTROLS: Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: 15 }}
              className="p-2 rounded-full hover:bg-cod-gray-100 dark:hover:bg-cod-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-cod-gray-700" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full text-cod-gray-700 dark:text-cod-gray-300 hover:bg-cod-gray-100 dark:hover:bg-cod-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU: With staggered animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed inset-x-4 top-24 z-40 md:hidden
              bg-white/80 dark:bg-cod-gray-950/80 backdrop-blur-xl
              border border-white/20 dark:border-cod-gray-800/80
              rounded-2xl shadow-xl dark:shadow-cod-gray-900/50 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <motion.div key={item.label} variants={mobileMenuItemVariants}>
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors
                      ${
                        pathname === item.href
                          ? "bg-cod-gray-100 dark:bg-cod-gray-800 text-cod-gray-900 dark:text-white"
                          : "text-cod-gray-700 dark:text-cod-gray-200 hover:bg-cod-gray-100 dark:hover:bg-cod-gray-800"
                      }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3 opacity-80" />
                      {item.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
