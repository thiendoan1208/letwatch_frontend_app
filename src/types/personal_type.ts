type WatchItemInfo = {
  userID: number;
  movieID: string;
  movieTitle: string;
  movieSlug: string;
  moviePoster: string;
};

type WatchListResponseInfo = {
  success: boolean;
  message: string;
  data: WatchListDBItem[];
  error: null | string;
};

type WatchListDBItem = {
  id: number;
  userID: number;
  movieID: string;
  movieTitle: string;
  movieSlug: string;
  moviePoster: string;
  createdAt: string;
  updatedAt: string;
};

type DeleteInfo = {
  userID: number;
  filmDeleteList: string[];
};

export type { WatchItemInfo, WatchListResponseInfo, DeleteInfo };
