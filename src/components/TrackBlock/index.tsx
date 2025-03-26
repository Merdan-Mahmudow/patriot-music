import './index.css';
import { Track } from '../../types';
function formatDuration(duration: string) {
  const minutes = Math.floor(Number(duration) / 60);
  const seconds = Number(duration) % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function TrackBlock({ product, onClick, isPlaying }: { product: Track, onClick: () => void, isPlaying: boolean | undefined }) {
  return (
    <div className={`song ${isPlaying ? 'playing' : ''}`} onClick={onClick}>
      <div className="song-img">
        <img src={product.image} alt={product.name} className="h-12 w-full bg-black" />
        <div className="overlay">
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
      <div className="song-title">
        <h2>{product.name}</h2>
        <p>{product.artist}</p>
      </div>
      <span>{formatDuration(product.duration)}</span>
    </div>
  );
}

export default TrackBlock;
