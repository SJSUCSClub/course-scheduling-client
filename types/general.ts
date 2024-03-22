/***********************************************
 * General types. These are reused often and are not specific to any part of the app.
 ***********************************************/

import { Review, Schedule, User } from '@/types/database';

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
  | 'Easy grader'
  | 'Lots of assignments'
  | 'Tough grader'
  | 'Funny';
export type RatingType = number;
export type PercentageType = number;
export type AvailabilityType = number;
export type EvaluationType = 'bad' | 'ok' | 'good';
export type DistributionType = [number, number, number, number, number];
export type WeekdayType = 'M' | 'T' | 'W' | 'R' | 'F';
export type SortType = 'relevant' | 'newest' | 'oldest' | 'highest' | 'lowest';
export type DateType = string;
export type PaginatedItems<T> = {
  items: T[];
  itemsPerPage?: number;
  page: number;
};
export type GenericScheduleType = Pick<
  Schedule,
  | 'professorId'
  | 'courseId'
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
