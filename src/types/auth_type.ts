type SignIn = {
  email_username: string;
  password: string;
};

type SignUp = {
  email: string;
  username: string;
  password: string;
  re_password: string;
  verifyCode: string;
};

type ResponseNoti = {
  success: boolean;
  message: string;
  data: [];
  error: string | null;
};

type User = {
  id: number;
  email: string;
  username: string;
  role: number;
};

type LoginRespone = {
  success: boolean;
  message: string;
  data: User;
  error: string | null;
};

export type { SignIn, SignUp, ResponseNoti, User, LoginRespone };
