import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  age: number;
  sex: 'male' | 'female';
  isPrivacyAgreed: boolean;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
  isUserDataComplete: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    // Store in sessionStorage for persistence
    sessionStorage.setItem('userData', JSON.stringify(data));
  };

  const clearUserData = () => {
    setUserDataState(null);
    sessionStorage.removeItem('userData');
  };

  const isUserDataComplete = userData?.isPrivacyAgreed && userData?.age && userData?.sex;

  // Initialize from sessionStorage on mount
  useState(() => {
    const stored = sessionStorage.getItem('userData');
    if (stored) {
      try {
        setUserDataState(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
      }
    }
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        clearUserData,
        isUserDataComplete: Boolean(isUserDataComplete),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};