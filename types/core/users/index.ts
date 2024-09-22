export interface UsersProfileResponse {
  review: {
    id: number;
    created_at: string;
    updated_at: string | null;
    professor_id: string | null;
    professor_name: string | null;
    course_number: string;
    department: string;
    content: string;
    quality: number;
    ease: number;
    grade: string | null;
    tags: string[];
    take_again: boolean;
    is_user_anonymous: boolean;
    votes: {
      upvote: number;
      downvote: number;
    };
    voted: boolean | null;
    comments:
      | {
          id: number;
          review_id: number;
          user_id: string | null;
          name: string;
          username: string;
          created_at: string;
          updated_at: string | null;
          content: string;
        }[]
      | null;
  }[];
  comments: {
    id: number;
    review_id: number;
    user_id: string | null;
    name: string;
    username: string;
    created_at: string;
    updated_at: string | null;
    content: string;
  }[];
  flagged_reviews: {
    id: number;
    created_at: string;
    updated_at: string | null;
    professor_id: string | null;
    professor_name: string | null;
    course_number: string;
    department: string;
    content: string;
    quality: number;
    ease: number;
    grade: string | null;
    tags: string[];
    take_again: boolean;
    is_user_anonymous: boolean;
    votes: {
      upvote: number;
      downvote: number;
    };
    comments:
      | {
          id: number;
          review_id: number;
          user_id: string | null;
          name: string;
          username: string;
          created_at: string;
          updated_at: string | null;
          content: string;
        }[]
      | null;
  }[];
  reviews_voted: {
    id: number;
    created_at: string;
    updated_at: string | null;
    professor_id: string | null;
    professor_name: string | null;
    course_number: string;
    department: string;
    content: string;
    quality: number;
    ease: number;
    grade: string | null;
    tags: string[];
    take_again: boolean;
    is_user_anonymous: boolean;
    votes: {
      upvote: number;
      downvote: number;
    };
    comments:
      | {
          id: number;
          review_id: number;
          user_id: string | null;
          name: string;
          username: string;
          created_at: string;
          updated_at: string | null;
          content: string;
        }[]
      | null;
  }[];
}
