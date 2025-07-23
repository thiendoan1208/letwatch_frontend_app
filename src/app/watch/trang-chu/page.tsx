import HomePageBanner from "@/app_components/banner/HomePageBanner";
import HomePageCategory from "@/app_components/category/HomePageCategory";

function HomePage() {
  return (
    <div className=" min-h-screen">
      {/* Video intro */}
      <HomePageBanner />
      <div>
        <HomePageCategory />
      </div>
    </div>
  );
}

export default HomePage;
