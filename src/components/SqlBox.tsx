import React from 'react';

interface SqlBoxProps {
    compiledData: string[]
}


export default function SqlBox(props: SqlBoxProps) {
    const {compiledData} = props;
    return (
        <text>{compiledData}</text>
    )
}