import { motion } from "framer-motion";
import { purposeItems } from "../data/content";
import { fadeUpItem, staggerContainer, viewportOnce } from "../lib/motion";

/**
 * The purpose strip — four concise statements that anchor what SHELIFT does,
 * positioned immediately after the hero so visitors grasp the strategy in
 * seconds.
 */
export function PurposeStrip() {
  return (
    <section aria-label="SHELIFT's four strategic areas" className="bg-forest-950 py-14 lg:py-16">
      <div className="container-x">
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {purposeItems.map((item) => (
            <motion.li
              key={item.number}
              variants={fadeUpItem}
              className="group border-t border-ivory/15 pt-6 transition-colors duration-500 hover:border-gold-400/60"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-gold-400 transition-transform duration-500 group-hover:translate-x-1">
                  {item.number}
                </span>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-ivory">
                  {item.label}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-forest-100/75">{item.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}