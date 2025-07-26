"use client";

import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/user";
import { cn } from "@/lib/utils";
import {
  getUserInfo,
  handleRefreshToken,
  handleSignOut,
} from "@/services/authen";
import ClickOutsideElement from "@/utils/click_outside_element";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Compass,
  Construction,
  House,
  Search,
  ShipWheel,
  Tv,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ReviewForm from "@/app_components/form/ContributeForm";
import { useProgress } from "@bprogress/next";

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
    label: "Khám Phá",
    href: "/watch/kham-pha",
    icon: Compass,
    pathKey: "kham-pha",
  },
];

function HomePageNav() {
  // useProgress from BProgress
  const { start } = useProgress();

  // queryClient
  const queryClient = useQueryClient();

  // useContext
  const { user, login } = useContext(UserContext);

  // URL, pathname, route manage
  const pathname = usePathname();
  const router = useRouter();

  // useState
  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);

  // Search keyword input change
  const setSearchResult = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Navigate to find film page
  const handleNavigateResultPage = (e: { code: string }) => {
    if (e.code === "Enter" && searchKeyword.length > 0) {
      start();
      router.push(`/watch/tim-kiem?keyword=${searchKeyword}`);
    }
  };

  useEffect(() => {
    if (user && user.email !== "") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  // Delete search result
  useEffect(() => {
    if (pathname !== "/watch/tim-kiem") {
      setSearchKeyword("");
    }
  }, [pathname]);

  // Toggle display input manage with smaller device
  const displayInput = () => {
    setIsActive(true);
  };

  const inputRef = ClickOutsideElement(() => {
    setIsActive(false);
  });

  //  Sign out
  const { mutate: signOutMutate } = useMutation({
    mutationFn: handleSignOut,
    onSuccess: (data) => {
      if (data && data.success) {
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  // Get user info
  const { data: userData } = useQuery({
    queryKey: ["me"],
    queryFn: async ({ signal }) => await getUserInfo(signal),
    retry: false,
  });

  // Get refresh token
  const { mutate: refreshTokenMutate } = useMutation({
    mutationFn: handleRefreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  // Refresh token
  useEffect(() => {
    if (userData && userData.success) {
      login(userData.data);
    } else {
      refreshTokenMutate();
    }
  }, [login, userData, user, refreshTokenMutate]);

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
            <Bookmark
              onClick={() => {
                if (user && user.id === 0) {
                  toast.error("Vui lòng đăng nhập để sử dụng tính năng này.");
                } else {
                  start();
                  router.push("/watch/danh-sach-xem");
                }
              }}
            />
          </div>
          {user && user.email !== "" && isUser === true ? (
            <div>
              <DropdownMenu
                open={isDropDownActive}
                onOpenChange={() => {
                  if (isDropDownActive) {
                    setIsDropDownActive(false);
                  }
                }}
              >
                <DropdownMenuTrigger
                  onClick={() => {
                    setIsDropDownActive(true);
                  }}
                >
                  {" "}
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg,rgba(155, 151, 42, 1) 0%, rgba(224, 215, 36, 1) 0%, rgba(87, 199, 178, 1) 100%, rgba(237, 221, 83, 1) 100%)",
                      color: "transparent",
                      backgroundClip: "text",
                    }}
                    className=" font-semibold cursor-pointer hover:underline"
                  >
                    {user.username}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setIsDropDownActive(false);
                    }}
                  >
                    Profile
                    <Construction className="text-yellow-400" />
                  </DropdownMenuItem>
                  <div className="px-2 text-sm hover:bg-gray-100 py-1 rounded-sm w-full">
                    <ReviewForm />
                  </div>
                  {user &&
                    user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                      <DropdownMenuItem>
                        <Link href={"/admin"} className="w-full">
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                  <div className="px-2 text-sm hover:bg-gray-100 py-1 rounded-sm">
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full text-start">
                        <h1 className="text-[var(--text-color)] font-semibold  w-full cursor-pointer">
                          Đăng xuất
                        </h1>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Đăng xuất?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn sẽ không thể trải nghiệm toàn bộ các dịch vụ nếu
                            đăng xuất.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Quay lại</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              signOutMutate();
                            }}
                            className=" bg-[var(--bg-color)]"
                          >
                            Xác nhận
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <div
                className={`relative ${
                  user.email === "" && isUser === false ? "flex" : "hidden"
                } items-center justify-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-3xl cursor-pointer transition-all font-semibold`}
              >
                <h2 className="text-nowrap">Đăng nhập</h2>
                <Link
                  href="/sign-in"
                  className="absolute w-full h-full text-transparent select-none"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
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
