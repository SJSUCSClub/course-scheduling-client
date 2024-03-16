import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
  TagType,
} from '@/utils/types';
import getPaginatedItems from '@/utils/get-paginated-items';
import chooseRandom from '@/utils/choose-random';

const tags: TagType[] = [
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

type ProfessorReview = ProfessorReviewsRouteResponse['items'][number];

const reviews: ProfessorReview[] = Array.from<undefined, ProfessorReview>(
  { length: 100 },
  (v, k): ProfessorReview => {
    const quality = Math.max(0.5, Math.ceil(Math.random() * 50) / 10);
    const ease = Math.max(0.5, Math.ceil(Math.random() * 50) / 10);
    return {
      id: k,
      createdAt: 'August 19, 2002',
      courseNumber: '132',
      department: 'CMPE',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      quality,
      ease,
      overall: Math.max(0.5, Math.ceil(((quality + ease) / 2) * 10) / 10),
      grade: chooseRandom(['C-', 'A+', 'F']),
      takeAgain: chooseRandom([true, false]),
      tags: Array.from({ length: Math.ceil(Math.random() * 8) }, () =>
        chooseRandom(tags),
      ),
      courseId: 'CMPE132',
      isUserAnonymous: k % 2 === 0,
      userId: 1,
      professorId: 2,
      upvotes: k,
      userName: 'John Doe',
      professorName: 'Jahan Ghofraniha',
    };
  },
);

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
        if (!filters.courses.includes(review.courseId)) {
          return false;
        }
      }
      if (id !== review.professorId) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'highest') {
        return b?.overall && a?.overall ? a.overall - b.overall : -1;
      } else if (sort === 'lowest') {
        return b?.overall && a?.overall ? b.overall - a.overall : -1;
      } else {
        return b.upvotes - a.upvotes;
      }
    });
  return {
    totalReviews: reviews.length,
    ...getPaginatedItems<ProfessorReview>({
      items: result,
      itemsPerPage,
      page,
    }),
  };
};
