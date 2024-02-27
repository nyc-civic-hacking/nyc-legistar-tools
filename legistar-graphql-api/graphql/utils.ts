import { GranicusEvent } from "@/legistar/types"
import { Transcript } from "@/graphql/types"
import { BASE_URL } from "@/legistar/constants";

export function parseYearArg(yearArg: string): number | undefined {
  // remove first character from an argument (ex. Y1999 -> 1999) then parse as int
  try {
    return parseInt(yearArg.slice(1))
  } catch (e) {
    return undefined
  }
}

// Creates a list of Transcripts from a list of GranicusEvents
export async function createTranscriptList(events: GranicusEvent[], token: string): Promise<Transcript[]> {
  let transcripts: Transcript[] = [];
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
              Date: event.EventDate,
              Url: eventItemMatterAttachment.MatterAttachmentHyperlink
            })
          }
        }
      }
    }
  }

  return transcripts;
}