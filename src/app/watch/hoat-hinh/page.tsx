import MainFilterAndDisplay from "@/app_components/filter_and_display/MainFilterAndDisplay";

function Anime() {
  return (
    <div className=" min-h-screen">
      <div className="pt-20 text-white">
        <div className="mx-4 lg:mx-16 ">
          <MainFilterAndDisplay />
        </div>
      </div>
    </div>
  );
}

export default Anime;
