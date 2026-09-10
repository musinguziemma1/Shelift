import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { contact } from "../data/engage";
import { navLinks, organisation } from "../data/content";
import { footer } from "../data/engage";
import { Brand } from "./Brand";

const socials = [
  { name: "Facebook", Icon: Facebook },
  { name: "LinkedIn", Icon: Linkedin },
  { name: "X", Icon: Twitter },
  { name: "Instagram", Icon: Instagram },
] as const;

export function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="container-x pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Brand tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-100/75">
              {organisation.fullName}.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-forest-100/55">
              {footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="eyebrow text-gold-400">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-100/80 transition-colors hover:text-ivory"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow text-gold-400">Contact</p>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-forest-100/80">
              <p>
                {contact.address.line1}, {contact.address.line2}
                <br />
                {contact.address.city}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-ivory"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-ivory">
                  {contact.phone}
                </a>
              </p>
            </address>

            <div className="mt-6 flex gap-3">
              {socials.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  disabled
                  aria-label={`${name} — placeholder, official account to be connected`}
                  title="Placeholder — official account to be connected"
                  className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border border-ivory/15 text-forest-100/50"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-ivory/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-forest-100/60">
            © 2026 SHELIFT. All rights reserved.
          </p>
          <p className="text-xs leading-relaxed text-forest-100/40">
            A Ugandan organisation working to empower adolescent girls, women, and
            households through health, education, livelihoods, and gender equity.
          </p>
        </div>
      </div>
    </footer>
  );
}