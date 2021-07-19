import React from "react";

interface SqlBoxProps {
  compiledData: (Array<string | number>)[];
}

export default function SqlBox(props: SqlBoxProps) {
  const { compiledData } = props;
  return <text>{compiledData}</text>;
}
