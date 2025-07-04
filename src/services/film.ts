import axios from "@/config/axios";
import { FilmList, FilmListType, FilmType } from "@/types/film_type";

const getFilmType = (): Promise<FilmType> => {
  return axios.get("/all-film-type");
};

const getNewFilmList = (page: number): Promise<FilmList> => {
  return axios.get("/category/new-film-list", { params: { page } });
};

const getFilmListByType = (
  type: string,
  page: number
): Promise<FilmListType> => {
  return axios.get(`category/${type}`, { params: { page } });
};

export { getFilmType, getNewFilmList, getFilmListByType };
