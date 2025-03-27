import './index.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons';
import svo_photo from '/svo_photo.jpg';
import { Track } from '../../types';

interface PlayerProps {
  track: Track;
  audio: HTMLAudioElement;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function Player({ track, audio, onPrevious, onNext }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const computeNewTime = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): number | undefined => {
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    return (offsetX / rect.width) * duration;
  };

  const onSeekStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    const newTime = computeNewTime(e);
    if (newTime !== undefined) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const onSeekMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isSeeking) return;
    const newTime = computeNewTime(e);
    if (newTime !== undefined) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const onSeekEnd = () => setIsSeeking(false);

  useEffect(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
      document.getElementById('player-track')?.classList.add('active');
    }
  }, [audio]);

  useEffect(() => {
    if (audio) {
      const updateProgress = () => {
        if (!isSeeking) {
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration);
        }
      };
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [audio, isSeeking]);

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        document.getElementById('player-track')?.classList.remove('active');
      } else {
        audio.play();
        document.getElementById('player-track')?.classList.add('active');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const seekBarWidth = duration ? (currentTime / duration) * 100 : 0;

  if (!track) return null;

  return (
    <div>
      <div id="player-bg-artwork" style={{ backgroundColor: track.image ? 'transparent' : 'gray' }}></div>
      <div id="player-bg-layer"></div>
      <div id="player-container">
        <div id="player">
          <div id="player-track">
            <div id="album-name">{track.name}</div>
            <div id="track-name">{track.artist}</div>
            <div id="track-time">
              <div id="current-time">{formatTime(currentTime)}</div>
              <div id="track-length">{formatTime(duration)}</div>
            </div>
            <div 
              id="seek-bar-container" 
              onMouseDown={onSeekStart} 
              onMouseMove={onSeekMove} 
              onMouseUp={onSeekEnd}
              onMouseLeave={onSeekEnd}
              onTouchStart={onSeekStart}
              onTouchMove={onSeekMove}
              onTouchEnd={onSeekEnd}
            >
              <div id="seek-time">{formatTime(currentTime)}</div>
              <div id="s-hover"></div>
              <div id="seek-bar" style={{ width: `${seekBarWidth}%` }}></div>
            </div>
          </div>
          <div id="player-content">
            <div id="album-art">
              {track.image ? (
                <img src={track.image} className="active" alt={track.name} onError={(e) => (e.currentTarget.src = svo_photo)} />
              ) : (
                <img src={svo_photo} className="placeholder" alt="default" />
              )}
              <div id="buffer-box">Buffering ...</div>
            </div>
            <div id="player-controls">
              <div className="control">
                <div className="button" id="play-previous" onClick={onPrevious}>
                  <FontAwesomeIcon icon={faBackward} className="icon" />
                </div>
              </div>
              <div className="control">
                <div className="button" id="play-pause-button" onClick={togglePlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="icon" />
                </div>
              </div>
              <div className="control">
                <div className="button" id="play-next" onClick={onNext}>
                  <FontAwesomeIcon icon={faForward} className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
