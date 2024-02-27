import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import SchemaBuilder from '@pothos/core';
import { ORDER_BY_ENUM_VALUES, YEAR_ENUM_VALUES } from '@/graphql/constants';
import { OrderByEnumValue } from '@/graphql/types';
import { activePersons, events, transcripts, officeRecords, persons } from '@/graphql/resolvers';
import { GranicusEvent, GranicusEventItem, GranicusMatterAttachment, GranicusOfficeRecord, GranicusPerson } from '@/legistar/types';
import { Transcript } from '@/graphql/types';
import { BASE_URL } from "@/legistar/constants"
import { zipObject } from 'lodash';

export interface Context {
  legistarApiToken: string | null
}

function getBearerTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
  }
  return null;
}

function getContext(initial: YogaInitialContext): Context {
  const legistarApiToken = getBearerTokenFromRequest(initial.request)
  return { legistarApiToken }
}

const builder = new SchemaBuilder<{ Context: Context, Objects: { Event: GranicusEvent, MatterAttachment: GranicusMatterAttachment, EventItem: GranicusEventItem, Transcript: Transcript, CouncilMember: GranicusPerson, OfficeRecord: GranicusOfficeRecord } }>({});

builder.objectType('Event', {
  description: "https://webapi.legistar.com/Help/ResourceModel?modelName=GranicusEvent",
  fields: (t) => ({
    id: t.exposeInt('EventId'),
    guid: t.exposeString('EventGuid'),
    lastModifiedAt: t.exposeString('EventLastModifiedUtc'),
    date: t.exposeString('EventDate'),
    bodyId: t.exposeInt('EventBodyId'),
    bodyName: t.exposeString('EventBodyName'),
    time: t.exposeString('EventTime'),
    videoStatus: t.exposeString('EventVideoStatus'),
    videoPath: t.exposeString('EventVideoPath', { nullable: true }),
    agendaStatusId: t.exposeInt('EventAgendaStatusId'),
    agendaStatusName: t.exposeString('EventAgendaStatusName'),
    minutesStatusId: t.exposeInt('EventMinutesStatusId'),
    minutesStatusName: t.exposeString('EventMinutesStatusName'),
    location: t.exposeString('EventLocation'),
    agendaFile: t.exposeString('EventAgendaFile'),
    minutesFile: t.exposeString('EventMinutesFile', { nullable: true }),
    agendaLastPublishedAt: t.exposeString('EventAgendaLastPublishedUTC'),
    minutesLastPublishedAt: t.exposeString('EventMinutesLastPublishedUTC', { nullable: true }),
    comment: t.exposeString('EventComment', { nullable: true }),
    inSiteURL: t.exposeString('EventInSiteURL'),
    items: t.field({
      type: ['EventItem'],
      resolve: async (parent, _, context) => {
        const res = await fetch(`${BASE_URL}/events/${parent.EventId}?EventItems=1&EventItemAttachments=1&token=${context.legistarApiToken}`)
        const resJson = await res.json()
        return resJson['EventItems']
      }
    }),
  })
})

builder.objectType('MatterAttachment', {
  description: "https://webapi.legistar.com/Help/ResourceModel?modelName=GranicusMatterAttachment",
  fields: t => ({
    id: t.exposeString('MatterAttachmentId'),
    name: t.exposeString('MatterAttachmentName'),
    link: t.exposeString('MatterAttachmentHyperlink') 
  })
})

builder.objectType('EventItem', {
  description: "https://webapi.legistar.com/Help/ResourceModel?modelName=GranicusEventItem",
  fields: t => ({
    id: t.exposeString('EventItemId'),
    attachments: t.field({
      type: ['MatterAttachment'],
      nullable: true,
      resolve: (parent) =>{
        return parent.EventItemMatterAttachments
      }
    })
  })
})

builder.objectType('CouncilMember', {
  description: "https://webapi.legistar.com/Help/ResourceModel?modelName=GranicusPerson",
  fields: (t) => ({
    id: t.exposeInt('PersonId'),
    guid: t.exposeString('PersonGuid'),
    lastModifiedAt: t.exposeString('PersonLastModifiedUtc'),
    rowVersion: t.exposeString('PersonRowVersion'),
    firstName: t.exposeString('PersonFirstName'),
    lastName: t.exposeString('PersonLastName'),
    fullName: t.exposeString('PersonFullName'),
    activeFlag: t.exposeInt('PersonActiveFlag'),
    canViewFlag: t.exposeInt('PersonCanViewFlag'),
    usedSponsorFlag: t.exposeInt('PersonUsedSponsorFlag'),
    address1: t.exposeString('PersonAddress1'),
    city1: t.exposeString('PersonCity1'),
    state1: t.exposeString('PersonState1'),
    zip1: t.exposeString('PersonZip1'),
    phone: t.exposeString('PersonPhone'),
    fax: t.exposeString('PersonFax'),
    email: t.exposeString('PersonEmail', { nullable: true }),
    www: t.exposeString('PersonWWW'),
    address2: t.exposeString('PersonAddress2', { nullable: true }),
    city2: t.exposeString('PersonCity2', { nullable: true }),
    state2: t.exposeString('PersonState2', { nullable: true }),
    zip2: t.exposeString('PersonZip2', { nullable: true }),
    phone2: t.exposeString('PersonPhone2', { nullable: true }),
    fax2: t.exposeString('PersonFax2', { nullable: true }),
    email2: t.exposeString('PersonEmail2', { nullable: true }),
    www2: t.exposeString('PersonWWW2', { nullable: true }),
  })
})

builder.objectType('OfficeRecord', {
  description: "https://webapi.legistar.com/Help/ResourceModel?modelName=GranicusOfficeRecord",
  fields: (t) => ({
    id: t.exposeInt('OfficeRecordId'),
    guid: t.exposeString('OfficeRecordGuid'),
    lastModifiedAt: t.exposeString('OfficeRecordLastModifiedUtc'),
    rowVersion: t.exposeString('OfficeRecordRowVersion'),
    firstName: t.exposeString('OfficeRecordFirstName'),
    lastName: t.exposeString('OfficeRecordLastName'),
    email: t.exposeString('OfficeRecordEmail', { nullable: true }),
    fullName: t.exposeString('OfficeRecordFullName'),
    startDate: t.exposeString('OfficeRecordStartDate'),
    endDate: t.exposeString('OfficeRecordEndDate', { nullable: true }),
    sort: t.exposeInt('OfficeRecordSort'),
    personId: t.exposeInt('OfficeRecordPersonId'),
    bodyId: t.exposeInt('OfficeRecordBodyId'),
    bodyName: t.exposeString('OfficeRecordBodyName'),
    title: t.exposeString('OfficeRecordTitle'),
    voteDivider: t.exposeInt('OfficeRecordVoteDivider'),
    extendFlag: t.exposeInt('OfficeRecordExtendFlag'),
    memberTypeId: t.exposeInt('OfficeRecordMemberTypeId'),
    memberType: t.exposeString('OfficeRecordMemberType'),
    supportNameId: t.exposeInt('OfficeRecordSupportNameId', { nullable: true }),
    supportFullName: t.exposeString('OfficeRecordSupportFullName', { nullable: true }),
    extraText: t.exposeString('OfficeRecordExtraText', { nullable: true }),
  })
})

builder.objectType('Transcript', {
  description: "A custom type of MatterAttachment. Specifically those with 'transcript' in the name.",
  fields: t => ({
    id: t.exposeString('Id'),
    name: t.exposeString('Name'),
    date: t.exposeString('Date'),
    url: t.exposeString('Url') 
  })
})

const YearEnum = builder.enumType('Year', {
  // creates an array of year strings formatted like Y2015 for years from 1999 to 2024
  values: YEAR_ENUM_VALUES
});

const OrderByEnum = builder.enumType('OrderBy', {
  values: ORDER_BY_ENUM_VALUES as OrderByEnumValue[]
})

builder.queryType({
  fields: (t) => ({
    events: t.field({
      args: {
        year: t.arg({
          description: "Years that the city council has been in session",
          type: YearEnum,
          required: true
        }),
        orderBy: t.arg({
          description: "Field and direction to order by",
          type: OrderByEnum
        })
      },
      type: ['Event'],
      resolve: async (_, args, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        return events({
          yearArg: args.year,
          orderByArg: args.orderBy,
          token
        })
      }
    }),
    transcripts: t.field({
      args: {
        year: t.arg({
          description: "Years that the city council has been in session",
          type: YearEnum,
          required: true
        }),
        orderBy: t.arg({
          description: "Field and direction to order by",
          type: OrderByEnum
        })
      },
      type: ['Transcript'],
      resolve: async (_, args, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        return transcripts({
          yearArg: args.year,
          orderByArg: args.orderBy,
          token
        })
      }
    }),
    currentCouncilMembers: t.field({
      type: ['CouncilMember'],
      resolve: async (_, __, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        const activeMembers = await activePersons(token)
        const officeRecordRequests = activeMembers.map(m => officeRecords(m.PersonId, token))
        const records = await Promise.all(officeRecordRequests)
        const memberRecordsMap = zipObject(activeMembers.map(m => m.PersonId), records);
        const activeMembersWithRecords = activeMembers.filter(m => Boolean(memberRecordsMap[m.PersonId].length))
        return activeMembersWithRecords
      }
    }),
    pastCouncilMembers: t.field({
      type: ['CouncilMember'],
      resolve: async (_, __, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        const allMembers = await persons(token)
        return allMembers.filter(m => m.PersonActiveFlag === 0)
      }
    }),
    allCouncilMembers: t.field({
      type: ['CouncilMember'],
      resolve: async (_, __, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        const allMembers = await persons(token)
        return allMembers
      }
    })
  }),
});

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  context: getContext
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }