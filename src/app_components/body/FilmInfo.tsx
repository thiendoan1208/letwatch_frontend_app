"use client";

import ErrorMessage from "@/app_components/error/ErrorMesage";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import { UserContext } from "@/context/user";
import { getFilmInfo } from "@/services/film";
import { handleAddFilmToWatchist } from "@/services/personal";
import { FilmInfoData } from "@/types/fim_info_type";

import { WatchItemInfo } from "@/types/personal_type";
import slugify from "@/utils/modifyText";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function FilmInfo() {
  const pathname = usePathname();
  const pathSplit = pathname.split("/");
  const filmSlug = pathSplit[pathSplit.length - 1];

  const { user } = useContext(UserContext);

  const [isLineClamp, setIsLineClamp] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [mainColor, setMainColor] = useState("");

  const { data: film, isPending: isFilmLoading } = useQuery({
    queryKey: ["film-info", filmSlug],
    queryFn: async () => {
      return await getFilmInfo(filmSlug);
    },
    staleTime: 60 * 60 * 1000,
  });

  // Show more, show less
  const contentRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    getMainColor();

    const observer = new ResizeObserver(() => {
      const el = contentRef.current;
      if (el && el.clientHeight < el.scrollHeight) {
        setIsExpand(true);
      }
    });

    if (contentRef && contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [film?.data.movie.content]);

  const displayContent = () => {
    if (
      contentRef.current &&
      contentRef.current?.clientHeight < contentRef.current?.scrollHeight
    ) {
      setIsLineClamp(true);
    } else {
      setIsLineClamp(false);
    }
  };

  // copy clipboard
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Sao chép URL thành công!");
    } catch (err) {
      console.error("Lỗi khi sao chép: ", err);
      toast.error("Có lỗi, không thể sao chép URL");
    }
  }

  // Background-color
  const getMainColor = () => {
    if (film && film.success && film.pallete !== null) {
      // Vibrant
      const theme = film.pallete.DarkVibrant;

      const rgb = theme.rgb.map((color) => {
        return color;
      });
      const toString = String(rgb);
      setMainColor(toString);
    } else {
      setMainColor("");
    }
  };

  // Add film to watchlist
  const { mutate: addToWatchListMutate } = useMutation({
    mutationFn: handleAddFilmToWatchist,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const addFilmToWatchList = (film: FilmInfoData) => {
    if (film && film.data.movie) {
      const filmWatchList: WatchItemInfo = {
        userID: user.id,
        movieID: film.data.movie._id,
        movieTitle: film.data.movie.name,
        movieSlug: film.data.movie.slug,
        moviePoster: film.data.movie.poster_url,
      };

      addToWatchListMutate(filmWatchList);
    } else {
      toast.error("Không thể thêm phim vào danh sách xem.");
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          backgroundColor: `${
            isFilmLoading ? "black" : ` rgba(${mainColor}, .1) `
          }`,
        }}
        className={`absolute inset-0 transition-colors duration-1000 pointer-events-none`}
      ></div>
      <div
        className={`min-h-screen`}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${mainColor}, .9) , rgba(${mainColor}, .7)), url(${film?.data.movie.thumb_url})`,
          backgroundPosition: `center`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="pt-20 text-white">
          {!isFilmLoading &&
          film &&
          film.success === true &&
          film.data.status === true ? (
            <div className="mx-4 lg:mx-16 mt-4 pb-10">
              {/* Film Poster and info grid */}
              {film && film.success === true && film.data && (
                <div className=" flex flex-col md:grid md:grid-cols-5">
                  <div className="col-span-1">
                    <div className="flex justify-center md:block md:w-full">
                      <Image
                        className="w-1/2 md:w-full object-center object-cover rounded-2xl overflow-hidden"
                        src={film.data.movie.poster_url}
                        alt={film.data.movie.slug}
                        width={1200}
                        height={600}
                        priority
                      />
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/watch/${filmSlug}/${
                          film.data.episodes[0].server_data[0].slug
                        }?server=${slugify(film.data.episodes[0].server_name)}`}
                        className="flex gap-2 bg-white text-black py-2 justify-center rounded-full cursor-pointer"
                      >
                        <Play className="size-6" />
                        <p className="font-bold">Xem Phim</p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4 ml-1 md:ml-15 mt-6 md:mt-0">
                    <div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className=" text-2xl md:text-3xl font-bold tracking-wide">
                            {film.data.movie.name}
                          </h1>

                          <Bookmark
                            onClick={() => {
                              addFilmToWatchList(film);
                            }}
                            className="size-7 cursor-pointer ml-1 text-yellow-500"
                          />
                          {/* toast lên, nếu có save r khi ấn lại sẽ thông báo đã save */}

                          <ExternalLink
                            className="size-7 cursor-pointer mx-1 text-blue-500"
                            onClick={() => {
                              copyTextToClipboard(
                                `${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/watch/${filmSlug}`
                              );
                            }}
                          />
                        </div>
                        <h6 className="text-white tracking-wide italic font-semibold mt-1">
                          {film.data.movie.origin_name}
                        </h6>
                        <div className="flex items-center mt-1 flex-wrap gap-1">
                          <p className="font-bold text-[14px] text-white/75 mr-2">
                            {film.data.movie.year}
                          </p>
                          {film.data.movie.category.map((category, index) => {
                            if (index < film.data.movie.category.length - 1) {
                              return (
                                <div key={`category-${index}`}>
                                  <Link
                                    className="font-bold text-[16px] md:text-[14px] text-white/75 hover:underline"
                                    href={`/watch/kham-pha/the-loai/${category.slug}`}
                                  >
                                    {category.name}
                                  </Link>
                                  <span>,</span>
                                </div>
                              );
                            } else {
                              return (
                                <div key={`category-${index}`}>
                                  <Link
                                    className="font-bold text-[14px] text-white/75 hover:underline"
                                    href={`/watch/kham-pha/the-loai/${category.slug}`}
                                  >
                                    {category.name}
                                  </Link>
                                  <span></span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>

                      <div>
                        <h1 className="mt-2 font-semibold">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Trạng thái:
                          </span>{" "}
                          {film.data.movie.episode_current}
                        </h1>
                        <h1 className="mt-2 font-semibold">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Thời lượng:
                          </span>{" "}
                          {film.data.movie.time}
                        </h1>
                        <h1 className="mt-2 font-semibold">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Số tập:
                          </span>{" "}
                          {film.data.movie.episode_total}
                        </h1>
                        <h1 className="mt-2 font-semibold">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Tình trạng:
                          </span>{" "}
                          {`${film.data.movie.status
                            .charAt(0)
                            .toUpperCase()}${film.data.movie.status.slice(1)}`}
                        </h1>
                        <h1 className="mt-2 font-semibold">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Đạo diễn:
                          </span>{" "}
                          {film.data.movie.director}
                        </h1>
                        <div className="flex mt-2 font-semibold flex-wrap">
                          <span className="text-gray-400 font-bold mr-0.5 text-nowrap">
                            Diễn viên:
                          </span>{" "}
                          <div className="flex gap-1 flex-wrap">
                            {film.data.movie.actor.map((person, index) =>
                              index < film.data.movie.actor.length - 1 ? (
                                <div key={`actor-${index}`} className="flex">
                                  <h1 className="text-nowrap">{person}</h1>
                                  <span>,</span>
                                </div>
                              ) : (
                                <h1 key={`actor-${index}`}>{person}</h1>
                              )
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Nội dung phim:
                          </span>{" "}
                          <p
                            ref={contentRef}
                            className={` ${
                              isLineClamp ? "line-clamp-none" : "line-clamp-3"
                            }`}
                          >
                            {film.data.movie.content}
                          </p>
                          {isExpand && (
                            <h1
                              className="cursor-pointer text-yellow-500 w-fit"
                              onClick={() => {
                                displayContent();
                              }}
                            >
                              {isLineClamp ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-lg">Rút gọn</span>
                                  <ChevronUp />
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-md">
                                  <span className="text-lg">Đọc thêm</span>
                                  <ChevronDown />
                                </div>
                              )}
                            </h1>
                          )}
                        </div>

                        <div className="flex gap-2 flex-wrap mt-2">
                          <span className="text-gray-400 font-bold mr-0.5">
                            Keywords:
                          </span>{" "}
                          <h1 className=" text-nowrap border-2 border-gray-500 px-1 rounded-sm">
                            {film.data.movie.origin_name}
                          </h1>
                          <h1 className=" text-nowrap border-2 border-gray-500 px-1 rounded-sm">
                            {film.data.movie.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>{isFilmLoading && <LoaderComponent />}</>
          )}
        </div>
        {/* Handle Error  */}
        {isFilmLoading === false && film && film.data.status === false && (
          <div className="fixed w-full">
            <ErrorMessage />
          </div>
        )}
        {isFilmLoading === false && !film && <ErrorMessage />}
      </div>
    </div>
  );
}

export default FilmInfo;
