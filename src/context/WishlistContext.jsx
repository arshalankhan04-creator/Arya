import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    const { data, error } = await supabase
      .from("wishlists")
      .select("product_id, products(*)")
      .eq("user_id", user.id);

    if (!error && data) {
      setWishlist(data.map((row) => row.products));
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      openAuthModal("wishlist");
      return;
    }

    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.id);
    } else {
      await supabase
        .from("wishlists")
        .insert({ user_id: user.id, product_id: product.id });
    }

    setWishlist((prev) => {
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
