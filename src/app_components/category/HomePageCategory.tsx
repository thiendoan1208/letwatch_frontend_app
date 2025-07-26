"use client";

import { ChevronRight, MoveUp } from "lucide-react";
import Link from "next/link";

import { useQueries } from "@tanstack/react-query";
import { getFilmListByCategory, getNewFilmList } from "@/services/film";
import LoaderComponent from "@/app_components/loader/loaderComponent";
import FilmListCarousel from "@/app_components/carousel/FilmListCarousel";
import FilmTypeCarousel from "@/app_components/carousel/FilmTypeCarousel";
import { useEffect, useState } from "react";

const MAX_PAGE = 1000;
const MIN_PAGE = 1;
const PAGE_LIMIT = "10";

function HomePageCategory() {
  // useState
  const [randomNumber, setRandomNumber] = useState<number>(10);

  // Get all necessary film list to display
  const results = useQueries({
    queries: [
      {
        queryKey: ["new-film-list", 1],
        queryFn: ({ signal }) => getNewFilmList(1, PAGE_LIMIT, signal),
      },
      {
        queryKey: ["film-list-by-type-phim-bo", 1],
        queryFn: ({ signal }) => getFilmListByCategory("phim-bo", 1, signal),
      },
      {
        queryKey: ["film-list-by-type-phim-le", 1],
        queryFn: ({ signal }) => getFilmListByCategory("phim-le", 1, signal),
      },
      {
        queryKey: ["film-list-by-type-phim-long-tieng", 1],
        queryFn: ({ signal }) =>
          getFilmListByCategory("phim-long-tieng", 1, signal),
      },
      {
        queryKey: ["film-list-by-type-phim-thuyet-minh", 1],
        queryFn: ({ signal }) =>
          getFilmListByCategory("phim-thuyet-minh", 1, signal),
      },
      {
        queryKey: ["random-film-list", randomNumber],
        queryFn: ({ signal }) => {
          if (randomNumber) {
            return getNewFilmList(randomNumber, PAGE_LIMIT, signal);
          }
        },
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  // Queries data
  const [
    newFilmList,
    filmListByTypePhimBo,
    filmListByTypePhimLe,
    filmListByTypePhimLongTieng,
    filmListByTypePhimThuyetMinh,
    randomFilmList,
  ] = results;

  // Film sections
  const filmSections = [
    {
      title: "Phim Lẻ",
      result: filmListByTypePhimLe,
      slug: "phim-le",
    },
    {
      title: "Phim Bộ",
      result: filmListByTypePhimBo,
      slug: "phim-bo",
    },
    {
      title: "Phim Lồng Tiếng",
      result: filmListByTypePhimLongTieng,
      slug: "phim-long-tieng",
    },
    {
      title: "Phim Thuyết Minh",
      result: filmListByTypePhimThuyetMinh,
      slug: "phim-thuyet-minh",
    },
  ];

  // Get random film page
  const randomFilmPage = () => {
    const number = Math.floor(
      Math.random() * (MAX_PAGE - MIN_PAGE + 1) + MIN_PAGE
    );
    setRandomNumber(number);
  };

  useEffect(() => {
    randomFilmPage();
  }, []);

  return (
    <div
      className="bg-gray-600 min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 4%, 10%, 1) 0%, hsla(0, 4%, 14%, 1) 54%, hsla(0, 1%, 20%, 1) 100%)",
      }}
    >
      {/* New Release*/}
      <div className="ml-4 lg:ml-16">
        <div className="pt-14 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href={`/watch/phim-moi`} className="text-2xl font-bold">
                Mới Cập Nhật
              </Link>
              <div className="bg-black/45 px-3 py-1 rounded-sm text-[var(--text-color)]">
                <h1>HOT</h1>
              </div>
              <Link href={`/watch/phim-moi`}>
                <ChevronRight className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {newFilmList.isPending ? (
          <LoaderComponent />
        ) : (
          <div className="relative overflow-hidden group transition-all">
            {newFilmList &&
            newFilmList.data &&
            newFilmList.data.success &&
            newFilmList.data.data.items !== null &&
            newFilmList.data.data.items.length > 0 &&
            newFilmList.data.data.items.length !== null &&
            newFilmList.isPending === false ? (
              <FilmListCarousel
                noti="normal"
                episode={true}
                data={newFilmList?.data}
              />
            ) : (
              <div>
                <h1 className="text-white">
                  Không thể lấy dữ liệu danh sách phim
                </h1>
              </div>
            )}
          </div>
        )}
      </div>

      {filmSections.map((section, index) => (
        <div key={`film-section-${index}`} className="ml-4 lg:ml-16">
          <div className="pt-10 pb-6">
            <div className="flex flex-col items-start gap-5 overflow-hidden ">
              <div className="text-white flex items-center gap-2">
                <Link
                  href={`/watch/kham-pha/${section.slug}`}
                  className="text-2xl font-bold"
                >
                  {section.title}
                </Link>
                <Link href={`/watch/kham-pha/${section.slug}`}>
                  <ChevronRight className="size-8" />
                </Link>
              </div>
            </div>
          </div>

          {section.result.isPending ? (
            <LoaderComponent />
          ) : (
            <div className=" relative overflow-hidden group transition-all">
              {section.result !== undefined &&
              section.result.data &&
              section.result.data?.success &&
              section.result.data.data.data.items !== null &&
              section.result.data.data.data.items.length > 0 &&
              section.result.isPending === false ? (
                <FilmTypeCarousel
                  data={section.result?.data}
                  filmTypeSlug={section.slug}
                />
              ) : (
                <div>
                  <h1 className="text-white">
                    Không thể lấy dữ liệu danh sách phim
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Phim Random */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-14 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <h1 className="text-2xl font-bold">Phim Ngẫu Nhiên</h1>
            </div>
          </div>
        </div>

        {randomFilmList.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {randomFilmList &&
            randomFilmList.data &&
            randomFilmList.data.data.items !== null &&
            randomFilmList.data.data.items.length > 0 &&
            randomFilmList.isPending === false ? (
              <FilmListCarousel
                noti={"random"}
                episode={false}
                data={randomFilmList?.data}
              />
            ) : (
              <div>
                <h1 className="text-white">
                  Không thể lấy dữ liệu danh sách phim
                </h1>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-10 flex items-center justify-center">
        <Link
          href="/watch/trang-chu"
          className="text-white text-lg font-normal flex items-center"
        >
          <h1>Quay lại đầu trang</h1>
          <MoveUp />
        </Link>
      </div>
    </div>
  );
}

export default HomePageCategory;
