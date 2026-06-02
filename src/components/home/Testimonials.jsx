import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../../data/testimonials";

/* ── helpers ────────────────────────────────────────────── */
const Star = ({ filled = true, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#C9A84C" : "none"} stroke="#C9A84C" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const Stars = ({ count = 5, size = 13 }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {Array(5).fill(0).map((_, i) => <Star key={i} filled={i < count} size={size} />)}
  </div>
);

/* Marquee data — sextupled for seamless loop */
const marqueeItems = [...testimonials, ...testimonials, ...testimonials,
                      ...testimonials, ...testimonials, ...testimonials];

/* ── component ──────────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleSelect = (i) => {
    setActive(i);
    resetTimer();
  };

  const current = testimonials[active];

  return (
    <section style={{ backgroundColor: "#1A1410", overflow: "hidden" }}>

      {/* ══════════════════════════════════════════════════════
          MAIN PANEL — spotlight left + sidebar right
      ══════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 48px 72px",
        display: "grid",
        gridTemplateColumns: "32px 1fr 1fr",   /* rotated label | spotlight | sidebar */
        gap: "0 40px",
        alignItems: "stretch",
      }}>

        {/* ── ROTATED LABEL — far left editorial detail ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          gridColumn: "1",
        }}>
          <div style={{ width: "1px", height: "48px", backgroundColor: "rgba(183,110,121,0.35)" }} />
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px", letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "#B76E79",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
          }}>
            Real Stories
          </p>
          <div style={{ width: "1px", height: "48px", backgroundColor: "rgba(183,110,121,0.35)" }} />
        </div>

        {/* ── SPOTLIGHT — left large card ── */}
        <div style={{
          gridColumn: "2",
          position: "relative",
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "4px",
          padding: "52px 48px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "460px",
          overflow: "hidden",
        }}>

          {/* Ghost quote mark */}
          <div style={{
            position: "absolute",
            top: "20px", left: "32px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "280px", lineHeight: 1,
            color: "rgba(183,110,121,0.06)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.05em",
          }}>
            "
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>

            {/* Product eyebrow */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`prod-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px", letterSpacing: "0.42em",
                  textTransform: "uppercase", color: "#B76E79",
                  marginBottom: "28px",
                }}
              >
                {current.product}
              </motion.p>
            </AnimatePresence>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`quote-${active}`}
                initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(2px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  fontWeight: 300, fontStyle: "italic",
                  color: "#FAF7F2", lineHeight: 1.6,
                  flex: 1,
                  margin: 0,
                }}
              >
                {current.text}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author + progress */}
          <div style={{ position: "relative", zIndex: 1, marginTop: "40px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}
              >
                <img
                  src={current.avatar}
                  alt={current.name}
                  style={{
                    width: "46px", height: "46px",
                    borderRadius: "50%", objectFit: "cover",
                    border: "2px solid #B76E79",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px", fontWeight: 600,
                    color: "#FAF7F2", letterSpacing: "0.03em",
                  }}>
                    {current.name}
                  </p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px", color: "rgba(250,247,242,0.4)",
                    marginTop: "3px",
                  }}>
                    {current.location}
                  </p>
                </div>
                <div style={{ marginLeft: "6px" }}>
                  <Stars count={current.rating} size={12} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  style={{
                    height: "2px",
                    width: i === active ? "40px" : "16px",
                    backgroundColor: i === active ? "#B76E79" : "rgba(255,255,255,0.18)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.4s ease",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR — right column ── */}
        <div style={{
          gridColumn: "3",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}>

          {/* Section title at top of sidebar */}
          <div style={{ marginBottom: "32px" }}>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px", letterSpacing: "0.42em",
              textTransform: "uppercase", color: "#B76E79",
              marginBottom: "10px",
            }}>
              Customer Reviews
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(26px, 2.8vw, 36px)",
              fontWeight: 300, lineHeight: 1.25,
              color: "#FAF7F2",
            }}>
              What Our<br />Customers Say
            </h2>
          </div>

          {/* Selectable testimonial rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => handleSelect(i)}
                  whileHover={{ backgroundColor: "rgba(183,110,121,0.06)" }}
                  style={{
                    background: isActive ? "rgba(183,110,121,0.08)" : "transparent",
                    border: "none",
                    borderLeft: `3px solid ${isActive ? "#B76E79" : "transparent"}`,
                    borderRadius: "2px",
                    cursor: "pointer",
                    padding: "18px 20px",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  {/* Avatar */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: "40px", height: "40px",
                      borderRadius: "50%", objectFit: "cover",
                      border: `1.5px solid ${isActive ? "#B76E79" : "rgba(255,255,255,0.12)"}`,
                      opacity: isActive ? 1 : 0.55,
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  />

                  {/* Text */}
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <p style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px", fontWeight: 600,
                        color: isActive ? "#FAF7F2" : "rgba(250,247,242,0.5)",
                        transition: "color 0.3s ease",
                        whiteSpace: "nowrap",
                      }}>
                        {t.name}
                      </p>
                      <Stars count={t.rating} size={9} />
                    </div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "13px", fontStyle: "italic",
                      color: isActive ? "rgba(250,247,242,0.65)" : "rgba(250,247,242,0.28)",
                      lineHeight: 1.45,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      transition: "color 0.3s ease",
                    }}>
                      {t.text}
                    </p>
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px", letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: isActive ? "#B76E79" : "rgba(183,110,121,0.35)",
                      marginTop: "5px",
                      transition: "color 0.3s ease",
                    }}>
                      {t.product}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MARQUEE STRIP — scrolling social proof
      ══════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "16px 0",
        overflow: "hidden",
        backgroundColor: "#120F0C",
      }}>
        <div className="animate-marquee">
          {marqueeItems.map((t, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center",
              gap: "10px", padding: "0 32px", whiteSpace: "nowrap",
            }}>
              <Stars count={t.rating} size={10} />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px", fontStyle: "italic",
                color: "rgba(250,247,242,0.5)",
              }}>
                {t.name}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: "7px",
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(183,110,121,0.6)",
              }}>
                {t.product}
              </span>
              <span style={{ color: "rgba(183,110,121,0.25)", fontSize: "10px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
