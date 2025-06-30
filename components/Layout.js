import Navbar from "./Navbar";
import Footer from "./Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: if you want to use it as a CSS variable
});

export default function Layout({ children }) {
  return (
    <div
      className={`${inter.className} bg-white dark:bg-cod-gray-950 text-cod-gray-900 dark:text-cod-gray-100 min-h-screen flex flex-col transition-colors duration-500 antialiased`}
    >
      <Navbar />
      <main className="flex-grow pt-20">
        {" "}
        {/* pt-20 to offset fixed navbar height */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
