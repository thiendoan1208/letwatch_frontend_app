import HomePageBanner from "@/app_components/banner/HomePageBanner";
import HomePageCategory from "@/app_components/category/HomePageCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang Chủ - LetWatch",
  description:
    "Trang chủ xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/trang-chu`,
  },
  openGraph: {
    title: "Trang Chủ - LetWatch",
    description:
      "Trang chủ xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
    url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/trang-chu`,
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
    title: "Trang Chủ - LetWatch",
    description:
      "Trang chủ xem phim với kho phim đa dạng, tốc độ cao, chất lượng HD. Khám phá ngay!",
    images: [
      "https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function HomePage() {
  return (
    <div className=" min-h-screen">
      {/* Video intro */}
      <HomePageBanner />
      <div>
        <HomePageCategory />
      </div>
    </div>
  );
}

export default HomePage;
