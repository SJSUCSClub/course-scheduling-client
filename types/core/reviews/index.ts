export type ReviewsIDCommentsResponse = {
  id: number;
  review_id: number;
  user_id: string | null;
  created_at: string;
  updated_at: string | null;
  content: string;
}[];
