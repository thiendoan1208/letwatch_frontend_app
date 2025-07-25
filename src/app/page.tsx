import LandingPageBody from "@/app_components/body/LandingPageBody";
import LandingPageNav from "@/app_components/navigations/LandingPageNav";
import LandingPageSlider from "@/app_components/sliders/LandingPageSlider";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Header & Top */}
      <div>
        <div
          className="min-h-screen xl:h-screen"
          style={{
            backgroundImage: `
        radial-gradient(at 80% 100%, hsla(241, 0%, 9%, 1) 0px, transparent 50%),
        radial-gradient(at 1% 1%, hsla(348, 47%, 33%, 1) 0px, transparent 50%)
     `,
            backgroundColor: " #191919 ",
          }}
        >
          <header>
            <LandingPageNav />
          </header>
          <section>
            <div>
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
                    <Link
                      className="w-full h-full flex items-center justify-center"
                      href="/watch/trang-chu"
                    >
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full mt-20 pb-10">
                <LandingPageSlider />
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Main */}
      <main className="bg-black min-h-screen">
        <LandingPageBody />
      </main>
      {/* Footer */}
      <footer>
        <div
          className="flex flex-col md:flex-row items-center justify-between px-20 py-10 text-white gap-10 md:gap-0 lg:mb-0"
          style={{
            backgroundColor: "#3F4245",
          }}
        >
          <div className="flex flex-col">
            <div className="relative">
              <Link
                href="/watch/trang-chu"
                className="absolute text-3xl left-[30px] text-transparent"
                tabIndex={-1}
              >
                Home
              </Link>
              <div className="flex items-center justify-center">
                <Image
                  src="/logo_name.png"
                  alt="logo name"
                  className="w-[150px] select-none cursor-pointer"
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <div>Copyright © 2025 LetWatch</div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold text-yellow-400">
              Mọi thông tin liên hệ:
            </h1>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Mail />
                <h1>thienmacro1234@gmail.com</h1>
              </div>
              <div className="flex gap-2">
                <Link
                  className="flex gap-2"
                  href="https://www.facebook.com/ddthien12"
                  target="_blank"
                >
                  <Facebook className="text-blue-500 cursor-pointer" />
                  <h1>Doan Thien</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
