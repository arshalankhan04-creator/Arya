const items = [
  "✦  Free Shipping on Orders Above ₹999",
  "✦  Hallmark Certified Gold & Silver",
  "✦  30-Day Easy Returns",
  "✦  Handcrafted by Master Artisans",
  "✦  New Bridal Collection Now Live",
  "✦  Free Gift Wrapping on Every Order",
  "✦  Free Shipping on Orders Above ₹999",
  "✦  Hallmark Certified Gold & Silver",
  "✦  30-Day Easy Returns",
  "✦  Handcrafted by Master Artisans",
  "✦  New Bridal Collection Now Live",
  "✦  Free Gift Wrapping on Every Order",
];

export default function AnnouncementBar() {
  return (
    <div style={{ backgroundColor: "#2C2C2C", overflow: "hidden", height: "36px", display: "flex", alignItems: "center" }}>
      <div className="animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#FAF7F2",
              whiteSpace: "nowrap",
              padding: "0 32px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
