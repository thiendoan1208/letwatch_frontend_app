import axios from "@/config/axios";
import { ResponseNoti } from "@/types/auth_type";
import { ContributeFormType } from "@/types/review_type";

const handleSendContributeForm = (
  form: ContributeFormType
): Promise<ResponseNoti> => {
  return axios.post("/contribute/send-form", form);
};

export { handleSendContributeForm };
