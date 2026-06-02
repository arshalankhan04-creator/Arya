import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import ringsIcon    from "../../assets/icons/rings.svg";
import necklaceIcon from "../../assets/icons/necklace.png";
import earringsIcon from "../../assets/icons/earrings.png";
import braceletIcon from "../../assets/icons/bracelet.png";

/* ── count-up hook ──────────────────────────────────────── */
function useCountUp(target, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(numeric);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ── stat card ──────────────────────────────────────────── */
function StatCard({ value, label, sub, index, started }) {
  const numeric = useCountUp(value, 1400 + index * 100, started);
  const suffix  = value.replace(/[0-9.]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(32px, 2.8vw, 42px)",
        fontWeight: 300, lineHeight: 1,
        color: "#FAF7F2",
        letterSpacing: "-0.02em",
        marginBottom: "10px",
      }}>
        {started ? `${numeric}${suffix}` : `0${suffix}`}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={started ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "1px", width: "32px",
          backgroundColor: "#B76E79",
          transformOrigin: "left",
          marginBottom: "10px",
        }}
      />

      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "9px", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(250,247,242,0.45)",
        marginBottom: "4px",
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "9px",
        color: "rgba(183,110,121,0.7)",
        letterSpacing: "0.04em",
      }}>
        {sub}
      </p>
    </motion.div>
  );
}

/* ── icon button ────────────────────────────────────────── */
const filterWhite    = "brightness(0) invert(1)";
const filterRoseGold = "brightness(0) invert(39%) sepia(60%) saturate(500%) hue-rotate(295deg) brightness(0.9)";

const ICONS = [
  { label: "Rings",     src: ringsIcon,    isPng: false },
  { label: "Necklaces", src: necklaceIcon, isPng: true  },
  { label: "Earrings",  src: earringsIcon, isPng: true  },
  { label: "Bracelets", src: braceletIcon, isPng: true  },
];

function IconButton({ ic, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/shop"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "80px", height: "80px",
          border: `1px solid ${hovered ? "#B76E79" : "rgba(255,255,255,0.22)"}`,
          borderRadius: "50%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "6px",
          textDecoration: "none",
          transition: "border-color 0.2s ease",
        }}
      >
        <img
          src={ic.src}
          alt={ic.label}
          style={{
            width: "28px", height: "28px",
            objectFit: "contain",
            filter: hovered
              ? filterRoseGold
              : (ic.isPng ? filterWhite : "none"),
            opacity: hovered ? 1 : 0.75,
            transition: "filter 0.2s ease, opacity 0.2s ease",
          }}
        />
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "7px", letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: hovered ? "#B76E79" : "rgba(255,255,255,0.55)",
          transition: "color 0.2s ease",
        }}>
          {ic.label}
        </span>
      </Link>
    </motion.div>
  );
}

/* ── ticker ─────────────────────────────────────────────── */
const TICKER = [
  "Hallmark Certified Gold & Silver",
  "Free Shipping Above ₹999",
  "30-Day Easy Returns",
  "Handcrafted by Master Artisans",
  "New Bridal Collection Now Live",
  "Free Gift Wrapping on Every Order",
  "15+ Years of Craftsmanship",
  "400+ Verified 5-Star Reviews",
];
const TICKER_ITEMS = [...TICKER, ...TICKER, ...TICKER, ...TICKER];

/* ── main ───────────────────────────────────────────────── */
export default function HeroStrip() {
  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const STATS = [
    { value: "400+",  label: "Verified Reviews", sub: "4.9 avg. rating"     },
    { value: "15+",   label: "Years of Trust",   sub: "Est. 2009"           },
    { value: "2000+", label: "Pieces Crafted",   sub: "Annually"            },
    { value: "98%",   label: "Recommend Us",     sub: "To friends & family" },
  ];

  return (
    <section style={{ backgroundColor: "#0E0C0A" }}>

      {/* ── TICKER ── */}
      <div style={{
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "13px 0",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}>
        <div className="animate-marquee" style={{ animationDuration: "40s" }}>
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "0 32px", whiteSpace: "nowrap",
            }}>
              <span style={{ color: "#B76E79", fontSize: "8px", opacity: 0.7 }}>✦</span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px", letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "rgba(250,247,242,0.38)" : "rgba(250,247,242,0.22)",
              }}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS + ICONS ── */}
      <div style={{
        maxWidth: "1320px",
        margin: "0 auto",
        padding: "0 48px",
        display: "grid",
        gridTemplateColumns: "auto 1px auto",
        gap: "0 52px",
        alignItems: "center",
      }}>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gap: "0 44px",
            padding: "40px 0",
            alignItems: "start",
          }}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} started={statsInView} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ backgroundColor: "rgba(255,255,255,0.07)", alignSelf: "stretch", margin: "24px 0" }} />

        {/* Icon buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "32px",
          padding: "40px 0",
        }}>
          {ICONS.map((ic, i) => (
            <IconButton key={ic.label} ic={ic} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
