"use client";

import { UserContext } from "@/context/user";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";

function LandingPageBody() {
  const save = useRef(null);
  const watch = useRef(null);
  const explore = useRef(null);
  const { user } = React.useContext(UserContext);

  const checkElementInViewPort = () => {
    const arr = [save.current, watch.current, explore.current];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    });

    if (arr) {
      arr.forEach((item) => {
        if (item !== null) {
          observer.observe(item);
        }
      });
    }
  };

  useEffect(() => {
    checkElementInViewPort();
  });

  return (
    <div>
      <div className=" h-60 md:h-72 w-full"></div>
      {/* Save */}
      <div className="flex items-center justify-center mt-20 select-none">
        <h1
          ref={save}
          className="text-yellow-400/30 text-[100px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[290px] font-(family-name:--font-poppins) font-bold"
        >
          Save
        </h1>
      </div>
      {/* Save Des */}
      <div className="flex flex-col lg:grid xl:grid-cols-2 text-white mx-4 md:mx-10 xl:ml-10 xl:mr-32">
        <div className="flex w-full items-center justify-center">
          <div
            className=" flex items-center justify-center gap-2 px-2 md:px-6 py-6 mb-6 md:mt-0 rounded-4xl text-amber-700/60  select-none"
            style={{
              background:
                " linear-gradient(90deg, hsla(51, 89%, 61%, 1) 0%, hsla(25, 83%, 57%, 1) 100%)",
            }}
          >
            <Bookmark className="size-10" />
            <h1 className="text-2xl md:text-3xl font-[600]">
              Thêm vào danh sách xem
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-3">
          <div>
            <h1 className="text-3xl md:text-6xl font-bold text-yellow-400 font-(family-name:--font-poppins) md:leading-20">
              Một danh sách kiểm soát tất cả.
            </h1>
          </div>
          <div>
            <p className="text-lg text-justify">
              Website xem phim của chúng tôi không chỉ giúp bạn thưởng thức hàng
              ngàn bộ phim chất lượng, mà còn lưu lại phim yêu thích, xem lại
              lịch sử đã xem, và quản lý danh sách phim một cách thông minh.
              Trải nghiệm cá nhân hóa, tiện lợi – nơi mọi khoảnh khắc giải trí
              đều được ghi nhớ!
            </p>
          </div>
          {user && user.email !== "" ? (
            <div></div>
          ) : (
            <div className=" flex items-center justify-start mt-2">
              <div className="px-8 py-3 flex items- justify-center flex-nowrap bg-yellow-500  rounded-3xl text-xl font-semibold cursor-pointer hover:scale-95 transition-all ">
                <Link
                  className="w-full h-full flex items-center justify-center"
                  href="/abc.com"
                >
                  Tạo tài khoản ngay
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" h-60 md:h-72 w-full"></div>
      {/* Watch */}
      <div className="flex items-center justify-center mt-20 select-none">
        <h1
          ref={watch}
          className="text-rose-400/30 text-[100px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[290px]  font-(family-name:--font-poppins) font-bold"
        >
          Watch
        </h1>
      </div>
      {/* Watch Des */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 text-white mx-4 md:mx-10 xl:mx-20 mt-10">
        <div>
          <div className="space-y-4 md:space-y-0">
            <h1 className="text-3xl md:text-6xl font-semibold text-rose-400 font-(family-name:--font-poppins) md:leading-20">
              Một ngày tuyệt vời để trải nghiệm
            </h1>
            <p className="text-justify text-lg">
              Hãy để hôm nay trở thành khởi đầu cho hành trình thưởng thức những
              bộ phim hay nhất, được tuyển chọn kỹ lưỡng với chất lượng cao, tốc
              độ mượt mà và không quảng cáo gây phiền nhiễu.
            </p>
          </div>
        </div>
        <div className="col-span-2 rounded-3xl overflow-hidden">
          <Image
            className="w-full object-center object-cover"
            src="/landing_page_watch.jpg"
            alt="landing_page_watch"
            width={500}
            height={500}
            priority
            quality={100}
          />
        </div>
      </div>
      <div className=" h-60 md:h-72 w-full"></div>
      {/* Explore */}
      <div className="flex items-center justify-center mt-20 select-none">
        <h1
          ref={explore}
          className="text-blue-400/30 text-[92px] sm:text-[150px] lg:text-[250px] md:text-[200px] xl:text-[290px] font-(family-name:--font-poppins) font-bold"
        >
          Explore
        </h1>
      </div>
      {/* Explore Des */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white mx-4 md:mx-10 xl:mx-40 mt-10">
        <div>
          <div>
            <h1 className="text-3xl md:text-6xl font-semibold text-blue-400 font-(family-name:--font-poppins) md:leading-20">
              Khám phá niềm vui mỗi ngày!
            </h1>
          </div>
        </div>
        <div>
          <p className="text-justify text-lg">
            Bước vào thế giới phim ảnh cực chất – nơi mỗi bộ phim là một hành
            trình mới để bạn khám phá cảm xúc, cười sảng khoái, thả hồn theo
            từng khung hình. Dù là hành động gay cấn, tình cảm ngọt ngào hay hài
            hước dí dỏm, niềm vui luôn ở ngay trước mắt. Xem phim không chỉ để
            giải trí – mà là để tìm thấy chính mình trong từng câu chuyện.
          </p>
        </div>
      </div>
      <div className=" h-60 md:h-72 w-full"></div>
      <div className="flex items-center justify-center mx-4 md:mx-10 text-center">
        <h1
          className="inline-block
      bg-gradient-to-r from-indigo-500 to-pink-600
      bg-clip-text text-transparent text-[20px] sm:text-[30px] md:text-[30px] lg:text-[40px] xl:text-[40px]  font-(family-name:--font-poppins) font-bold xl:leading-20"
        >
          Cùng bắt đầu trải nghiệm cá nhân hóa của riêng bạn!
        </h1>
      </div>
      <div className=" h-60 md:h-72 w-full"></div>
    </div>
  );
}

export default LandingPageBody;
