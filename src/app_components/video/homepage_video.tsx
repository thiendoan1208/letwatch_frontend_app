export default function VideoPlayer() {
  return (
    <div className="hidden lg:block">
      <video className="w-full" autoPlay muted loop>
        <source src="/video/home_page_video_intro.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
    </div>
  );
}
