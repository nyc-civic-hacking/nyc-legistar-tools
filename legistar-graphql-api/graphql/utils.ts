import { GranicusEvent } from "@/legistar/types"
import { Transcript } from "@/graphql/types"
import { BASE_URL } from "@/legistar/constants"
import { MONTH_ENUM_VALUES } from "./constants"
import { DateInput } from "react-aria-components"

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
export function combineEventDateAndTime(event: GranicusEvent): string {
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

  return date.toJSON().split('T')[0]
}

function extractDateFromTranscriptName(transcriptName: string): string | null {
  // Regular expression patterns for different date formats
  const datePatterns = [
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/,  // M-D-YY, MM-DD-YY, M/D/YYYY, MM/DD/YYYY
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/   // M-D-YY, MM-DD-YY, M/D/YYYY, MM/DD/YYYY
  ];

  for (const pattern of datePatterns) {
    const match = transcriptName.match(pattern);
    if (match) {
      const date = new Date(match[1]);
      return date.toJSON().split('T')[0];
    }
  }

  return null;  // Return null if no date is found
}

// Creates a list of Transcripts from a list of GranicusEvents
export async function createTranscriptList(events: GranicusEvent[], token: string): Promise<Transcript[]> {
  let transcripts = new Map<string, Transcript>()
  for (const event of events) {
    const res = await fetch(`${BASE_URL}/events/${event.EventId}?EventItems=1&EventItemAttachments=1&token=${token}`)
    const resJson = await res.json()
    const eventItems = resJson['EventItems']
    for (const eventItem of eventItems) {
      if (eventItem?.EventItemMatterAttachments.length > 0) {
        for (const eventItemMatterAttachment of eventItem.EventItemMatterAttachments) {
          if (eventItemMatterAttachment?.MatterAttachmentName.toLowerCase().includes('transcript')) {
            if (transcripts.has(eventItemMatterAttachment.MatterAttachmentName)) {
              const transcript = transcripts.get(eventItemMatterAttachment.MatterAttachmentName)
              if (transcript && !transcript.events.includes(event)) {
                transcript.events.push(event)
              }
            } else {
              const transcriptDate = extractDateFromTranscriptName(eventItemMatterAttachment.MatterAttachmentName)
              transcripts.set(eventItemMatterAttachment.MatterAttachmentName, {
                name: eventItemMatterAttachment.MatterAttachmentName,
                date: transcriptDate ? transcriptDate : combineEventDateAndTime(event),
                link: eventItemMatterAttachment.MatterAttachmentHyperlink,
                events: [event]
              })
            }
          }
        }
      }
    }
  }
  return Array.from(transcripts.values())
}