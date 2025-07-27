import MainFilterAndDisplay from "@/app_components/filter_and_display/MainFilterAndDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows - LetWatch",
  description:
    "Xem các bộ phim TV Shows hấp dẫn với chất lượng HD tại LetWatch.",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/tv-shows`,
  },
  openGraph: {
    title: "TV Shows - LetWatch",
    description:
      "Xem các bộ phim TV Shows hấp dẫn với chất lượng HD tại LetWatch.",
    url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/tv-shows`,
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
    title: "TV Shows - LetWatch",
    description:
      "Xem các bộ phim TV Shows hấp dẫn với chất lượng HD tại LetWatch.",
    images: [
      `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function TVShowsPage() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div className="mx-4 lg:mx-16 ">
          <MainFilterAndDisplay />
        </div>
      </div>
    </div>
  );
}

export default TVShowsPage;
