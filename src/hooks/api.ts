import axios from "axios"
import { Track, VideoType } from "../types"
import { updateTracks } from "../store/tracks"

export const getTracks = async () => {
    const response = await axios.get("https://patriot-music.online/api/tracks").then((response) => {
        return response.data as Track[]
    })
    updateTracks(response)
    return response
}

export const getVideo = async () => {
    const response = await axios.get("https://patriot-music.online/api/videos/2").then((response) => {
        return response.data as VideoType
    })
    return response
}


export const sendMessageToAdmins = async ({message, token, ids}: {message: string | undefined, token: string | undefined, ids: string[]}) => {
    const responses = [] as any[]
    ids.map(async (id) => await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: id,
        text: message
    }).then(async (response) => {
        responses.push(response)
    }))
    return await responses 
}

