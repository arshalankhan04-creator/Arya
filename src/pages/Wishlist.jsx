import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, ArrowUpRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import PageHeader from "../components/ui/PageHeader";
import SuggestionsGrid from "../components/ui/SuggestionsGrid";

/* ── wishlist item card ──────────────────────────────── */
function WishlistCard({ item, onRemove, onAddToCart, justAdded }) {
  const [hovered, setHovered] = useState(false);
  const discount = item.original_price
    ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", overflow: "hidden" }}
    >
      {/* Image */}
      <Link to={`/product/${item.id}`} style={{ display: "block", position: "relative", overflow: "hidden" }}>
        <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#1A1410" }}>
          <motion.img
            src={item.image}
            alt={item.name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
          {item.tag && (
            <span style={{ backgroundColor: "#B76E79", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", padding: "4px 9px" }}>
              {item.tag}
            </span>
          )}
          {discount && (
            <span style={{ backgroundColor: "rgba(255,240,236,0.95)", color: "#B76E79", fontFamily: "Inter, sans-serif", fontSize: "7px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 9px", fontWeight: 600 }}>
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Remove button */}
      <motion.button
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => onRemove(item)}
        style={{ position: "absolute", top: "12px", right: "12px", width: "30px", height: "30px", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", border: "1px solid #EDE5DC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8078", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#B76E79"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#B76E79"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = "#8A8078"; e.currentTarget.style.borderColor = "#EDE5DC"; }}
      >
        <X size={12} />
      </motion.button>

      {/* Info */}
      <div style={{ padding: "18px 18px 16px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B76E79", marginBottom: "6px" }}>
          {item.material}
        </p>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", fontWeight: 300, color: "#1A1410", lineHeight: 1.25, marginBottom: "12px" }}>
            {item.name}
          </h3>
        </Link>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1410" }}>
            ₹{item.price.toLocaleString("en-IN")}
          </span>
          {item.original_price && (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#B0A090", textDecoration: "line-through" }}>
              ₹{item.original_price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to bag */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(item)}
          style={{
            width: "100%", padding: "11px", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em",
            textTransform: "uppercase",
            backgroundColor: justAdded ? "#2C2C2C" : "#1A1410",
            color: "#FAF7F2",
            transition: "background-color 0.25s ease",
          }}
          onMouseEnter={e => { if (!justAdded) e.currentTarget.style.backgroundColor = "#B76E79"; }}
          onMouseLeave={e => { if (!justAdded) e.currentTarget.style.backgroundColor = "#1A1410"; }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span key="done" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                ✓ Added to Bag
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <ShoppingBag size={11} /> Add to Bag
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── main page ───────────────────────────────────────── */
export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => { const n = { ...prev }; delete n[item.id]; return n; }), 2200);
  };

  const handleAddAll = () => {
    wishlist.forEach(item => addToCart(item));
    const ids = {};
    wishlist.forEach(i => { ids[i.id] = true; });
    setAddedIds(ids);
    setTimeout(() => setAddedIds({}), 2200);
  };

  /* suggestions — products not in wishlist */
  const wishlistIds  = wishlist.map(i => i.id);
  const suggestions  = products.filter(p => !wishlistIds.includes(p.id)).slice(0, 3);

  /* ── empty state ── */
  if (wishlist.length === 0) {
    return (
      <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 48px 80px", textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "24px" }}
          >
            <Heart size={52} color="rgba(183,110,121,0.2)" strokeWidth={1} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#1A1410", margin: "0 0 12px" }}
          >
            Your Wishlist is Empty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginBottom: "36px", maxWidth: "340px", lineHeight: 1.7 }}
          >
            Save pieces you love by tapping the heart icon on any product.
          </motion.p>
          <Link
            to="/shop"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
          >
            Discover Pieces <ArrowUpRight size={13} />
          </Link>
        </div>

        <SuggestionsGrid products={suggestions} eyebrow="You Might Love" title="Start Your Wishlist" />
      </div>
    );
  }

  /* ── filled wishlist ── */
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Header */}
      <PageHeader
        eyebrow="Saved Pieces"
        title="Your Wishlist"
        watermark="Wishlist"
        padding="100px 48px 48px"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(250,247,242,0.4)" }}>
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
            </span>
            {wishlist.length > 1 && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddAll}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(183,110,121,0.15)", border: "1px solid rgba(183,110,121,0.4)", color: "#D4A0A7", padding: "10px 20px", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#B76E79"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(183,110,121,0.15)"; e.currentTarget.style.color = "#D4A0A7"; }}
              >
                <ShoppingBag size={12} /> Add All to Bag
              </motion.button>
            )}
          </div>
        }
      />

      {/* Grid */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 48px 80px" }}>
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
        >
          <AnimatePresence>
            {wishlist.map(item => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={toggleWishlist}
                onAddToCart={handleAddToCart}
                justAdded={!!addedIds[item.id]}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Continue shopping link */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            to="/shop"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8078", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
            onMouseLeave={e => e.currentTarget.style.color = "#8A8078"}
          >
            ← Continue Browsing
          </Link>
        </div>
      </div>

      {/* Suggestions */}
      <SuggestionsGrid products={suggestions} eyebrow="Curated for You" title="You May Also Love" />
    </div>
  );
}
