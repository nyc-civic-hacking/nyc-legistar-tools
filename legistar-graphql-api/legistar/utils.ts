import { OrderByEnumValue } from "@/graphql/types"
import { BASE_URL } from "./constants"

export function filterByYear(year: number) {
  return `EventDate ge datetime'${year}-01-01' and EventDate lt datetime'${year + 1}-01-01'`
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
  });

  if (args.orderByParam) {
    queryParams.append('$orderby', args.orderByParam);
  }


  return `${BASE_URL}${args.endpoint}?${queryParams.toString()}`
}