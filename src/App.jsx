import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import AuthModal from "./components/ui/AuthModal";
import { useAuth } from "./context/AuthContext";

/* AuthModal consumes AuthContext so it must live inside AuthProvider */
function GlobalModals() {
  const { authModalOpen, authModalReason, closeAuthModal } = useAuth();
  return <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} reason={authModalReason} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Navbar />
            <AppRoutes />
            <Footer />
            <GlobalModals />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
