import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search, ArrowUpRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";

/* ── filter config ───────────────────────────────────────── */
const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
const MATERIALS  = ["All", "Rose Gold", "White Gold", "Yellow Gold", "Sterling Silver"];
const SORT_OPTIONS = [
  { label: "Featured",      value: "featured"    },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc"},
  { label: "New Arrivals",  value: "new"          },
  { label: "Bestsellers",   value: "best"         },
];

/* ── small helpers ───────────────────────────────────────── */
const PRICE_MAX = 60000;

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #EDE5DC", paddingBottom: "20px", marginBottom: "20px" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", background: "none", border: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer", padding: "0 0 14px",
        }}
      >
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "9px", letterSpacing: "0.32em",
          textTransform: "uppercase", fontWeight: 600,
          color: "#1A1410",
        }}>
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: "flex", color: "#8A8078" }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────── */
export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  // Pre-select category from URL param e.g. /shop?category=Rings
  const urlCategory = searchParams.get("category");
  const initialCategory = CATEGORIES.includes(urlCategory) ? urlCategory : "All";

  const [category,  setCategory]  = useState(initialCategory);
  const [material,  setMaterial]  = useState("All");
  const [priceMax,  setPriceMax]  = useState(PRICE_MAX);
  const [sort,      setSort]      = useState("featured");
  const [search,    setSearch]    = useState("");
  const [sortOpen,  setSortOpen]  = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── active filter chips ── */
  const activeFilters = [
    ...(category !== "All"        ? [{ key: "category", label: category }]           : []),
    ...(material !== "All"        ? [{ key: "material", label: material }]            : []),
    ...(priceMax < PRICE_MAX      ? [{ key: "price",    label: `Under ₹${(priceMax/1000).toFixed(0)}k` }] : []),
    ...(search.trim()             ? [{ key: "search",   label: `"${search.trim()}"` }] : []),
  ];

  const clearFilter = (key) => {
    if (key === "category") setCategory("All");
    if (key === "material") setMaterial("All");
    if (key === "price")    setPriceMax(PRICE_MAX);
    if (key === "search")   setSearch("");
  };

  const clearAll = () => {
    setCategory("All"); setMaterial("All");
    setPriceMax(PRICE_MAX); setSearch("");
  };

  /* ── filtered + sorted products ── */
  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All")    list = list.filter(p => p.category === category);
    if (material !== "All")    list = list.filter(p => p.material === material);
    list = list.filter(p => p.price <= priceMax);
    if (search.trim())         list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case "price_asc":  list.sort((a, b) => a.price - b.price);   break;
      case "price_desc": list.sort((a, b) => b.price - a.price);   break;
      case "new":        list = list.filter(p => p.is_new).concat(list.filter(p => !p.is_new)); break;
      case "best":       list = list.filter(p => p.tag === "Bestseller").concat(list.filter(p => p.tag !== "Bestseller")); break;
      default: break;
    }
    return list;
  }, [products, category, material, priceMax, search, sort]);

  const currentSort = SORT_OPTIONS.find(o => o.value === sort);

  /* ── loading / error states ── */
  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: "#8A8078", letterSpacing: "0.04em" }}>
        Loading collection…
      </p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B76E79" }}>
        Could not load products. Please try again.
      </p>
    </div>
  );

  /* ── sidebar content (shared between desktop + drawer) ── */
  const SidebarContent = () => (
    <div style={{ padding: "0" }}>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        border: "1px solid #EDE5DC",
        padding: "10px 14px",
        marginBottom: "28px",
        backgroundColor: "#FDFAF6",
      }}>
        <Search size={13} color="#8A8078" style={{ flexShrink: 0 }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search pieces…"
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px", color: "#2C2C2C",
            letterSpacing: "0.04em",
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8078", display: "flex", padding: 0 }}>
            <X size={12} />
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "8px 10px",
                fontFamily: category === c ? "'Cormorant Garamond', Georgia, serif" : "Inter, sans-serif",
                fontSize: category === c ? "16px" : "12px",
                fontWeight: category === c ? 400 : 400,
                color: category === c ? "#1A1410" : "#8A8078",
                letterSpacing: category === c ? "0.02em" : "0.04em",
                borderLeft: `2px solid ${category === c ? "#B76E79" : "transparent"}`,
                transition: "all 0.2s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Metal">
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {MATERIALS.map(m => (
            <button
              key={m}
              onClick={() => setMaterial(m)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "8px 10px",
                display: "flex", alignItems: "center", gap: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: material === m ? "#1A1410" : "#8A8078",
                transition: "color 0.2s ease",
              }}
            >
              {/* Color swatch */}
              <span style={{
                width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                backgroundColor: {
                  "All": "#C9A84C",
                  "Rose Gold": "#D4856A",
                  "White Gold": "#E8E4DF",
                  "Yellow Gold": "#C9A84C",
                  "Sterling Silver": "#B0B0B0",
                }[m] || "#C9A84C",
                border: material === m ? "2px solid #B76E79" : "1px solid #D8D0C8",
                transition: "border 0.2s ease",
              }} />
              {m}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price range */}
      <FilterSection title="Price Range">
        <div style={{ padding: "4px 10px 8px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: "14px",
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#1A1410", fontWeight: 300 }}>
              ₹0
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#B76E79", fontWeight: 300 }}>
              ₹{(priceMax / 1000).toFixed(0)}k
            </span>
          </div>
          <input
            type="range"
            min={5000}
            max={PRICE_MAX}
            step={1000}
            value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "#B76E79",
              cursor: "pointer",
            }}
          />
        </div>
      </FilterSection>

      {/* Clear all */}
      {activeFilters.length > 0 && (
        <button
          onClick={clearAll}
          style={{
            width: "100%", background: "none",
            border: "1px solid #EDE5DC",
            padding: "10px",
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8A8078", cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#B76E79"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE5DC"; e.currentTarget.style.color = "#8A8078"; }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════════════
          EDITORIAL HEADER
      ══════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: "#1A1410",
        padding: "120px 48px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative large text */}
        <div style={{
          position: "absolute",
          top: "50%", right: "5%",
          transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(80px, 12vw, 160px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
        }}>
          Collection
        </div>

        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px", letterSpacing: "0.42em",
              textTransform: "uppercase", color: "#B76E79",
              marginBottom: "16px",
            }}
          >
            Arya Collections
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(42px, 5vw, 68px)",
              fontWeight: 300, lineHeight: 1.05,
              color: "#FAF7F2",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            The Edit
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px", color: "rgba(250,247,242,0.45)",
              lineHeight: 1.7, maxWidth: "420px",
            }}>
              Curated pieces for every occasion — from everyday luxe to once-in-a-lifetime bridal.
            </p>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 14px",
              border: "1px solid rgba(183,110,121,0.3)",
              borderRadius: "2px",
            }}>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px", fontWeight: 500,
                color: "#FAF7F2",
              }}>
                {filtered.length}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px", letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,247,242,0.45)",
              }}>
                {filtered.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          ACTIVE FILTER CHIPS
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: "#F5EFE6",
              borderBottom: "1px solid #EDE5DC",
              overflow: "hidden",
            }}
          >
            <div style={{
              maxWidth: "1320px", margin: "0 auto",
              padding: "12px 48px",
              display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px", letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#8A8078",
              }}>
                Filtered by:
              </span>
              {activeFilters.map(f => (
                <motion.button
                  key={f.key}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  onClick={() => clearFilter(f.key)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "5px 12px",
                    backgroundColor: "#1A1410",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px", letterSpacing: "0.08em",
                    color: "#FAF7F2",
                  }}
                >
                  {f.label}
                  <X size={10} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════
          BODY — sidebar + grid
      ══════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: "1320px", margin: "0 auto",
        padding: "0 48px 80px",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "0 48px",
        alignItems: "start",
      }}>

        {/* ── DESKTOP SIDEBAR ── */}
        <aside style={{
          position: "sticky",
          top: "88px",
          paddingTop: "40px",
        }}>
          <SidebarContent />
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div style={{ paddingTop: "40px" }}>

          {/* Top bar: sort + mobile filter btn */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "28px",
            paddingBottom: "20px",
            borderBottom: "1px solid #EDE5DC",
          }}>
            {/* Mobile filter button */}
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                display: "none",   /* shown via CSS media would need a class — show inline for simplicity */
                alignItems: "center", gap: "8px",
                background: "none",
                border: "1px solid #EDE5DC",
                padding: "9px 16px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "10px", letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#2C2C2C",
              }}
              className="mobile-filter-btn"
            >
              <SlidersHorizontal size={13} /> Filter
            </button>

            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px", color: "#8A8078",
            }}>
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>

            {/* Sort dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSortOpen(v => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "none", border: "1px solid #EDE5DC",
                  padding: "9px 16px", cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px", letterSpacing: "0.1em",
                  color: "#2C2C2C",
                }}
              >
                Sort: {currentSort.label}
                <motion.span animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                  <ChevronDown size={13} />
                </motion.span>
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", top: "calc(100% + 4px)", right: 0,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EDE5DC",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                      zIndex: 50, minWidth: "180px",
                    }}
                  >
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); setSortOpen(false); }}
                        style={{
                          width: "100%", background: "none", border: "none",
                          padding: "11px 18px", textAlign: "left",
                          cursor: "pointer",
                          fontFamily: sort === o.value ? "'Cormorant Garamond', serif" : "Inter, sans-serif",
                          fontSize: sort === o.value ? "15px" : "11px",
                          color: sort === o.value ? "#1A1410" : "#8A8078",
                          borderLeft: sort === o.value ? "2px solid #B76E79" : "2px solid transparent",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={e => { if (sort !== o.value) e.currentTarget.style.color = "#1A1410"; }}
                        onMouseLeave={e => { if (sort !== o.value) e.currentTarget.style.color = "#8A8078"; }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── PRODUCT GRID ── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: "center",
                  padding: "100px 40px",
                  backgroundColor: "#F5EFE6",
                  border: "1px dashed #EDE5DC",
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "72px", fontWeight: 300,
                  color: "rgba(183,110,121,0.15)",
                  lineHeight: 1, marginBottom: "16px",
                  userSelect: "none",
                }}>
                  ✦
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "28px", fontWeight: 300,
                  color: "#1A1410", marginBottom: "10px",
                }}>
                  No pieces found
                </p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px", color: "#8A8078",
                  marginBottom: "28px",
                }}>
                  Try adjusting your filters or clearing your search.
                </p>
                <button
                  onClick={clearAll}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    backgroundColor: "#1A1410", color: "#FAF7F2",
                    border: "none", padding: "12px 28px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px", letterSpacing: "0.2em",
                    textTransform: "uppercase", cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                >
                  Clear All Filters <ArrowUpRight size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "3px",
                }}
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      /* Every 7th card (0-indexed: 0, 6, 7, 13...) spans 2 cols for visual rhythm */
                      gridColumn: (i === 0 || i === 6) ? "span 2" : "span 1",
                      height: (i === 0 || i === 6) ? "480px" : "360px",
                    }}
                  >
                    <ProductCard product={product} large={i === 0 || i === 6} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE FILTER DRAWER
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 200, backdropFilter: "blur(3px)" }}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{
                position: "fixed", top: 0, left: 0,
                height: "100%", width: "300px",
                backgroundColor: "#FAF7F2",
                zIndex: 300,
                overflowY: "auto",
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px", letterSpacing: "0.32em",
                  textTransform: "uppercase", color: "#1A1410",
                }}>
                  Filters
                </p>
                <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#2C2C2C", display: "flex" }}>
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* close sort dropdown on outside click */}
      {sortOpen && (
        <div
          onClick={() => setSortOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40 }}
        />
      )}
    </div>
  );
}
