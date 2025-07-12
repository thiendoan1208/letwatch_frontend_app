"use client";

import LoaderComponent from "@/app_components/loader/loaderComponent";
import { findFilm } from "@/services/film";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SearchResult() {
  const keyword = useSearchParams().get("keyword");

  const { data: searchResult, isPending } = useQuery({
    queryKey: ["seacrch-keyword", keyword],
    queryFn: async () => {
      return await findFilm(keyword);
    },
  });

  return (
    <div>
      {!isPending &&
        searchResult &&
        searchResult.success &&
        searchResult.data.data.items !== null && (
          <div>
            <h1 className="text-xl text-yellow-500">
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
                    className="flex flex-col justify-between"
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
                      <h6>{film.year}</h6>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

      {!isPending &&
        searchResult &&
        searchResult.data &&
        searchResult.success &&
        searchResult.data.data.items === null && (
          <div className="flex items-center justify-center mt-10">
            {!isPending && (
              <h1 className="text-lg text-yellow-500">
                Không có kết quả tìm kiếm phù hợp
              </h1>
            )}
          </div>
        )}

      {!isPending && !searchResult && (
        <div className="flex items-center justify-center mt-10">
          {!isPending && (
            <h1 className="text-lg text-yellow-500">Không có dữ liệu</h1>
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
