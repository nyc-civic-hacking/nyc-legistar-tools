import { buildUrl } from "./utils"

export async function get<ResponseBodyType>(args: {
  endpoint: string,
  token: string,
  filterParam: string
  orderByParam?: string
}) {
  const url = buildUrl(args)
  const res = await fetch(buildUrl(args))
  return res.json() as ResponseBodyType
}