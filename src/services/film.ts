import axios from "@/config/axios";
import {
  FilmCountry,
  FilmList,
  FilmListType,
  FilmType,
} from "@/types/film_type";
import { EachEpisode, FilmInfoData } from "@/types/fim_info_type";

const getFilmType = (): Promise<FilmType> => {
  return axios.get("/all-film-type");
};

const getFilmCountry = (): Promise<FilmCountry> => {
  return axios.get("/all-film-countries");
};

const getNewFilmList = (page: number, limit: string): Promise<FilmList> => {
  return axios.get("/category/new-film-list", { params: { page, limit } });
};

const getFilmListByCategory = (
  type: string,
  page: number
): Promise<FilmListType> => {
  return axios.get(`/category/${type}`, { params: { page } });
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
  }
): Promise<FilmListType> => {
  return axios.get(`/category/${path}`, { params: sortFilmList });
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
  }
): Promise<FilmListType> => {
  return axios.get(`/film-type/${path}`, { params: sortFilmList });
};

const getFilmInfo = (slug: string): Promise<FilmInfoData> => {
  return axios.get(`/film/${slug}`);
};

const getFilmEpisode = (
  filmSlug: string,
  episodeSlug: string,
  server: string | null
): Promise<EachEpisode> => {
  return axios.get(`/film/${filmSlug}/${episodeSlug}`, { params: { server } });
};

const findFilm = (keyword: string | null): Promise<FilmListType> => {
  return axios.get("/find-film", { params: { keyword } });
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
