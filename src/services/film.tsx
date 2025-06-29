import axios from "@/config/axios";
import { FilmType } from "@/types/film_type";

const getFilmType = (): Promise<FilmType> => {
  return axios.get("/api/all-film-type");
};

export { getFilmType };
