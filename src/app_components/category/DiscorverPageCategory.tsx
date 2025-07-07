"use client";

import { getFilmType } from "@/services/film";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function DiscoverPageCateGory() {
  const { data: filmType } = useQuery({
    queryKey: ["film-types"],
    queryFn: async () => await getFilmType(),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className="mt-5 pb-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filmType &&
        filmType.data &&
        filmType.success === true &&
        filmType.data.length > 0 &&
        filmType.data.map((type, index) => (
          <Link
            key={`film-type-${index}`}
            href={`/watch/kham-pha/the-loai/${type.slug}`}
            className="w-full border-2 border-white/10 px-4 py-2 rounded-full text-center text-md font-semibold text-nowrap"
          >
            {type.name}
          </Link>
        ))}
    </div>
  );
}

export default DiscoverPageCateGory;
