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
  return axios.post("/personal/watchlist/add", info);
};

const handleGetFilmFromWatchList = (
  userID: number,
  signal?: AbortSignal
): Promise<WatchListResponseInfo> => {
  return axios.get("/personal/watchlist", {
    params: {
      userID: userID,
    },
    signal,
  });
};

const handleDeleteFilmFromWatchList = (
  deleteInfo: DeleteInfo
): Promise<ResponseNoti> => {
  return axios.delete("/personal/watchlist/delete", {
    data: deleteInfo,
  });
};

export {
  handleAddFilmToWatchist,
  handleGetFilmFromWatchList,
  handleDeleteFilmFromWatchList,
};
