import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FilmListType } from "@/types/film_type";
import ErrorMessage from "@/app_components/error/ErrorMesage";

function FilmTypeCarousel({ data }: { data: FilmListType }) {
  return (
    <>
      {data && data.success === false && data.data.data.items === null ? (
        <div>
          <ErrorMessage />
        </div>
      ) : (
        <Carousel>
          <CarouselContent className="mr-16">
            {data &&
              data.success &&
              data.data?.data.items !== null &&
              data.data?.data.items.length > 0 &&
              data.data?.data.items.map((film, index) => (
                <CarouselItem
                  key={`new-films-${index}`}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 select-none -mr-2.5 md:mr-0"
                >
                  <div className=" relative flex flex-col h-full justify-between">
                    <div className=" rounded-xl h-full overflow-hidden  hover:border-2 hover:border-white">
                      <Image
                        className="object-cover object-center w-full h-full "
                        src={`https://phimimg.com/${film.poster_url}`}
                        alt={film.slug}
                        width={100}
                        height={100}
                        priority
                      />
                      <Link
                        href={film.slug}
                        className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                      >
                        {film.name}
                      </Link>
                    </div>
                    <div className="flex flex-col flex-nowrap cursor-default">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <h6 className="cursor-pointer mt-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap">
                            {film.name}
                          </h6>
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white text-sm px-2 rounded-xl">
                          <div>{film.name}</div>
                        </HoverCardContent>
                      </HoverCard>
                      <p className="text-white/75">{film.year}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            {data && data.success && (
              <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 select-none -mr-2.5 md:mr-0">
                <div className="relative rounded-xl h-[86%] overflow-hidden bg-black cursor-pointer">
                  <div className="h-full flex flex-col gap-2 items-center justify-center">
                    <LayoutGrid className="size-20 text-white" />
                    <h1 className="text-white text-2xl font-semibold">
                      Xem Thêm
                    </h1>
                  </div>
                  <Link
                    href=""
                    className="absolute w-full h-full top-0 rounded-xl text-transparent select-none"
                  ></Link>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="absolute top-[45%] left-[8%] lg:left-[5%] hidden group-hover:block transition-all">
            <CarouselPrevious className="p-5 shadow-2xl cursor-pointer" />
          </div>
          <div className="absolute top-[45%] right-[8%] lg:right-[5%] hidden group-hover:block transition-all">
            <CarouselNext className="p-5 shadow-2xl cursor-pointer" />
          </div>
        </Carousel>
      )}
    </>
  );
}

export default FilmTypeCarousel;
