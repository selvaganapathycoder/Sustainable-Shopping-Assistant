import type { Product } from '../types';

export const mockProducts: Record<string, Product> = {
  "8901234567890": {
    id: "8901234567890",
    name: "Eco-Friendly Bamboo Toothbrush",
    brand: "GreenLeaf",
    image: "/assets/products/toothbrush.png",
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
    image: "/assets/products/water_bottle.png",
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
  }
};

export const alternatives: Record<string, string[]> = {
  "8901111222333": ["8901234567890"] // Mock alternative for water bottle
};
