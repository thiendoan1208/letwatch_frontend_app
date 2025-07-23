import MainFilterAndDisplay from "@/app_components/filter_and_display/MainFilterAndDisplay";

function TVShowsPage() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div className="mx-4 lg:mx-16 ">
          <MainFilterAndDisplay />
        </div>
      </div>
    </div>
  );
}

export default TVShowsPage;
