export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  roles: string[];
};
