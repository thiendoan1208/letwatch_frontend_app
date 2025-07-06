"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ClickOutsideElement from "@/utils/click_outside_element";
import { Bookmark, Compass, House, Search, ShipWheel, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function HomePageNav() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const displayInput = () => {
    setIsActive(true);
  };

  const inputRef = ClickOutsideElement(() => {
    setIsActive(false);
  });

  return (
    <div className="fixed min-w-screen flex items-center h-16 bg-black/75 backdrop-blur z-[999] transition-all">
      <div className="relative w-full flex items-center justify-between mx-4 xl:mx-10 pr-4">
        <div className="flex items-center">
          <div className="relative">
            <Link
              href="/watch/home"
              className="absolute text-3xl left-[30px] text-transparent"
            >
              Home
            </Link>
            <Image
              src="/logo_name.png"
              alt="logo name"
              className="min-w-[150px] select-none cursor-pointer"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className="hidden xl:flex items-center bg-white/10 px-5 rounded-2xl ">
            <Search className="text-white size-4" />
            <Input
              className="xl:w-[300px] h-8 rounded-2xl border-none text-white"
              placeholder="Tìm kiếm phim"
            />
          </div>
          <div
            onClick={displayInput}
            className="hidden lg:block xl:hidden py-2 px-2 hover:bg-black/50 transition-all rounded-full cursor-pointer"
          >
            <Search className="text-white size-5" />
          </div>
        </div>
        {/* Options */}
        <div className="hidden lg:block select-none">
          <div className="flex items-center gap-1.5 xl:gap-2 mx-2 text-[16px]">
            <div className="text-[14px] xl:text-md relative border-3 border-white/20 flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
              <House className="size-5" />
              <h2 className="text-nowrap">Trang Chủ</h2>
              <Link
                href="/watch/home"
                className="absolute w-full h-full text-transparent select-none "
              >
                Trang Chủ
              </Link>
            </div>
            <div className=" text-[14px] xl:text-md relative flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
              <Tv className="size-5" />
              <h1 className="text-nowrap">TV Shows</h1>
              <Link
                href="/watch/tv-shows"
                className="absolute w-full h-full text-transparent select-none"
              >
                TV Shows
              </Link>
            </div>
            <div className=" text-[14px] xl:text-md relative flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
              <ShipWheel className="size-5" />
              <h1 className="text-nowrap">Hoạt Hình</h1>
              <Link
                href="/watch/hoat-hinh"
                className="absolute w-full h-full text-transparent select-none "
              >
                Hoạt Hình
              </Link>
            </div>
            <div className="text-[14px] xl:text-md relative flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
              <Compass className="size-5" />
              <h1 className="text-nowrap">Khám phá</h1>
              <Link
                href="/watch/kham-pha"
                className="absolute w-full h-full text-transparent select-none "
              >
                Khám phá
              </Link>
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="flex items-center ml-auto sm:gap-2">
          <div
            onClick={displayInput}
            className="lg:hidden flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-2.5 py-2.5 rounded-full cursor-pointer transition-all font-semibold"
          >
            <Search className=" size-5" />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-2.5 py-2.5 rounded-full cursor-pointer transition-all font-semibold">
            <Bookmark />
          </div>
          <div className="relative flex items-center justify-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold">
            <h2 className="text-nowrap">Đăng nhập</h2>
            <Link
              href=""
              className="absolute w-full h-full text-transparent select-none"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/*Click btn to display input */}
      </div>
      {/* Overlay input */}
      <div
        className={cn(
          "absolute h-full w-full bg-gray-900 lex items-center px-2",
          isActive ? "flex" : "hidden"
        )}
      >
        <div
          ref={inputRef}
          className={cn("w-full items-center bg-white px-5 rounded-2xl flex")}
        >
          <Search className="text-black size-4" />
          <Input
            className="xl:w-[300px] h-8 rounded-2xl border-none text-black"
            placeholder="Tìm kiếm phim"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePageNav;
