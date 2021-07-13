import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import BorderRow from "./components/BorderRow";
import Button from "./components/Button";

export default function App() {
  const [totalRows, setTotalRows] = useState<number>(1);
  const [currentDropdownList, setCurrentDropdownList] = useState<string[]>([]);

  const renderRows = (rowAmount: number) => {
    let row = Array(rowAmount).fill(rowAmount);
    console.log(row);
    return row.map((a) => {
      return <BorderRow>{a}</BorderRow>;
    });
  };

  return (
    <>
      <h2>Search for Sessions</h2>
      <div>
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
      </div>
      {renderRows(totalRows)}
    </>
  );
}
