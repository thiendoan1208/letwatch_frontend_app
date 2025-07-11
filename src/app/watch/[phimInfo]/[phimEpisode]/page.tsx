import WatchFilm from "@/app_components/body/WachFIlm";

function WatchFilmPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 0%, 0%, 1) 0%, hsla(0, 2%, 7%, 1) 0%)",
      }}
    >
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
