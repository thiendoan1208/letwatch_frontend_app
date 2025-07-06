const startYear = 1970;
const currentYear = new Date().getFullYear();

const yearArr = Array.from(
  {
    length: currentYear - startYear + 1,
  },
  (_, index) => startYear + index
);

const fullYearFilm = yearArr.reverse();

export { fullYearFilm };
