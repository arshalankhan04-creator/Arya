import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <Navbar />
          <AppRoutes />
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
