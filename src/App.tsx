import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import BorderRow from "./components/BorderRow";
import Button from "./components/Button";
import React from "react";
import SqlBox from "./components/SqlBox";
import './sass/App.scss'

export default function App() {
  const [totalRows, setTotalRows] = useState<number>(1);
  const [currentData, setCurrentData] = useState<string[]>([]);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  //Make list static for now, upon duplicate select
  //render error or disalbe.

  const renderRows = (rowAmount: number) => {
    let row = Array(rowAmount).fill(rowAmount);
    return row.map((a) => {
      return (
        <BorderRow
          onSelectedData={(data: string[]) =>
            setCurrentData(currentData.concat(data))
          }
        >
          {a}
        </BorderRow>
      );
    });
  };

  return (
    <>
      <div className="app-container">
        <h2>Search for Sessions</h2>
        {renderRows(totalRows)}
        {/* <SqlBox compiledData={currentData} /> */}
        <Button
        onClick={() => setTotalRows(totalRows + 1)}
        text="Add"
        color={"blue"}
      />
      <Button
        onClick={() => setTotalRows(totalRows - 1)}
        text="Remove"
        color={"blue"}
        disabled={totalRows === 1}
      />

      </div>
    </>
  );
}
