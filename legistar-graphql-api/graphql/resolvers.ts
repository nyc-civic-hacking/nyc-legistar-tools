import { GranicusEvent, GranicusOfficeRecord, GranicusPerson } from "@/legistar/types"
import { filterByTime, orderBy, } from "@/legistar/utils"
import { get } from '../legistar'
import { OrderByEnumValue, Transcript } from "./types"
import { createTranscriptList, parseMonthArg, parseYearArg } from "./utils"
import { BASE_URL } from "../legistar/constants"

export async function events(args: {
  yearArg: string,
  monthArg?: string | null,
  orderByArg?: OrderByEnumValue | null,
  token: string
}): Promise<GranicusEvent[]> {
  const year = parseYearArg(args.yearArg)
  if (!year) {
    return []
  }
  const month = args.monthArg ? parseMonthArg(args.monthArg) : undefined

  const filterParam = filterByTime(year, month)
  const orderByParam = orderBy(args.orderByArg)

  const events = await get<GranicusEvent[]>({
    endpoint: '/events',
    filterParam,
    orderByParam,
    token: args.token
  })
  return events
}

export async function transcripts(args: {
  yearArg: string,
  monthArg?: string | null,
  orderByArg?: OrderByEnumValue | null,
  token: string
}): Promise<Transcript[]> {
  const eventsReturned = await events({
    yearArg: args.yearArg,
    monthArg: args.monthArg,
    orderByArg: args.orderByArg,
    token: args.token
  })

  return(createTranscriptList(eventsReturned, args.token))
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
  const res = await fetch(`${BASE_URL}/persons?${params.toString()}`)
  return res.json()
}

export async function officeRecords(personId: number, token: string): Promise<GranicusOfficeRecord[]> {
  const res = await fetch(`${BASE_URL}/persons/${personId}/officerecords?token=${token}`)
  return res.json()
}

export async function otherOfficeRecords(args: {
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