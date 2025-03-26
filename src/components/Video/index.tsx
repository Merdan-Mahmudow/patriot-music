import { getVideo } from "../../hooks/api";
import { VideoType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Plyr from 'plyr';
import "./index.css"

function Video() {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useQuery<VideoType>({
    queryKey: ['video'],
    queryFn: getVideo,
  })
  useEffect(() => {
    if (!data?.url || !playerRef.current) return;

    const player = new Plyr(playerRef.current, { autoplay: false });

    return () => {
      player.destroy();
    };
  }, [data]);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-800">
      <video src={data?.url} width={576} controls crossOrigin="anonymous" playsInline poster="/poster.png" id="player">
      </video>
    </div>
  );
}
export default Video;