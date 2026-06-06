import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowUpRight, Shield, RefreshCw, Truck, Award } from "lucide-react";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";
import SuggestionsGrid from "../components/ui/SuggestionsGrid";

/* ── promise strip items ─────────────────────────────── */
const PROMISES = [
  { icon: <Truck size={15} />,    text: "Free Shipping Above ₹999"  },
  { icon: <RefreshCw size={15} />, text: "30-Day Easy Returns"       },
  { icon: <Shield size={15} />,   text: "Hallmark Certified"         },
  { icon: <Award size={15} />,    text: "Lifetime Polishing"         },
];

/* ── expandable accordion row ────────────────────────── */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid #EDE5DC" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "16px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px", letterSpacing: "0.24em",
          textTransform: "uppercase", fontWeight: 600,
          color: "#1A1410",
        }}>{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "18px", color: "#B76E79", lineHeight: 1, display: "flex" }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "20px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── main page ───────────────────────────────────────── */
export default function ProductDetails() {
  const { id }       = useParams();
  const { addToCart }            = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const { product, loading, error } = useProduct(id);
  const { products: allProducts }   = useProducts();
  const related = allProducts
    .filter(p => p.id !== product?.id && p.category === product?.category)
    .slice(0, 3);

  const [activeImg,  setActiveImg]  = useState(0);
  const [added,      setAdded]      = useState(false);
  const wishlisted = product ? isWishlisted(product.id) : false;

  /* reset image index when product changes */
  useEffect(() => { setActiveImg(0); }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#8A8078" }}>
        Loading…
      </p>
    </div>
  );

  if (error || !product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F2", gap: "20px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#1A1410" }}>Product not found</p>
        <Link to="/shop" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B76E79", textDecoration: "none" }}>← Back to Shop</Link>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const allImages = product.images?.length > 1 ? product.images : [product.image, product.image];

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
          {[
            { label: "Home",            to: "/"      },
            { label: "Shop",            to: "/shop"  },
            { label: product.category,  to: "/shop"  },
            { label: product.name,      to: null     },
          ].map((crumb, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {crumb.to ? (
                <Link to={crumb.to} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "#8A8078", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
                  onMouseLeave={e => e.currentTarget.style.color = "#8A8078"}
                >{crumb.label}</Link>
              ) : (
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "#1A1410" }}>{crumb.label}</span>
              )}
              {i < arr.length - 1 && <span style={{ color: "#C8BDB5", fontSize: "10px" }}>/</span>}
            </span>
          ))}
        </div>

        {/* ── MAIN GRID: images left, info right ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start", marginBottom: "100px" }}>

          {/* LEFT — image gallery */}
          <div style={{ position: "sticky", top: "100px" }}>

            {/* Main image */}
            <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1A1410", aspectRatio: "4/5", marginBottom: "10px" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={allImages[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </AnimatePresence>

              {/* Tag badge */}
              {product.tag && (
                <div style={{ position: "absolute", top: "18px", left: "18px" }}>
                  <span style={{ backgroundColor: "#B76E79", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", padding: "5px 11px" }}>
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Discount badge */}
              {discount && (
                <div style={{ position: "absolute", top: product.tag ? "50px" : "18px", left: "18px" }}>
                  <span style={{ backgroundColor: "rgba(26,20,16,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "7px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 11px" }}>
                    -{discount}%
                  </span>
                </div>
              )}

              {/* Wishlist on main image */}
              <button
                onClick={() => toggleWishlist(product)}
                style={{ position: "absolute", top: "18px", right: "18px", width: "36px", height: "36px", backgroundColor: wishlisted ? "#B76E79" : "rgba(250,247,242,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s" }}
              >
                <Heart size={14} color="white" fill={wishlisted ? "white" : "none"} />
              </button>
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{ flex: 1, aspectRatio: "1", overflow: "hidden", border: `2px solid ${activeImg === i ? "#B76E79" : "transparent"}`, background: "none", cursor: "pointer", padding: 0, transition: "border-color 0.2s" }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: activeImg === i ? 1 : 0.55, transition: "opacity 0.2s" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — product info */}
          <div style={{ paddingTop: "8px" }}>

            {/* Category + material eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.36em", textTransform: "uppercase", color: "#B76E79" }}>{product.category}</span>
              <span style={{ width: "1px", height: "10px", backgroundColor: "#D8D0C8" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.36em", textTransform: "uppercase", color: "#8A8078" }}>{product.material}</span>
            </div>

            {/* Product name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(34px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.1, color: "#1A1410", marginBottom: "24px", letterSpacing: "-0.01em" }}
            >
              {product.name}
            </motion.h1>

            {/* Price block */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid #EDE5DC" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 300, color: "#1A1410" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.original_price && (
                <>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#B0A090", textDecoration: "line-through" }}>
                    ₹{product.original_price.toLocaleString("en-IN")}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", backgroundColor: "#FFF0EC", color: "#B76E79", padding: "4px 10px", fontWeight: 600 }}>
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.85, color: "#5C534A", marginBottom: "36px" }}>
              {product.description}
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>

              {/* Add to bag */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                style={{ width: "100%", padding: "16px", backgroundColor: added ? "#2C2C2C" : "#1A1410", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background-color 0.3s ease" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#FAF7F2" }}>
                      ✓ Added to Bag
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#FAF7F2" }}>
                      <ShoppingBag size={14} /> Add to Bag
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleWishlist(product)}
                style={{ width: "100%", padding: "15px", backgroundColor: "transparent", border: `1px solid ${wishlisted ? "#B76E79" : "#D8D0C8"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.25s ease" }}
                onMouseEnter={e => { if (!wishlisted) e.currentTarget.style.borderColor = "#B76E79"; }}
                onMouseLeave={e => { if (!wishlisted) e.currentTarget.style.borderColor = "#D8D0C8"; }}
              >
                <Heart size={14} color={wishlisted ? "#B76E79" : "#8A8078"} fill={wishlisted ? "#B76E79" : "none"} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: wishlisted ? "#B76E79" : "#8A8078", transition: "color 0.25s" }}>
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </span>
              </motion.button>
            </div>

            {/* Promise strip */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "36px" }}>
              {PROMISES.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", backgroundColor: "#F5EFE6", border: "1px solid #EDE5DC" }}>
                  <span style={{ color: "#B76E79", flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#5C534A", lineHeight: 1.4 }}>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Accordion details */}
            <Accordion title="Product Details">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Category",  value: product.category  },
                  { label: "Metal",     value: product.material  },
                  { label: "Purity",    value: product.material === "Sterling Silver" ? "925 Sterling Silver" : product.material === "Yellow Gold" ? "22K Gold" : "18K " + product.material },
                  { label: "Hallmark",  value: "BIS Hallmark Certified" },
                  { label: "Finish",    value: "High Polish"             },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid #F0E8E0" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#8A8078" }}>{row.label}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#1A1410", fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Care Instructions">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5C534A", lineHeight: 1.8 }}>
                Store in the provided pouch when not in use. Avoid contact with perfumes, lotions, and chlorinated water. Clean gently with a soft, dry cloth. Bring in for complimentary polishing every 12 months.
              </p>
            </Accordion>

            <Accordion title="Shipping & Returns">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5C534A", lineHeight: 1.8 }}>
                Free shipping on orders above ₹999. Standard delivery in 3–5 business days. Express delivery available. Returns accepted within 30 days of delivery in original, unworn condition with all packaging intact.
              </p>
            </Accordion>

            {/* Last border */}
            <div style={{ borderTop: "1px solid #EDE5DC" }} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          YOU MAY ALSO LIKE — related products
      ══════════════════════════════════════════════ */}
      <SuggestionsGrid products={related} eyebrow="Complete the Look" title="You May Also Like" cardHeight={380} />

    </div>
  );
}
