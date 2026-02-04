export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  impact: {
    carbon: 'Low' | 'Medium' | 'High';
    plastic: 'Minimal' | 'Moderate' | 'High';
    recyclability: 'High' | 'Partial' | 'None';
    ethics: 'Excellent' | 'Fair' | 'Poor';
  };
  details: {
    carbonValue: string;
    plasticValue: string;
    ethicsValue: string;
  };
}

export interface Scan {
  id: string;
  productId: string;
  timestamp: string;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  emailNotifications: boolean;
  name: string;
  email: string;
}

export interface AppContextType {
  history: Scan[];
  points: number;
  preferences: UserPreferences;
  addScan: (productId: string) => void;
  clearHistory: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  toggleDarkMode: () => void;
}
