import axios from "@/config/axios";
import { FilmList, FilmType } from "@/types/film_type";

const getFilmType = (): Promise<FilmType> => {
  return axios.get("/all-film-type");
};

const getNewFilmList = (page: number): Promise<FilmList> => {
  return axios.get("/category/new-film-list", { params: { page } });
};

export { getFilmType, getNewFilmList };
