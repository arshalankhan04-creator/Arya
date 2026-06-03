import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import { Link } from "react-router-dom";

const SORT_OPTIONS = [
  { label: "Featured",       value: "featured"   },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc"},
];

export default function Bridal() {
  const [sort, setSort]       = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const bridalProducts = useMemo(() => {
    let list = products.filter(p => p.isBridal);
    if (sort === "price_asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  const currentSort = SORT_OPTIONS.find(o => o.value === sort);

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── HERO HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1A1410", padding: "120px 48px 72px" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=85"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(14,10,8,0.95) 0%, rgba(14,10,8,0.6) 60%, rgba(14,10,8,0.3) 100%)" }} />
        </div>

        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <Link to="/" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(250,247,242,0.4)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(250,247,242,0.2)", fontSize: "10px" }}>/</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(250,247,242,0.6)" }}>Bridal</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "16px" }}
          >
            The Bridal Edit
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(42px, 5.5vw, 72px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "20px" }}
          >
            Crafted for Your<br />
            <em style={{ color: "#D4919A" }}>Forever Moment</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(250,247,242,0.5)", lineHeight: 1.75, maxWidth: "420px" }}
          >
            Each bridal piece is handcrafted to order — hallmark certified, conflict-free, and designed to be worn long after the celebration ends.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            style={{ display: "flex", gap: "10px", marginTop: "36px", flexWrap: "wrap" }}
          >
            {["Hallmark Certified", "Free Customisation Consult", "Lifetime Polishing", "30-Day Returns"].map(t => (
              <span key={t} style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,0.55)", border: "1px solid rgba(255,255,255,0.12)", padding: "6px 14px", borderRadius: "2px" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 48px 80px" }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #EDE5DC" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078" }}>
            {bridalProducts.length} {bridalProducts.length === 1 ? "piece" : "pieces"}
          </p>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen(v => !v)}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "1px solid #EDE5DC", padding: "9px 16px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: "#2C2C2C" }}
            >
              Sort: {currentSort.label}
              <motion.span animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                <ChevronDown size={13} />
              </motion.span>
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", zIndex: 50, minWidth: "180px" }}
                >
                  {SORT_OPTIONS.map(o => (
                    <button key={o.value} onClick={() => { setSort(o.value); setSortOpen(false); }}
                      style={{ width: "100%", background: "none", border: "none", padding: "11px 18px", textAlign: "left", cursor: "pointer", fontFamily: sort === o.value ? "'Cormorant Garamond', serif" : "Inter, sans-serif", fontSize: sort === o.value ? "15px" : "11px", color: sort === o.value ? "#1A1410" : "#8A8078", borderLeft: sort === o.value ? "2px solid #B76E79" : "2px solid transparent" }}
                    >
                      {o.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid */}
        {bridalProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "#1A1410", marginBottom: "16px" }}>
              No bridal pieces found
            </p>
            <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
              Browse All <ArrowUpRight size={12} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
            {bridalProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  gridColumn: i === 0 ? "span 2" : "span 1",
                  height: i === 0 ? "500px" : "380px",
                }}
              >
                <ProductCard product={product} large={i === 0} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "72px", backgroundColor: "#F0EAE2", border: "1px solid #EDE5DC", padding: "56px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap" }}
        >
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "10px" }}>Bespoke Service</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 300, color: "#1A1410", lineHeight: 1.2, marginBottom: "10px" }}>
              Dream piece in mind?
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5C534A", lineHeight: 1.7, maxWidth: "360px" }}>
              Book a free bridal consultation with our designers. We'll craft exactly what you envision, from sketch to stone.
            </p>
          </div>
          <Link
            to="/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#B76E79"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1A1410"; e.currentTarget.style.color = "#FAF7F2"; }}
          >
            Book Consultation <ArrowUpRight size={13} />
          </Link>
        </motion.div>
      </div>

      {/* close sort on outside click */}
      {sortOpen && <div onClick={() => setSortOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />}
    </div>
  );
}
