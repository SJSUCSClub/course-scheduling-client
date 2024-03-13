/***********************************************
 * Endpoints. Use these types to define the shape of your API responses.
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
    > {}
export interface ProfessorSchedulesRouteResponse
  extends PaginatedItems<ProfessorSchedule> {}
export interface ProfessorSchedulesRouteParams
  extends Pick<PaginatedItems<ProfessorSchedule>, 'itemsPerPage' | 'page'>,
    Pick<ProfessorSchedule, 'professorId'> {}

// /professor/reviews
interface ProfessorReview
  extends Pick<
    Review,
    | 'id'
    | 'createdAt'
    | 'courseNumber'
    | 'department'
    | 'content'
    | 'quality'
    | 'ease'
    | 'overall'
    | 'grade'
    | 'takeAgain'
    | 'tags'
    | 'courseId'
    | 'isUserAnonymous'
    | 'userId'
    | 'professorId'
  > {
  upvotes: number;
  userName: User['name'];
  professorName: User['name'];
}
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
    courses?: Course['id'][];
  };
}

/***********************************************
 * Database schema. Use these types to define the shape of your data.
 ***********************************************/
type Comment = {
  id: number;
  createdAt: DateType;
  updatedAt?: DateType;
  content: string;
  reviewId: Review['id'];
  userId: User['id'];
};

type Review = {
  id: number;
  createdAt: DateType;
  updatedAt?: DateType;
  courseNumber: Course['courseNumber'];
  department: Department['abbrDept'];
  content: string;
  quality?: RatingType;
  ease?: RatingType;
  overall?: RatingType;
  grade?: GradeType;
  takeAgain: boolean;
  tags: string[];
  isUserAnonymous: boolean;
  userId: User['id'];
  professorId: User['id'];
  courseId: Course['id'];
};

type User = {
  id: number;
  createdAt: DateType;
  name?: string;
  email: string;
  isProfessor: boolean;
};

type Course = {
  id: number;
  createdAt: DateType;
  courseNumber?: string;
  name: string;
  description: string;
  prereqs?: string;
  units: number;
  satisfiesArea?: string;
  department: Department['abbrDept'];
};

type Department = {
  abbrDept: string;
  createdAt: DateType;
  name: string;
};

type Schedule = {
  professorId?: User['id'];
  courseId?: Course['id'];
  classNumber: number;
  createdAt: DateType;
  courseNumber: Course['courseNumber'];
  department: Department['abbrDept'];
  section: string;
  days?: string;
  dates: string;
  times?: string;
  classType: string;
  courseTitle: string;
  availableSeats?: number;
  units: Course['units'];
  location?: string;
  modeOfInstruction: string;
  satisfiesArea: Course['satisfiesArea'];
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
  | 'D'
  | 'F';
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
