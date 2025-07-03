import { Compass, House, ShipWheel, Tv } from "lucide-react";
import Link from "next/link";

function HomePageSubNav() {
  return (
    <div className="fixed lg:hidden bottom-0 z-[999] w-full bg-black border-t-[0.5px] border-white/50 select-none">
      <div className="grid grid-cols-4 gap-1.5 xl:gap-2  my-0.5 text-[16px]">
        <div className=" text-[14px] xl:text-md relative flex flex-col items-center justify-center  text-white/80 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
          {/* active */}
          {/* text-yellow-500 */}

          <House className="size-5" />
          <h2 className="text-nowrap">Trang Chủ</h2>
          <Link
            href="/watch/home"
            className="absolute w-full h-full text-transparent select-none "
          >
            Trang Chủ
          </Link>
        </div>
        <div className=" text-[14px] xl:text-md relative flex items-center flex-col justify-center text-white/80 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
          <Tv className="size-5" />
          <h2 className="text-nowrap">TV Shows</h2>
          <Link
            href="/watch/tv-shows"
            className="absolute w-full h-full text-transparent select-none"
          >
            TV Shows
          </Link>
        </div>
        <div className=" text-[14px] xl:text-md relative flex items-center flex-col justify-center text-white/80 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
          <ShipWheel className="size-5" />
          <h2 className="text-nowrap">Hoạt Hình</h2>
          <Link
            href="/watch/hoat-hinh"
            className="absolute w-full h-full text-transparent select-none "
          >
            Hoạt Hình
          </Link>
        </div>
        <div className="text-[14px] xl:text-md relative flex items-center flex-col justify-center text-white/80 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
          <Compass className="size-5" />
          <h2 className="text-nowrap">Khám phá</h2>
          <Link
            href="/watch/kham-pha"
            className="absolute w-full h-full text-transparent select-none "
          >
            Khám phá
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePageSubNav;
