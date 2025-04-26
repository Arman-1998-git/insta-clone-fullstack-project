
import { createContext, useContext, useState, ReactNode } from "react";
import { User, users } from "../services/mockData";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication
    const user = users.find(u => u.username === username);
    
    if (user && password.length >= 6) { // Simple validation
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // In a real app, we would send this data to the backend
    if (username && email && password.length >= 6) {
      const newUser: User = {
        id: (users.length + 1).toString(),
        username,
        fullName: username,
        avatar: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        followersCount: 0,
        followingCount: 0,
        postsCount: 0
      };
      
      setCurrentUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated: !!currentUser, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
