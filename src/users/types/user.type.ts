// What the API is allowed to send about a user.
// Never password hash, verification_key or reset_password_key.
export type User = {
  user_pk: string;
  user_name: string;
  user_email: string;
  role: string;
  created_at: Date;
  verified_at: Date | null;
};
