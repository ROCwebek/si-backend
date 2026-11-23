// A review on a movie's single view.
// user_pk lets the frontend tell if the review is the logged-in user's own
// (compare with user.user_pk from the login response), and lets an admin
// delete it. Only user_name is meant to be displayed.
export type Review = {
  user_pk: string;
  user_name: string;
  rating: number;
  review: string;
  created_at: Date;
};

// The logged-in user's own review
export type MyReview = {
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
