import { GranicusEvent, GranicusOfficeRecord } from "~/granicus-client/types"
import { filterByYear, orderBy, } from "~/granicus-client/utils"
import { get } from '~/granicus-client'
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

export async function officeRecords(args: {
  yearArg: string,
  orderByArg?: OrderByEnumValue | null,
  token: string
}): Promise<GranicusOfficeRecord[]> {
  const year = parseYearArg(args.yearArg)
  if (!year) {
    return []
  }
  const filterParam = filterByYear(year)
  const orderByParam = orderBy(args.orderByArg)

  const officeRecords = await get<GranicusOfficeRecord[]>({
    endpoint: '/OfficeRecords',
    filterParam,
    orderByParam,
    token: args.token
  })
  console.log(officeRecords)
  return officeRecords
}