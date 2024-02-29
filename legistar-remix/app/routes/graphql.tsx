import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import SchemaBuilder from '@pothos/core';
import { ORDER_BY_ENUM_VALUES, YEAR_ENUM_VALUES } from '~/graphql/old/constants';
import { OrderByEnumValue } from '~/graphql/old/types';
import { events, officeRecords } from '~/graphql/old/resolvers';
import { GranicusEvent, GranicusOfficeRecord } from '~/granicus-client/types';

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

const builder = new SchemaBuilder<{ Context: Context, Objects: { Event: GranicusEvent, OfficeRecord: GranicusOfficeRecord } }>({});

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
    items: t.exposeStringList('EventItems'),
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
    email: t.exposeString('OfficeRecordEmail'),
    fullName: t.exposeString('OfficeRecordFullName'),
    startDate: t.exposeString('OfficeRecordStartDate'),
    endDate: t.exposeString('OfficeRecordEndDate'),
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


const YearEnum = builder.enumType('Year', {
  // creates an array of year strings formatted like Y2015 for years from 1999 to 2024
  values: YEAR_ENUM_VALUES
});

const OrderByEnum = builder.enumType('OrderBy', {
  values: ORDER_BY_ENUM_VALUES as OrderByEnumValue[]
})

builder.queryType({
  fields: (t) => ({
    officeRecords: t.field({
      type: ['OfficeRecord'],
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
      resolve: async (_, args, context) => {
        const token = context.legistarApiToken
        if (!token) return []
        return officeRecords({
          yearArg: args.year,
          orderByArg: args.orderBy,
          token
        })
      }
    }),
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
    })
  }),
});

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  context: getContext
});


export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }