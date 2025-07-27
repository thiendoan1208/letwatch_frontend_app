export const filmTypeMeta: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  action: {
    title: "Phim Hành Động - LetWatch",
    description: "Những bộ phim hành động gay cấn, kịch tính tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "hanh-dong": {
    title: "Phim Hành Động - LetWatch",
    description: "Những bộ phim hành động gay cấn, kịch tính tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "mien-tay": {
    title: "Phim Miền Tây - LetWatch",
    description: "Tổng hợp các bộ phim miền Tây đặc sắc tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "tre-em": {
    title: "Phim Trẻ Em - LetWatch",
    description: "Các bộ phim dành cho trẻ em vui nhộn và bổ ích tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "lich-su": {
    title: "Phim Lịch Sử - LetWatch",
    description: "Khám phá các bộ phim lịch sử hoành tráng tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "co-trang": {
    title: "Phim Cổ Trang - LetWatch",
    description: "Những bộ phim cổ trang đặc sắc, hấp dẫn tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "chien-tranh": {
    title: "Phim Chiến Tranh - LetWatch",
    description:
      "Các bộ phim chiến tranh đầy kịch tính và cảm xúc tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "vien-tuong": {
    title: "Phim Viễn Tưởng - LetWatch",
    description:
      "Thế giới phim viễn tưởng đầy sáng tạo và hấp dẫn tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "kinh-di": {
    title: "Phim Kinh Dị - LetWatch",
    description: "Rợn người với những bộ phim kinh dị đáng sợ tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "tai-lieu": {
    title: "Phim Tài Liệu - LetWatch",
    description:
      "Khám phá thế giới qua các bộ phim tài liệu chân thực tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "bi-an": {
    title: "Phim Bí Ẩn - LetWatch",
    description: "Những bộ phim bí ẩn, đầy thử thách trí tuệ tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phim-18": {
    title: "Phim 18+ - LetWatch",
    description: "Tuyển tập phim 18+ chọn lọc tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "tinh-cam": {
    title: "Phim Tình Cảm - LetWatch",
    description:
      "Ngập tràn cảm xúc với những bộ phim tình cảm lãng mạn tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "tam-ly": {
    title: "Phim Tâm Lý - LetWatch",
    description:
      "Phân tích sâu sắc tâm lý con người qua các bộ phim tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "the-thao": {
    title: "Phim Thể Thao - LetWatch",
    description:
      "Sôi động với những bộ phim thể thao đầy cảm hứng tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "phieu-luu": {
    title: "Phim Phiêu Lưu - LetWatch",
    description:
      "Hành trình khám phá đầy mạo hiểm trong các bộ phim phiêu lưu tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "am-nhac": {
    title: "Phim Âm Nhạc - LetWatch",
    description: "Thưởng thức các bộ phim âm nhạc sống động tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "gia-dinh": {
    title: "Phim Gia Đình - LetWatch",
    description: "Những bộ phim ấm áp, ý nghĩa dành cho gia đình tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "hoc-duong": {
    title: "Phim Học Đường - LetWatch",
    description: "Trở về tuổi học trò với các bộ phim học đường tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "hai-huoc": {
    title: "Phim Hài Hước - LetWatch",
    description: "Cười thả ga với những bộ phim hài hước tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "hinh-su": {
    title: "Phim Hình Sự - LetWatch",
    description: "Đấu trí cân não với các bộ phim hình sự phá án tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "vo-thuat": {
    title: "Phim Võ Thuật - LetWatch",
    description:
      "Những pha hành động mãn nhãn trong các bộ phim võ thuật tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "khoa-hoc": {
    title: "Phim Khoa Học - LetWatch",
    description: "Khám phá kiến thức qua các bộ phim khoa học tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "than-thoai": {
    title: "Phim Thần Thoại - LetWatch",
    description: "Đắm chìm vào thế giới thần thoại huyền bí tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "chinh-kich": {
    title: "Phim Chính Kịch - LetWatch",
    description:
      "Những bộ phim chính kịch sâu sắc và đầy ý nghĩa tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
  "kinh-dien": {
    title: "Phim Kinh Điển - LetWatch",
    description:
      "Thưởng thức các tác phẩm điện ảnh kinh điển mọi thời đại tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  },
};
