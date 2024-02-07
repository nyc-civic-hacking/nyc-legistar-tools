export interface GranicusEvent {
  EventId: number
  EventGuid: string,
  EventLastModifiedUtc: string,
  EventBodyId: number,
  EventBodyName: string,
  EventDate: string,
  EventTime: string,
  EventVideoStatus: string,
  EventVideoPath: string | null,
  EventAgendaStatusId: number,
  EventAgendaStatusName: string,
  EventMinutesStatusId: number,
  EventMinutesStatusName: string,
  EventLocation: string,
  EventAgendaFile: string,
  EventMinutesFile: string | null,
  EventAgendaLastPublishedUTC: string,
  EventMinutesLastPublishedUTC: string | null,
  EventComment: string | null,
  EventInSiteURL: string,
  EventItems: []
}