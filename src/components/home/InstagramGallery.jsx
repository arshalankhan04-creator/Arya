import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── image pool ─────────────────────────────────────────── */
const IMGS = [
  {
    src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=85",
    tag: "#BridalGlow",
    caption: "Crafted for your forever moment",
    likes: "2.4k",
  },
  {
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=85",
    tag: "#GoldenHour",
    caption: "18k gold, worn at dusk",
    likes: "1.8k",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85",
    tag: "#EverydayLuxury",
    caption: "Stack. Layer. Own it.",
    likes: "3.1k",
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85",
    tag: "#SignaturePiece",
    caption: "The ring that started it all",
    likes: "2.9k",
  },
  {
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=85",
    tag: "#SomethingBlue",
    caption: "Sapphire halo — made to remember",
    likes: "4.2k",
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85",
    tag: "#NecklaceOfTheDay",
    caption: "Layered chains, singular story",
    likes: "1.6k",
  },
];

/* ── bento cell config ──────────────────────────────────── */
// 12-column grid, rows are ~260px each
// [colStart, colEnd, rowStart, rowEnd]
const LAYOUT = [
  { col: "1 / 6",  row: "1 / 3" },   // 0 — tall-wide hero
  { col: "6 / 9",  row: "1 / 2" },   // 1 — square
  { col: "9 / 13", row: "1 / 2" },   // 2 — square
  { col: "6 / 10", row: "2 / 3" },   // 3 — wide
  { col: "10 / 13", row: "2 / 3" },  // 4 — square
  { col: "1 / 5",  row: "3 / 4" },   // 5 — wide
];

/* ── Instagram SVG ─────────────────────────────────────── */
const IgIcon = ({ size = 18, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" width={size} height={size}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill={color} stroke="none" />
  </svg>
);

const HeartIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" width={size} height={size}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/* ── BentoCell ─────────────────────────────────────────── */
function BentoCell({ img, layout, index, isHighlight }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#"
      onClick={e => e.preventDefault()}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        gridColumn: layout.col,
        gridRow: layout.row,
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        display: "block",
        cursor: "pointer",
        textDecoration: "none",
        // subtle outer glow on hero cell
        boxShadow: isHighlight
          ? "0 0 0 1px rgba(183,110,121,0.2), 0 24px 60px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.28)",
      }}
    >
      {/* ── image with subtle parallax-like zoom ── */}
      <motion.img
        src={img.src}
        alt={img.tag}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* ── always-on gradient base ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.15) 45%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ── hover overlay ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(183,110,121,0.28) 0%, rgba(26,20,16,0.55) 100%)",
              backdropFilter: "blur(1px)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── top-right: Instagram icon + likes ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: "14px", right: "14px",
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <div style={{
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          padding: "5px 10px",
          display: "flex", alignItems: "center", gap: "5px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <HeartIcon size={12} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px", fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.02em",
          }}>
            {img.likes}
          </span>
        </div>
      </motion.div>

      {/* ── bottom content — always visible ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: isHighlight ? "28px 28px 24px" : "16px 18px 16px",
      }}>
        {/* tag pill */}
        <motion.div
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: "6px" }}
        >
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E8A4AD",
            background: "rgba(183,110,121,0.18)",
            border: "1px solid rgba(183,110,121,0.3)",
            borderRadius: "20px",
            padding: "3px 10px",
          }}>
            {img.tag}
          </span>
        </motion.div>

        {/* caption — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              key="caption"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: isHighlight ? "18px" : "14px",
                fontStyle: "italic", fontWeight: 300,
                color: "rgba(250,247,242,0.9)",
                lineHeight: 1.4,
                maxWidth: "260px",
              }}
            >
              {img.caption}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── corner badge for hero cell ── */}
      {isHighlight && (
        <div style={{
          position: "absolute", top: "18px", left: "18px",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
          borderRadius: "6px",
          padding: "6px 12px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", gap: "7px",
        }}>
          <IgIcon size={14} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}>
            Featured
          </span>
        </div>
      )}
    </motion.a>
  );
}

/* ── main component ─────────────────────────────────────── */
export default function InstagramGallery() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // subtle vertical drift on the heading
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#F5EFE6", overflow: "hidden", padding: "100px 0 80px" }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>

        {/* ══ HEADER ══════════════════════════════════════ */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          {/* left: title block */}
          <motion.div style={{ y: headingY }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "28px", height: "1px",
                backgroundColor: "#B76E79",
              }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px", letterSpacing: "0.42em",
                textTransform: "uppercase", color: "#B76E79",
              }}>
                @aryacollections
              </p>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(38px, 4.5vw, 58px)",
              fontWeight: 300, lineHeight: 1.1,
              color: "#1A1410",
              letterSpacing: "-0.02em",
            }}>
              Life in<br />
              <em style={{ fontStyle: "italic", color: "#B76E79" }}>Jewellery</em>
            </h2>
          </motion.div>

          {/* right: CTA + hashtag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ textAlign: "right" }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px", color: "rgba(44,36,28,0.5)",
              lineHeight: 1.7, marginBottom: "16px",
              maxWidth: "240px",
            }}>
              Tag your moments with us and get featured in our community gallery.
            </p>
            {/* hashtag pill CTA */}
            <motion.a
              href="#"
              onClick={e => e.preventDefault()}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(183,110,121,0.18)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(183,110,121,0.1)",
                border: "1px solid rgba(183,110,121,0.35)",
                borderRadius: "40px",
                padding: "10px 20px",
                textDecoration: "none",
                transition: "background-color 0.3s ease",
              }}
            >
              <IgIcon size={14} color="#D4A0A7" />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#D4A0A7",
                fontWeight: 500,
              }}>
                #AryaCollections
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* ══ BENTO GRID ══════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "260px 260px 260px",
          gap: "10px",
        }}>
          {IMGS.map((img, i) => (
            <BentoCell
              key={i}
              img={img}
              layout={LAYOUT[i]}
              index={i}
              isHighlight={i === 0}
            />
          ))}

          {/* ── CTA Bento Cell — fills the remaining space in row 3 ── */}
          <motion.a
            href="#"
            onClick={e => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ backgroundColor: "rgba(183,110,121,0.14)" }}
            style={{
              gridColumn: "5 / 13",
              gridRow: "3 / 4",
              borderRadius: "8px",
              border: "1px dashed rgba(183,110,121,0.28)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              cursor: "pointer",
              textDecoration: "none",
              backgroundColor: "rgba(183,110,121,0.05)",
              transition: "background-color 0.3s ease",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <IgIcon size={28} color="#B76E79" />
            </motion.div>
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "22px", fontWeight: 300,
                color: "#1A1410", lineHeight: 1.3,
                marginBottom: "6px",
              }}>
                Share your story
              </p>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px", letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(183,110,121,0.7)",
              }}>
                Follow on Instagram
              </p>
            </div>
          </motion.a>
        </div>

        {/* ══ BOTTOM STATS BAR ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: "28px",
            display: "flex", alignItems: "center",
            gap: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(44,36,28,0.1)",
          }}
        >
          {[
            { value: "48K+", label: "Followers" },
            { value: "2.1K+", label: "Posts tagged" },
            { value: "12K+", label: "Community shares" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "24px", fontWeight: 300,
                color: "#1A1410",
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px", letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(44,36,28,0.4)",
              }}>
                {s.label}
              </p>
              {i < 2 && (
                <div style={{
                  width: "1px", height: "20px",
                  backgroundColor: "rgba(44,36,28,0.1)",
                  marginLeft: "22px",
                }} />
              )}
            </div>
          ))}

          <div style={{ marginLeft: "auto" }}>
            <motion.a
              href="#"
              onClick={e => e.preventDefault()}
              whileHover={{ gap: "12px" }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "Inter, sans-serif",
                fontSize: "10px", letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#B76E79",
                textDecoration: "none",
                transition: "gap 0.3s ease",
              }}
            >
              View all posts
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5h14M10 1l5 4-5 4" stroke="#B76E79" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
