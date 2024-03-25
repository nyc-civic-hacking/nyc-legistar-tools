export type Event = {
    id: number
    bodyName: string
    date: string
}

export type Transcript = {
    name: string
    date: string
    link: string
    events: Event[]
}