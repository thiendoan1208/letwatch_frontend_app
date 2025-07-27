import MainFilterAndDisplay from "@/app_components/filter_and_display/MainFilterAndDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoạt Hình - LetWatch",
  description:
    "Xem các bộ phim Hoạt Hình hấp dẫn với chất lượng HD tại LetWatch.",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/hoat-hinh`,
  },
  openGraph: {
    title: "Hoạt Hình - LetWatch",
    description:
      "Xem các bộ phim Hoạt Hình hấp dẫn với chất lượng HD tại LetWatch.",
    url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/hoat-hinh`,
    siteName: "LetWatch",
    images: [
      {
        url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoạt Hình - LetWatch",
    description:
      "Xem các bộ phim Hoạt Hình hấp dẫn với chất lượng HD tại LetWatch.",
    images: [
      `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Anime() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        <div className="mx-4 lg:mx-16 ">
          <MainFilterAndDisplay />
        </div>
      </div>
    </div>
  );
}

export default Anime;
