/***********************************************
 * Endpoints. Use the Database Schema types to define the shape of your API response and param types here.
 ***********************************************/
// /professor/summary
export interface ProfessorSummaryRouteResponse
  extends Pick<Review, 'quality' | 'ease' | 'overall' | 'grade' | 'tags'>,
    Pick<User, 'id' | 'name' | 'email'> {
  overallDistribution: DistributionType;
  qualityDistribution: DistributionType;
  easeDistribution: DistributionType;
  gradeDistribution: DistributionType;
  totalReviews: number;
  takeAgain: PercentageType;
}
export interface ProfessorSummaryRouteParams extends Pick<User, 'id'> {}

// /professor/schedules
interface ProfessorSchedule
  extends GenericScheduleType,
    Pick<
      Schedule,
      | 'courseNumber'
      | 'department'
      | 'classType'
      | 'courseTitle'
      | 'units'
      | 'satisfiesArea'
      | 'courseId'
      | 'professorId'
    > {}
export interface ProfessorSchedulesRouteResponse
  extends PaginatedItems<ProfessorSchedule> {}
export interface ProfessorSchedulesRouteParams
  extends Pick<PaginatedItems<ProfessorSchedule>, 'itemsPerPage' | 'page'>,
    Pick<ProfessorSchedule, 'professorId'> {}

// /professor/reviews
interface ProfessorReview
  extends GenericReviewType,
    Pick<Review, 'id' | 'courseNumber' | 'department' | 'courseId'> {}
export interface ProfessorReviewsRouteResponse
  extends PaginatedItems<ProfessorReview> {
  totalReviews: number;
}
export interface ProfessorReviewsRouteParams
  extends Pick<PaginatedItems<ProfessorReview>, 'itemsPerPage' | 'page'>,
    Pick<User, 'id'> {
  sort: SortType;
  filters?: {
    tags?: Review['tags'];
    courses?: Course['courseNumber' | 'department'][];
  };
}

/***********************************************
 * Database schema. Define the shape of the Database Schema types here.
 ***********************************************/
type Comment = {
  id: number;
  createdAt: DateType;
  updatedAt?: DateType;
  content: string;
  reviewId: Review['id'];
  userId?: User['id'];
};

type Review = {
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

type User = {
  id: number;
  createdAt: DateType;
  name: string;
  email: string;
  isProfessor: boolean;
};

type Course = {
  courseNumber: string;
  department: Department['abbrDept'];
  createdAt: DateType;
  name: string;
  description?: string;
  prereqs?: string;
  units?: string;
  satisfiesArea?: string;
};

type Department = {
  abbrDept: string;
  createdAt: DateType;
  name: string;
};

type Schedule = {
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

type UserReviewCritique = {
  reviewId: Review['id'];
  userId: User['id'];
  upvote: boolean;
};

type FlagReview = {
  id: number;
  userId: User['id'];
  reviewId: Review['id'];
  createdAt: DateType;
  reason: string;
};

/***********************************************
 * General types. These are reused often and are not specific to any part of the app.
 ***********************************************/
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
