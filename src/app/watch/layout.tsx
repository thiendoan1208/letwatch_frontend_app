import HomePageNav from "@/app_components/navigations/HomePageNav";
import HomePageSubNav from "@/app_components/navigations/HomePageSubNav";

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
    </div>
  );
}

export default Layout;
