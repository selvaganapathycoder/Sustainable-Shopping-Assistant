import type { Product } from '../types';

export const mockProducts: Record<string, Product> = {
  "8901234567890": {
    id: "8901234567890",
    name: "Eco-Friendly Bamboo Toothbrush",
    brand: "GreenLeaf",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800",
    score: 92,
    grade: 'A',
    impact: {
      carbon: 'Low',
      plastic: 'Minimal',
      recyclability: 'High',
      ethics: 'Excellent'
    },
    details: {
      carbonValue: "0.2kg CO2e",
      plasticValue: "0% plastic",
      ethicsValue: "Fair Trade Certified"
    }
  },
  "8901111222333": {
    id: "8901111222333",
    name: "Classic Plastic Bottled Water",
    brand: "AquaPure",
    image: "https://images.unsplash.com/photo-1616031037011-087000171abe?auto=format&fit=crop&q=80&w=800",
    score: 25,
    grade: 'E',
    impact: {
      carbon: 'High',
      plastic: 'High',
      recyclability: 'Partial',
      ethics: 'Fair'
    },
    details: {
      carbonValue: "1.5kg CO2e",
      plasticValue: "100% single-use plastic",
      ethicsValue: "Standard corporate sourcing"
    }
  },
  "7310521054107": {
    id: "7310521054107",
    name: "Oat Milk (Barista Edition)",
    brand: "Oatly",
    image: "https://images.unsplash.com/photo-1615485427187-5757917a26f3?auto=format&fit=crop&q=80&w=800",
    score: 88,
    grade: 'A',
    impact: {
      carbon: 'Low',
      plastic: 'Minimal',
      recyclability: 'High',
      ethics: 'High'
    },
    details: {
      carbonValue: "0.4kg CO2e",
      plasticValue: "Recyclable carton",
      ethicsValue: "Transparent supply chain"
    }
  },
  "4008400404127": {
    id: "4008400404127",
    name: "Chocolate Bar",
    brand: "Kinder",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800",
    score: 42,
    grade: 'C',
    impact: {
      carbon: 'Medium',
      plastic: 'Moderate',
      recyclability: 'Minimal',
      ethics: 'Fair'
    },
    details: {
      carbonValue: "0.8kg CO2e",
      plasticValue: "Non-recyclable wrapper",
      ethicsValue: "Palm oil concerns"
    }
  }
};

export const alternatives: Record<string, string[]> = {
  "8901111222333": ["8901234567890"],
  "4008400404127": ["7310521054107"] // Just for mock variety
};

