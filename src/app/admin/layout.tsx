import AdminSidebar from "@/app_components/sidebar/AdminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white w-full grid grid-cols-12">
      {/* Side bar */}
      <AdminSidebar />
      {children}
    </main>
  );
}
