import { getVideo } from "../../hooks/api";
import { VideoType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Plyr from 'plyr';
import "./index.css"
import "plyr/dist/plyr.css";

function Video() {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const { data } = useQuery<VideoType>({
    queryKey: ['video'],
    queryFn: getVideo,
  })

  const videoUrl = data?.url;
  useEffect(() => {
    if (!videoUrl) return;
    const player = new Plyr('#player', { autoplay: false });
    // Bind event listeners.
    function on({selector, type, callback}: {selector: string, type: string, callback: EventListener}) {
      const element = document.querySelector(selector);
      if (element) {
        element.addEventListener(type, callback, false);
      }
    }
    on({selector: '.js-play', type: 'click', callback: () => { player.play(); }});
    on({selector: '.js-pause', type: 'click', callback: () => { player.pause(); }});
    on({selector: '.js-stop', type: 'click', callback: () => { player.stop(); }});
    on({selector: '.js-rewind', type: 'click', callback: () => { player.rewind(); }});
    on({selector: '.js-forward', type: 'click', callback: () => { player.forward(); }});
  }, [videoUrl]);


  // useEffect(() => {
  //   if (!data?.url || !playerRef.current) return;

  //   const player = new Plyr(playerRef.current, { autoplay: false });

  //   return () => {
  //     player.destroy();
  //   };
  // }, [data]);

  return (
    <div className="flex justify-center items-center w-full mt-5">
      <video src={data?.url} width={576} ref={playerRef} controls crossOrigin="anonymous" playsInline poster="/poster.png" id="player">
      </video>
    </div>
  );
}
export default Video;