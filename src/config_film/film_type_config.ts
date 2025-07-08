const filmList: { name: string; slug: string; url: string }[] = [
  { name: "Phim Bộ", slug: "phim-bo", url: "/watch/kham-pha/phim-bo" },
  { name: "Phim Lẻ", slug: "phim-le", url: "/watch/kham-pha/phim-le" },
  { name: "TV Shows", slug: "tv-shows", url: "/watch/tv-shows" },
  { name: "Hoạt Hình", slug: "hoat-hinh", url: "/watch/hoat-hinh" },
  {
    name: "Phim Vietsub",
    slug: "phim-vietsub",
    url: "/watch/kham-pha/phim-vietsub",
  },
  {
    name: "Phim Thuyết Minh",
    slug: "phim-thuyet-minh",
    url: "/watch/kham-pha/phim-thuyet-minh",
  },
  {
    name: "Phim Lồng Tiếng",
    slug: "phim-long-tieng",
    url: "/watch/kham-pha/phim-long-tieng",
  },
];

const filmLang = [
  { name: "Loại Phim", slug: "no" },
  { name: "Phim Vietsub", slug: "vietsub" },
  { name: "Phim Thuyết Minh", slug: "thuyet-minh" },
  { name: "Phim Lồng Tiếng", slug: "long-tieng" },
];

export { filmList, filmLang };
