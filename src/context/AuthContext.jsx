import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,           setUser]           = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [authModalOpen,  setAuthModalOpen]  = useState(false);
  const [authModalReason, setAuthModalReason] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Auto-close modal on successful login
      if (session?.user) setAuthModalOpen(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal  = useCallback((reason = "") => { setAuthModalReason(reason); setAuthModalOpen(true); },  []);
  const closeAuthModal = useCallback(() => { setAuthModalOpen(false); setAuthModalReason(""); }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      authModalOpen, authModalReason, openAuthModal, closeAuthModal,
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
