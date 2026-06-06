import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/* ── Google "G" SVG ─────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose, reason = "" }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const [tab,      setTab]      = useState("signin");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [focused,  setFocused]  = useState(null);

  // Contextual messages per reason
  const REASON_MESSAGES = {
    wishlist: {
      heading: "Save pieces you love",
      sub: "Create an account to save favourites and access your wishlist anytime.",
    },
    checkout: {
      heading: "You're almost there",
      sub: "Sign in to continue checkout and place your order securely.",
    },
  };

  const reasonMsg = REASON_MESSAGES[reason] || null;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    setError(""); setSuccess(""); setEmail(""); setPassword(""); setShowPass(false);
  }, [tab, isOpen]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");

    if (tab === "signin") {
      const { error: err } = await signInWithEmail(email, password);
      if (err) setError(err.message === "Invalid login credentials" ? "Incorrect email or password." : err.message);
      else onClose();
    } else {
      const { error: err } = await signUpWithEmail(email, password);
      if (err) setError(err.message);
      else { setSuccess("Account created! Check your email to confirm, then sign in."); setTab("signin"); }
    }
    setLoading(false);
  };

  const inputStyle = (key) => ({
    width: "100%",
    padding: "11px 14px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: `1px solid ${focused === key ? "#B76E79" : "rgba(255,255,255,0.12)"}`,
    color: "#FAF7F2",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    letterSpacing: "0.02em",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              backgroundColor: "rgba(10,7,5,0.82)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 500,
            }}
          />

          {/* Scroll container — centers modal even when taller than viewport */}
          <div
            style={{
              position: "fixed", inset: 0,
              zIndex: 501,
              overflowY: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
              boxSizing: "border-box",
            }}
            onClick={onClose}
          >
            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#1A1410",
                border: "1px solid rgba(183,110,121,0.2)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
                padding: "36px 32px 32px",
                boxSizing: "border-box",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Decorative top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)",
                width: "48px", height: "2px",
                backgroundColor: "#B76E79",
              }} />

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: "14px", right: "14px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(250,247,242,0.3)", display: "flex", padding: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F2"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,0.3)"}
              >
                <X size={16} />
              </button>

              {/* Brand header */}
              <div style={{ textAlign: "center", marginBottom: reasonMsg ? "20px" : "24px" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "28px", fontWeight: 300,
                  letterSpacing: "0.42em",
                  color: "#FAF7F2",
                  lineHeight: 1,
                }}>
                  ARYA
                </p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7.5px", letterSpacing: "0.55em",
                  textTransform: "uppercase", color: "#B76E79",
                  marginTop: "4px",
                }}>
                  Collections
                </p>
              </div>

              {/* Contextual reason banner */}
              {reasonMsg && (
                <div style={{
                  backgroundColor: "rgba(183,110,121,0.1)",
                  border: "1px solid rgba(183,110,121,0.22)",
                  padding: "14px 16px",
                  marginBottom: "24px",
                  textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "17px", fontWeight: 300,
                    color: "#FAF7F2", lineHeight: 1.3,
                    marginBottom: "5px",
                  }}>
                    {reasonMsg.heading}
                  </p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "rgba(250,247,242,0.5)",
                    lineHeight: 1.6,
                  }}>
                    {reasonMsg.sub}
                  </p>
                </div>
              )}

              {/* Tabs */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "24px",
              }}>
                {[{ id: "signin", label: "Sign In" }, { id: "register", label: "Register" }].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      background: "none", border: "none",
                      padding: "10px 0",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px", letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: tab === t.id ? "#B76E79" : "rgba(250,247,242,0.3)",
                      borderBottom: `2px solid ${tab === t.id ? "#B76E79" : "transparent"}`,
                      marginBottom: "-1px",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Google button */}
              <button
                onClick={signInWithGoogle}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "11px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px", color: "#FAF7F2",
                  letterSpacing: "0.04em",
                  transition: "background-color 0.2s, border-color 0.2s",
                  marginBottom: "18px",
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(183,110,121,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <GoogleIcon />
                Sign in with Google
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(250,247,242,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>or</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }} />
              </div>

              {/* Form */}
              <form onSubmit={handleEmailAuth} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Email */}
                <div>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(250,247,242,0.45)", display: "block", marginBottom: "6px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={inputStyle("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Password */}
                <div>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(250,247,242,0.45)", display: "block", marginBottom: "6px" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      style={{ ...inputStyle("password"), paddingRight: "40px" }}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      style={{
                        position: "absolute", right: "11px", top: "50%",
                        transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(250,247,242,0.3)", display: "flex", padding: "2px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#B76E79"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,0.3)"}
                    >
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Error / success */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#E07070", lineHeight: 1.5, margin: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                  {success && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#7EC88A", lineHeight: 1.5, margin: 0 }}
                    >
                      {success}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "13px",
                    backgroundColor: loading ? "#5A4040" : "#B76E79",
                    border: "none",
                    cursor: loading ? "wait" : "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px", letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    transition: "background-color 0.2s",
                    marginTop: "4px",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#8B4A54"; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#B76E79"; }}
                >
                  {loading ? "Please wait…" : tab === "signin" ? "Sign In" : "Create Account"}
                </motion.button>
              </form>

              {/* Switch tab */}
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(250,247,242,0.3)", textAlign: "center", marginTop: "18px", lineHeight: 1.6 }}>
                {tab === "signin" ? (
                  <>Don't have an account?{" "}
                    <button onClick={() => setTab("register")} style={{ background: "none", border: "none", cursor: "pointer", color: "#B76E79", fontFamily: "inherit", fontSize: "inherit", fontWeight: 600, padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#D4919A"}
                      onMouseLeave={e => e.currentTarget.style.color = "#B76E79"}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>Already have an account?{" "}
                    <button onClick={() => setTab("signin")} style={{ background: "none", border: "none", cursor: "pointer", color: "#B76E79", fontFamily: "inherit", fontSize: "inherit", fontWeight: 600, padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#D4919A"}
                      onMouseLeave={e => e.currentTarget.style.color = "#B76E79"}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
