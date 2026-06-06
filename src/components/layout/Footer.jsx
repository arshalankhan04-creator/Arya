import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const col = {
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: "#B76E79",
  marginBottom: "20px",
  display: "block",
};
const linkStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "#8A8078",
  textDecoration: "none",
  lineHeight: 1,
  transition: "color 0.2s",
  display: "block",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };
  return (
    <footer style={{ backgroundColor: "#1A1714" }}>
      {/* Main */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.4fr", gap: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 300, letterSpacing: "0.2em", color: "#FAF7F2" }}>
                ARYA
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#B76E79", marginTop: "3px" }}>
                Collections
              </p>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6059", lineHeight: 1.8, maxWidth: "220px" }}>
              Crafting timeless jewellery for the modern Indian woman. Every piece tells a story of heritage and love.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {[
                { Icon: LiIcon, href: "https://www.linkedin.com/in/arshalan-khan-ab73a5248", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: "36px", height: "36px",
                  border: "1px solid #3A3330",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#8A8078", textDecoration: "none",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B76E79"; e.currentTarget.style.color = "#B76E79"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3A3330"; e.currentTarget.style.color = "#8A8078"; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span style={col}>Quick Links</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "Home",             to: "/"        },
              { label: "Shop",             to: "/shop"    },
              { label: "Bridal Collection",to: "/bridal"  },
              { label: "About Us",         to: "/about"   },
              { label: "Contact",          to: "/contact" },
            ].map((item) => (
              <Link key={item.label} to={item.to} style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8078")}
              >
                {item.label}
              </Link>
            ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <span style={col}>Support</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Shipping Policy", "Return & Exchange", "Size Guide", "Care Instructions", "FAQ"].map((item) => (
                <Link key={item} to="/contact" style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8078")}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <span style={col}>Get In Touch</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={13} color="#B76E79" style={{ marginTop: "2px", flexShrink: 0 }} />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6059", lineHeight: 1.6 }}>
                  12, Jewellers Lane, Zaveri Bazaar, Mumbai
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={13} color="#B76E79" />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6059" }}>+91 98200 12345</p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Mail size={13} color="#B76E79" />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6059" }}>hello@aryacollections.in</p>
              </div>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6059", marginBottom: "10px" }}>
              Newsletter
            </p>
            {joined ? (
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#B76E79", letterSpacing: "0.06em" }}>
                ✓ You're on the list!
              </p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    backgroundColor: "#252019",
                    border: "1px solid #3A3330",
                    borderRight: "none",
                    padding: "10px 14px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    color: "#FAF7F2",
                    outline: "none",
                  }}
                />
                <button type="submit" style={{
                  backgroundColor: "#B76E79",
                  border: "none",
                  padding: "10px 18px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#8B4A54"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #2C2820", padding: "20px 48px", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#3A3330" }}>
          © 2026 Arya Collections. All rights reserved.
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#3A3330" }}>
          Handcrafted with ♥ in India
        </p>
      </div>
    </footer>
  );
}
