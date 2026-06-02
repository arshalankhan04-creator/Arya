import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";

const CARD_W = 300;   // px per card
const CARD_H = 460;   // px height
const GAP    = 10;    // px gap

export default function FeaturedProducts() {
  const trackRef  = useRef(null);
  const [current, setCurrent] = useState(0);
  const items = products.slice(0, 6);
  const max   = items.length - 1;

  const scrollTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, max));
    setCurrent(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (CARD_W + GAP),
        behavior: "smooth",
      });
    }
  };

  return (
    <section style={{ backgroundColor: "#111009", padding: "100px 0 110px", overflow: "hidden" }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 0 0 48px",    /* no right padding — cards bleed to edge */
        display: "flex",
        alignItems: "stretch",
        gap: "60px",
      }}>

        {/* ══════════════════════════════
            LEFT — editorial sticky panel
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            width: "280px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "0",
          }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px", letterSpacing: "0.42em",
            textTransform: "uppercase", color: "#B76E79",
            marginBottom: "16px",
          }}>
            Handpicked For You
          </p>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 300, color: "#FAF7F2",
            lineHeight: 1.05, marginBottom: "20px",
          }}>
            Featured<br />
            <span style={{ fontStyle: "italic", color: "#D4919A" }}>Pieces</span>
          </h2>

          {/* Thin divider */}
          <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(212,145,154,0.5)", marginBottom: "20px" }} />

          {/* Description */}
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px", color: "rgba(250,247,242,0.45)",
            lineHeight: 1.8, marginBottom: "40px",
          }}>
            Each piece is handpicked by our curators — crafted for the woman who values both beauty and meaning.
          </p>

          {/* Progress indicator */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  height: "2px",
                  width: current === i ? "28px" : "14px",
                  backgroundColor: current === i ? "#B76E79" : "rgba(250,247,242,0.2)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          {/* Arrow controls */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
            {[
              { icon: ArrowLeft,  action: () => scrollTo(current - 1), disabled: current === 0 },
              { icon: ArrowRight, action: () => scrollTo(current + 1), disabled: current === max },
            ].map(({ icon: Icon, action, disabled }, i) => (
              <button
                key={i}
                onClick={action}
                style={{
                  width: "44px", height: "44px",
                  border: `1px solid ${disabled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"}`,
                  backgroundColor: "transparent",
                  color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.75)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: disabled ? "default" : "pointer",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#D4919A"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = disabled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"; e.currentTarget.style.color = disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.75)"; }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <Link to="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            backgroundColor: "#B76E79", color: "white",
            padding: "13px 24px",
            fontFamily: "Inter, sans-serif", fontSize: "10px",
            letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none", width: "fit-content",
            transition: "background 0.25s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8B4A54")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#B76E79")}
          >
            Shop All <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        {/* ══════════════════════════════
            RIGHT — horizontal scroll track
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, overflow: "hidden", position: "relative" }}
        >
          {/* Right edge fade — suggests more cards */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "80px",
            background: "linear-gradient(to left, #111009, transparent)",
            zIndex: 2, pointerEvents: "none",
          }} />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: `${GAP}px`,
              height: `${CARD_H}px`,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",         /* Firefox */
              msOverflowStyle: "none",        /* IE */
              paddingRight: "80px",           /* space for fade */
            }}
          >
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flexShrink: 0,
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  scrollSnapAlign: "start",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
