export interface Track {
    id: number
    artist: string
    url: string
    duration: string
    image: string
    name: string
}

export interface VideoType {
    id: number
    url: string
}

export interface ContactFormType {
    email: string
    phone: string
    telegram: string
    name: string
}

interface AdditionalChecksType {
    remembrance: boolean
    personalMessage: boolean
    specialPhrases: boolean
    futureMessage: boolean
}

export interface FormType {
    formRole?: string
    songFor?: string
    heroName?: string
    heroOrigin?: string
    heroItem?: string
    job?: string
    equipment?: string
    motivation?: string
    comrades?: string
    moments?: string
    words?: string
    additionalChecks?: AdditionalChecksType

    remembranceText?: string
    personalMessageText?: string
    specialPhrasesText?: string
    futureMessageText?: string
    otherText?: string
}
export interface MessageFormType {
    id: string
    name: string
    email: string
    phone: string
    telegram: string
    formRole: string
    songFor: string
    heroName: string
    heroOrigin: string
    heroItem: string
    job: string
    equipment: string
    motivation: string
    comrades: string
    moments: string
    words: string
    additionalChecks?: AdditionalChecksType

    remembranceText?: string
    personalMessageText?: string
    specialPhrasesText?: string
    futureMessageText?: string
    otherText?: string
    planName: string
}
export interface SaveFormType {
    message: MessageFormType
    name?: string
    price?: string
    tg: Telegram
}

export interface SaveIndividualFormType {
    message: MessageFormType
}