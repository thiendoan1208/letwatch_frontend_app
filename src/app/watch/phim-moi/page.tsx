import MainDisplay from "@/app_components/filter_and_display/MainDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phim mới cập nhật - LetWatch",
  description:
    "Xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/phim-moi`,
  },
  openGraph: {
    title: "Phim mới cập nhật - LetWatch",
    description:
      "Xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
    url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/phim-moi`,
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
    title: "Phim mới cập nhật - LetWatch",
    description:
      "Xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
    images: [
      "https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function NewFilmRelease() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div className="mx-4 lg:mx-16 ">
          <MainDisplay />
        </div>
      </div>
    </div>
  );
}

export default NewFilmRelease;
