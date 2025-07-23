import WatchFilm from "@/app_components/body/WatchFilm";

function WatchFilmPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-20 text-white">
        {/* Main Collapse Menu Film Filter */}
        <div>
          <WatchFilm />
        </div>
      </div>
    </div>
  );
}

export default WatchFilmPage;
