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

function HomePageCategory() {
  const [randomNumber, setRandomNumber] = useState<number>(10);

  const results = useQueries({
    queries: [
      {
        queryKey: ["new-film-list", 1],
        queryFn: async () => {
          return await getNewFilmList(1);
        },
      },
      {
        queryKey: ["film-list-by-type-phim-bo", 1],
        queryFn: async () => {
          return await getFilmListByCategory("phim-bo", 1);
        },
      },
      {
        queryKey: ["film-list-by-type-phim-le", 1],
        queryFn: async () => {
          return await getFilmListByCategory("phim-le", 1);
        },
      },
      {
        queryKey: ["film-list-by-type-phim-long-tieng", 1],
        queryFn: async () => {
          return await getFilmListByCategory("phim-long-tieng", 1);
        },
      },
      {
        queryKey: ["film-list-by-type-phim-thuyet-minh", 1],
        queryFn: async () => {
          return await getFilmListByCategory("phim-thuyet-minh", 1);
        },
      },
      {
        queryKey: ["random-film-list", randomNumber],
        queryFn: async () => {
          if (randomNumber) {
            return await getNewFilmList(randomNumber);
          }
        },
      },
    ],
  });

  const [
    newFilmList,
    filmListByTypePhimBo,
    filmListByTypePhimLe,
    filmListByTypePhimLongTieng,
    filmListByTypePhimThuyetMinh,
    randomFilmList,
  ] = results;

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
              <Link href="" className="text-2xl font-bold">
                Mới Phát Hành
              </Link>
              <div className="bg-black/45 px-3 py-1 rounded-sm text-yellow-500">
                <h1>HOT</h1>
              </div>
              <Link href="">
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
            newFilmList.data.data.items.length > 0 &&
            newFilmList.data.data.items.length !== null &&
            newFilmList.isPending === false ? (
              <FilmListCarousel noti="normal" data={newFilmList?.data} />
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

      {/* Phim le */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-10 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href="" className="text-2xl font-bold">
                Phim Lẻ
              </Link>
              <Link href="">
                <ChevronRight className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {filmListByTypePhimLe.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {filmListByTypePhimLe !== undefined &&
            filmListByTypePhimLe.data &&
            filmListByTypePhimLe.data?.success &&
            filmListByTypePhimLe.data.data.data.items.length > 0 &&
            filmListByTypePhimLe.data.data.data.items.length !== null &&
            filmListByTypePhimLe.isPending === false ? (
              <FilmTypeCarousel data={filmListByTypePhimLe?.data} />
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

      {/* Phim bo */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-10 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href="" className="text-2xl font-bold">
                Phim Bộ
              </Link>
              <Link href="">
                <ChevronRight className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {filmListByTypePhimBo.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {filmListByTypePhimBo !== undefined &&
            filmListByTypePhimBo.data &&
            filmListByTypePhimBo.data.data.data.items.length > 0 &&
            filmListByTypePhimBo.data.data.data.items.length !== null &&
            filmListByTypePhimBo.isPending === false ? (
              <FilmTypeCarousel data={filmListByTypePhimBo?.data} />
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

      {/* Phim Long tieng */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-10 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href="" className="text-2xl font-bold">
                Phim Lồng Tiếng
              </Link>
              <Link href="">
                <ChevronRight className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {filmListByTypePhimLongTieng.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {filmListByTypePhimLongTieng !== undefined &&
            filmListByTypePhimLongTieng.data &&
            filmListByTypePhimLongTieng.data.data.data.items.length > 0 &&
            filmListByTypePhimLongTieng.data.data.data.items.length !== null &&
            filmListByTypePhimLongTieng.isPending === false ? (
              <FilmTypeCarousel data={filmListByTypePhimLongTieng?.data} />
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

      {/* Phim Thuyet Minh */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-10 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href="" className="text-2xl font-bold">
                Phim Thuyết Minh
              </Link>
              <Link href="">
                <ChevronRight className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {filmListByTypePhimThuyetMinh.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {filmListByTypePhimThuyetMinh !== undefined &&
            filmListByTypePhimThuyetMinh.data &&
            filmListByTypePhimThuyetMinh.data.data.data.items.length > 0 &&
            filmListByTypePhimThuyetMinh.data.data.data.items.length !== null &&
            filmListByTypePhimThuyetMinh.isPending === false ? (
              <FilmTypeCarousel data={filmListByTypePhimThuyetMinh?.data} />
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

      {/* Phim Random */}
      <div className="ml-4 lg:ml-16">
        <div className="pt-14 pb-6">
          <div className="flex flex-col items-start gap-5 overflow-hidden ">
            <div className="text-white flex items-center gap-2">
              <Link href="" className="text-2xl font-bold">
                Phim Ngẫu Nhiên
              </Link>
            </div>
          </div>
        </div>

        {randomFilmList.isPending ? (
          <LoaderComponent />
        ) : (
          <div className=" relative overflow-hidden group transition-all">
            {randomFilmList &&
            randomFilmList.data &&
            randomFilmList.data.data.items.length > 0 &&
            randomFilmList.data.data.items.length !== null &&
            randomFilmList.isPending === false ? (
              <FilmListCarousel noti={"random"} data={randomFilmList?.data} />
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
          href="/watch/home"
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
