import { motion } from "framer-motion";

/**
 * SectionHeading
 * Reusable eyebrow + serif h2 block, animates in on scroll.
 *
 * Props:
 *   eyebrow  — small uppercase rose-gold label
 *   title    — main heading text (supports \n for line breaks)
 *   light    — if true, renders text in ivory (for dark backgrounds)
 *   align    — "left" (default) | "center"
 */
export default function SectionHeading({ eyebrow, title, light = false, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      style={{ textAlign: align }}
    >
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "8px", letterSpacing: "0.42em",
        textTransform: "uppercase",
        color: "#B76E79",
        marginBottom: "12px",
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(28px, 3.5vw, 48px)",
        fontWeight: 300,
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
        color: light ? "#FAF7F2" : "#1A1410",
        whiteSpace: "pre-line",
      }}>
        {title}
      </h2>
    </motion.div>
  );
}
