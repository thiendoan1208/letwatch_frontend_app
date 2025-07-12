"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ClickOutsideElement from "@/utils/click_outside_element";
import { Bookmark, Compass, House, Search, ShipWheel, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

function HomePageNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const setSearchResult = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleNavigateResultPage = (e: { code: string }) => {
    if (e.code === "Enter") {
      router.push(`/watch/search?keyword=${searchKeyword}`);
    }
  };

  useEffect(() => {
    if (pathname !== "/watch/search") {
      setSearchKeyword("");
    }
  }, [pathname]);

  const displayInput = () => {
    setIsActive(true);
  };

  const inputRef = ClickOutsideElement(() => {
    setIsActive(false);
  });

  const menuItems = [
    {
      label: "Trang Chủ",
      href: "/watch/trang-chu",
      icon: House,
      pathKey: "trang-chu",
    },
    {
      label: "TV Shows",
      href: "/watch/tv-shows",
      icon: Tv,
      pathKey: "tv-shows",
    },
    {
      label: "Hoạt Hình",
      href: "/watch/hoat-hinh",
      icon: ShipWheel,
      pathKey: "hoat-hinh",
    },
    {
      label: "Khám phá",
      href: "/watch/kham-pha",
      icon: Compass,
      pathKey: "kham-pha",
    },
  ];

  return (
    <div className="fixed min-w-screen flex items-center h-16 bg-black/20 backdrop-blur z-[999] transition-all">
      <div className="relative w-full flex items-center justify-between mx-4 xl:mx-10 pr-4">
        <div className="flex items-center">
          <div className="relative">
            <Link
              href="/watch/trang-chu"
              className="absolute text-3xl left-[30px] text-transparent select-none"
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
              onChange={setSearchResult}
              onKeyDown={handleNavigateResultPage}
              value={searchKeyword}
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
            {menuItems.map(({ label, href, icon: Icon, pathKey }) => (
              <div
                key={pathKey}
                className={cn(
                  "text-[14px] xl:text-md relative flex items-center justify-center gap-2 text-white/80 hover:text-black bg-transparent hover:bg-white px-4 py-2 rounded-3xl cursor-pointer font-semibold",
                  (pathname === href || pathname.includes(href)) &&
                    "border-3 border-white/20"
                )}
              >
                <Icon className="size-5" />
                <h2 className="text-nowrap">{label}</h2>
                <Link
                  href={href}
                  className="absolute w-full h-full text-transparent select-none"
                >
                  {label}
                </Link>
              </div>
            ))}
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
          "absolute h-full w-full bg-gray-900 items-center px-5",
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
            onChange={setSearchResult}
            onKeyDown={handleNavigateResultPage}
            value={searchKeyword}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePageNav;
