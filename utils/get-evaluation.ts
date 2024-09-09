import {
  AvailabilityType,
  EvaluationType,
  GradeType,
  PercentageType,
  RatingType,
} from '@/types/general';

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
    case 'D-':
    case 'D':
    case 'D+':
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

const getAvailabilityEvaluation = (
  availability: AvailabilityType,
): EvaluationType => {
  if (availability < 3) {
    return 'bad';
  } else if (availability < 10) {
    return 'ok';
  } else {
    return 'good';
  }
};

/**
 * Returns the evaluation of the input based on the type. This is useful for conditionally rendering the color of a rating, grade, percentage, or fraction.
 * @param input - The input to evaluate.
 * @param type - The type of input to evaluate.
 * @returns The evaluation of the input.
 *
 * @component
 * @example
 * return (
 *  <div className={clsx({
 *      'text-bad': getEvaluation(avgGrade, 'grade') === 'bad'
 *  })}>
 *    {avgGrade}
 *  </div>
 * )
 */
const getEvaluation = (
  input: GradeType | RatingType | PercentageType | AvailabilityType,
  type: 'rating' | 'grade' | 'percentage' | 'availability' = 'rating',
): EvaluationType => {
  switch (type) {
    case 'rating':
      return getRatingEvaluation(input as RatingType);
    case 'grade':
      return getGradeEvaluation(input as GradeType);
    case 'percentage':
      return getPercentageEvaluation(input as PercentageType);
    case 'availability':
      return getAvailabilityEvaluation(input as AvailabilityType);
    default:
      throw new Error('Invalid input type');
  }
};

export default getEvaluation;
