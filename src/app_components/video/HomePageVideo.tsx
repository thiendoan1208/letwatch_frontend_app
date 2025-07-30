"use client";

import { useEffect, useState } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsplaying] = useState<boolean>(false);

  useEffect(() => {
    const checkResize = () => {
      setIsplaying(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  if (!isPlaying) {
    return <div></div>;
  }

  return (
    <div className="hidden lg:block">
      <video className="w-full" autoPlay muted playsInline loop>
        <source src="/video/home_page_video_intro.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
    </div>
  );
}
