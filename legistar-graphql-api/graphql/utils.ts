import { GranicusEvent } from "@/legistar/types"
import { Transcript } from "@/graphql/types"
import { BASE_URL } from "@/legistar/constants"
import { MONTH_ENUM_VALUES } from "./constants"

export function parseYearArg(yearArg: string): number | undefined {
  // remove first character from an argument (ex. Y1999 -> 1999) then parse as int
  try {
    return parseInt(yearArg.slice(1))
  } catch (e) {
    return undefined
  }
}

export function parseMonthArg(monthArg: string): number | undefined {
  let month = MONTH_ENUM_VALUES.indexOf(monthArg)
  if (month === -1) {
    return undefined
  } else {
    return month + 1
  }
}

// Combines the date and time from a GranicusEvent into one string
export function combineDateAndTime(event: GranicusEvent): string {
  const date = new Date(event.EventDate)
  const timeSplit = event.EventTime.split(' ')
  const ampm = timeSplit[1]
  const hoursAndMinutes = timeSplit[0].split(':')
  const timezoneOffset = date.getTimezoneOffset()
  const hoursOffset = timezoneOffset / 60
  const minutesOffset = timezoneOffset % 60

  const hours = 
    (ampm === 'PM' && parseInt(hoursAndMinutes[0]) < 12)
      ? parseInt(hoursAndMinutes[0])- hoursOffset + 12
      : parseInt(hoursAndMinutes[0]) - hoursOffset
  const minutes = parseInt(hoursAndMinutes[1]) - minutesOffset
  date.setHours(hours, minutes)

  return date.toJSON().split('.')[0]
}

// Creates a list of Transcripts from a list of GranicusEvents
export async function createTranscriptList(events: GranicusEvent[], token: string): Promise<Transcript[]> {
  let transcripts: Transcript[] = []
  for (const event of events) {
    const res = await fetch(`${BASE_URL}/events/${event.EventId}?EventItems=1&EventItemAttachments=1&token=${token}`)
    const resJson = await res.json()
    const eventItems = resJson['EventItems']
    for (const eventItem of eventItems) {
      if (eventItem?.EventItemMatterAttachments.length > 0) {
        for (const eventItemMatterAttachment of eventItem.EventItemMatterAttachments) {
          if (eventItemMatterAttachment?.MatterAttachmentName.toLowerCase().includes('transcript')) {
            transcripts.push({
              Id: eventItemMatterAttachment.MatterAttachmentId,
              Name: eventItemMatterAttachment.MatterAttachmentName,
              Date: combineDateAndTime(event),
              Link: eventItemMatterAttachment.MatterAttachmentHyperlink
            })
          }
        }
      }
    }
  }

  return transcripts
}