import axios from "@/config/axios";
import {
  FilmCountry,
  FilmList,
  FilmListType,
  FilmType,
} from "@/types/film_type";
import { EachEpisode, FilmInfoData } from "@/types/fim_info_type";

const getFilmType = (signal?: AbortSignal): Promise<FilmType> => {
  return axios.get("/all-film-type", { signal });
};

const getFilmCountry = (signal?: AbortSignal): Promise<FilmCountry> => {
  return axios.get("/all-film-countries", { signal });
};

const getNewFilmList = (
  page: number,
  limit: string,
  signal?: AbortSignal
): Promise<FilmList> => {
  return axios.get("/category/new-film-list", {
    params: { page, limit },
    signal,
  });
};

const getFilmListByCategory = (
  type: string,
  page: number,
  signal?: AbortSignal
): Promise<FilmListType> => {
  return axios.get(`/category/${type}`, { params: { page }, signal });
};

const getFilmListSortedByCategory = (
  path: string,
  sortFilmList: {
    page: number;
    sort_type: string;
    sort_lang: string;
    category: string;
    country: string;
    year: string;
    limit: string;
  },
  signal?: AbortSignal
): Promise<FilmListType> => {
  return axios.get(`/category/${path}`, { params: sortFilmList, signal });
};

const getFilmListSortByType = (
  path: string,
  sortFilmList: {
    page: number;
    sort_type: string;
    sort_lang: string;
    category: string;
    country: string;
    year: string;
    limit: string;
  },
  signal?: AbortSignal
): Promise<FilmListType> => {
  return axios.get(`/film-type/${path}`, { params: sortFilmList, signal });
};

const getFilmInfo = (
  slug: string,
  signal?: AbortSignal
): Promise<FilmInfoData> => {
  return axios.get(`/film/${slug}`, { signal });
};

const getFilmEpisode = (
  filmSlug: string,
  episodeSlug: string,
  server: string | null,
  signal?: AbortSignal
): Promise<EachEpisode> => {
  return axios.get(`/film/${filmSlug}/${episodeSlug}`, {
    params: { server },
    signal,
  });
};

const findFilm = (
  keyword: string | null,
  signal?: AbortSignal
): Promise<FilmListType> => {
  return axios.get("/find-film", { params: { keyword }, signal });
};

export {
  getFilmType,
  getNewFilmList,
  getFilmListByCategory,
  getFilmCountry,
  getFilmListSortedByCategory,
  getFilmListSortByType,
  getFilmInfo,
  getFilmEpisode,
  findFilm,
};
