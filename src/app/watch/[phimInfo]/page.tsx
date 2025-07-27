import FilmInfo from "@/app_components/body/FilmInfo";
import { Metadata } from "next";

interface Props {
  params: { phimInfo: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phimInfo } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/film/${phimInfo}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();

    return {
      title: `${data.data.movie.name} - LetWatch`,
      description: `Xem ${data.data.movie.name} full HD tại LetWatch.`,
      openGraph: {
        title: data.data.movie.name,
        description: `Xem ${data.data.movie.name} full HD tại LetWatch.`,
        images: [{ url: data.data.movie.poster_url }],
      },
      twitter: {
        card: "summary_large_image",
        title: data.data.movie.name,
        description: `Xem ${data.data.movie.name} full HD tại LetWatch.`,
        images: [data.data.movie.poster_url],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Xem Phim - LetWatch",
      description: "Xem phim chất lượng cao tại LetWatch.",
    };
  }
}

function FilmInfoPage() {
  return (
    <div>
      <FilmInfo />
    </div>
  );
}

export default FilmInfoPage;
