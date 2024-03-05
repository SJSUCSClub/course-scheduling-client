import {
  EvaluationType,
  FractionType,
  GradeType,
  PercentageType,
  RatingType,
} from './types';

const getEvaluation = (
  input: GradeType | RatingType | PercentageType | FractionType,
): EvaluationType => {
  // Check if the input is a grade
  if (typeof input === 'string') {
    // Attempt to parse input as a fraction
    if (input.includes('/')) {
      const parts = input.split('/').map(Number);
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
    }

    switch (input) {
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
  } else {
    // Handle rating and percentage
    if (input >= 0 && input <= 5 && Number.isInteger(input * 2)) {
      // Checks for rating (0.5 increments within 0-5)
      if (input < 2) {
        return 'bad';
      } else if (input < 4) {
        return 'ok';
      } else {
        return 'good';
      }
    } else if (input >= 0 && input <= 100) {
      // Assumes remaining numeric inputs are percentages
      if (input < 50) {
        return 'bad';
      } else if (input < 80) {
        return 'ok';
      } else {
        return 'good';
      }
    } else {
      throw new Error('Invalid numeric input');
    }
  }
};

export default getEvaluation;
