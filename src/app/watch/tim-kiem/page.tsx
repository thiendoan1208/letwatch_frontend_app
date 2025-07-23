import SearchResult from "@/app_components/body/SearchResult";

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
