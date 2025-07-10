"use client";

import VideoJS from "@/app_components/video/VideoJS/VideoJS";
import { getFilmEpisode, getFilmInfo } from "@/services/film";
import slugify from "@/utils/modifyText";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Player from "video.js/dist/types/player";

function WatchFilm() {
  const pathname = usePathname();
  const server = useSearchParams().get("server");
  const pathSplit = pathname.split("/");
  const filmSlug = pathSplit[pathSplit.length - 2];
  const episodeSlug = pathSplit[pathSplit.length - 1];

  const { data: film, isPending: isFilmLoading } = useQuery({
    queryKey: ["film-info", filmSlug],
    queryFn: async () => {
      return await getFilmInfo(filmSlug);
    },
    staleTime: 60 * 60 * 1000,
  });

  const { data: filmEpisode } = useQuery({
    queryKey: ["film-episode", episodeSlug, server],
    queryFn: async () => {
      return await getFilmEpisode(filmSlug, episodeSlug, server);
    },
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
      <div className="flex items-center justify-center">
        {!isFilmLoading &&
          film &&
          film.success === true &&
          film.data &&
          film.data.episodes &&
          film.data.status === true && (
            <div className="w-[70%] ">
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
      <div className="pb-10 mt-20">
        <h1 className="text-2xl font-semibold text-yellow-500">Tập Phim</h1>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
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

                  <div className="grid grid-cols-8 max-h-[300px] gap-3 overflow-auto overflow-x-hidden">
                    {server.server_data.map((episode, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center w-full"
                      >
                        <Link
                          className="w-full text-center px-2 py-1  text-black border-2 rounded bg-white  text-nowrap"
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
          </div>

          <div>
            <h1>Có thể bạn sẽ thích</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchFilm;
