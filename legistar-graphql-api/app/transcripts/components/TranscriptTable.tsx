import React from 'react'
import { Transcript } from '@/graphql/types'

type TranscriptTableProps = {
    transcripts: Transcript[]
}

const TranscriptTable: React.FC<TranscriptTableProps> = async ({ transcripts }) => {
    const rows = transcripts.map((transcript: Transcript) => (
        <tr key={transcript.Id}>
            <td>{transcript.Date}</td>
            <td>
                <a href={transcript.Link} target='_blank'>
                    {transcript.Name}
                </a>
            </td>
        </tr>
    ))

    return (
        <table>
            <tr key={"headers"}>
                <th>Date</th>
                <th>Name</th>
            </tr>
            {transcripts.map((transcript: Transcript) => (
                <tr key={transcript.Id}>
                    <td>{transcript.Date}</td>
                    <td>
                        <a href={transcript.Link} target='_blank'>
                            {transcript.Name}
                        </a>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default TranscriptTable