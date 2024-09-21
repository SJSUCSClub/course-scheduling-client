import {
  ProfessorReviewsRouteBody,
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/types/api/professor/reviews';
import { TagType } from '@/types/general';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type ProfessorReview = ProfessorReviewsRouteResponse['items'][number];

const reviews: ProfessorReview[] = Array.from<undefined, ProfessorReview>(
  { length: 100 },
  (v, k): ProfessorReview => {
    const quality = (k % 5) + 1;
    const ease = (k % 10) / 2 + 1;
    return {
      id: k,
      createdAt: 'August 19, 2002',
      courseNumber: '132',
      department: 'CMPE',
      name: 'John Doe',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'.slice(
          0,
          50 + (k % 50),
        ),
      quality,
      ease,
      //overall: Math.max(0.5, Math.ceil(((quality + ease) / 2) * 10) / 10),
      grade: k % 3 === 0 ? 'A+' : k % 2 === 0 ? 'C-' : 'F',
      takeAgain: k % 2 === 0,
      tags:
        k % 5 === 0
          ? ['Caring', 'Extra Credit']
          : ['Extra Credit', 'Tough Grader'],
      //courseId: 'CMPE132',
      isUserAnonymous: k % 5 === 0,
      userId: '1',
      votes: {
        upvotes: k,
        downvotes: 0,
      },
      username: 'John Doe',
      professorId: k % 2 === 0 ? '2' : '3',
    };
  },
);

export const response: FakeResponseFunctionType<
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteBody
> = ({ id }, { tags, page, limit }): ProfessorReviewsRouteResponse => {
  const result = reviews.filter((review) => {
    /*if (filters?.search) {
        const wordsArray = review.content
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        const searchQuery = filters.search.toLowerCase();
        if (fuzzySearch(searchQuery, wordsArray, 2).length === 0) {
          return false;
        }
      }*/
    if (tags?.length) {
      if (!tags.every((tag) => review.tags.includes(tag))) {
        return false;
      }
    }
    /*if (filters?.courses?.length) {
        if (!filters.courses.includes(review.courseId)) {
          return false;
        }
      }*/
    if (id !== review.professorId) {
      return false;
    }
    return true;
  });
  /*.sort((a, b) => {
      if (filters?.sort === 'newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (filters?.sort === 'highest') {
        return b.overall - a.overall;
      } else if (filters?.sort === 'lowest') {
        return a.overall - b.overall;
      } else {
        return b.upvotes - a.upvotes;
      }
    });*/
  const tagFilters = new Map<TagType, number>();
  result.forEach((review) => {
    review.tags.forEach((tag) => {
      const currentCount = tagFilters.get(tag) ?? 0;
      tagFilters.set(tag, currentCount + 1);
    });
  });
  const courseFilters = new Map<string, number>();
  result.forEach((review) => {
    const currentCount =
      courseFilters.get(review.department + review.courseNumber) ?? 0;
    courseFilters.set(
      review.department + review.courseNumber,
      currentCount + 1,
    );
  });
  return {
    totalResults: result.length,
    filters: {
      tags: Array.from(tagFilters.entries()).map(([tag, count]) => {
        return { tag, count };
      }),
    },
    /*filters: {
      search: filters?.search ?? '',
      sort: filters?.sort ?? 'relevant',
      tags: Array.from(tagFilters.entries()).map(([tag, count]) => ({
        tag,
        count,
      })),
      courses: Array.from(courseFilters.entries()).map(([course, count]) => ({
        course,
        count,
      })),
    },*/
    ...getPaginatedItems<ProfessorReview>({
      items: result,
      itemsPerPage: limit,
      page: page || 0,
    }),
    page: page || 1,
    pages: Math.ceil(result.length / (limit || 3)),
  };
};
