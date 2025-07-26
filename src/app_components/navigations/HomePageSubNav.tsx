"use client";

import { Compass, House, ShipWheel, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Trang Chủ",
    href: "/watch/trang-chu",
    icon: House,
  },
  {
    label: "TV Shows",
    href: "/watch/tv-shows",
    icon: Tv,
  },
  {
    label: "Hoạt Hình",
    href: "/watch/hoat-hinh",
    icon: ShipWheel,
  },
  {
    label: "Khám phá",
    href: "/watch/kham-pha",
    icon: Compass,
  },
];

function HomePageSubNav() {
  // pathname manage
  const pathname = usePathname();

  return (
    <div className="min-w-screen fixed lg:hidden bottom-0 z-[999] w-full bg-black border-t-[0.5px] border-white/50 select-none">
      <div className="grid grid-cols-4 gap-1.5 xl:gap-2 my-0.5 text-[16px]">
        {menuItems.map(({ label, href, icon: Icon }) => {
          return (
            <div
              key={href}
              className={cn(
                "text-[14px] xl:text-md relative flex flex-col items-center justify-center px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold",
                pathname.includes(href)
                  ? "text-[var(--text-color)]"
                  : "text-white/80"
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
          );
        })}
      </div>
    </div>
  );
}

export default HomePageSubNav;
