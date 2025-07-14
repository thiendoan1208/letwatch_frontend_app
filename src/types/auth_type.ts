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

export type { SignIn, SignUp, ResponseNoti };
