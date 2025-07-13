type SignIn = {
  email_username: string;
  password: string;
};

type SignUp = {
  email: string;
  username: string;
  password: string;
  re_password: string;
};

export type { SignIn, SignUp };
