import HomePageNav from "@/app_components/navigations/HomePageNav";
import HomePageSubNav from "@/app_components/navigations/HomePageSubNav";
import Footer from "@/app_components/footer/Footer";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <HomePageNav />
        {/* options when responsive */}
        <HomePageSubNav />
      </div>
      <div>{children}</div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
