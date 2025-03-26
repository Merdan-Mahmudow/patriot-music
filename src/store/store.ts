import { Store } from "@tanstack/react-store"
import { Track } from "../types"
import { ContactFormType } from "../types"

export const store = new Store({
    tracks: [] as Track[],
    contactForm: {} as ContactFormType,
})