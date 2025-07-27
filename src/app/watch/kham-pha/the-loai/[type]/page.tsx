import FilmListTypeFilterAndDisplay from "@/app_components/filter_and_display/FilmListTypeFilterAndDisplay";
import { Metadata } from "next";
import { filmTypeMeta } from "@/lib/filmTypeMeta";

interface Props {
  params: { type: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;

  const meta = filmTypeMeta[type] || {
    title: "LetWatch - Kho phim đa dạng",
    description: "Khám phá kho phim đa dạng và phong phú tại LetWatch.",
    image: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/logo_name.png`,
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/kham-pha/the-loai/${type}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/kham-pha/the-loai/${type}`,
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

function FilmTypeList() {
  return (
    <div
      className="bg-black min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 4%, 10%, 1) 0%, hsla(0, 4%, 14%, 1) 54%, hsla(0, 1%, 20%, 1) 100%)",
      }}
    >
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div className="mx-4 lg:mx-16 ">
          <div>
            <FilmListTypeFilterAndDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmTypeList;
