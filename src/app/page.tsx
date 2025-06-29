import LandingPageNav from "@/app_components/navigations/LandingPageNav";

export default function Home() {
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
