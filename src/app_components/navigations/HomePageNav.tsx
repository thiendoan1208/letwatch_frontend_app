"use client";

import Link from "next/link";

function LandingPageSlider() {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-[48px] font-bold text-white">Hôm nay xem gì.</h1>
        <h2 className="text-white font-medium">
          Xem thử một chút nhé! Hàng ngàn phim miễn phí đang chờ bạn khám phá.
        </h2>
        <div className=" flex items-center justify-center mt-2">
          <div className=" flex items-center justify-center flex-nowrap w-[168px] h-[48px] bg-white  rounded-3xl text-xl font-semibold cursor-pointer hover:scale-95 transition-all ">
            <Link href="">Chi tiết</Link>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>{/* Image */}</div>
          <div>
            <h6>Ten phim</h6>
            <p>Nam</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageSlider;
