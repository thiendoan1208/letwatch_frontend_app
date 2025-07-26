"use client";

import LoaderComponent from "@/app_components/loader/loaderComponent";
import { findFilm } from "@/services/film";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SearchResult() {
  // params manage
  const keyword = useSearchParams().get("keyword");

  // Get film by keywords
  const { data: searchResult, isPending } = useQuery({
    queryKey: ["seacrch-keyword", keyword],
    queryFn: async ({ signal }) => {
      return await findFilm(keyword, signal);
    },
  });

  return (
    <div>
      {!isPending &&
        searchResult &&
        searchResult.success &&
        searchResult.data.data !== null &&
        searchResult.data.data.items !== null && (
          <div>
            <h1 className="text-xl text-[var(--text-color)]">
              {searchResult?.data.data.titlePage}
            </h1>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {searchResult &&
                searchResult.success === true &&
                searchResult.data.data.items !== null &&
                searchResult.data.data.items.map((film, index) => (
                  <Link
                    href={`/watch/${film.slug}`}
                    key={`search-result-${index}`}
                    className="flex flex-col justify-between relative hover:text-[var(--text-color)]"
                  >
                    <div className="w-full h-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${film.poster_url}`}
                        alt={film.name}
                        width={100}
                        height={100}
                        className="w-full h-full rounded-xl overflow-hidden"
                      />
                    </div>
                    <div className="mt-1">
                      <h1 className="line-clamp-1">{film.name}</h1>
                      <p className="line-clamp-1 text-sm opacity-50 font-semibold">
                        {film.origin_name}
                      </p>
                    </div>
                    <h6 className="absolute right-1.5 top-1.5 bg-[var(--bg-color)] px-2 rounded-md font-semibold text-white">
                      {film.year}
                    </h6>
                  </Link>
                ))}
            </div>
          </div>
        )}

      {!isPending &&
        searchResult &&
        searchResult.data &&
        searchResult.success &&
        searchResult.data.data !== null &&
        searchResult.data.data.items === null && (
          <div className="flex items-center justify-center mt-10">
            {!isPending && (
              <h1 className="text-lg text-[var(--text-color)]">
                Không có kết quả tìm kiếm phù hợp
              </h1>
            )}
          </div>
        )}

      {!isPending && !searchResult && (
        <div className="flex items-center justify-center mt-10">
          {!isPending && (
            <h1 className="text-lg text-[var(--text-color)]">
              Không có dữ liệu
            </h1>
          )}
        </div>
      )}

      {isPending && (
        <div>
          <LoaderComponent />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
