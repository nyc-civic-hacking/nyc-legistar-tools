export type OrderByEnumValue = 'date_asc' | 'date_dsc' 

export type Transcript = {
    id: string
    name: string
    date: string
    link: string
    events: number[]
}