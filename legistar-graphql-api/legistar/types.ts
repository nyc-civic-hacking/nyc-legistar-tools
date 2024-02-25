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

export type GranicusMatterAttachment = {
  MatterAttachmentId: string,
  MatterAttachmentName: string,
  MatterAttachmentHyperlink: string
}

export type GranicusEventItem = {
  EventItemId: string,
  EventItemMatterAttachments: GranicusMatterAttachment[]
}

export interface GranicusPerson {
  PersonId: number,
  PersonGuid: string,
  PersonLastModifiedUtc: string,
  PersonRowVersion: string,
  PersonFirstName: string,
  PersonLastName: string,
  PersonFullName: string,
  PersonActiveFlag: number,
  PersonCanViewFlag: number,
  PersonUsedSponsorFlag: number,
  PersonAddress1: string,
  PersonCity1: string,
  PersonState1: string,
  PersonZip1: string,
  PersonPhone: string,
  PersonFax: string,
  PersonEmail: string,
  PersonWWW: string,
  PersonAddress2: string,
  PersonCity2: string,
  PersonState2: string,
  PersonZip2: string,
  PersonPhone2: string,
  PersonFax2: string,
  PersonEmail2: string,
  PersonWWW2: string
}

export interface GranicusOfficeRecord {
  OfficeRecordId: number,
  OfficeRecordGuid: string,
  OfficeRecordLastModifiedUtc: string,
  OfficeRecordRowVersion: string,
  OfficeRecordFirstName: string,
  OfficeRecordLastName: string,
  OfficeRecordEmail: string,
  OfficeRecordFullName: string,
  OfficeRecordStartDate: string,
  OfficeRecordEndDate: string,
  OfficeRecordSort: number,
  OfficeRecordPersonId: number,
  OfficeRecordBodyId: number,
  OfficeRecordBodyName: string,
  OfficeRecordTitle: string,
  OfficeRecordVoteDivider: number,
  OfficeRecordExtendFlag: number,
  OfficeRecordMemberTypeId: number,
  OfficeRecordMemberType: string,
  OfficeRecordSupportNameId: number | null,
  OfficeRecordSupportFullName: string | null,
  OfficeRecordExtraText: string | null
}
