import { motion } from "framer-motion";

/**
 * PageHeader
 * The dark editorial header used on Cart, Wishlist, Contact, Shop, Bridal.
 * Dark #1A1410 background with ghost watermark, eyebrow, h1, optional subtitle.
 *
 * Props:
 *   eyebrow    — small uppercase rose-gold label
 *   title      — main h1 text
 *   subtitle   — optional paragraph below the title
 *   watermark  — ghost text behind (defaults to title)
 *   right      — optional JSX rendered on the right side of the title row
 *   padding    — padding override (default "120px 48px 60px")
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  watermark,
  right,
  padding = "120px 48px 60px",
}) {
  return (
    <div style={{
      backgroundColor: "#1A1410",
      padding,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: "absolute",
        top: "50%", right: "3%",
        transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(80px, 14vw, 180px)",
        fontWeight: 300,
        color: "rgba(255,255,255,0.03)",
        lineHeight: 1,
        userSelect: "none",
        letterSpacing: "-0.04em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        {watermark ?? title}
      </div>

      <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px", letterSpacing: "0.42em",
            textTransform: "uppercase", color: "#B76E79",
            marginBottom: "16px",
          }}
        >
          {eyebrow}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}
        >
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(38px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.05,
            color: "#FAF7F2",
            letterSpacing: "-0.02em",
          }}>
            {title}
          </h1>
          {right && right}
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(250,247,242,0.45)",
              lineHeight: 1.7, maxWidth: "420px",
              marginTop: "16px",
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
