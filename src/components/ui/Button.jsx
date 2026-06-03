import { motion } from "framer-motion";
import { ROSE_GOLD, ROSE_DARK, DARK, IVORY } from "../../constants/colors";

const VARIANTS = {
  primary: {
    base: { backgroundColor: ROSE_GOLD, color: IVORY },
    hover: { backgroundColor: ROSE_DARK },
    leave: { backgroundColor: ROSE_GOLD },
  },
  dark: {
    base: { backgroundColor: DARK, color: IVORY },
    hover: { backgroundColor: ROSE_GOLD },
    leave: { backgroundColor: DARK },
  },
  outline: {
    base: { backgroundColor: "transparent", color: ROSE_GOLD, border: `1px solid ${ROSE_GOLD}` },
    hover: { backgroundColor: ROSE_GOLD, color: IVORY },
    leave: { backgroundColor: "transparent", color: ROSE_GOLD },
  },
  ghost: {
    base: { backgroundColor: "transparent", color: ROSE_GOLD, border: "none" },
    hover: { color: ROSE_DARK },
    leave: { color: ROSE_GOLD },
  },
};

/**
 * Button
 * Shared button component with 4 variants: primary, dark, outline, ghost.
 *
 * Props:
 *   variant   — "primary" | "dark" | "outline" | "ghost"  (default: "dark")
 *   size      — "sm" | "md" | "lg"  (default: "md")
 *   children  — button content
 *   as        — "button" | "a" | "div" (default: "button")
 *   ...rest   — all other props passed through (onClick, href, etc.)
 */
export default function Button({
  variant = "dark",
  size = "md",
  children,
  style: extraStyle = {},
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.dark;

  const sizes = {
    sm: { padding: "9px 20px", fontSize: "9px" },
    md: { padding: "13px 28px", fontSize: "10px" },
    lg: { padding: "16px 36px", fontSize: "11px" },
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
    border: "none",
    ...sizes[size],
    ...v.base,
    ...extraStyle,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      style={baseStyle}
      onMouseEnter={e => {
        Object.assign(e.currentTarget.style, v.hover);
        onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        Object.assign(e.currentTarget.style, v.leave);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
