import FilmListTypeFilterAndDisplay from "@/app_components/filter_and_display/FilmListTypeFilterAndDisplay";

function FilmTypeList() {
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
        <div className="mx-4 lg:mx-16 ">
          <div>
            <FilmListTypeFilterAndDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmTypeList;
