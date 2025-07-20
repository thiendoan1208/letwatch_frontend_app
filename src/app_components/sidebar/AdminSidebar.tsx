import Image from "next/image";
import { House, Undo2, User } from "lucide-react";
import Link from "next/link";

const navigation = [
  {
    icon: <House className="size-4" />,
    name: "Home",
  },
  {
    icon: <User className="size-4" />,
    name: "User manage",
  },
  { icon: <Undo2 className="size-4" />, name: "Back to home page" },
];

function AdminSidebar() {
  return (
    <div className="min-h-screen col-span-2 border-r-[1px] border-gray-300">
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
        <span className="text-sm text-gray-500 font-semibold">Manage</span>
        <div className="mt-2">
          {navigation.map((item, index) => (
            <Link
              href={""}
              key={index}
              className="flex items-center py-1 px-2 my-1 space-x-1 rounded-md hover:bg-gray-200 transition-all"
            >
              <div>{item.icon}</div>
              <h1 className="text-sm">{item.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
