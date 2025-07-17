import axios from "@/config/axios";
import { ResponseNoti } from "@/types/auth_type";
import {
  DeleteInfo,
  WatchItemInfo,
  WatchListResponseInfo,
} from "@/types/personal_type";

const handleAddFilmToWatchist = (
  info: WatchItemInfo
): Promise<ResponseNoti> => {
  return axios.post("/personal/add-to-watchlist", info);
};

const handleGetFilmFromWatchList = (
  userID: number
): Promise<WatchListResponseInfo> => {
  return axios.get("/personal/get-film-from-watchlist", {
    params: {
      userID: userID,
    },
  });
};

const handleDeleteFilmFromWatchList = (
  deleteInfo: DeleteInfo
): Promise<ResponseNoti> => {
  return axios.delete("/personal/delete-film-from-watchlist", {
    data: deleteInfo,
  });
};

export {
  handleAddFilmToWatchist,
  handleGetFilmFromWatchList,
  handleDeleteFilmFromWatchList,
};
