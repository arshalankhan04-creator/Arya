import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, ShoppingBag, Heart, Package, User,
  ChevronRight, ArrowUpRight, Clock, CheckCircle, XCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { supabase } from "../lib/supabase";

/* ── order status config ─────────────────────────────── */
const STATUS = {
  pending:   { label: "Pending",    color: "#C9A84C", icon: Clock        },
  confirmed: { label: "Confirmed",  color: "#4CAF50", icon: CheckCircle  },
  cancelled: { label: "Cancelled",  color: "#C0392B", icon: XCircle      },
};

/* ── tab definition ──────────────────────────────────── */
const TABS = [
  { id: "orders",   label: "Orders",   icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart   },
];

/* ── order card ──────────────────────────────────────── */
function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  const status = STATUS[order.status] || STATUS.pending;
  const StatusIcon = status.icon;
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", overflow: "hidden" }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A8078", marginBottom: "4px" }}>
            Order · {date}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 300, color: "#1A1410" }}>
            {order.items.length} {order.items.length === 1 ? "piece" : "pieces"} · ₹{order.total.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Status badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", border: `1px solid ${status.color}22`, backgroundColor: `${status.color}11` }}>
          <StatusIcon size={11} color={status.color} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: status.color }}>
            {status.label}
          </span>
        </div>

        {/* Expand chevron */}
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", color: "#8A8078" }}
        >
          <ChevronRight size={15} />
        </motion.span>
      </button>

      {/* Expanded items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "1px solid #EDE5DC", padding: "16px 24px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "48px", height: "56px", overflow: "hidden", backgroundColor: "#1A1410", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#1A1410", lineHeight: 1.2 }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078", marginTop: "2px" }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "#1A1410" }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order total row */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0E8E0" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8078", marginBottom: "4px" }}>Total Paid</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 300, color: "#1A1410" }}>
                    ₹{order.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── wishlist mini card ───────────────────────────────── */
function WishlistMiniCard({ item }) {
  return (
    <Link
      to={`/product/${item.id}`}
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px", backgroundColor: "#FFFFFF",
        border: "1px solid #EDE5DC", textDecoration: "none",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#B76E79"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE5DC"}
    >
      <div style={{ width: "52px", height: "60px", overflow: "hidden", backgroundColor: "#1A1410", flexShrink: 0 }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B76E79", marginBottom: "3px" }}>
          {item.material}
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#1A1410", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.name}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "#1A1410", marginTop: "4px" }}>
          ₹{item.price.toLocaleString("en-IN")}
        </p>
      </div>
      <ArrowUpRight size={13} color="#B76E79" style={{ flexShrink: 0 }} />
    </Link>
  );
}

/* ── main page ───────────────────────────────────────── */
export default function Profile() {
  const { user, loading, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab]   = useState("orders");
  const [orders, setOrders]         = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  // Fetch orders
  useEffect(() => {
    if (!user) return;
    async function fetchOrders() {
      setOrdersLoading(true);
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setOrdersLoading(false);
    }
    fetchOrders();
  }, [user]);

  if (loading || !user) return null;

  const name   = user.user_metadata?.full_name || user.email?.split("@")[0] || "Guest";
  const avatar = user.user_metadata?.avatar_url;
  const email  = user.email;
  const joined = new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── DARK HEADER ─────────────────────────────── */}
      <div style={{ backgroundColor: "#1A1410", padding: "100px 48px 0", position: "relative", overflow: "hidden" }}>

        {/* Ghost watermark */}
        <div style={{ position: "absolute", top: "50%", right: "3%", transform: "translateY(-40%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 13vw, 170px)", fontWeight: 300, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em", whiteSpace: "nowrap", pointerEvents: "none" }}>
          Profile
        </div>

        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
            <Link to="/" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(250,247,242,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,0.35)"}
            >
              Home
            </Link>
            <span style={{ color: "rgba(250,247,242,0.2)", fontSize: "10px" }}>/</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(250,247,242,0.6)" }}>My Profile</span>
          </div>

          {/* User identity block */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", paddingBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative" }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    style={{ width: "72px", height: "72px", borderRadius: "50%", border: "2px solid #B76E79", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: "2px solid #B76E79", backgroundColor: "rgba(183,110,121,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={28} color="#B76E79" />
                  </div>
                )}
                {/* Online dot */}
                <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#4CAF50", border: "2px solid #1A1410" }} />
              </motion.div>

              {/* Name + email */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "8px" }}>
                  Member since {joined}
                </p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1.1, marginBottom: "6px" }}>
                  {name}
                </h1>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(250,247,242,0.4)" }}>
                  {email}
                </p>
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ display: "flex", gap: "32px" }}
            >
              {[
                { value: orders.length,   label: "Orders"      },
                { value: wishlist.length, label: "Wishlisted"  },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "36px", fontWeight: 300, color: "#FAF7F2", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,247,242,0.35)", marginTop: "4px" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "16px 28px",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px", letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: active ? "#B76E79" : "rgba(250,247,242,0.35)",
                    borderBottom: `2px solid ${active ? "#B76E79" : "transparent"}`,
                    transition: "all 0.2s",
                    marginBottom: "-1px",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(250,247,242,0.7)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(250,247,242,0.35)"; }}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}

            {/* Sign out — pushed to right */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              <button
                onClick={signOut}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "16px 28px",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px", letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(250,247,242,0.3)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#C0392B"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,0.3)"}
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── BODY ────────────────────────────────────── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 48px 100px" }}>
        <AnimatePresence mode="wait">

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {ordersLoading ? (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#8A8078", textAlign: "center", padding: "80px 0" }}>
                  Loading orders…
                </p>
              ) : orders.length === 0 ? (
                /* Empty orders */
                <div style={{ textAlign: "center", padding: "80px 40px" }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <ShoppingBag size={52} color="rgba(183,110,121,0.2)" strokeWidth={1} />
                  </motion.div>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 300, color: "#1A1410", marginBottom: "10px" }}>
                    No orders yet
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginBottom: "32px" }}>
                    Your order history will appear here.
                  </p>
                  <Link
                    to="/shop"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                  >
                    Start Shopping <ArrowUpRight size={13} />
                  </Link>
                </div>
              ) : (
                /* Orders list */
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A8078", marginBottom: "16px" }}>
                    {orders.length} {orders.length === 1 ? "order" : "orders"} placed
                  </p>
                  {orders.map(order => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 40px" }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <Heart size={52} color="rgba(183,110,121,0.2)" strokeWidth={1} />
                  </motion.div>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 300, color: "#1A1410", marginBottom: "10px" }}>
                    Your wishlist is empty
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", marginBottom: "32px" }}>
                    Save pieces you love by tapping the heart icon.
                  </p>
                  <Link
                    to="/shop"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                  >
                    Explore the Edit <ArrowUpRight size={13} />
                  </Link>
                </div>
              ) : (
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A8078", marginBottom: "20px" }}>
                    {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
                    {wishlist.map(item => (
                      <WishlistMiniCard key={item.id} item={item} />
                    ))}
                  </div>
                  <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Link
                      to="/wishlist"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B76E79", textDecoration: "none", borderBottom: "1px solid rgba(183,110,121,0.3)", paddingBottom: "2px" }}
                    >
                      View Full Wishlist <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
