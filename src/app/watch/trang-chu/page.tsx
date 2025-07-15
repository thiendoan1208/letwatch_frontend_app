import HomePageBanner from "@/app_components/banner/HomePageBanner";
import HomePageCategory from "@/app_components/category/HomePageCategory";

function HomePage() {
  return (
    <div
      className="bg-gray-600 min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, hsla(0, 4%, 10%, 1) 0%, hsla(0, 4%, 14%, 1) 54%, hsla(0, 1%, 20%, 1) 100%)",
      }}
    >
      {/* Video intro */}
      <HomePageBanner />
      <div>
        <HomePageCategory />
      </div>
    </div>
  );
}

export default HomePage;
