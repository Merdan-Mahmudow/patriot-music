import { useEffect, useState } from "react";
import './index.css';
import TrackBlock from "../TrackBlock";
// import Player from "../Player";
import Button from "../Button";
import EmptyItems from "../EmptyItems";
import { Track } from "../../types";

export default function Catalog({ tracks, playTrack }: { tracks: Track[], playTrack: (track: Track) => void }) {
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement>();
  const [currentTrackDetails, setCurrentTrackDetails] = useState<Track>();

//   const play = (track: Track) => {
//     if (currentTrack) {
//       currentTrack.pause();
//     }
//     const audio = new Audio(`${track.url}`);
//     audio.play();
//     setCurrentTrack(audio);
//     setCurrentTrackDetails(track);
//   };

//   const playPreviousTrack = () => {
//     if (currentTrackDetails) {
//       const currentIndex = tracks.findIndex(product => product.id === currentTrackDetails.id);
//       if (currentIndex > 0) {
//         playTrack(tracks[currentIndex - 1]);
//       }
//     }
//   };

//   const playNextTrack = () => {
//     if (currentTrackDetails) {
//       const currentIndex = tracks.findIndex(product => product.id === currentTrackDetails.id);
//       if (currentIndex < tracks.length - 1) {
//         playTrack(tracks[currentIndex + 1]);
//       }
//     }
//   };

  useEffect(() => {
    return () => {
      if (currentTrack) {
        currentTrack.pause();
      }
    };
  }, [currentTrack]);

  // if (showLoadingScreen || (loading && products.length === 0)) return <LoadingScreen />;
  // if (error) return <ErrorPreloader />;
  if(tracks.length === 0) console.log('No products found');
  return (
    <div className="recommended-songs">
<h1 className="text-2xl all_songs_text">Примеры наших работ :</h1>
      <div className="song-container">
        {tracks.length === 0 ? (
          <EmptyItems />
        ) : (
          tracks.map((product, index) => (
            <div key={product.id}>
              <div className="section-container">
                <TrackBlock
                  product={product}
                  onClick={() => playTrack(product)}
                  isPlaying={currentTrackDetails && currentTrackDetails?.id === product?.id}
                />
                {index === 1 && <div className="section-price">5 000₽</div>}
                {index === 3 && <div className="section-price">10 000₽</div>}
                {index === 5 && <div className="section-price"></div>}
              </div>
              {(index + 1) % 2 === 0 && index !== tracks.length - 1 && (
                <div className="track-divider" />
              )}
            </div>
          ))
        )}
      </div>
      <Button />
      {/* {currentTrackDetails && (
        <Player
          track={currentTrackDetails}
          audio={currentTrack}
          onPrevious={playPreviousTrack}
          onNext={playNextTrack}
        />
      )} */}
    </div>
  );
}
