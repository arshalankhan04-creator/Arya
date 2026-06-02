import { useState } from "react";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product, large = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#12100E",
        cursor: "pointer",
      }}
    >
      {/* ── Image ── */}
      <Link to={`/product/${product.id}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />
      </Link>

      {/* Base gradient — always on */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(12,8,6,0.90) 0%, rgba(12,8,6,0.30) 45%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "rgba(12,8,6,0.25)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* ── Top row: badge + wishlist ── */}
      <div style={{
        position: "absolute", top: "14px", left: "14px", right: "14px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        {/* Badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {product.tag && (
            <span style={{
              backgroundColor: "#B76E79",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "4px 9px",
            }}>
              {product.tag}
            </span>
          )}
          {discount && (
            <span style={{
              backgroundColor: "rgba(250,247,242,0.15)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "4px 9px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          style={{
            width: "32px", height: "32px",
            backgroundColor: wishlisted ? "#B76E79" : "rgba(250,247,242,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered || wishlisted ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          <Heart
            size={13}
            color={wishlisted ? "white" : "white"}
            fill={wishlisted ? "white" : "none"}
          />
        </button>
      </div>

      {/* ── Bottom content ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: large ? "24px 24px 20px" : "18px 18px 16px",
      }}>
        {/* Material */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "8px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(212,145,154,0.85)",
          marginBottom: "5px",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          opacity: hovered ? 1 : 0.7,
          transition: "all 0.35s ease",
        }}>
          {product.material}
        </p>

        {/* Name + arrow */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "10px" }}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: "none", flex: 1 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: large ? "clamp(20px, 2vw, 26px)" : "clamp(16px, 1.5vw, 20px)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.2,
              margin: 0,
            }}>
              {product.name}
            </h3>
          </Link>

          {/* Arrow link */}
          <Link to={`/product/${product.id}`} style={{
            width: "30px", height: "30px",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
            flexShrink: 0, marginLeft: "10px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.35s ease",
            color: "white",
          }}>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Price row + Add to bag */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: large ? "15px" : "13px",
              fontWeight: 500,
              color: "#FFFFFF",
            }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "line-through",
              }}>
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Add to bag */}
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              backgroundColor: hovered ? "#B76E79" : "rgba(250,247,242,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "7px 14px",
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              opacity: hovered ? 1 : 0,
              transition: "all 0.35s ease",
              whiteSpace: "nowrap",
            }}
          >
            <ShoppingBag size={10} /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
