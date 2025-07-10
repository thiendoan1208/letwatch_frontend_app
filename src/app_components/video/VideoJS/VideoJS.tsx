import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "./videojs.css";

type VideoJsOptions = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string | undefined;
    type: string;
  }[];
};

const VideoJS = ({
  options,
  onReady,
}: {
  options: VideoJsOptions;
  onReady: (player: Player) => void;
}) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<Player>(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const player: Player = (playerRef.current = videojs(
        videoElement,
        options
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onReady, options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
