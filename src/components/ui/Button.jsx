export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest text-sm uppercase transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "bg-[#B76E79] text-white px-8 py-3.5 hover:bg-[#8B4A54] active:scale-95",
    outline: "border border-[#B76E79] text-[#B76E79] px-8 py-3.5 hover:bg-[#B76E79] hover:text-white active:scale-95",
    ghost: "text-[#B76E79] px-4 py-2 hover:text-[#8B4A54] underline-offset-4 hover:underline",
    dark: "bg-[#2C2C2C] text-white px-8 py-3.5 hover:bg-[#4A4A4A] active:scale-95",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
