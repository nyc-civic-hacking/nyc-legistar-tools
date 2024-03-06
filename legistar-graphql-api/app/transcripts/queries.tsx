export const GET_TRANSCRIPTS_QUERY = `
query GetTranscripts($year: Year!, $month: Month!) {
    transcripts(year: $year, month: $month) {
        Id
        Name
        Date
        Link
    }
}`