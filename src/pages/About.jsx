import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ── data ────────────────────────────────────────────── */
const VALUES = [
  {
    number: "01",
    title: "Heritage Craft",
    body: "Rooted in generations of Indian jewellery-making tradition. Every piece carries the fingerprint of our master artisans, trained in techniques passed down through centuries.",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85",
  },
  {
    number: "02",
    title: "Ethical Sourcing",
    body: "We work exclusively with certified suppliers. Every stone is conflict-free, every metal hallmark-verified. We believe beauty should never come at a hidden cost.",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85",
  },
  {
    number: "03",
    title: "Modern Sensibility",
    body: "Our designs live at the intersection of timeless Indian aesthetics and contemporary luxury. Made for the woman who honours her roots while writing her own story.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=85",
  },
];

const MILESTONES = [
  { year: "2009", event: "Founded in Mumbai's Zaveri Bazaar"             },
  { year: "2013", event: "Launched our first bridal collection"           },
  { year: "2017", event: "Opened flagship store in Bandra"                },
  { year: "2020", event: "400+ verified five-star reviews"                },
  { year: "2023", event: "Introduced the Everyday Luxe line"              },
  { year: "2025", event: "2,000+ handcrafted pieces every year"           },
];

const TEAM = [
  { name: "Priya Arya",    role: "Founder & Creative Director", img: "https://i.pravatar.cc/300?img=47" },
  { name: "Rohit Sharma",  role: "Head of Design",              img: "https://i.pravatar.cc/300?img=12" },
  { name: "Meera Kapoor",  role: "Master Goldsmith",            img: "https://i.pravatar.cc/300?img=48" },
  { name: "Ankit Joshi",   role: "Gemologist & Sourcing Lead",  img: "https://i.pravatar.cc/300?img=15" },
];

/* ── parallax image wrapper ──────────────────────────── */
function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <motion.img
        src={src} alt={alt} style={{ y, width: "100%", height: "115%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ── section heading ─────────────────────────────────── */
function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
    >
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "12px" }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#1A1410", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
    </motion.div>
  );
}

export default function About() {
  return (
    <div style={{ backgroundColor: "#FAF7F2" }}>

      {/* ══════════════════════════════════════════
          HERO — full-bleed dark, editorial
      ══════════════════════════════════════════ */}
      <div style={{ position: "relative", height: "92vh", minHeight: "600px", overflow: "hidden", backgroundColor: "#1A1410" }}>
        {/* Background image with parallax */}
        <div style={{ position: "absolute", inset: 0 }}>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=90"
            alt="Arya Collections atelier"
          />
        </div>
        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(14,10,8,0.92) 0%, rgba(14,10,8,0.55) 50%, rgba(14,10,8,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,10,8,0.9) 0%, transparent 45%)" }} />

        {/* Content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 6% 7%" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.44em", textTransform: "uppercase", color: "#B76E79", marginBottom: "20px" }}
          >
            Est. Mumbai · 2009
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "700px", marginBottom: "28px" }}
          >
            Where Heritage<br />Meets<br /><em style={{ color: "#D4919A" }}>Modern Luxury</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "360px" }}>
              Fine jewellery handcrafted for the modern Indian woman — rooted in tradition, alive in the present.
            </p>
            {/* Scroll cue */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.25)" }}
            >
              <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(183,110,121,0.4)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", letterSpacing: "0.28em", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Scroll</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          OPENING STATEMENT
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ width: "32px", height: "1px", backgroundColor: "#B76E79", marginBottom: "32px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 300, color: "#1A1410", lineHeight: 1.65, letterSpacing: "0.01em" }}>
            "Arya Collections was born from a single belief — that every woman deserves jewellery that feels like it was made for her alone. We don't mass-produce. We don't cut corners. Every piece that leaves our atelier in Zaveri Bazaar has been touched by hands that have spent a lifetime learning their craft."
          </p>
          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://i.pravatar.cc/48?img=47" alt="Priya Arya" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #B76E79" }} />
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#1A1410" }}>Priya Arya</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078" }}>Founder & Creative Director</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#1A1410", padding: "60px 48px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          {[
            { value: "15+",   label: "Years of Craft",      sub: "Est. 2009, Mumbai"      },
            { value: "2000+", label: "Pieces Crafted",      sub: "Annually by hand"        },
            { value: "400+",  label: "Verified Reviews",    sub: "4.9 average rating"      },
            { value: "98%",   label: "Recommend Us",        sub: "To friends & family"     },
          ].map((s, i, arr) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ textAlign: "center", padding: "0 24px", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1, marginBottom: "10px" }}>{s.value}</p>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#B76E79", margin: "0 auto 10px" }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,0.45)", marginBottom: "4px" }}>{s.label}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(183,110,121,0.7)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          OUR VALUES — alternating image + text
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 48px" }}>
        <div style={{ marginBottom: "64px" }}>
          <SectionHeading eyebrow="What We Stand For" title={"Our\nPhilosophy"} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", direction: i % 2 !== 0 ? "rtl" : "ltr", gap: "64px", alignItems: "center" }}
            >
              {/* Image */}
              <div style={{ height: "480px", overflow: "hidden", direction: "ltr" }}>
                <ParallaxImage src={v.img} alt={v.title} />
              </div>

              {/* Text */}
              <div style={{ direction: "ltr" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "80px", fontWeight: 300, color: "rgba(183,110,121,0.1)", lineHeight: 1, marginBottom: "-20px", letterSpacing: "-0.04em" }}>
                  {v.number}
                </p>
                <div style={{ width: "28px", height: "1px", backgroundColor: "#B76E79", marginBottom: "20px" }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "#1A1410", lineHeight: 1.15, marginBottom: "20px" }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#5C534A", lineHeight: 1.85, maxWidth: "380px" }}>
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#F0EAE2", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            <SectionHeading eyebrow="Our Journey" title={"Fifteen Years\nIn The Making"} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ display: "grid", gridTemplateColumns: "72px 1px 1fr", gap: "0 20px", alignItems: "center", paddingBottom: i < MILESTONES.length - 1 ? "20px" : "0" }}
                >
                  {/* Year */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 300, color: "#B76E79", textAlign: "right" }}>{m.year}</p>

                  {/* Timeline line + dot */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", position: "relative" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#B76E79", flexShrink: 0 }} />
                    {i < MILESTONES.length - 1 && (
                      <div style={{ flex: 1, width: "1px", backgroundColor: "#D8D0C8", marginTop: "4px" }} />
                    )}
                  </div>

                  {/* Event */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5C534A", lineHeight: 1.6, paddingBottom: i < MILESTONES.length - 1 ? "20px" : "0" }}>
                    {m.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px" }}>
          <SectionHeading eyebrow="The People" title={"The Hands\nBehind the Art"} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#8A8078", lineHeight: 1.7, maxWidth: "300px", textAlign: "right" }}>
            A small, passionate team of artisans, designers, and gemologists united by one obsession — perfection.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              {/* Photo */}
              <div style={{ position: "relative", overflow: "hidden", marginBottom: "16px", backgroundColor: "#1A1410" }}>
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  <motion.img
                    src={member.img} alt={member.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(20%)" }}
                  />
                </div>
                {/* Rose gold bottom line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", backgroundColor: "#B76E79" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", fontWeight: 300, color: "#1A1410", marginBottom: "4px" }}>{member.name}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8078" }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1A1410" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1800&q=85" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", padding: "96px 48px", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "20px" }}
          >
            Begin Your Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1.15, marginBottom: "32px" }}
          >
            Every Piece Has a Story.<br /><em style={{ color: "#D4919A" }}>Yours Awaits.</em>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", gap: "14px" }}
          >
            <Link
              to="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#FAF7F2", color: "#1A1410", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#B76E79"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F2"; e.currentTarget.style.color = "#1A1410"; }}
            >
              Explore the Collection <ArrowUpRight size={13} />
            </Link>
            <Link
              to="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "transparent", color: "#FAF7F2", padding: "14px 32px", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#D4A0A7"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#FAF7F2"; }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
