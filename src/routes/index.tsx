import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getTracks } from '../hooks/api'
import { Track } from '../types'

import { useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Layout from '../components/Layout'
import Video from '../components/Video'
import Catalog from '../components/Catalog'
import Player from "../components/Player"
import "./index.css"


export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement | null>(null);
    const [currentTrackData, setCurrentTrackData] = useState<Track | null>(null);

    const { isPending, isError, data: tracks } = useQuery<Track[]>({
        queryKey: ['tracks'],
        queryFn: getTracks,
    });

    if (isPending) return <LoadingScreen />;
    if (isError || !tracks) return <div>Error loading tracks</div>;

    const playTrack = (track: Track) => {
        if (currentTrack) {
            currentTrack.pause();
        }
        const newAudio = new Audio(`https://patriot-music.online/api/${track.url}`);
        newAudio.play();
        setCurrentTrack(newAudio);
        setCurrentTrackData(track);
    };



    if (currentTrack) {
        currentTrack.pause();
    }

    return (
        <div>
            <Layout>
                <Video />
                <Catalog tracks={tracks} playTrack={playTrack} />
            </Layout>
            {currentTrackData && <Player audio={new Audio()} track={currentTrackData} />}
        </div>
    );
}
