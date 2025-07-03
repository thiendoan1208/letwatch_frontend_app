type FilmType = {
  success: boolean;
  message: string;
  data: SpecificFilmsType[];
  error: null | string;
};

type SpecificFilmsType = {
  _id: string;
  name: string;
  slug: string;
};

type FilmList = {
  success: boolean;
  message: string;
  data: {
    items: FilmInList[];
    msg: string;
    pagination: {
      currentPage: number;
      totalItems: number;
      totalItemsPerPage: number;
      totalPages: number;
    };
    status: boolean;
  };
  error: null | string;
};

type FilmInList = {
  imdb: {
    id: string | null;
  };
  modified: {
    time: string; // ISO date string, ví dụ "2025-07-01T22:36:51.000Z"
  };
  name: string;
  origin_name: string;
  poster_url: string;
  slug: string;
  thumb_url: string;
  tmdb: {
    id: string;
    season: number;
    type: "tv" | "movie"; // giả định chỉ có "tv" hoặc "movie"
    vote_average: number;
    vote_count: number;
  };
  year: number;
  _id: string;
};

export type { FilmType, FilmList, FilmInList };
