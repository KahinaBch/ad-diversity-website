"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Part I — Need for Diversity",
    href: "/part1",
    sub: [
      { label: "Defining AD", href: "/part1#defining-ad" },
      { label: "Heterogeneous Disease", href: "/part1#heterogeneous" },
      { label: "Diversity Scope", href: "/part1#diversity-scope" },
    ],
  },
  {
    label: "Part II — Initiatives",
    href: "/part2",
    sub: [
      { label: "World Dataset Map", href: "/part2#world-map" },
      { label: "Dataset Catalogue", href: "/part2/datasets" },
      { label: "Open Science", href: "/part2/openscience" },
    ],
  },
  { label: "Original Research", href: "/original-research" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card shadow-lg shadow-purple-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-semibold text-violet-200 hidden sm:block">
              GBM6330E
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.sub && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`nav-link px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-violet-300"
                      : "text-gray-300 hover:text-violet-200"
                  }`}
                >
                  {item.label}
                </Link>
                {item.sub && activeDropdown === item.href && (
                  <div className="absolute top-full left-0 w-52 mt-1 glass-card rounded-lg py-1 shadow-xl shadow-purple-900/30">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2 text-xs text-gray-300 hover:text-violet-200 hover:bg-purple-900/30 transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/KahinaBch/ad-diversity-website"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 border border-violet-800/50 hover:border-violet-600 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-purple-900/30">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-300 hover:text-violet-200"
                >
                  {item.label}
                </Link>
                {item.sub?.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="block pl-6 pr-3 py-1.5 text-xs text-gray-400 hover:text-violet-300"
                  >
                    → {s.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
