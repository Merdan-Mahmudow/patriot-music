import { Track } from "../../types"
import { store } from "../store"

export const updateTracks = (track: Track[]) => {
    store.setState((state) => {
      return {
        ...state,
        tracks: track,
      }
    })
  }