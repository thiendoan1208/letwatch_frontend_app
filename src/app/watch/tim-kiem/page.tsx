import SearchResult from "@/app_components/body/SearchResult";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm kiếm - LetWatch",
  description: "Tìm kiếm cho webite LetWatch",
};

function SearchPage() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div className="mx-4 lg:mx-16 pb-10">
          <SearchResult />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
