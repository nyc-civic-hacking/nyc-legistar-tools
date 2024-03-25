export const GET_TRANSCRIPTS_QUERY = `
query GetTranscripts($year: Year!, $month: Month!) {
    transcripts(year: $year, month: $month) {
        name
        date
        link
        events
    }
}`;
