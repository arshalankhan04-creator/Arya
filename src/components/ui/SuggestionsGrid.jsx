import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "../product/ProductCard";

/**
 * SuggestionsGrid
 * The "#F0EAE2 — 3-column product grid" section used on Cart, Wishlist,
 * ProductDetails, and Bridal.
 *
 * Props:
 *   products   — array of product objects to display
 *   eyebrow    — small uppercase label (default "Complete the Look")
 *   title      — section heading (default "You May Also Like")
 *   cardHeight — height of each card in px (default 360)
 */
export default function SuggestionsGrid({
  products,
  eyebrow = "Complete the Look",
  title = "You May Also Like",
  cardHeight = 360,
}) {
  if (!products || products.length === 0) return null;

  return (
    <div style={{ backgroundColor: "#F0EAE2", padding: "72px 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: "36px",
        }}>
          <div>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px", letterSpacing: "0.42em",
              textTransform: "uppercase", color: "#B76E79",
              marginBottom: "10px",
            }}>
              {eyebrow}
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 300, color: "#1A1410",
            }}>
              {title}
            </h2>
          </div>

          <Link
            to="/shop"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: "Inter, sans-serif",
              fontSize: "9px", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#B76E79",
              textDecoration: "none",
              transition: "gap 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.gap = "10px"}
            onMouseLeave={e => e.currentTarget.style.gap = "6px"}
          >
            View All <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ height: `${cardHeight}px` }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
