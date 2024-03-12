import {
  EvaluationType,
  FractionType,
  GradeType,
  PercentageType,
  RatingType,
} from './types';

const getRatingEvaluation = (rating: RatingType): EvaluationType => {
  if (rating < 2) {
    return 'bad';
  } else if (rating < 4) {
    return 'ok';
  } else {
    return 'good';
  }
};

const getGradeEvaluation = (grade: GradeType): EvaluationType => {
  switch (grade) {
    case 'F':
    case 'D':
      return 'bad';
    case 'C-':
    case 'C':
    case 'C+':
    case 'B-':
    case 'B':
    case 'B+':
      return 'ok';
    case 'A-':
    case 'A':
    case 'A+':
      return 'good';
    default:
      throw new Error('Invalid grade input');
  }
};

const getPercentageEvaluation = (
  percentage: PercentageType,
): EvaluationType => {
  if (percentage < 50) {
    return 'bad';
  } else if (percentage < 80) {
    return 'ok';
  } else {
    return 'good';
  }
};

const getFractionEvaluation = (fraction: FractionType): EvaluationType => {
  const parts = fraction.split('/').map(Number);
  if (
    parts.length === 2 &&
    !isNaN(parts[0]) &&
    !isNaN(parts[1]) &&
    parts[1] !== 0
  ) {
    const [numerator, denominator] = parts;
    const fraction = numerator / denominator;
    if (fraction === 1) {
      return 'bad';
    } else if (fraction >= 0.7) {
      return 'ok';
    } else {
      return 'good';
    }
  } else {
    throw new Error('Invalid fraction input');
  }
};

const getEvaluation = (
  input: GradeType | RatingType | PercentageType | FractionType,
  type: 'rating' | 'grade' | 'percentage' | 'fraction' = 'rating',
): EvaluationType => {
  switch (type) {
    case 'rating':
      return getRatingEvaluation(input as RatingType);
    case 'grade':
      return getGradeEvaluation(input as GradeType);
    case 'percentage':
      return getPercentageEvaluation(input as PercentageType);
    case 'fraction':
      return getFractionEvaluation(input as FractionType);
    default:
      throw new Error('Invalid input type');
  }
};

export default getEvaluation;
