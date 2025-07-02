import HomePageNav from "@/app_components/navigations/HomePageNav";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-red-500 min-w-screen">
        <HomePageNav />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
