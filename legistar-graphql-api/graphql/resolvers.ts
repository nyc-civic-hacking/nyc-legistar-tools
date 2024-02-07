import { GranicusEvent } from "@/legistar/types"
import { filterByYear, orderBy, } from "@/legistar/utils"
import { get } from '../legistar'
import { OrderByEnumValue } from "./types"
import { parseYearArg } from "./utils"

export async function events(args: {
  yearArg: string,
  orderByArg?: OrderByEnumValue | null,
  token: string
}): Promise<GranicusEvent[]> {
  const year = parseYearArg(args.yearArg)
  if (!year) {
    return []
  }
  const filterParam = filterByYear(year)
  const orderByParam = orderBy(args.orderByArg)

  const events = await get<GranicusEvent[]>({
    endpoint: '/events',
    filterParam,
    orderByParam,
    token: args.token
  })
  return events
}