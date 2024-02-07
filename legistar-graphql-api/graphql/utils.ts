export function parseYearArg(yearArg: string): number | undefined {
  // remove first character from an argument (ex. Y1999 -> 1999) then parse as int
  try {
    return parseInt(yearArg.slice(1))
  } catch (e) {
    return undefined
  }
}