import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowUpRight, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import PageHeader from "../components/ui/PageHeader";
import SuggestionsGrid from "../components/ui/SuggestionsGrid";

/* ── promo codes ─────────────────────────────────────── */
const PROMO_CODES = {
  ARYA10:  { discount: 0.10, label: "10% off your order"   },
  BRIDAL20: { discount: 0.20, label: "20% off bridal pieces" },
  WELCOME: { discount: 0.15, label: "15% welcome discount"  },
};

/* ── cart item row ───────────────────────────────────── */
function CartItem({ item, onRemove, onQtyChange }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 320);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: removing ? 0 : 1, x: removing ? 40 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr auto",
        gap: "20px",
        alignItems: "center",
        padding: "24px 0",
        borderBottom: "1px solid #EDE5DC",
      }}
    >
      {/* Image */}
      <Link to={`/product/${item.id}`} style={{ display: "block", flexShrink: 0 }}>
        <div style={{ width: "100px", height: "120px", overflow: "hidden", backgroundColor: "#1A1410" }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>
      </Link>

      {/* Info */}
      <div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B76E79", marginBottom: "6px" }}>
          {item.material}
        </p>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 300, color: "#1A1410", lineHeight: 1.2, marginBottom: "12px" }}>
            {item.name}
          </h3>
        </Link>

        {/* Qty stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <button
            onClick={() => onQtyChange(item.id, item.quantity - 1)}
            style={{ width: "32px", height: "32px", border: "1px solid #EDE5DC", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8078", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#B76E79"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE5DC"; e.currentTarget.style.color = "#8A8078"; }}
          >
            <Minus size={11} />
          </button>
          <span style={{ width: "44px", height: "32px", border: "1px solid #EDE5DC", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1410" }}>
            {item.quantity}
          </span>
          <button
            onClick={() => onQtyChange(item.id, item.quantity + 1)}
            style={{ width: "32px", height: "32px", border: "1px solid #EDE5DC", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8078", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#B76E79"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE5DC"; e.currentTarget.style.color = "#8A8078"; }}
          >
            <Plus size={11} />
          </button>
        </div>
      </div>

      {/* Price + remove */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
        <button
          onClick={handleRemove}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#C8BDB5", display: "flex", padding: "4px", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
          onMouseLeave={e => e.currentTarget.style.color = "#C8BDB5"}
        >
          <X size={15} />
        </button>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 300, color: "#1A1410", lineHeight: 1 }}>
            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
          </p>
          {item.quantity > 1 && (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", marginTop: "3px" }}>
              ₹{item.price.toLocaleString("en-IN")} each
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── main page ───────────────────────────────────────── */
export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [promoInput,  setPromoInput]  = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError,  setPromoError]  = useState("");

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied({ code, ...PROMO_CODES[code] });
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try ARYA10 or WELCOME.");
      setPromoApplied(null);
    }
  };

  const discount     = promoApplied ? Math.round(cartTotal * promoApplied.discount) : 0;
  const shipping     = cartTotal > 999 ? 0 : 99;
  const finalTotal   = cartTotal - discount + shipping;

  /* suggestions — products not in cart */
  const cartIds      = cartItems.map(i => i.id);
  const suggestions  = products.filter(p => !cartIds.includes(p.id)).slice(0, 3);

  /* ── empty cart ── */
  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 48px 80px", textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShoppingBag size={48} color="rgba(183,110,121,0.25)" strokeWidth={1} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#1A1410", margin: "24px 0 12px" }}
          >
            Your Bag is Empty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginBottom: "36px" }}
          >
            Discover our curated collection of fine jewellery.
          </motion.p>
          <Link
            to="/shop"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
          >
            Explore the Edit <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Suggestions even when empty */}
        <SuggestionsGrid products={suggestions} eyebrow="Start Here" title="You Might Love" />
      </div>
    );
  }

  /* ── filled cart ── */
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Header */}
      <PageHeader
        eyebrow="Your Selection"
        title="Shopping Bag"
        watermark="Bag"
        right={
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(250,247,242,0.4)" }}>
            {cartItems.reduce((s, i) => s + i.quantity, 0)} {cartItems.length === 1 ? "item" : "items"}
          </span>
        }
      />

      {/* Body */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "64px", alignItems: "start", paddingTop: "48px" }}>

          {/* LEFT — items */}
          <div>
            <AnimatePresence>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} onQtyChange={updateQuantity} />
              ))}
            </AnimatePresence>

            {/* Continue shopping */}
            <div style={{ marginTop: "32px" }}>
              <Link
                to="/shop"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8078", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
                onMouseLeave={e => e.currentTarget.style.color = "#8A8078"}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT — order summary */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", padding: "32px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#1A1410", marginBottom: "24px", fontWeight: 600 }}>
                Order Summary
              </p>

              {/* Line items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>Subtotal</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1410" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#B76E79" }}>Promo ({promoApplied.code})</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#B76E79" }}>−₹{discount.toLocaleString("en-IN")}</span>
                  </motion.div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078" }}>Shipping</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: shipping === 0 ? "#4CAF50" : "#1A1410" }}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #EDE5DC", paddingTop: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1410", fontWeight: 600 }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "#1A1410" }}>
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                {shipping > 0 && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", marginTop: "6px" }}>
                    Add ₹{(999 - cartTotal + 1).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo code */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "0" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", border: "1px solid #EDE5DC", borderRight: "none", padding: "0 12px", backgroundColor: "#FDFAF6" }}>
                    <Tag size={12} color="#8A8078" />
                    <input
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError(""); }}
                      onKeyDown={e => e.key === "Enter" && applyPromo()}
                      placeholder="Promo code"
                      style={{ flex: 1, border: "none", background: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#1A1410", padding: "11px 0", letterSpacing: "0.04em" }}
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    style={{ padding: "0 16px", backgroundColor: "#1A1410", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FAF7F2", transition: "background-color 0.2s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                  >
                    Apply
                  </button>
                </div>
                <AnimatePresence>
                  {promoError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#C0392B", marginTop: "6px" }}>
                      {promoError}
                    </motion.p>
                  )}
                  {promoApplied && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B76E79", marginTop: "6px" }}>
                      ✓ {promoApplied.label}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Checkout CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                style={{ width: "100%", padding: "16px", backgroundColor: "#1A1410", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#FAF7F2", transition: "background-color 0.25s", marginBottom: "12px" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
              >
                <ShoppingBag size={14} /> Proceed to Checkout
              </motion.button>

              {/* Trust note */}
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", textAlign: "center", lineHeight: 1.6 }}>
                🔒 Secure checkout · Free returns · Hallmark certified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <SuggestionsGrid products={suggestions} eyebrow="Keep Exploring" title="You May Also Like" />
    </div>
  );
}
