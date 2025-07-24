"use client";

import { getNewFilmList } from "@/services/film";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PAGE_LIMIT = "24";

function LandingPageSlider() {
  // Get new films
  const {
    data: filmList,
    error: filmListError,
    isFetching: isFilmListLoading,
  } = useQuery({
    queryKey: ["new-film-list", 1],
    queryFn: async () => {
      return getFiveFilmsOnly();
    },
  });

  const getFiveFilmsOnly = async () => {
    try {
      const data = await getNewFilmList(1, PAGE_LIMIT);
      const slicelist = data.data.items.slice(0, 6);
      if (data && data.success === true && data.data.items.length > 0) {
        return slicelist;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center select-none">
      {!isFilmListLoading && (
        <div
          className="w-full lg:w-[90%] xl:w-[75%] bg-cover bg-center px-12 pt-10 pb-4 rounded-none lg:rounded-3xl object-cover object-center"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f43f5e, transparent), url("/slider_image_landing_page.png")',
          }}
        >
          <div className="space-y-2">
            <h1 className="text-[48px] font-bold text-white">
              Hôm nay xem gì.
            </h1>
            <h2 className="text-white font-medium">
              Xem thử một chút nhé! Hàng ngàn phim miễn phí đang chờ bạn khám
              phá.
            </h2>
            <div className=" flex items-center justify-left mt-6">
              <div className=" flex items-center justify-center flex-nowrap w-[168px] h-[48px] bg-white  rounded-3xl text-xl font-semibold cursor-pointer hover:scale-95 shadow-black/20 shadow-xl hover:shadow-none transition-all ">
                <Link className="px-10 py-4" href="/watch/trang-chu">
                  Chi tiết
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {filmList &&
              filmList.length > 0 &&
              filmList.map((film, index) => (
                <div
                  key={`${film._id}-${index}`}
                  className="relative flex flex-col h-full justify-between"
                >
                  <div className=" rounded-xl h-full overflow-hidden">
                    <Image
                      className="object-cover object-center w-full h-full  cursor-pointer"
                      src={film.poster_url}
                      alt={film.name}
                      width={100}
                      height={100}
                      priority={true}
                    />
                    <Link
                      href={`/watch/${film.slug}`}
                      className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                    >
                      {film.name}
                    </Link>
                  </div>
                  <div className="flex flex-col flex-nowrap ">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <h6 className="cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                          {film.name}
                        </h6>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-white text-sm px-2 py-1 rounded-xl">
                        <div>{film.name}</div>
                      </HoverCardContent>
                    </HoverCard>
                    <p className="text-white/75">{film.year}</p>
                  </div>
                </div>
              ))}
          </div>

          {(filmList === undefined || filmList === null) &&
            (filmListError || filmListError === null) && (
              <div>
                <h1 className="text-white text-md">
                  Không thể lấy dữ liệu, vui lòng thử lại sau {`${";("}`}
                </h1>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default LandingPageSlider;
