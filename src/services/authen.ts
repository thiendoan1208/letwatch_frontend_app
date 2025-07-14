import axios from "@/config/axios";
import { ResponseNoti, SignUp } from "@/types/auth_type";

const handleSendVerfyCode = (
  userInfo: SignUp
): Promise<{ data: { id: string }; success: boolean }> => {
  return axios.post("/auth/verify-code", userInfo);
};

const handleSignUp = (userInfo: SignUp): Promise<ResponseNoti> => {
  return axios.post("/auth/sign-up", userInfo);
};

export { handleSendVerfyCode, handleSignUp };
