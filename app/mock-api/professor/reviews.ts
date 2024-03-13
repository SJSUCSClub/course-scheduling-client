import getPaginatedItems, { PaginatedItems } from '@/utils/get-paginated-items';
import chooseRandom from '@/utils/choose-random';

type ProfessorReview = {
  id: string;
  course: string;
  author: string;
  date: string;
  qualityRating: number;
  easeRating: number;
  overallRating: number;
  grade: string;
  wouldTakeAgain: boolean;
  review: string;
  tags: string[];
  likes: number;
  professor: {
    id: string;
    name: string;
  };
};

const tags = [
  'Respected',
  'Caring',
  'Amazing lectures',
  'Inspirational',
  'Accessible outside class',
  'Participation matters',
  'Graded by few things',
  'Clear grading criteria',
  'Get ready to read',
  'Lots of homework',
  'Tough grader',
];

const reviews: ProfessorReview[] = Array.from<undefined, ProfessorReview>(
  { length: 100 },
  (v, k) => {
    const qualityRating = Math.max(0.5, Math.ceil(Math.random() * 50) / 10);
    const easeRating = Math.max(0.5, Math.ceil(Math.random() * 50) / 10);
    return {
      id: Math.random().toString(36).substring(7),
      course: chooseRandom(['CMPE 132', 'CMPE 180A', 'CMPE 180B']),
      author: chooseRandom(['John Doe', 'Jane Doe', 'John Smith']),
      date: 'August 19, 2002',
      qualityRating,
      easeRating,
      overallRating: Math.max(
        0.5,
        Math.ceil(((qualityRating + easeRating) / 2) * 10) / 10,
      ),
      grade: chooseRandom(['C-', 'A+', 'F']),
      wouldTakeAgain: chooseRandom([true, false]),
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tags: [chooseRandom(tags), chooseRandom(tags), chooseRandom(tags)],
      likes: k,
      professor:
        k < 33
          ? { id: '1', name: 'Jahan Ghofraniha' }
          : k < 66
          ? { id: '2', name: 'Loc Lam' }
          : { id: '3', name: 'Kurt Mammen' },
    };
  },
);

export interface ProfessorReviewsRouteResponse {
  reviewCount: number;
  reviews: PaginatedItems<ProfessorReview>;
}

export interface ProfessorReviewsRouteParams
  extends Omit<PaginatedItems<ProfessorReview>, 'items'> {
  id: string;
  sort: 'relevant' | 'newest' | 'highest' | 'lowest';
  filters?: {
    tags?: string[];
    courses?: string[];
  };
}

export const response = ({
  id,
  itemsPerPage,
  page,
  sort,
  filters,
}: ProfessorReviewsRouteParams): ProfessorReviewsRouteResponse => {
  const result = reviews
    .filter((review) => {
      if (filters?.tags) {
        if (!filters.tags.every((tag) => review.tags.includes(tag))) {
          return false;
        }
      }
      if (filters?.courses) {
        if (!filters.courses.includes(review.course)) {
          return false;
        }
      }
      if (id !== review.professor.id) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sort === 'highest') {
        return b.overallRating - a.overallRating;
      } else if (sort === 'lowest') {
        return a.overallRating - b.overallRating;
      } else {
        return b.likes - a.likes;
      }
    });
  return {
    reviewCount: result.length,
    reviews: getPaginatedItems<ProfessorReview>({
      items: result,
      itemsPerPage,
      page,
    }),
  };
};
