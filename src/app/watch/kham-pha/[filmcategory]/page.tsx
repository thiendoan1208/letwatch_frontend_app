import MainFilterAndDisplay from "@/app_components/filter_and_display/MainFilterAndDisplay";
import { Metadata } from "next";
import { filmCategoryMeta } from "@/lib/categoryMeta";

interface Props {
  params: { filmCategory: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filmCategory } = params;

  const meta = filmCategoryMeta[filmCategory] || {
    title: "LetWatch - Kho phim đa dạng",
    description: "Khám phá kho phim đa dạng và phong phú tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/kham-pha/the-loai/${filmCategory}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/kham-pha/the-loai/${filmCategory}`,
      images: [{ url: meta.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
    robots: { index: true, follow: true },
  };
}

function FilmCategory() {
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

export default FilmCategory;
