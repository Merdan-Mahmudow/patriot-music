import { useEffect, useState } from "react";
import './index.css';
import TrackBlock from "../TrackBlock";
import Button from "../Button";
import EmptyItems from "../EmptyItems";
import { Track } from "../../types";
import { useRef } from "react";
import Player from "../Player";
import '../../fonts/Monomakh/fonts.css';


export default function Catalog({ tracks }: { tracks: Track[] }) {
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement>();
  const [currentTrackDetails, setCurrentTrackDetails] = useState<Track>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (track: Track) => {
    if (currentTrack) {
      currentTrack.pause();
    }
    const audio = new Audio(`${track.url}`);
    audio.play();
    setCurrentTrack(audio);
    setCurrentTrackDetails(track);
    audioRef.current = audio;
  };

  const playPreviousTrack = () => {
    if (currentTrackDetails) {
      const currentIndex = tracks.findIndex(product => product.id === currentTrackDetails.id);
      if (currentIndex > 0) {
        play(tracks[currentIndex - 1]);
      }
    }
  };

  const playNextTrack = () => {
    if (currentTrackDetails) {
      const currentIndex = tracks.findIndex(product => product.id === currentTrackDetails.id);
      if (currentIndex < tracks.length - 1) {
        play(tracks[currentIndex + 1]);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (currentTrack) {
        currentTrack?.pause();
      }
    };
  }, [currentTrack]);

  if(tracks.length === 0) console.log('No products found');
  return (
    <div className="recommended-songs">
<h1 className="text-2xl all_songs_text">Примеры наших работ :</h1>
      <div className="song-container">
        {tracks.length === 0 ? (
          <EmptyItems />
        ) : (
          tracks.map((product) => (
            <div key={product.id}>
              <div className="section-container">
                <TrackBlock
                  product={product}
                  onClick={() => play(product)}
                  isPlaying={currentTrackDetails && currentTrackDetails?.id === product?.id}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <Button />
      {currentTrackDetails && (
        <Player
          track={currentTrackDetails}
          audio={audioRef.current as HTMLAudioElement}
          onPrevious={playPreviousTrack}
          onNext={playNextTrack}
        />
      )}
    </div>
  );
}
