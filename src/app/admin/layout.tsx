import AdminSidebar from "@/app_components/sidebar/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - LetWatch",
  description: "Admin cho webite LetWatch",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white w-full grid grid-cols-12">
      {/* Side bar */}
      <AdminSidebar />
      {children}
    </main>
  );
}
