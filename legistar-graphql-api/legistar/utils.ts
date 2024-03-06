import { OrderByEnumValue } from "@/graphql/types"
import { BASE_URL } from "./constants"

export function buildDateString(year: number, month?: number): string {
  let startDate = year.toString()

  if (month) {
    if (month < 10) {
      startDate += `-0${month}`
    } else {
      startDate += `-${month}`
    }
  } else {
    startDate += `-01`
  }

  return startDate += `-01`
}

export function buildEndDateString(year: number, month?: number): string {
  if (month) {
    month++
    if (month > 12) {
      return buildDateString(year + 1, 1)
    } else {
      return buildDateString(year, month)
    }
  } else {
    return buildDateString(year + 1, 1)
  }
}


export function filterByTime(year: number, month?: number) {
  return `EventDate ge datetime'${buildDateString(year, month)}' and EventDate lt datetime'${buildEndDateString(year, month)}'`
}

export function orderBy(orderBy?: OrderByEnumValue | null): string | undefined {
  switch (orderBy) {
    case 'date_asc':
      return 'EventDate asc'
    case 'date_dsc':
      return 'EventDate desc'
    default:
      return undefined
  }
}

export function buildUrl(args: {
  endpoint: string,
  filterParam: string,
  token: string,
  orderByParam?: string
}) {
  const queryParams = new URLSearchParams({
    $filter: args.filterParam,
    token: args.token
  })

  if (args.orderByParam) {
    queryParams.append('$orderby', args.orderByParam)
  }


  return `${BASE_URL}${args.endpoint}?${queryParams.toString()}`
}