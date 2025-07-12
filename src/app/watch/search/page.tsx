import SearchResult from "@/app_components/body/SearchResult";

function SearchPage() {
  return (
    <div
      className="bg-black min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 4%, 10%, 1) 0%, hsla(0, 4%, 14%, 1) 54%, hsla(0, 1%, 20%, 1) 100%)",
      }}
    >
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
