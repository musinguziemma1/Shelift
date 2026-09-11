import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { navLinks } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";
import { EASE } from "../lib/motion";
import { Brand } from "./Brand";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export const Navbar = memo(function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  /* Use light text over the dark hero / dark overlay at all times except
     when the compact ivory bar has appeared. */
  const light = !scrolled || open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 shadow-[0_10px_40px_-20px_rgba(11,26,18,0.4)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <div
            className={`flex items-center transition-all duration-500 ${
              scrolled ? "h-16" : "h-20 lg:h-24"
            }`}
          >
            <Brand tone={light ? "light" : "dark"} />
          </div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`link-underline text-sm font-bold tracking-wide transition-colors ${
                        light
                          ? "text-ivory/90 hover:text-ivory"
                          : "text-forest-950/75 hover:text-forest-950"
                      } ${isActive ? "link-underline-active" : ""}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <a
              href="#partner"
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 ${
                light
                  ? "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10"
                  : "bg-forest-950 text-ivory hover:bg-clay-500 shadow-[0_10px_25px_-12px_rgba(11,26,18,0.5)]"
              }`}
            >
              Partner With Us
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
              light ? "text-ivory" : "text-forest-950"
            }`}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
<AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-forest-950 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full border border-gold-400/15"
            />
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-16">
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.06 + i * 0.07 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-ivory/10 py-5 font-display text-3xl text-ivory transition-colors hover:text-gold-300"
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#partner"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
                className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay-500 px-8 py-4 text-sm font-bold tracking-wide text-ivory transition-colors hover:bg-clay-600 sm:w-auto"
              >
                Partner With Us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});