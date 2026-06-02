import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-8xl font-light text-[#E8DFD0]">404</p>
        <h1 className="font-serif text-3xl font-light text-[#2C2C2C] mt-4">Page Not Found</h1>
        <p className="text-[#8A8078] mt-3 font-sans text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#B76E79] text-white px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-[#8B4A54] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
