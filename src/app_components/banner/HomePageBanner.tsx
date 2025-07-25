"use client";

import VideoPlayer from "@/app_components/video/HomePageVideo";
import { UserContext } from "@/context/user";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function HomePageBanner() {
  // useContext
  const { user } = useContext(UserContext);

  // useState
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.email !== "") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <>
      {user && user.email !== "" && isUser === true ? (
        <div className="pb-5"></div>
      ) : (
        <>
          <div
            className={`relative h-screen ${
              user.email === "" && isUser === false ? "flex" : "hidden"
            } items-center justify-center overflow-y-hidden`}
          >
            <div className="hidden lg:block">
              <VideoPlayer />
            </div>
            <div className="block lg:hidden w-full h-full">
              <Image
                className="w-full h-full object-center object-cover"
                src="/home_page_intro_image.jpg"
                alt="home_page_intro_image"
                width={1200}
                height={1200}
              />
            </div>
            <div className="absolute text-white z-50 w-full h-full top-0">
              <div className=" w-full lg:w-1/2 h-full flex items-center text-center lg:text-start">
                <div className="flex flex-col gap-4 mx-10 xl:mx-16">
                  <h1 className="text-5xl font-bold ">
                    Xem phim miễn phí, không giới hạn.
                  </h1>
                  <h2 className="text-xl text-white lg:text-white/75 font-semibold">
                    Thưởng thức hàng chục ngàn bộ phim và chương trình hấp dẫn,
                    hoàn toàn miễn phí. Hỗ trợ mọi thiết bị, xem ở bất kỳ đâu.
                  </h2>
                  <div>
                    <Link
                      className=" transition-all font-semibold shadow-2xl text-black/75 bg-yellow-500 px-9 py-2 rounded-3xl hover:text-black/50"
                      href="/sign-up"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePageBanner;
