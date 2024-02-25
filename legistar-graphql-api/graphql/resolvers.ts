import { GranicusEvent, GranicusOfficeRecord, GranicusPerson } from "@/legistar/types"
import { filterByYear, orderBy, } from "@/legistar/utils"
import { get } from '../legistar'
import { OrderByEnumValue } from "./types"
import { parseYearArg } from "./utils"
import { BASE_URL } from "../legistar/constants"

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
  console.log(events[0]);
  return events
}

export async function activePersons(token: string) {
  const filterString = 'PersonActiveFlag eq 1'
  return persons(token, filterString)
}

export async function persons(token: string, filterString?: string): Promise<GranicusPerson[]> {
  const params = new URLSearchParams({ token });
  if (filterString) {
    params.append('$filter', filterString);
  }
  console.log(params.toString())
  const res = await fetch(`${BASE_URL}/persons?${params.toString()}`)
  return res.json()
}


export async function officeRecords(personId: number, token: string): Promise<GranicusOfficeRecord[]> {
  const res = await fetch(`${BASE_URL}/persons/${personId}/officerecords?token=${token}`)
  return res.json()
}