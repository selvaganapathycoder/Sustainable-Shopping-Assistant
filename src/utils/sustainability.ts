export type EcoGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export const calculateGrade = (score: number): EcoGrade => {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
};

export const getGradeColor = (grade: EcoGrade): string => {
  switch (grade) {
    case 'A': return 'bg-green-500';
    case 'B': return 'bg-lime-500';
    case 'C': return 'bg-yellow-500';
    case 'D': return 'bg-orange-500';
    case 'E': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

export const getImpactLabelClass = (value: string): string => {
  const lowImpact = ['Low', 'Minimal', 'High', 'Excellent'];
  const midImpact = ['Medium', 'Moderate', 'Partial', 'Fair'];
  
  if (lowImpact.includes(value)) return 'text-green-600 font-semibold';
  if (midImpact.includes(value)) return 'text-yellow-600 font-semibold';
  return 'text-red-600 font-semibold';
};
