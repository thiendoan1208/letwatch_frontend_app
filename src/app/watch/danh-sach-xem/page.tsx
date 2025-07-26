"use client";

import { UserContext } from "@/context/user";
import {
  handleDeleteFilmFromWatchList,
  handleGetFilmFromWatchList,
} from "@/services/personal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import ErrorMessage from "@/app_components/error/ErrorMesage";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import { Button } from "@/components/ui/button";
import { Trash, Wrench } from "lucide-react";
import { cloneDeep } from "lodash";
import { toast } from "sonner";
function WatchListPage() {
  // useRef
  const filmRef = useRef<HTMLDivElement>(null);

  // useContext
  const { user } = useContext(UserContext);

  // useState
  const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false);
  const [deleteItems, setDeleteItems] = useState<string[]>([]);

  // Get all film in watchlist
  const {
    data: filmWatchListData,
    isLoading,
    refetch: isRefetchWatchList,
  } = useQuery({
    queryKey: ["film-in-watchlist", user.id],
    queryFn: async ({ signal }) => {
      if (user.id !== 0) {
        return await handleGetFilmFromWatchList(user.id, signal);
      }
      return null;
    },
  });

  // Delete film from watch list array manage
  const handleDeleteFilms = (movieSlug: string) => {
    const checkExistFilm = deleteItems.some((movie) => movie === movieSlug);

    if (checkExistFilm) {
      const filmDeleteArr = cloneDeep(deleteItems);
      const existfilmIndex = filmDeleteArr.indexOf(movieSlug);
      if (existfilmIndex !== 0) {
        filmDeleteArr.splice(existfilmIndex, existfilmIndex);
        setDeleteItems(filmDeleteArr);
      } else {
        filmDeleteArr.shift();
        setDeleteItems(filmDeleteArr);
      }
    } else {
      setDeleteItems([...deleteItems, movieSlug]);
    }
  };

  // Toggle delete item
  const isCheckBoxFunc = (movieSlug: string, itemIndex: number) => {
    const checkExistFilm = deleteItems.some((movie) => movie === movieSlug);
    if (!checkExistFilm) {
      filmRef.current?.children[itemIndex].classList.add(
        "border-2",
        "border-red-500",
        "rounded-xl",
        "p-1"
      );
    } else {
      filmRef.current?.children[itemIndex].classList.remove(
        "border-2",
        "border-red-500",
        "rounded-xl",
        "p-1"
      );
    }
  };

  // Delete film mutate
  const { mutate: deleteFilmMutate } = useMutation({
    mutationFn: handleDeleteFilmFromWatchList,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        setDeleteItems([]);
        isRefetchWatchList();
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      setDeleteItems([]);
      toast.error(data.message);
    },
  });

  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        <div className="mx-4 lg:mx-16 ">
          <div className="mt-10 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[var(--text-color)]">
              Danh sách xem
            </h1>
            <div className={`${isDeleteActive ? "hidden" : "block"}`}>
              <Button
                onClick={() => {
                  setIsDeleteActive(true);
                }}
                className="bg-[var(--bg-color)] cursor-pointer"
              >
                Chỉnh sửa
                <Wrench />
              </Button>
            </div>

            <div className={`space-x-2 ${isDeleteActive ? "block" : "hidden"}`}>
              <Button
                onClick={() => {
                  setIsDeleteActive(false);
                  setDeleteItems([]);
                  if (filmRef && filmRef.current) {
                    Array.from(filmRef.current.children).forEach((child) => {
                      child.classList.remove(
                        "border-2",
                        "border-red-500",
                        "rounded-xl",
                        "p-1"
                      );
                    });
                  }
                }}
                variant={"outline"}
                className="cursor-pointer text-black "
              >
                Hủy
              </Button>
              <Button
                className="bg-red-500 cursor-pointer"
                onClick={() => {
                  deleteFilmMutate({
                    userID: user.id,
                    filmDeleteList: deleteItems,
                  });
                }}
              >
                Xóa
                <Trash />
              </Button>
            </div>
          </div>
          <div className="mr-2 sm:mr-3 md:mr-0">
            {filmWatchListData &&
            filmWatchListData.data &&
            filmWatchListData.success === true &&
            isLoading === false ? (
              <div>
                <div
                  ref={filmRef}
                  className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-4 mt-4"
                >
                  {filmWatchListData &&
                    filmWatchListData.data &&
                    filmWatchListData.data !== null &&
                    filmWatchListData.data.length > 0 &&
                    filmWatchListData.data.map((film, index: number) => (
                      <div
                        onClick={() => {
                          if (isDeleteActive) {
                            handleDeleteFilms(film.movieSlug);
                            isCheckBoxFunc(film.movieSlug, index);
                          } else {
                            return;
                          }
                        }}
                        key={`new-films-${index}`}
                        className="select-none -mr-2.5 md:mr-0"
                      >
                        <div className="group relative flex flex-col h-full justify-between">
                          <div className=" rounded-xl h-full overflow-hidden">
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
                              className={`absolute w-full h-full top-0 rounded-xl text-transparent select-none ${
                                isDeleteActive ? "hidden" : "block"
                              }`}
                            >
                              {film.movieTitle}
                            </Link>
                            <Trash
                              className={`absolute top-2 right-2 text-red-400 ${
                                isDeleteActive ? "block" : "hidden"
                              }`}
                            />
                          </div>
                          <div className="flex flex-col flex-nowrap cursor-default ">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <h6 className=" group-hover:text-[var(--text-color)] cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                  {film.movieTitle}
                                </h6>
                              </HoverCardTrigger>
                              <HoverCardContent className="bg-white text-black text-sm px-2 rounded-xl">
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
                          Chưa có phim gì trong danh sách.
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
