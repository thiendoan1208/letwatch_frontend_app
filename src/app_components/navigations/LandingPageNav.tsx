"use client";

import * as React from "react";
import Link from "next/link";
import { AlignJustify, Construction, Search } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { filmList } from "@/config_film/film_type_config";
import { getFilmType } from "@/services/film";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user";
import {
  getUserInfo,
  handleRefreshToken,
  handleSignOut,
} from "@/services/authen";
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

function LandingPageNav() {
  // BProgress
  const { start } = useProgress();

  // Query client
  const queryClient = useQueryClient();

  // Routes manages
  const router = useRouter();

  // useContext
  const { user, login } = React.useContext(UserContext);

  // useState
  const [isDropDownActive, setIsDropDownActive] =
    React.useState<boolean>(false);

  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  // Get all film types
  const { data: filmType } = useQuery({
    queryKey: ["film-types"],
    queryFn: async ({ signal }) => await getFilmType(signal),
    staleTime: 60 * 60 * 1000,
  });

  // Input search keyword
  const setSearchResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Navigate to result page
  const handleNavigateResultPage = (e: { code: string }) => {
    if (e.code === "Enter") {
      start();
      router.push(`/watch/tim-kiem?keyword=${searchKeyword}`);
    }
  };

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
  React.useEffect(() => {
    if (userData && userData.success) {
      login(userData.data);
    } else {
      refreshTokenMutate();
    }
  }, [login, userData, user, refreshTokenMutate]);

  // Sign out
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

  return (
    <div className="flex items-center h-12 bg-black/60 translate-y-2 mx-2 rounded-sm backdrop-blur-sm z-9999">
      <div className=" w-full flex items-center justify-between pr-2">
        <div className="flex items-center">
          <div className="relative">
            <Link
              href="/"
              className="absolute text-3xl left-[30px] text-transparent"
            >
              Home
            </Link>
            <Image
              src="/logo_name.png"
              alt="logo name"
              className="w-[150px] select-none cursor-pointer"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className="flex items-center bg-white/10 px-5 rounded-2xl ">
            <Search className="text-white size-4" />
            <Input
              className="w-[100px] sm:w-[200px] md:w-[400px] h-8 rounded-2xl border-none text-white"
              placeholder="Tìm kiếm phim"
              onChange={setSearchResult}
              onKeyDown={handleNavigateResultPage}
              value={searchKeyword}
            />
          </div>
        </div>
        <div className="hidden xl:flex items-center">
          <div className="flex items-center relative">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer bg-transparent text-white/80 hover:text-white transition-all/100 w-fit hover:bg-transparent">
                    Danh Mục
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" z-[999] absolute left-full top-full -translate-x-full mt-2">
                    <div>
                      <h1 className="font-bold ml-1 text-yellow-500">
                        Danh Mục
                      </h1>
                    </div>
                    <ul className="grid w-[400px] gap-2 md:grid-cols-2 mt-3">
                      {filmType &&
                        filmList.map((component, index) => (
                          <Link
                            key={`list-${index}`}
                            href={component.url}
                            className="hover:bg-gray-200/50 px-2 rounded-sm transition-all"
                          >
                            {component.name}
                          </Link>
                        ))}
                    </ul>
                    <div>
                      {!filmType && (
                        <div>
                          <h1>Không thể lấy danh sách thể loại phim</h1>
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer bg-transparent text-white/80 hover:text-white transition-all/100 w-fit hover:bg-transparent">
                    Thể Loại
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" z-[999] absolute left-full top-full -translate-x-full mt-2 ">
                    <div>
                      <h1 className="font-bold ml-1 text-yellow-500">
                        Chọn thể loại mà bạn ưa thích
                      </h1>
                    </div>
                    <ul className="grid min-w-[600px] gap-2 md:grid-cols-4 mt-3">
                      {filmType &&
                        filmType.success === true &&
                        filmType.data.map((type, index: number) => (
                          <Link
                            key={`list-${index}`}
                            href={`/watch/kham-pha/the-loai/${type.slug}`}
                            className="hover:bg-gray-200/50 px-2 rounded-sm transition-all"
                          >
                            {type.name}
                          </Link>
                        ))}
                    </ul>
                    <div>
                      {!filmType && (
                        <div>
                          <h1>Không thể lấy danh sách thể loại phim</h1>
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center ">
            <div className="h-[35px] w-[1.5px] bg-blue-950/50 rounded-2xl"></div>
            {user && user.email !== "" ? (
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
                      className=" font-semibold cursor-pointer hover:underline pl-4"
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
                          <h1 className="text-yellow-500 font-semibold  w-full cursor-pointer">
                            Đăng xuất
                          </h1>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Đăng xuất?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn sẽ không thể trải nghiệm toàn bộ các dịch vụ
                              nếu đăng xuất.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Quay lại</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                signOutMutate();
                              }}
                              className=" bg-yellow-500"
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
                <div className={`${user.email === "" ? "hidden" : "block"}`}>
                  <Link
                    className="mx-4 font-semibold  text-white/80 hover:text-white hover:underline transition-all"
                    href="/sign-in"
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                    className="mx-4 font-semibold shadow-2xl text-black/75 bg-yellow-500 px-8 py-1 rounded-md hover:text-black/50"
                    href="/sign-up"
                  >
                    Đăng Ký
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="block xl:hidden bg-black">
          <Sheet>
            <SheetTrigger asChild>
              <AlignJustify className="text-white mr-2 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="max-w-screen overflow-auto">
              <SheetHeader className="p-0 py-2">
                <SheetTitle>
                  <Image
                    src="/logo_name.png"
                    alt="logo name"
                    className="w-[150px] select-none cursor-pointer left-0"
                    width={100}
                    height={100}
                    priority
                  />
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="mx-4">
                <div>
                  <h1 className="font-bold  text-yellow-500">Danh Mục</h1>
                </div>
                <div className="grid grid-cols-2 ml-3 gap-3 mt-2 ">
                  {filmType &&
                    filmList.map((component, index) => (
                      <Link
                        key={`list-${index}`}
                        href={`/watch/kham-pha/${component.slug}`}
                        className="hover:underline transition-all"
                      >
                        {component.name}
                      </Link>
                    ))}
                </div>
                <div>
                  {!filmType && (
                    <div>
                      <h1>Không thể lấy danh sách thể loại phim</h1>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-[1px] bg-black/50 mx-4 rounded-2xl"></div>
              <div className="mx-4">
                <div>
                  <h1 className="font-bold  text-yellow-500">Thể Loại</h1>
                </div>
                <div className="grid grid-cols-2 ml-3 gap-3 mt-2 ">
                  {filmType &&
                    filmType.success === true &&
                    filmType.data.map((type, index: number) => (
                      <Link
                        key={`list-${index}`}
                        href={`/watch/kham-pha/the-loai/${type.slug}`}
                        className="hover:underline transition-all"
                      >
                        {type.name}
                      </Link>
                    ))}
                </div>
                <div>
                  {!filmType && (
                    <div>
                      <h1>Không thể lấy danh sách thể loại phim</h1>
                    </div>
                  )}
                </div>
              </div>
              <SheetFooter>
                {user && user.email !== "" ? (
                  <div></div>
                ) : (
                  <div className="flex flex-col ">
                    <Link
                      className="my-3 font-semibold hover:underline transition-all text-center"
                      href="/sign-in"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      className="mx-4 font-semibold shadow-2xl text-black/75 bg-yellow-500 px-8 py-1 rounded-md hover:text-black/50 text-center transition-all"
                      href="/sign-up"
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default LandingPageNav;
