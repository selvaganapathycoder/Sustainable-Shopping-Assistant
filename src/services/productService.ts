import type { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

const API_BASE_URL = 'https://world.openfoodfacts.org/api/v0/product';

interface OpenFoodFactsProduct {
  product_name?: string;
  brands?: string;
  image_url?: string;
  ecoscore_score?: number;
  ecoscore_grade?: string;
  nutrient_levels?: {
    fat?: string;
    salt?: string;
    sugars?: string;
    'saturated-fat'?: string;
  };
  environment_impact_level_tags?: string[];
}

interface OpenFoodFactsResponse {
  status: number;
  product?: OpenFoodFactsProduct;
}

// Helper to map API grade to our format
const mapGrade = (grade: string = 'e'): 'A' | 'B' | 'C' | 'D' | 'E' => {
  const normalized = grade.toLowerCase();
  if (['a', 'b', 'c', 'd', 'e'].includes(normalized)) {
    return normalized.toUpperCase() as 'A' | 'B' | 'C' | 'D' | 'E';
  }
  return 'E';
};

// Helper to calculate a score if missing (fallback logic)
const calculateScore = (data: OpenFoodFactsProduct): number => {
  if (typeof data.ecoscore_score === 'number') {
    return data.ecoscore_score;
  }
  // Fallback estimation based on grade
  const grades: Record<string, number> = { a: 95, b: 75, c: 55, d: 35, e: 15 };
  return grades[data.ecoscore_grade?.toLowerCase() || 'e'] || 20;
};

const mapOpenFoodFactsToProduct = (id: string, data: OpenFoodFactsProduct): Product => {
  const score = calculateScore(data);
  const grade = mapGrade(data.ecoscore_grade);

  return {
    id,
    name: data.product_name || 'Unknown Product',
    brand: data.brands || 'Unknown Brand',
    image: data.image_url || 'https://placehold.co/400x400?text=No+Image',
    score,
    grade,
    impact: {
      carbon: data.nutrient_levels?.['saturated-fat'] === 'low' ? 'Low' : 'Medium', // Approximation
      plastic: 'Moderate', // Default as API rarely gives plastic info explicitly easily
      recyclability: data.environment_impact_level_tags ? 'High' : 'Partial',
      ethics: 'Fair' // Default assumption
    },
    details: {
      carbonValue: data.nutrient_levels?.['saturated-fat'] ? `${data.nutrient_levels['saturated-fat']} impact` : 'Moderate impact',
      plasticValue: "Standard packaging",
      ethicsValue: "Standard sourcing"
    }
  };
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    // 1. Try fetching from API
    const response = await fetch(`${API_BASE_URL}/${id}.json`);
    const data: OpenFoodFactsResponse = await response.json();

    if (data.status === 1 && data.product) {
       return mapOpenFoodFactsToProduct(id, data.product);
    }
  } catch {
    console.warn(`API lookup failed for ${id}, falling back to mock data.`);
  }

  // 2. Fallback to Mock Data
  if (mockProducts[id]) {
    return mockProducts[id];
  }

  return null;
};
