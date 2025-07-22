"use client";

import Image from "next/image";
import { BookCheck, House, Undo2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    icon: <House className="size-5 xl:size-4" />,
    name: "Home",
    link: "/admin",
  },
  {
    icon: <User className="size-5 xl:size-4" />,
    name: "User manage",
    link: "/admin/user-manage",
  },
  {
    icon: <BookCheck className="size-5 xl:size-4" />,
    name: "Contribute form status manage",
    link: "/admin/contribute-form-status",
  },
  {
    icon: <Undo2 className="size-5 xl:size-4" />,
    name: "Back to home page",
    link: "/watch/trang-chu",
  },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen col-span-1 xl:col-span-2 border-r-[1px] border-gray-300">
      <div className="border-b-[1px] border-gray-300 flex items-center justify-center">
        <Image
          className="w-1/2"
          src="/logo_name.png"
          alt="Logo name"
          width={100}
          height={100}
          priority
        />
      </div>
      {/* Choices */}
      <div className="mx-2">
        <span className="text-sm text-gray-500 font-semibold hidden xl:block">
          Manage
        </span>
        <div className="mt-2">
          {navigation.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={cn(
                "flex items-center justify-center xl:justify-normal py-4 xl:py-1 px-2 my-1 space-x-1 rounded-md hover:bg-gray-200 transition-all",
                pathname === item.link && "text-yellow-500"
              )}
            >
              <div className="p-0 ">{item.icon}</div>
              <h1 className="text-sm hidden xl:block">{item.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
