import DiscoverPageCateGory from "@/app_components/category/DiscorverPageCategory";
import { filmList } from "@/config_film/film_type_config";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khám Phá - LetWatch",
  description: "Khám phá website với vô vàn thể loại phim khác nhau.",
};

function DiscoverPage() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        <div className="mx-4 lg:mx-16 ">
          <div>
            <h1 className="text-2xl font-bold">Danh Mục</h1>
            <div className="mt-5 pb-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filmList &&
                filmList.map((type, index) => (
                  <Link
                    key={`film-type-${index}`}
                    href={type.url}
                    className="w-full border-2 border-white/10 px-4 py-2 rounded-full text-center text-md font-semibold text-nowrap"
                  >
                    {type.name}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-2xl font-bold">Chọn Thể Loại</h1>
            </div>
            <DiscoverPageCateGory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;
