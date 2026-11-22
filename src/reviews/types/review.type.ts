// What everyone sees for a review on a movie's single view.
// review_pk is only there so an admin can point at the review to remove it.
export type Review = {
  review_pk: string;
  user_name: string;
  rating: number;
  review: string;
  created_at: Date;
};

// The logged-in user's own review
export type MyReview = {
  review_pk: string;
  movie_fk: string;
  rating: number;
  review: string;
  created_at: Date;
  updated_at: Date;
};

// One entry on the logged-in user's loglist
export type LoglistReview = MyReview & {
  movie: {
    title: string;
    release_year: number;
    poster_url: string | null;
  };
};
