import axios from "@/config/axios";
import {
  ContributeResponse,
  UserFindResponse,
  UserResponse,
} from "@/types/admin_type";
import { ResponseNoti } from "@/types/auth_type";

const handleGetAllUser = (
  limit: number,
  page: number,
  signal?: AbortSignal
): Promise<UserResponse> => {
  return axios.get("/admin/users", {
    params: {
      limit: limit,
      page: page,
    },
    signal,
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

const handleGetAllContributeForm = (
  signal?: AbortSignal
): Promise<ContributeResponse> => {
  return axios.get("/admin/contribute-form", { signal });
};

const handleUpdateContributeForm = (
  contributeForms: {
    id: number;
    status: string;
  }[]
): Promise<ResponseNoti> => {
  return axios.post("/admin/contribute-form/update", contributeForms);
};

const handleDeleteContributeForm = (
  formIDArr: number[]
): Promise<ResponseNoti> => {
  return axios.delete("/admin/contribute-form/delete", {
    data: formIDArr,
  });
};
export {
  handleGetAllUser,
  handleFindUser,
  handleDeleteUser,
  handleGetAllContributeForm,
  handleUpdateContributeForm,
  handleDeleteContributeForm,
};
