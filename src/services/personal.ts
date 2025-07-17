import axios from "@/config/axios";
import { ResponseNoti } from "@/types/auth_type";
import { WatchItemInfo, WatchListResponseInfo } from "@/types/personal_type";

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

export { handleAddFilmToWatchist, handleGetFilmFromWatchList };
