import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatUsers = (supabaseUser: SupabaseUser): User => ({
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name || null,
    email: supabaseUser.email ?? "",
    isAdmin: supabaseUser.email === "admin@example.com",
  });

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (data.user) setUser(formatUsers(data.user));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw new Error(error.message);
    if (data.user) setUser(formatUsers(data.user));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const handleInitialSession = async () => {
      setIsLoading(true);

      // 1. Check if it's an OAuth redirect with access_token in hash
      if (window.location.hash.includes("access_token")) {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session from URL", error.message);
          setIsLoading(false);
          return;
        }

        if (data.session?.user) {
          setUser(formatUsers(data.session.user));
          // Clear the hash from the URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      } else {
        // 2. Regular app load: just get existing session
        const { data } = await supabase.auth.getSession();
        const session = data?.session;

        if (session?.user) {
          setUser(formatUsers(session.user));
        }
      }

      setIsLoading(false);
    };

    handleInitialSession();

    // 3. Listen to auth changes (already correct)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(formatUsers(session.user));
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
