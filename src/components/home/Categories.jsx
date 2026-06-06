import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../../data/categories";

function CategoryCard({ cat, style, tall = false }) {
  const [hovered, setHovered] = useState(false);

  // Map category slugs to shop filter values
  const categoryToFilter = {
    bridal:    "/bridal",
    rings:     "/shop?category=Rings",
    necklaces: "/shop?category=Necklaces",
    earrings:  "/shop?category=Earrings",
    bracelets: "/shop?category=Bracelets",
    everyday:  "/shop",
  };

  const linkTo = categoryToFilter[cat?.slug] || "/shop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ ...style, position: "relative" }}
    >
      <Link
        to={linkTo}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          textDecoration: "none",
          backgroundColor: "#1A1410",
        }}
      >
        {/* Image */}
        <img
          src={cat.image}
          alt={cat.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Base gradient — always visible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,10,8,0.75) 0%, rgba(15,10,8,0.15) 50%, transparent 100%)",
          transition: "opacity 0.4s ease",
        }} />

        {/* Hover overlay — deepens */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(15,10,8,0.38)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* ── Bottom content ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: tall ? "32px 28px" : "20px 20px",
        }}>
          {/* Piece count — slides up on hover */}
          <div style={{
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.4s ease",
            marginBottom: "6px",
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(212,145,154,0.9)",
            }}>
              {cat.count} pieces
            </span>
          </div>

          {/* Category name */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: tall ? "clamp(28px, 3vw, 40px)" : "clamp(20px, 2vw, 26px)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "0.02em",
              margin: 0,
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
              transition: "transform 0.4s ease",
            }}>
              {cat.name}
            </h3>

            {/* Arrow — appears on hover */}
            <div style={{
              width: "34px", height: "34px",
              border: "1px solid rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0) rotate(0deg)" : "translateY(6px) rotate(-10deg)",
              transition: "all 0.35s ease",
              flexShrink: 0,
              marginLeft: "12px",
            }}>
              <ArrowUpRight size={14} color="white" />
            </div>
          </div>
        </div>

        {/* Top-left label pill — subtle, always visible */}
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          backgroundColor: "rgba(250,247,242,0.12)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "4px 10px",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>
            {cat.name}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  // Reorder: Bridal first (large), then others
  const ordered = [
    categories.find(c => c.slug === "bridal"),
    categories.find(c => c.slug === "rings"),
    categories.find(c => c.slug === "necklaces"),
    categories.find(c => c.slug === "earrings"),
    categories.find(c => c.slug === "bracelets"),
    categories.find(c => c.slug === "everyday"),
  ].filter(Boolean);

  return (
    <section style={{ backgroundColor: "#F7F3EE", padding: "100px 0 110px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "52px" }}
        >
          {/* Two-column header: title left, description + CTA right */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px" }}>
            <div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px", letterSpacing: "0.42em",
                textTransform: "uppercase", color: "#B76E79",
                marginBottom: "12px",
              }}>
                Browse By
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(38px, 4vw, 56px)",
                fontWeight: 300, color: "#1A1410",
                lineHeight: 1,
              }}>
                Shop by Category
              </h2>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "12px",
                color: "#8A8078", lineHeight: 1.7, maxWidth: "260px",
                marginBottom: "16px",
              }}>
                Explore our curated collections — from everyday elegance to bridal grandeur.
              </p>
              <Link to="/shop" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "Inter, sans-serif", fontSize: "10px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#1A1410", textDecoration: "none",
                borderBottom: "1px solid #1A1410", paddingBottom: "2px",
              }}>
                View All <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Bento Grid ── */}
        {/*
          Layout:
          [ Bridal (tall, 2 rows) ] [ Rings       ] [ Necklaces   ]
          [ Bridal (tall, 2 rows) ] [ Earrings    ] [ Bracelets   ]
          [ Everyday (full width, short)                          ]
        */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "320px 320px 200px",
          gap: "10px",
        }}>

          {/* Bridal — tall, spans 2 rows */}
          <CategoryCard
            cat={ordered[0]}
            tall
            style={{
              gridColumn: "1 / 2",
              gridRow: "1 / 3",
            }}
          />

          {/* Rings */}
          <CategoryCard
            cat={ordered[1]}
            style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}
          />

          {/* Necklaces */}
          <CategoryCard
            cat={ordered[2]}
            style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}
          />

          {/* Earrings */}
          <CategoryCard
            cat={ordered[3]}
            style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}
          />

          {/* Bracelets */}
          <CategoryCard
            cat={ordered[4]}
            style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}
          />

          {/* Everyday — full width bottom strip */}
          <CategoryCard
            cat={ordered[5]}
            style={{ gridColumn: "1 / 4", gridRow: "3 / 4" }}
          />

        </div>
      </div>
    </section>
  );
}
