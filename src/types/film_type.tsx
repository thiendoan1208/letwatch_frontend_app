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

export type { FilmType };
