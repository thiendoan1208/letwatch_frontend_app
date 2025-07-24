/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filmLang } from "@/config_film/film_type_config";
import { useQuery } from "@tanstack/react-query";
import { getFilmCountry, getFilmListSortByType } from "@/services/film";
import { sortDescAsc } from "@/config_film/film_sort_config";
import { fullYearFilm } from "@/config_film/fim_year_config";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { FilmListType } from "@/types/film_type";
import ErrorMessage from "@/app_components/error/ErrorMesage";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import NoFilm from "@/app_components/error/NoFilm";
import ReactPaginate from "react-paginate";
import { cloneDeep } from "lodash";

const PAGE_LIMIT = "24";

function FilmListTypeFilterAndDisplay() {
  // URL, pathname, params manage
  const pathname = usePathname();
  const path = pathname.split("/");
  const [page, setPage] = React.useState(1);

  // useState
  const [pagePathName] = React.useState(path[path.length - 1]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [filmListData, setFilmListData] = React.useState<FilmListType | null>(
    null
  );

  const [sortPhimList, setSortFilmList] = React.useState({
    page: 1,
    sort_type: "",
    sort_lang: "",
    category: "",
    country: "",
    year: "",
    limit: PAGE_LIMIT,
  });

  const [saveSortFilmList, setSaveSortFilmList] = React.useState({
    page: 1,
    sort_type: "",
    sort_lang: "",
    category: "",
    country: "",
    year: "",
    limit: PAGE_LIMIT,
  });

  // Get all film countries
  const { data: filmCountry } = useQuery({
    queryKey: ["film-countries"],
    queryFn: async ({ signal }) => await getFilmCountry(signal),
    staleTime: 60 * 60 * 1000,
  });

  // Input sort field change
  const handleSortChange = (value: string) => {
    setSortFilmList({
      ...sortPhimList,
      sort_type: value,
    });
  };
  const handleLangChange = (value: string) => {
    setSortFilmList({
      ...sortPhimList,
      sort_lang: value,
    });
  };
  const handleCountryChange = (value: string) => {
    setSortFilmList({
      ...sortPhimList,
      country: value,
    });
  };

  const handleYearChange = (value: string) => {
    setSortFilmList({
      ...sortPhimList,
      year: value,
    });
  };

  // Refetch page when paginate
  React.useEffect(() => {
    submitPaginationInfo();
  }, [page]);

  // Submit sort info
  const submitSortInfo = async () => {
    try {
      setIsLoading(true);
      setSaveSortFilmList(sortPhimList);
      setPage(1);
      const data = await getFilmListSortByType(pagePathName, {
        ...sortPhimList,
        page: 1,
      });
      setFilmListData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // Get all film page
  const submitPaginationInfo = async () => {
    try {
      setIsLoading(true);
      const data = await getFilmListSortByType(pagePathName, saveSortFilmList);
      setFilmListData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // Paginate film page
  const handlePagination = (e: { selected: number }) => {
    const cloneArr = cloneDeep(saveSortFilmList);
    cloneArr.page = e.selected + 1;
    setSaveSortFilmList(cloneArr);
    setPage(e.selected + 1);
  };

  return (
    <div>
      {/* Filter result */}
      <div>
        <Collapsible open={true} className="flex flex-col gap-2 transition-all">
          <div>
            <CollapsibleTrigger asChild>
              <div className="w-fit flex items-center text-md gap-2 select-none">
                <h4 className="font-semibold">Lọc Phim</h4>
                <ChevronsDown />
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className=" grid grid-cols-2 lg:grid-cols-3 xl:flex xl:items-center  gap-3">
              {/* Sort desc asc */}
              <div>
                <Select
                  value={sortPhimList.sort_type}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-full xl:w-[180px] cursor-pointer">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {sortDescAsc.map((item, index) => (
                        <SelectItem
                          key={`type-${index}`}
                          value={item.type}
                          className="hover:bg-blue-600"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Phim type*/}
              <div>
                <Select
                  value={sortPhimList.sort_lang}
                  onValueChange={handleLangChange}
                >
                  <SelectTrigger className=" w-full xl:w-[180px] cursor-pointer">
                    <SelectValue placeholder="Loại Phim" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {filmLang.map((item, index) => (
                        <SelectItem
                          key={`type-${index}`}
                          value={item.slug}
                          className="hover:bg-blue-600"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div>
                <Select
                  value={sortPhimList.country}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger className=" w-full xl:w-[180px] cursor-pointer">
                    <SelectValue placeholder="Quốc gia" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value="no">Quốc Gia</SelectItem>
                      {filmCountry &&
                        filmCountry.success === true &&
                        filmCountry.data.map((type, index: number) => (
                          <SelectItem
                            key={`phim-country-${index}`}
                            value={type.slug}
                          >
                            {type.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Years */}
              <div>
                <Select
                  value={sortPhimList.year}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className=" w-full xl:w-[180px] cursor-pointer">
                    <SelectValue placeholder="Năm" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value="no">Năm</SelectItem>
                      {fullYearFilm &&
                        fullYearFilm.map((item, index: number) => (
                          <SelectItem
                            key={`phim-country-${index}`}
                            value={String(item)}
                          >
                            {item}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  onClick={submitSortInfo}
                  className="bg-yellow-500 cursor-pointer"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Display Result */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold text-yellow-500">
          Tổng hợp phim thuộc thể loại {filmListData?.data.data.titlePage}
        </h1>
      </div>
      <div className="mr-2 sm:mr-3 md:mr-0">
        {filmListData &&
        filmListData.data &&
        filmListData.success === true &&
        isLoading === false ? (
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-4 mt-4">
              {filmListData &&
                filmListData.data &&
                filmListData.data.data.items !== null &&
                filmListData.data.data.items.length > 0 &&
                filmListData.data.data.items.map((film, index: number) => (
                  <div
                    key={`new-films-${index}`}
                    className="select-none -mr-2.5 md:mr-0"
                  >
                    <div className=" group relative flex flex-col h-full justify-between">
                      <div className=" rounded-xl h-full overflow-hidden ">
                        <Image
                          className="object-cover object-center w-full h-full"
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${film.poster_url}`}
                          alt={film.slug}
                          width={100}
                          height={100}
                          priority
                        />
                        <Link
                          href={`/watch/${film.slug}`}
                          className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                        >
                          {film.name}
                        </Link>
                      </div>
                      <div className="flex flex-col flex-nowrap cursor-default ">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <h6 className=" group-hover:text-yellow-500 cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                              {film.name}
                            </h6>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-white text-sm px-2 rounded-xl">
                            <div>{film.name}</div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-white/75 group-hover:text-yellow-500">
                          {film.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              {filmListData &&
                filmListData.data &&
                filmListData.data.data.items == null && (
                  <div>
                    <NoFilm />
                  </div>
                )}
            </div>
          </div>
        ) : (
          <>
            {" "}
            {isLoading === false && filmListData?.success === false && (
              <ErrorMessage />
            )}
          </>
        )}
        <div>{isLoading === true && <LoaderComponent />}</div>
      </div>

      {/* Pagination */}
      {filmListData &&
        filmListData.success === true &&
        filmListData?.data.data.items !== null &&
        filmListData?.data.data.items.length > 0 &&
        isLoading === false && (
          <div className="flex items-center justify-center py-20 px-2">
            <ReactPaginate
              forcePage={page - 1}
              className=" max-w-screen overflow-hidden flex-wrap px-4 flex items-center justify-center gap-4 md:gap-7  cursor-pointer select-none"
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
                filmListData && filmListData.data
                  ? filmListData?.data.data.params.pagination.totalPages
                  : 1
              }
              renderOnZeroPageCount={null}
            />
          </div>
        )}
    </div>
  );
}

export default FilmListTypeFilterAndDisplay;
