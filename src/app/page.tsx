import LandingPageNav from "@/app_components/navigations/LandingPageNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <div>
        <div
          className="h-screen"
          style={{
            backgroundImage: `
        radial-gradient(at 80% 100%, hsla(241, 0%, 9%, 1) 0px, transparent 50%),
        radial-gradient(at 1% 1%, hsla(348, 47%, 33%, 1) 0px, transparent 50%)
     `,
            backgroundColor: " #191919 ",
          }}
        >
          <LandingPageNav />
        </div>
      </div>
    </div>
  );
}
