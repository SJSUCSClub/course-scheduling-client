export type GradeType =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D'
  | 'F';
export type RatingType = number;
export type PercentageType = number;
export type FractionType = string;
export type EvaluationType = 'bad' | 'ok' | 'good';
export interface ScheduleType {
  heading: string;
  subheading: string;
  enrollment: FractionType;
  satisfies?: string;
  units?: number;
  type?: string;
  startDate: string;
  endDate: string;
  days: Set<string>;
  times: string;
  location?: string;
  avgGrade: GradeType;
  avgOverallRating: RatingType;
  number: string;
}
