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

export interface AppContextType {
  history: Scan[];
  points: number;
  addScan: (productId: string) => void;
  clearHistory: () => void;
}
