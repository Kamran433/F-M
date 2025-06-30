import Link from "next/link";
import { Cpu, Twitter, Github, Linkedin } from "lucide-react";
import MOCK_DATA from "../lib/data";

// --- Data for the footer links ---
const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "GitHub", icon: Github },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A10]">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <span>{MOCK_DATA.companyName}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">{MOCK_DATA.tagline}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {MOCK_DATA.companyName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
