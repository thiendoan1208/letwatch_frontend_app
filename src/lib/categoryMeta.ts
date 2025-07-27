export const filmCategoryMeta: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  "phim-bo": {
    title: "Phim Bộ - LetWatch",
    description: "Tuyển tập các bộ phim bộ dài tập hấp dẫn tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phim-le": {
    title: "Phim Lẻ - LetWatch",
    description:
      "Kho phim lẻ đa dạng, mới nhất với chất lượng cao tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "tv-shows": {
    title: "TV Shows - LetWatch",
    description:
      "Xem các bộ phim TV Shows hấp dẫn với chất lượng HD tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "hoat-hinh": {
    title: "Phim Hoạt Hình - LetWatch",
    description:
      "Kho phim hoạt hình đa dạng, hấp dẫn dành cho mọi lứa tuổi tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phim-vietsub": {
    title: "Phim Vietsub - LetWatch",
    description: "Xem phim có phụ đề tiếng Việt chất lượng cao tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phim-thuyet-minh": {
    title: "Phim Thuyết Minh - LetWatch",
    description:
      "Thưởng thức phim thuyết minh tiếng Việt dễ dàng tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phim-long-tieng": {
    title: "Phim Lồng Tiếng - LetWatch",
    description:
      "Các bộ phim đã được lồng tiếng Việt, tiện lợi khi xem tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
};
