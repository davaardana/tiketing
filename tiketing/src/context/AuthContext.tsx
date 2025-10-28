import React from 'react';

type User = {
  name: string;
  email: string;
  role: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const STORAGE_KEY = 'tiketing::auth';

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const loadStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as User;
    if (parsed && typeof parsed.email === 'string' && typeof parsed.name === 'string') {
      return parsed;
    }
  } catch (error) {
    console.warn('Unable to parse stored auth value', error);
  }

  return null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(() => loadStoredUser());

  const persistUser = React.useCallback((nextUser: User | null) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (nextUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const nextUser: User = {
      name: 'Alex Johnson',
      email,
      role: 'Support Manager'
    };

    setUser(nextUser);
    persistUser(nextUser);
  }, [persistUser]);

  const logout = React.useCallback(() => {
    setUser(null);
    persistUser(null);
  }, [persistUser]);

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
