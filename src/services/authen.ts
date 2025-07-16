import axios from "@/config/axios";
import {
  LoginRespone,
  ResponseNoti,
  SignIn,
  SignUp,
  VerifyResponseNoti,
} from "@/types/auth_type";

const handleSendVerfyCode = (
  userInfo: SignUp
): Promise<{ data: { id: string }; success: boolean }> => {
  return axios.post("/auth/verify-code", userInfo);
};

const handleSignUp = (userInfo: SignUp): Promise<ResponseNoti> => {
  return axios.post("/auth/sign-up", userInfo);
};

const handleSignIn = (userInfo: SignIn): Promise<LoginRespone> => {
  return axios.post("/auth/sign-in", userInfo);
};

const getUserInfo = (): Promise<LoginRespone> => {
  return axios.get("/me");
};

const handleSignOut = (): Promise<ResponseNoti> => {
  return axios.delete("/auth/sign-out");
};

const handleRefreshToken = (): Promise<ResponseNoti> => {
  return axios.post("/auth/refresh-token");
};

const handleCheckRecoverCode = (
  recoverForm: SignUp
): Promise<VerifyResponseNoti> => {
  return axios.post("/auth/check-recover-code", recoverForm);
};

const handleUpdatePassword = (newPasswordForm: {
  email: string | null;
  password: string;
}): Promise<ResponseNoti> => {
  return axios.patch("/auth/recover", newPasswordForm);
};

export {
  handleSendVerfyCode,
  handleSignUp,
  handleSignIn,
  getUserInfo,
  handleSignOut,
  handleRefreshToken,
  handleCheckRecoverCode,
  handleUpdatePassword,
};
