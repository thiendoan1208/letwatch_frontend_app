"use client";

import VideoJS from "@/app_components/video/VideoJS/VideoJS";
import { cn } from "@/lib/utils";
import {
  getFilmEpisode,
  getFilmInfo,
  getFilmListSortByType,
} from "@/services/film";
import slugify from "@/utils/modifyText";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Player from "video.js/dist/types/player";
import Image from "next/image";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import ErrorMessage from "@/app_components/error/ErrorMesage";

const FILM_SUGGEST_LIMIT = 6;

function WatchFilm() {
  // URL, route, params manage
  const pathname = usePathname();
  const pathSplit = pathname.split("/");
  const serverSlug = useSearchParams().get("server");
  const filmSlug = pathSplit[pathSplit.length - 2];
  const episodeSlug = pathSplit[pathSplit.length - 1];

  // Get film info
  const { data: film, isPending: isFilmLoading } = useQuery({
    queryKey: ["film-info", filmSlug],
    queryFn: async ({ signal }) => {
      return await getFilmInfo(filmSlug, signal);
    },
    staleTime: 60 * 60 * 1000,
  });

  // Get specific film episode
  const { data: filmEpisode } = useQuery({
    queryKey: ["film-episode", episodeSlug, serverSlug],
    queryFn: async ({ signal }) => {
      return await getFilmEpisode(filmSlug, episodeSlug, serverSlug, signal);
    },
  });

  // Get film suggest with similar film type
  const { data: filmSuggest } = useQuery({
    queryKey: ["film-suggest", film?.data.movie.category[0].slug],
    queryFn: async ({ signal }) => {
      if (film) {
        return await getFilmListSortByType(
          film!.data.movie.category[0].slug,
          {
            page: 1,
            sort_type: "",
            sort_lang: "",
            category: "",
            country: "",
            year: "",
            limit: String(FILM_SUGGEST_LIMIT),
          },
          signal
        );
      } else {
        return {
          success: false,
          data: {
            data: {
              items: [],
            },
          },
        };
      }
    },
    enabled: !!film,
    retry: 10,
    staleTime: 60 * 60 * 1000,
  });

  // VideoJS
  const playerRef = React.useRef<Player>(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    aspectRatio: "16:9",
    poster: film?.data.movie.thumb_url,
    sources: [
      {
        src: filmEpisode?.data.link_m3u8,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
  };

  return (
    <div>
      <div className="flex items-center justify-center xl:mx-16">
        {!isFilmLoading &&
          film &&
          film.success === true &&
          film.data &&
          film.data.episodes &&
          film.data.status === true && (
            <div className=" w-full xl:w-[70%]">
              {filmEpisode &&
              filmEpisode.success &&
              filmEpisode.data.link_m3u8 ? (
                <>
                  <VideoJS
                    options={videoJsOptions}
                    onReady={handlePlayerReady}
                  />
                </>
              ) : (
                <div>
                  <h1>Không có thông tin phim</h1>
                </div>
              )}
            </div>
          )}
      </div>

      {/* film Episode */}
      {!isFilmLoading && film && film.data && film.data.status && (
        <div className="pb-10 mt-20 mx-4 lg:mx-16 ">
          <h1 className="text-2xl font-semibold text-yellow-500">Tập Phim</h1>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-3 lg:col-span-2">
              {!isFilmLoading &&
                film &&
                film.success === true &&
                film.data &&
                film.data.episodes &&
                film.data.status === true &&
                film.data.episodes.map((server, serverIndex) => (
                  <div key={`server-${serverIndex}`} className="my-5">
                    <div className="my-5">
                      <span className="py-2 px-2 font-semibold text-xl text-yellow-600 ">
                        {server.server_name}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 max-h-[300px] gap-3 overflow-auto overflow-x-hidden ">
                      {server.server_data.map((episode, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center w-full"
                        >
                          <Link
                            className={cn(
                              "w-full text-center px-2 py-1 border-2 rounded bg-white  text-nowrap",
                              slugify(server.server_name) === serverSlug &&
                                episode.slug === episodeSlug
                                ? "text-yellow-500 font-semibold"
                                : "text-black"
                            )}
                            key={`episode-${index}`}
                            href={`/watch/${filmSlug}/${
                              episode.slug
                            }?server=${slugify(server.server_name)}`}
                          >
                            {episode.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              <div>
                <div className="flex space-x-2 font-semibold text-xl text-yellow-500 mt-5">
                  <h1>{film?.data.movie.name}</h1>
                  <span>-</span>
                  <h1>{filmEpisode?.data.name}</h1>
                </div>
                <div className="mt-5">
                  <h1 className="text-xl font-semibold text-yellow-500">
                    Nội Dung Phim
                  </h1>
                  <p className="mt-2 text-md text-white/75">
                    {film?.data.movie.content}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-5">
                  <span className="text-gray-400 font-bold mr-0.5">
                    Keywords:
                  </span>{" "}
                  <h1 className=" text-nowrap border-2 border-gray-500 px-1 rounded-sm">
                    {film?.data.movie.origin_name}
                  </h1>
                  <h1 className=" text-nowrap border-2 border-gray-500 px-1 rounded-sm">
                    {film?.data.movie.name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-yellow-500">
                Có thể bạn sẽ thích
              </h1>
              <div>
                {filmSuggest !== undefined &&
                  filmSuggest.success === true &&
                  filmSuggest.data.data.items !== null &&
                  filmSuggest.data.data.items.map((item, index) => (
                    <div
                      key={`film-suggest-${index}`}
                      className="my-4 overflow-hidden"
                    >
                      <Link
                        href={`/watch/${item.slug}`}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div className="rounded-md overflow-hidden col-span-1">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${item.poster_url}`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="col-span-2">
                          <h1 className="text-wrap">{item.name}</h1>
                          <h6>{item.year}</h6>
                        </div>
                      </Link>
                    </div>
                  ))}

                <div>
                  {filmEpisode !== undefined &&
                    filmEpisode.success === false && (
                      <h1>Không có thông tin</h1>
                    )}
                </div>
                <div>
                  {filmEpisode?.success === false && (
                    <h1>Không có thông tin</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>{isFilmLoading && <LoaderComponent />}</div>
      <div>
        {!isFilmLoading &&
          film &&
          film.success === false &&
          film.data.status == false && <ErrorMessage />}
      </div>
      <div>{!isFilmLoading && !film && <ErrorMessage />}</div>
    </div>
  );
}

export default WatchFilm;
