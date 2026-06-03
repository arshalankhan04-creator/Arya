/* ── Shared style objects ────────────────────────────────
   Frequently repeated inline style patterns extracted here.
──────────────────────────────────────────────────────── */

/* Full-width section container */
export const container = {
  maxWidth: "1320px",
  margin: "0 auto",
  padding: "0 48px",
};

/* 3-column product grid */
export const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "3px",
};

/* Eyebrow label (small rose-gold uppercase) */
export const eyebrow = {
  fontFamily: "Inter, sans-serif",
  fontSize: "8px",
  letterSpacing: "0.42em",
  textTransform: "uppercase",
  color: "#B76E79",
};

/* Serif heading */
export const serifHeading = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 300,
  lineHeight: 1.1,
  color: "#1A1410",
};

/* Ghost watermark text (dark header backgrounds) */
export const ghostWatermark = {
  position: "absolute",
  top: "50%",
  right: "3%",
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
};

/* Dark CTA button (inline style base — use with onMouseEnter/Leave) */
export const darkBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#1A1410",
  color: "#FAF7F2",
  border: "none",
  padding: "14px 32px",
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background-color 0.2s",
};
