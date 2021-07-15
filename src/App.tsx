import { useEffect, useState } from "react";
import Dropdown, { DropdownSignature } from "./components/Dropdown";
import BorderRow from "./components/BorderRow";
import Button from "./components/Button";
import React from "react";
import SqlBox from "./components/SqlBox";

export default function App() {
  const [totalRows, setTotalRows] = useState<number>(1);
  const [currentData, setCurrentData] = useState<string[]>([]);


  //Make list static for now, upon duplicate select
  //render error or disalbe.


  const renderRows = (rowAmount: number) => {
    let row = Array(rowAmount).fill(rowAmount);
    return row.map((a) => {
      return <BorderRow onSelectedData={(data: string[]) => setCurrentData(currentData.concat(data))}>{a}</BorderRow>;
    });
  };

  return (
    <>
      <div className="app-container">
        <h2>Search for Sessions</h2>
        <Button
          onClick={() => setTotalRows(totalRows + 1)}
          text='Add'
          color={"blue"}
        />
        <Button
          onClick={() => setTotalRows(totalRows - 1)}
          text='Remove'
          color={"blue"}
          disabled={totalRows === 1}
        />
        {renderRows(totalRows)}
        <div><Dropdown onSelect={(value: string) => setCurrentData([...currentData, value])} /></div>
        <div><Dropdown onSelect={(value: string) => setCurrentData([...currentData, value])} /></div>

        {/* <SqlBox compiledData={currentData} /> */}
      </div>
    </>
  );
}
