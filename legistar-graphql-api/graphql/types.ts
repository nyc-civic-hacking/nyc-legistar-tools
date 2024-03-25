import { GranicusEvent } from "@/legistar/types"

export type OrderByEnumValue = 'date_asc' | 'date_dsc' 

export type Transcript = {
    name: string
    date: string
    link: string
    events: GranicusEvent[]
}