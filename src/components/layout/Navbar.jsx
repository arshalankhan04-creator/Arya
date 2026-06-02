import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Search, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

/* ── nav data ───────────────────────────────────────────── */
const leftLinks = [
  {
    label: "Shop",
    to: "/shop",
    mega: true,
    columns: [
      {
        heading: "Collections",
        links: ["New Arrivals", "Bridal Edit", "Everyday Luxe", "Gift Sets"],
      },
      {
        heading: "Category",
        links: ["Rings", "Necklaces", "Earrings", "Bracelets"],
      },
      {
        heading: "By Metal",
        links: ["18k Gold", "Rose Gold", "Sterling Silver", "Diamond"],
      },
    ],
    featured: {
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85",
      label: "Bridal Edit 2025",
      sub: "Crafted for your forever",
    },
  },
  { label: "Bridal", to: "/shop" },
  { label: "About",  to: "/about" },
];
const rightLinks = [
  { label: "Gallery",      to: "/shop" },
  { label: "Testimonials", to: "/" },
  { label: "Contact",      to: "/contact" },
];

/* ── helpers ────────────────────────────────────────────── */
const Badge = ({ count }) =>
  count > 0 ? (
    <motion.span
      key={count}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        position: "absolute", top: "-6px", right: "-7px",
        background: "#B76E79", color: "#fff",
        fontSize: "8px", fontWeight: 700,
        width: "15px", height: "15px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        border: "1.5px solid var(--nav-bg)",
      }}
    >
      {count}
    </motion.span>
  ) : null;

/* ── MegaMenu ───────────────────────────────────────────── */
function MegaMenu({ data, scrolled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: "calc(100% + 1px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "720px",
        backgroundColor: "#FFFFFF",
        borderTop: "2px solid #B76E79",
        boxShadow: "0 24px 64px rgba(0,0,0,0.13)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 200px",
        overflow: "hidden",
      }}
    >
      {/* Columns */}
      {data.columns.map((col) => (
        <div key={col.heading} style={{ padding: "32px 24px" }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px", letterSpacing: "0.36em",
            textTransform: "uppercase", color: "#B76E79",
            marginBottom: "16px",
          }}>
            {col.heading}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {col.links.map((l) => (
              <Link
                key={l} to="/shop"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "15px", fontWeight: 400,
                  color: "#2C2C2C", textDecoration: "none",
                  transition: "color 0.18s",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#B76E79"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#2C2C2C"; }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Featured image tile */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={data.featured.img}
          alt={data.featured.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,6,4,0.82) 0%, transparent 55%)",
        }} />
        <div style={{ position: "absolute", bottom: "18px", left: "16px", right: "16px" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "15px", fontWeight: 400, fontStyle: "italic",
            color: "#FAF7F2", lineHeight: 1.3, marginBottom: "4px",
          }}>
            {data.featured.label}
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", letterSpacing: "0.2em",
            color: "rgba(250,247,242,0.6)",
          }}>
            {data.featured.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── main component ─────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [megaOpen,     setMegaOpen]     = useState(null);   // link label or null
  const [searchVal,    setSearchVal]    = useState("");
  const searchRef  = useRef(null);
  const megaTimer  = useRef(null);
  const location   = useLocation();

  const { cartCount }     = useCart();
  const { wishlistCount } = useWishlist();

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mega / search on route change */
  useEffect(() => {
    setMegaOpen(null);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [location]);

  /* focus search input when opened */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  /* derived */
  const isHome     = location.pathname === "/";
  const transparent = isHome && !scrolled && !megaOpen && !searchOpen;

  const navBg    = transparent ? "transparent"                    : "rgba(255,255,255,0.92)";
  const navBdr   = transparent ? "rgba(255,255,255,0.10)"         : "#ECDFD6";
  const logoClr  = transparent ? "#FFFFFF"                        : "#2C2C2C";
  const linkClr  = transparent ? "rgba(255,255,255,0.85)"         : "#2C2C2C";
  const iconClr  = transparent ? "rgba(255,255,255,0.85)"         : "#2C2C2C";
  const blurVal  = transparent ? "none"                           : "blur(18px)";

  const linkStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "11px", letterSpacing: "0.08em",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "color 0.2s",
    color: linkClr,
    display: "flex", alignItems: "center", gap: "3px",
  };

  /* mega hover helpers — small delay prevents flicker */
  const openMega  = (label) => { clearTimeout(megaTimer.current); setMegaOpen(label); };
  const closeMega = ()      => { megaTimer.current = setTimeout(() => setMegaOpen(null), 120); };

  return (
    <>
      {/* CSS variable for badge border matching nav bg */}
      <style>{`
        :root { --nav-bg: ${transparent ? "#1C1410" : "#ffffff"}; }
        .nav-link:hover { color: #B76E79 !important; }
        .icon-btn:hover svg { stroke: #B76E79; }
        .icon-btn:hover { color: #B76E79; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "68px",
          backgroundColor: navBg,
          backdropFilter: blurVal,
          WebkitBackdropFilter: blurVal,
          borderBottom: `1px solid ${navBdr}`,
          transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          boxSizing: "border-box",
        }}
      >

        {/* ── Left nav ───────────────────────────────── */}
        <nav className="desktop-nav" style={{ display: "flex", gap: "32px", flex: 1, alignItems: "center" }}>
          {leftLinks.map((l) => (
            <div
              key={l.label}
              style={{ position: "relative" }}
              onMouseEnter={() => l.mega ? openMega(l.label) : null}
              onMouseLeave={() => l.mega ? closeMega()       : null}
            >
              <NavLink
                to={l.to}
                className="nav-link"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? "#B76E79" : linkClr,
                })}
              >
                {l.label}
                {l.mega && (
                  <motion.span
                    animate={{ rotate: megaOpen === l.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", opacity: 0.6 }}
                  >
                    <ChevronDown size={11} />
                  </motion.span>
                )}
              </NavLink>

              {/* Underline indicator */}
              <motion.div
                style={{
                  position: "absolute", bottom: "-4px", left: 0, right: 0,
                  height: "1px", backgroundColor: "#B76E79",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Mega menu */}
              <AnimatePresence>
                {l.mega && megaOpen === l.label && (
                  <div
                    onMouseEnter={() => openMega(l.label)}
                    onMouseLeave={() => closeMega()}
                  >
                    <MegaMenu data={l} scrolled={scrolled} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* ── Center logo ────────────────────────────── */}
        <Link
          to="/"
          style={{
            textDecoration: "none", textAlign: "center",
            flexShrink: 0, padding: "0 40px",
            transition: "opacity 0.2s",
          }}
        >
          <motion.div
            animate={{ opacity: searchOpen ? 0.3 : 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "22px", fontWeight: 400,
              letterSpacing: "0.5em",
              color: logoClr, lineHeight: 1,
              transition: "color 0.4s ease",
            }}
          >
            ARYA
          </motion.div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "7.5px", letterSpacing: "0.55em",
            textTransform: "uppercase", color: "#B76E79",
            marginTop: "3px",
            transition: "opacity 0.4s ease",
            opacity: searchOpen ? 0.3 : 1,
          }}>
            Collections
          </div>
        </Link>

        {/* ── Right nav + icons ──────────────────────── */}
        <div className="desktop-nav" style={{ display: "flex", gap: "32px", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>

          {/* Right nav links */}
          {!searchOpen && rightLinks.map((l) => (
            <div key={l.label} style={{ position: "relative" }}>
              <NavLink
                to={l.to}
                className="nav-link"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? "#B76E79" : linkClr,
                })}
              >
                {l.label}
              </NavLink>
              <motion.div
                style={{
                  position: "absolute", bottom: "-4px", left: 0, right: 0,
                  height: "1px", backgroundColor: "#B76E79",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>
          ))}

          {/* Search input — expands inline */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                key="search-bar"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "240px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  overflow: "hidden",
                  display: "flex", alignItems: "center",
                  borderBottom: "1px solid #B76E79",
                  gap: "8px",
                }}
              >
                <Search size={13} color="#B76E79" style={{ flexShrink: 0 }} />
                <input
                  ref={searchRef}
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search jewellery…"
                  style={{
                    flex: 1,
                    background: "none", border: "none", outline: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px", letterSpacing: "0.04em",
                    color: transparent ? "#fff" : "#2C2C2C",
                    padding: "4px 0",
                  }}
                  onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon group */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexShrink: 0 }}>

            {/* Search toggle */}
            <motion.button
              className="icon-btn"
              onClick={() => setSearchOpen(v => !v)}
              whileTap={{ scale: 0.88 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: searchOpen ? "#B76E79" : iconClr,
                display: "flex", padding: "4px",
                transition: "color 0.2s",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {searchOpen
                  ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={16} /></motion.span>
                  : <motion.span key="s"  initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Search size={16} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>

            {/* Divider */}
            <div style={{ width: "1px", height: "14px", backgroundColor: transparent ? "rgba(255,255,255,0.18)" : "#ECDFD6" }} />

            {/* Wishlist */}
            <motion.div whileHover={{ y: -1 }} style={{ position: "relative" }}>
              <Link
                to="/wishlist"
                className="icon-btn"
                style={{ color: iconClr, display: "flex", padding: "4px", transition: "color 0.2s" }}
              >
                <Heart size={16} />
                <Badge count={wishlistCount} />
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ y: -1 }} style={{ position: "relative" }}>
              <Link
                to="/cart"
                className="icon-btn"
                style={{
                  color: iconClr, display: "flex", padding: "4px",
                  transition: "color 0.2s", textDecoration: "none",
                }}
              >
                <ShoppingBag size={16} />
                <Badge count={cartCount} />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── Mobile: right-side icon + burger ───────── */}
        <div
          className="mobile-menu-btn"
          style={{ display: "none", alignItems: "center", gap: "14px", marginLeft: "auto" }}
        >
          <Link to="/cart" style={{ position: "relative", color: iconClr, display: "flex" }}>
            <ShoppingBag size={16} />
            <Badge count={cartCount} />
          </Link>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: iconClr, display: "flex" }}
          >
            <Menu size={20} />
          </motion.button>
        </div>

      </header>

      {/* ── Spacer so fixed navbar doesn't overlap content on non-home pages ── */}
      {!isHome && <div style={{ height: "68px" }} />}

      {/* ══════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 200, backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{
                position: "fixed", top: 0, right: 0,
                height: "100%", width: "300px",
                backgroundColor: "#FDFAF6",
                zIndex: 300,
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 28px",
                borderBottom: "1px solid #ECDFD6",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "20px", letterSpacing: "0.4em", color: "#1A1410",
                  }}>
                    ARYA
                  </div>
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px", letterSpacing: "0.45em",
                    textTransform: "uppercase", color: "#B76E79",
                    marginTop: "2px",
                  }}>
                    Collections
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#2C2C2C",
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Drawer links */}
              <nav style={{ padding: "32px 28px", flex: 1 }}>
                {[...leftLinks, ...rightLinks].map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.055, duration: 0.35 }}
                    style={{ borderBottom: "1px solid #F0E8E0" }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "16px 0",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "20px", fontWeight: 400,
                        color: isActive ? "#B76E79" : "#1A1410",
                        textDecoration: "none",
                        letterSpacing: "0.03em",
                      })}
                    >
                      {l.label}
                      <ArrowUpRight size={14} color="#B76E79" strokeWidth={1.5} />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div style={{
                padding: "24px 28px",
                borderTop: "1px solid #ECDFD6",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", color: "#8A8078",
                  fontSize: "15px", lineHeight: 1.5,
                  marginBottom: "16px",
                }}>
                  "Wear your story"
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      fontFamily: "Inter, sans-serif", fontSize: "10px",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#2C2C2C", textDecoration: "none",
                    }}
                  >
                    <Heart size={13} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      fontFamily: "Inter, sans-serif", fontSize: "10px",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#B76E79", textDecoration: "none",
                    }}
                  >
                    <ShoppingBag size={13} /> Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
