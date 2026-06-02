import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const cols = [
  {
    num: "01",
    title: "Bridal",
    sub: "Collection",
    tag: "Begin forever beautifully",
    desc: "Curated bridal sets, engagement rings & ceremonial jewellery crafted for your most special day. Every piece tells the story of a love that lasts.",
    cta: "Explore Bridal",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1400&q=90",
    accent: "#D4919A",
  },
  {
    num: "02",
    title: "Everyday",
    sub: "Luxury",
    tag: "Effortless. Every day.",
    desc: "Lightweight, wearable pieces in rose gold and silver — jewellery that moves with you from morning to midnight, season after season.",
    cta: "Shop Everyday",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&q=90",
    accent: "#C9A84C",
  },
];

function CollectionPanel({ col, reverse = false, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        alignItems: "stretch",
        position: "relative",
        marginLeft: reverse ? "auto" : "0",
        maxWidth: "1100px",
        width: "100%",
      }}
    >
      {/* ── Image block — 60% width ── */}
      <div
        style={{
          flex: "0 0 60%",
          position: "relative",
          height: "580px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={col.image}
          alt={col.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 25%",
            transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            display: "block",
          }}
        />

        {/* Subtle vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: reverse
            ? "linear-gradient(to left, rgba(10,8,6,0.55) 0%, transparent 60%)"
            : "linear-gradient(to right, rgba(10,8,6,0.55) 0%, transparent 60%)",
          transition: "opacity 0.5s",
          opacity: hovered ? 0.7 : 0.4,
        }} />

        {/* Large background number */}
        <div style={{
          position: "absolute",
          bottom: "-20px",
          left: reverse ? "auto" : "-10px",
          right: reverse ? "-10px" : "auto",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(120px, 16vw, 200px)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
        }}>
          {col.num}
        </div>

        {/* Top-left tag */}
        <div style={{
          position: "absolute", top: "28px",
          left: reverse ? "auto" : "28px",
          right: reverse ? "28px" : "auto",
        }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px", letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.55)",
            borderBottom: `1px solid ${col.accent}`,
            paddingBottom: "3px",
          }}>
            {col.tag}
          </span>
        </div>
      </div>

      {/* ── Floating text card — overlaps the image edge ── */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: index * 0.15 + 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: "0 0 44%",
          marginLeft: reverse ? "0" : "-4%",
          marginRight: reverse ? "-4%" : "0",
          backgroundColor: "#FFFFFF",
          padding: "52px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          alignSelf: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* Collection number — small, top */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "72px", fontWeight: 300,
          color: "rgba(183,110,121,0.12)",
          lineHeight: 1, marginBottom: "-16px",
          letterSpacing: "-0.02em",
        }}>
          {col.num}
        </p>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "9px", letterSpacing: "0.4em",
          textTransform: "uppercase", color: col.accent,
          marginBottom: "14px",
          position: "relative",
        }}>
          Arya Collections
        </p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(36px, 4vw, 52px)",
          fontWeight: 300, color: "#1A1410",
          lineHeight: 1.05, marginBottom: "8px",
        }}>
          {col.title}
        </h3>
        <h4 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(26px, 3vw, 38px)",
          fontWeight: 300, fontStyle: "italic",
          color: col.accent, lineHeight: 1,
          marginBottom: "24px",
        }}>
          {col.sub}
        </h4>

        {/* Divider */}
        <div style={{
          width: "40px", height: "1px",
          backgroundColor: col.accent,
          marginBottom: "22px", opacity: 0.5,
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px", color: "#6B6059",
          lineHeight: 1.8, marginBottom: "32px",
        }}>
          {col.desc}
        </p>

        {/* CTA */}
        <Link
          to={col.href}
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            backgroundColor: "#1A1410", color: "#FAF7F2",
            padding: "13px 26px",
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", letterSpacing: "0.25em",
            textTransform: "uppercase",
            textDecoration: "none", width: "fit-content",
            transition: "background 0.25s",
            border: "1px solid #1A1410",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = col.accent;
            e.currentTarget.style.borderColor = col.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1A1410";
            e.currentTarget.style.borderColor = "#1A1410";
          }}
        >
          {col.cta} <ArrowUpRight size={12} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Collections() {
  return (
    <section style={{ backgroundColor: "#F2EDE4", padding: "120px 0 140px", overflow: "hidden" }}>

      {/* ── Section header ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 80px", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px", letterSpacing: "0.42em",
              textTransform: "uppercase", color: "#B76E79",
              marginBottom: "14px",
            }}>
              Discover
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 300, color: "#1A1410",
              lineHeight: 1,
            }}>
              Our Collections
            </h2>
          </div>

          {/* Counter */}
          <div style={{ textAlign: "right" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "64px", fontWeight: 300,
              color: "rgba(26,20,16,0.07)",
              lineHeight: 1, letterSpacing: "-0.03em",
            }}>
              02
            </p>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "10px",
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(26,20,16,0.35)", marginTop: "4px",
            }}>
              Collections
            </p>
          </div>
        </motion.div>

        {/* Full-width rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "1px",
            backgroundColor: "rgba(26,20,16,0.1)",
            marginTop: "36px",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* ── Collection panels ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        padding: "0 48px",
      }}>
        {cols.map((col, i) => (
          <CollectionPanel
            key={col.num}
            col={col}
            reverse={i % 2 !== 0}
            index={i}
          />
        ))}
      </div>

    </section>
  );
}
