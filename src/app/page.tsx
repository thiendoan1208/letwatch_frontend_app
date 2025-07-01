import LandingPageNav from "@/app_components/navigations/LandingPageNav";
import LandingPageSlider from "@/app_components/sliders/LandingPageSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Header & Top */}
      <div className="h-screen">
        <div
          className="h-full"
          style={{
            backgroundImage: `
        radial-gradient(at 80% 100%, hsla(241, 0%, 9%, 1) 0px, transparent 50%),
        radial-gradient(at 1% 1%, hsla(348, 47%, 33%, 1) 0px, transparent 50%)
     `,
            backgroundColor: " #191919 ",
          }}
        >
          <header className="">
            <LandingPageNav />
          </header>
          <section className="h-full">
            <div className="h-full">
              <div className="grid grid-rows-3 grid-cols-1 animate-fadeIn mt-20">
                <div className="text-center">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-rose-500">
                    Khám phá kho phim tuyệt đỉnh.
                  </h1>
                </div>
                <div className="mt-3 text-center">
                  <h2 className="text-lg lg:text-xl text-white font-semibold mx-6">
                    Bạn đang tìm gì để xem? Chúng tôi sẽ giúp! Kho phim miễn
                    phí, đa dạng thể loại đang chờ bạn khám phá.
                  </h2>
                </div>
                <div className=" flex items-center justify-center mt-2">
                  <div className=" flex items-center justify-center flex-nowrap w-[170px] h-[50px] bg-yellow-500  rounded-3xl text-xl font-semibold cursor-pointer hover:scale-95 transition-all ">
                    <Link href="">Xem ngay</Link>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <LandingPageSlider />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Main */}
    </div>
  );
}
