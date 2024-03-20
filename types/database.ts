import { DateType, GradeType, RatingType, TagType } from '@/types/general';

/***********************************************
 * Database schema. Define the shape of the Database Schema types here.
 ***********************************************/
export type Comment = {
  id: number;
  createdAt: DateType;
  updatedAt?: DateType;
  content: string;
  reviewId: Review['id'];
  userId?: User['id'];
};

export type Review = {
  id: number;
  createdAt: DateType;
  updatedAt?: DateType;
  courseNumber: Course['courseNumber'];
  department: Department['abbrDept'];
  content: string;
  quality: RatingType;
  ease: RatingType;
  overall: RatingType;
  grade?: GradeType;
  takeAgain: boolean;
  tags: TagType[];
  isUserAnonymous: boolean;
  userId: User['id'];
  professorId: User['id'];
  courseId: Course['courseNumber' | 'department'];
};

export type User = {
  id: number;
  createdAt: DateType;
  name: string;
  email: string;
  isProfessor: boolean;
};

export type Course = {
  id: number;
  courseNumber: string;  // course number is the 146 in CS146; different from class Number in schedule
  department: Department['abbrDept'];
  createdAt: DateType;
  name: string;
  description?: string;
  prereqs?: string;
  units?: string;
  satisfiesArea?: string;
};

export type Department = {
  abbrDept: string;
  createdAt: DateType;
  name: string;
};

export type Schedule = {
  professorId?: User['id'];
  courseId?: Course['courseNumber' | 'department'];
  classNumber: number;
  createdAt: DateType;
  courseNumber: Course['courseNumber'];
  department: Department['abbrDept'];
  section: string;
  days: string;
  dates: string;
  times: string;
  classType: string;
  courseTitle: string;
  availableSeats?: number;
  units: Course['units'];
  location?: string;
  modeOfInstruction: string;
  satisfiesArea?: Course['satisfiesArea'];
};

export type UserReviewCritique = {
  reviewId: Review['id'];
  userId: User['id'];
  upvote: boolean;
};

export type FlagReview = {
  id: number;
  userId: User['id'];
  reviewId: Review['id'];
  createdAt: DateType;
  reason: string;
};
