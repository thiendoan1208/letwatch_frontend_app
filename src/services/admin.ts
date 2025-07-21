import axios from "@/config/axios";
import {
  ContributeResponse,
  UserFindResponse,
  UserResponse,
} from "@/types/admin_type";
import { ResponseNoti } from "@/types/auth_type";

const handleGetAllUser = (
  limit: number,
  page: number
): Promise<UserResponse> => {
  return axios.get("/admin/users", {
    params: {
      limit: limit,
      page: page,
    },
  });
};

const handleFindUser = (keyword: string): Promise<UserFindResponse> => {
  return axios.post("/admin/users/find", { keyword: keyword });
};

const handleDeleteUser = (deleteInfo: string[]): Promise<ResponseNoti> => {
  return axios.delete("/admin/users/delete", {
    data: deleteInfo,
  });
};

const handleGetAllContributeForm = (): Promise<ContributeResponse> => {
  return axios.get("/admin/get-all-contribute-form");
};

const handleUpdateContributeForm = (
  contributeForms: {
    id: number;
    status: string;
  }[]
): Promise<ResponseNoti> => {
  return axios.post("/admin/update-contribute-forms", contributeForms);
};

export {
  handleGetAllUser,
  handleFindUser,
  handleDeleteUser,
  handleGetAllContributeForm,
  handleUpdateContributeForm,
};
