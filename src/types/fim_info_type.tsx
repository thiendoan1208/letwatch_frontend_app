export type MovieDetailResponse = {
  status: boolean;
  msg: string;
  movie: MovieInfo;
  episodes: EpisodeServer[];
};

export type MovieInfo = {
  tmdb: {
    type: string; // "tv"
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string | null;
  };
  created: {
    time: string; // ISO date
  };
  modified: {
    time: string; // ISO date
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
};

export type EpisodeServer = {
  server_name: string;
  server_data: Episode[];
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

export type EachEpisode = {
  success: boolean;
  message: string;
  data: Episode;
  error: null;
};

export type Pallete = {
  DarkMuted: { rgb: number[]; population: number };
  DarkVibrant: { rgb: number[]; population: number };
  LightMuted: { rgb: number[]; population: number };
  LightVibrant: { rgb: number[]; population: number };
  Muted: { rgb: number[]; population: number };
  Vibrant: { rgb: number[]; population: number };
};

export type FilmInfo = {
  success: boolean;
  message: string;
  data: MovieDetailResponse;
  pallete: Pallete;
  error: null | string;
};
