import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Clock, ArrowUpRight, Send } from "lucide-react";

/* ── contact info items ──────────────────────────────── */
const INFO = [
  {
    icon: <MapPin size={16} />,
    label: "Visit Us",
    value: "12, Jewellers Lane, Zaveri Bazaar",
    sub: "Mumbai, Maharashtra 400002",
  },
  {
    icon: <Phone size={16} />,
    label: "Call Us",
    value: "+91 98200 12345",
    sub: "Mon–Sat, 10am – 7pm IST",
  },
  {
    icon: <Mail size={16} />,
    label: "Email Us",
    value: "hello@aryacollections.in",
    sub: "We reply within 24 hours",
  },
  {
    icon: <Clock size={16} />,
    label: "Store Hours",
    value: "Mon–Sat: 10am – 7pm",
    sub: "Sunday: 11am – 5pm",
  },
];

const INQUIRIES = [
  "General Enquiry",
  "Custom / Bespoke Order",
  "Bridal Consultation",
  "Order Tracking",
  "Returns & Exchange",
  "Wholesale / B2B",
];

/* ── field component ─────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "9px", letterSpacing: "0.28em",
        textTransform: "uppercase", color: "#5C534A",
        fontWeight: 600,
      }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#C0392B" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  border: "1px solid #E8DFD0",
  backgroundColor: "#FDFAF6",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  color: "#1A1410",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", inquiry: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.inquiry)        e.inquiry = "Please select an inquiry type";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const borderColor = (key) => errors[key] ? "#C0392B" : focused === key ? "#B76E79" : "#E8DFD0";

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#1A1410", padding: "120px 48px 64px", position: "relative", overflow: "hidden" }}>
        {/* Ghost watermark */}
        <div style={{ position: "absolute", top: "50%", right: "3%", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 14vw, 180px)", fontWeight: 300, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>
          Contact
        </div>

        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "16px" }}
          >
            Arya Collections
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(42px, 5vw, 68px)", fontWeight: 300, color: "#FAF7F2", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "20px" }}
          >
            Let's Talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(250,247,242,0.45)", lineHeight: 1.7, maxWidth: "400px" }}
          >
            Whether you're looking for a bespoke piece, need help with an order, or simply want to say hello — we'd love to hear from you.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BODY — form left + info right
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "80px 48px 100px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "start" }}>

        {/* ── FORM ── */}
        <div>
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "64px 48px", backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", textAlign: "center" }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(183,110,121,0.1)", border: "1px solid rgba(183,110,121,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}
                >
                  <span style={{ fontSize: "22px" }}>✦</span>
                </motion.div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 300, color: "#1A1410", marginBottom: "12px" }}>
                  Message Received
                </h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8A8078", lineHeight: 1.7, marginBottom: "32px", maxWidth: "380px", margin: "0 auto 32px" }}>
                  Thank you for reaching out, {form.name.split(" ")[0]}. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", inquiry: "", message: "" }); }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1410", color: "#FAF7F2", border: "none", padding: "12px 28px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "background-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "flex", flexDirection: "column", gap: "28px" }}
              >
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input
                      type="text" value={form.name} placeholder="Priya Sharma"
                      onChange={e => set("name", e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: borderColor("name") }}
                    />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input
                      type="email" value={form.email} placeholder="hello@email.com"
                      onChange={e => set("email", e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: borderColor("email") }}
                    />
                  </Field>
                </div>

                {/* Phone + Inquiry row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <Field label="Phone (Optional)">
                    <input
                      type="tel" value={form.phone} placeholder="+91 98765 43210"
                      onChange={e => set("phone", e.target.value)}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: borderColor("phone") }}
                    />
                  </Field>
                  <Field label="Inquiry Type *" error={errors.inquiry}>
                    <select
                      value={form.inquiry}
                      onChange={e => set("inquiry", e.target.value)}
                      onFocus={() => setFocused("inquiry")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: borderColor("inquiry"), appearance: "none", cursor: "pointer", color: form.inquiry ? "#1A1410" : "#9A9088" }}
                    >
                      <option value="" disabled>Select a topic…</option>
                      {INQUIRIES.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Your Message *" error={errors.message}>
                  <textarea
                    value={form.message} placeholder="Tell us how we can help…"
                    rows={5}
                    onChange={e => set("message", e.target.value)}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "140px", borderColor: borderColor("message") }}
                  />
                </Field>

                {/* Submit */}
                <div>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "#1A1410", color: "#FAF7F2", border: "none", padding: "16px 36px", fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", cursor: "pointer", transition: "background-color 0.25s" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#B76E79"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1A1410"}
                  >
                    <Send size={13} /> Send Message
                  </motion.button>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#B0A090", marginTop: "12px" }}>
                    We typically respond within 24 hours on working days.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ── INFO PANEL ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

          {/* Contact info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "40px" }}>
            {INFO.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "20px 24px", backgroundColor: "#FFFFFF", border: "1px solid #EDE5DC", marginBottom: "2px" }}
              >
                <div style={{ width: "36px", height: "36px", backgroundColor: "rgba(183,110,121,0.1)", border: "1px solid rgba(183,110,121,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#B76E79", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B76E79", marginBottom: "4px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#1A1410", lineHeight: 1.3, marginBottom: "2px" }}>
                    {item.value}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#8A8078" }}>
                    {item.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.a
            href="#"
            onClick={e => e.preventDefault()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ backgroundColor: "rgba(183,110,121,0.08)" }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", border: "1px solid rgba(183,110,121,0.25)", textDecoration: "none", transition: "background-color 0.25s", marginBottom: "32px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Instagram size={18} color="#B76E79" />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B76E79", marginBottom: "2px" }}>Follow Along</p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#1A1410" }}>@aryacollections</p>
              </div>
            </div>
            <ArrowUpRight size={16} color="#B76E79" />
          </motion.a>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ position: "relative", overflow: "hidden", backgroundColor: "#1A1410" }}
          >
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"
              alt="Mumbai"
              style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", opacity: 0.55 }}
            />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#B76E79", boxShadow: "0 0 0 4px rgba(183,110,121,0.3), 0 0 0 8px rgba(183,110,121,0.15)" }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,247,242,0.7)", marginTop: "6px" }}>
                Zaveri Bazaar, Mumbai
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          FAQ STRIP
      ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#F0EAE2", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "64px", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#B76E79", marginBottom: "12px" }}>Quick Answers</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "#1A1410", lineHeight: 1.15 }}>
                Frequently Asked
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
              {[
                { q: "Do you offer custom jewellery?", a: "Yes — we craft bespoke pieces from consultation to delivery. Reach out via the form above or call us directly." },
                { q: "How long does shipping take?", a: "Standard delivery is 3–5 business days. Express options are available at checkout for same/next-day delivery." },
                { q: "What is your return policy?", a: "We accept returns within 30 days of delivery on unworn pieces in original packaging. Custom orders are non-refundable." },
                { q: "Are your pieces hallmark certified?", a: "Every piece is BIS Hallmark certified. Certificates of authenticity are included with all gold and diamond jewellery." },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 400, color: "#1A1410", lineHeight: 1.3, marginBottom: "8px" }}>
                    {faq.q}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5C534A", lineHeight: 1.75 }}>
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
