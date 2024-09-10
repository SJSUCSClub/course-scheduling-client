/***********************************************
 * General types. These are reused often and are not specific to any part of the app.
 ***********************************************/

import { Course, Review, Schedule, User } from '@/types/database';

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
  | 'D+'
  | 'D'
  | 'D-'
  | 'F';
export type TagType =
  | 'Tough Grader'
  | 'Get Ready To Read'
  | 'Participation Matters'
  | 'Extra Credit'
  | 'Group Projects'
  | 'Amazing Lectures'
  | 'Clear Grading Criteria'
  | 'Gives Good Feedback'
  | 'Inspirational'
  | 'Lots of Homework'
  | 'Hilarious'
  | 'Beware of Pop Quizzes'
  | 'So Many Papers'
  | 'Caring'
  | 'Respected'
  | 'Lecture Heavy'
  | 'Test Heavy'
  | 'Graded by Few Things'
  | 'Accessible Outside Class'
  | 'Online Savvy';
export type RatingType = number;
export type PercentageType = number;
export type AvailabilityType = number;
export type EvaluationType = 'bad' | 'ok' | 'good';
export type RatingDistributionType = [number, number, number, number, number];
export type GradeDistributionType = [
  // arry of 13 elements, corresponding to A+, A, A-, ... F
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
export type TermType = 'Summer' | 'Fall' | 'Winter' | 'Spring';
export type WeekdayType = 'M' | 'T' | 'W' | 'R' | 'F';
export type SortType = 'relevant' | 'newest' | 'highest' | 'lowest';
export type SearchResultSortType =
  | 'highest overall'
  | 'lowest overall'
  | 'highest grade'
  | 'lowest grade'
  | 'most reviews'
  | 'least reviews';
export type DateType = string;
export type PaginatedItems<T> = {
  items: T[];
  itemsPerPage?: number;
  page: number;
};
export type PaginatedRequest = {
  page?: number;
  limit?: 3 | 10 | 20 | 50;
};
export type PaginatedResponse<T> = {
  totalResults: number;
  pages: number; // total pages
  page: number; // current page
  items: T[];
};
export type GenericScheduleType = Pick<
  Schedule,
  | 'classNumber'
  | 'section'
  | 'dates'
  | 'times'
  | 'availableSeats'
  | 'location'
  | 'modeOfInstruction'
> &
  Pick<Review, 'grade' | 'overall'> & {
    days?: WeekdayType[];
  };
export type GenericReviewType = Pick<
  Review,
  | 'id'
  | 'createdAt'
  | 'content'
  | 'quality'
  | 'ease'
  | 'overall'
  | 'grade'
  | 'takeAgain'
  | 'tags'
  | 'isUserAnonymous'
  | 'userId'
> & {
  upvotes: number;
  userName: User['name'];
};
export type AvgReviewType = {
  avgRating: number;
  avgQuality: number;
  avgEase: number;
  avgGrade: GradeType;
};
export type CourseIDType = Pick<Course, 'courseNumber' | 'department'>;
export type ProfessorIDType = Pick<User, 'id'>;
export type RequestBodyType = object;
export type RequestParamsType<P> = {
  [K in keyof P]: P[K] extends string | number | boolean | undefined | null
    ? P[K]
    : never;
};
