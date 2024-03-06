import { GranicusEvent } from "@/legistar/types"

export type OrderByEnumValue = 'date_asc' | 'date_dsc' 

export type Transcript = {
    Id: string
    Name: string
    Date: string
    Link: string
    Events: number[]
}