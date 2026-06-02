import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "#1C1410",
    }}>

      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      >
        {/* Luxury Indian jewellery model — Mixkit free license */}
        <source src="https://assets.mixkit.co/videos/50793/50793-720.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/50784/50784-720.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/50782/50782-720.mp4" type="video/mp4" />
      </video>

      {/* Left-to-right dark gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(100deg, rgba(18,12,8,0.90) 0%, rgba(18,12,8,0.68) 36%, rgba(18,12,8,0.20) 62%, transparent 100%)",
      }} />

      {/* Text */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0, left: 0,
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "6%",
        paddingRight: "3%",
      }}>
        <motion.h1 {...fade(0.2)} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(44px, 5.5vw, 78px)",
          fontWeight: 300, lineHeight: 1.08,
          color: "#FFFFFF", marginBottom: "20px",
        }}>
          A Symphony of<br />
          Brilliance and<br />
          <span style={{ fontStyle: "italic", color: "#D4919A" }}>Elegance</span>
        </motion.h1>

        <motion.div {...fade(0.32)} style={{
          width: "36px", height: "1px",
          backgroundColor: "rgba(212,145,154,0.65)",
          marginBottom: "18px",
        }} />

        <motion.p {...fade(0.40)} style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.75, maxWidth: "340px",
          marginBottom: "32px",
        }}>
          Uncover our array of precious jewels and gems — Arya Collections, where timeless allure meets modern design.
        </motion.p>

        <motion.div {...fade(0.50)} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/shop"
            style={{
              display: "inline-flex", alignItems: "center",
              backgroundColor: "#FFFFFF", color: "#2C2C2C",
              padding: "12px 28px",
              fontFamily: "Inter, sans-serif",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#B76E79"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.color = "#2C2C2C"; }}
          >
            Shop Now
          </Link>

          <button
            style={{
              width: "44px", height: "44px",
              border: "1px solid rgba(255,255,255,0.38)",
              backgroundColor: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "white",
              transition: "all 0.25s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#D4919A"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.38)"; e.currentTarget.style.color = "white"; }}
          >
            <ArrowUpRight size={16} />
          </button>

          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: "11px",
            color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em",
          }}>
            Explore Collection
          </span>
        </motion.div>
      </div>
    </section>
  );
}
