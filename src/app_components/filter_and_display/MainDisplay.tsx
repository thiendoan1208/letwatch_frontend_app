"use client";

import { getNewFilmList } from "@/services/film";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import NoFilm from "@/app_components/error/NoFilm";
import ErrorMessage from "@/app_components/error/ErrorMesage";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_LIMIT = "24";

function MainDisplay() {
  // useState
  const [page, setPage] = React.useState(1);

  // Get all film list
  const {
    data: filmList,
    isPending: isFilmListLoading,
    isFetching,
  } = useQuery({
    queryKey: ["film-list", page],
    queryFn: async ({ signal }) => {
      return getNewFilmList(page, PAGE_LIMIT, signal);
    },
  });

  // Paginate
  const handlePagination = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };

  return (
    <div>
      {/* Display Result */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold text-[var(--text-color)]">
          Phim mới
        </h1>
      </div>
      <div className="mr-2 sm:mr-3 md:mr-0">
        {filmList &&
        filmList.data &&
        filmList.success === true &&
        isFilmListLoading === false &&
        isFetching === false ? (
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-4 mt-4">
              {filmList &&
                filmList.data &&
                filmList.data.items !== null &&
                filmList.data.items.length > 0 &&
                filmList.data.items.map((film, index: number) => (
                  <div
                    key={`new-films-${index}`}
                    className="select-none -mr-2.5 md:mr-0"
                  >
                    <div className=" group relative flex flex-col h-full justify-between">
                      <div className=" rounded-xl h-full overflow-hidden ">
                        <Image
                          className="object-cover object-center w-full h-full"
                          src={`${film.poster_url}`}
                          alt={film.slug}
                          width={100}
                          height={100}
                          priority
                        />
                        <Link
                          href={`watch/${film.slug}`}
                          className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                        >
                          {film.name}
                        </Link>
                      </div>
                      <div className="flex flex-col flex-nowrap cursor-default ">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <h6 className=" group-hover:text-[var(--text-color)] cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                              {film.name}
                            </h6>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white text-sm px-2 rounded-xl">
                            <div>{film.name}</div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-white/75 group-hover:text-[var(--text-color)]">
                          {film.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              {filmList &&
                filmList.success === true &&
                filmList.data &&
                filmList.data.items == null && (
                  <div>
                    <NoFilm />
                  </div>
                )}
            </div>
          </div>
        ) : (
          <>
            {" "}
            {isFilmListLoading === false && filmList?.success === false && (
              <ErrorMessage />
            )}
          </>
        )}
        <div>
          {(isFetching === true || isFilmListLoading === true) && (
            <LoaderComponent />
          )}
        </div>
      </div>

      {/* Pagination */}
      {filmList &&
        filmList.success === true &&
        filmList?.data.items !== null &&
        filmList?.data.items.length > 0 &&
        isFilmListLoading === false &&
        isFetching === false && (
          <div className="flex items-center justify-center py-20 px-2">
            <ReactPaginate
              forcePage={page - 1}
              className=" max-w-screen overflow-hidden px-4 flex-wrap flex items-center justify-center gap-4 md:gap-7  cursor-pointer select-none"
              pageClassName="px-2"
              activeClassName="px-2 text-yellow-400 border-2 rounded bg-white font-semibold"
              previousClassName="text-2xl"
              nextClassName="text-2xl"
              breakLabel="..."
              previousLabel={<ChevronLeft />}
              nextLabel={<ChevronRight />}
              onPageChange={handlePagination}
              pageRangeDisplayed={1}
              pageCount={
                filmList && filmList.data
                  ? filmList?.data.pagination.totalPages
                  : 1
              }
              renderOnZeroPageCount={null}
            />
          </div>
        )}
    </div>
  );
}

export default MainDisplay;
