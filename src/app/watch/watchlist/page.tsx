"use client";

import { UserContext } from "@/context/user";
import { handleGetFilmFromWatchList } from "@/services/personal";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import ErrorMessage from "@/app_components/error/ErrorMesage";
import LoaderComponent from "@/app_components/loader/loaderComponent";

function WatchListPage() {
  const { user } = useContext(UserContext);

  const { data: filmWatchListData, isLoading } = useQuery({
    queryKey: ["film-in-watchlist", user.id],
    queryFn: async () => {
      if (user.id !== 0) {
        return await handleGetFilmFromWatchList(user.id);
      }
      return null;
    },
  });

  return (
    <div
      className="bg-black min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 4%, 10%, 1) 0%, hsla(0, 4%, 14%, 1) 54%, hsla(0, 1%, 20%, 1) 100%)",
      }}
    >
      <div className="pt-20 text-white">
        <div className="mx-4 lg:mx-16 ">
          <div className="mt-10">
            <h1 className="text-xl text-yellow-500">Danh sách xem</h1>
          </div>
          <div className="mr-2 sm:mr-3 md:mr-0">
            {filmWatchListData &&
            filmWatchListData.data &&
            filmWatchListData.success === true &&
            isLoading === false ? (
              <div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-4 mt-4">
                  {filmWatchListData &&
                    filmWatchListData.data &&
                    filmWatchListData.data !== null &&
                    filmWatchListData.data.length > 0 &&
                    filmWatchListData.data.map((film, index: number) => (
                      <div
                        key={`new-films-${index}`}
                        className="select-none -mr-2.5 md:mr-0"
                      >
                        <div className=" group relative flex flex-col h-full justify-between">
                          <div className=" rounded-xl h-full overflow-hidden ">
                            <Image
                              className="object-cover object-center w-full h-full"
                              src={film.moviePoster}
                              alt={film.movieSlug}
                              width={100}
                              height={100}
                              priority
                            />
                            <Link
                              href={`/watch/${film.movieSlug}`}
                              className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                            >
                              {film.movieTitle}
                            </Link>
                          </div>
                          <div className="flex flex-col flex-nowrap cursor-default ">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <h6 className=" group-hover:text-yellow-500 cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                  {film.movieTitle}
                                </h6>
                              </HoverCardTrigger>
                              <HoverCardContent className="bg-white text-sm px-2 rounded-xl">
                                <div>{film.movieTitle}</div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div>
                  {filmWatchListData &&
                    filmWatchListData.data &&
                    filmWatchListData.data.length <= 0 && (
                      <div>
                        <h1 className="text-white">
                          Chưa có gì phim trong danh sách.
                        </h1>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <>
                {" "}
                {isLoading === false &&
                  filmWatchListData?.success === false && <ErrorMessage />}
              </>
            )}
            <div>{isLoading === true && <LoaderComponent />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchListPage;
