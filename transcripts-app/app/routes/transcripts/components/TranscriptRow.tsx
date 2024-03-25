import React, { useState } from 'react';
import { Row, Cell } from "react-aria-components";
import { Transcript } from '../../../types';

type TranscriptTableProps = {
    transcript: Transcript
}

const TranscriptRow: React.FC<TranscriptTableProps> = ({ transcript }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Row key={transcript.name+'-row'} id={transcript.name}>
            <Cell>{transcript.name}</Cell>
            <Cell>{transcript.date}</Cell>
            <Cell>
            <a className="link-primary" href={transcript.link}>
                {transcript.link}
            </a>
            </Cell>
            <Cell>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {transcript.events.slice(0, isExpanded ? transcript.events.length : 3).map((event) => {
                return <div key={event.id}>{event.bodyName}</div>;
                })}
                {transcript.events.length > 3 && (
                <button onClick={toggleExpansion}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
                )}
            </div>
            </Cell>
        </Row>
    );
}

export default TranscriptRow;