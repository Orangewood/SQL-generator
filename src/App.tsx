import { Children, useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import BorderRow from "./components/BorderRow";
import Button from "./components/Button";
import SqlBox from "./components/SqlBox";
import "./sass/App.scss";

//TODO: Memoize rows to retain values, instead of rerender on delete

export default function App() {
  const [rowList, setRowList] = useState<number[]>([0]);
  const [currentData, setCurrentData] = useState<(Array<string | number>)[]>([]);

  const addRow = () => {
    let end = rowList.slice(-1)[0] + 1;
    setRowList([...rowList, end]);
  };

  const deleteRow = (index: number) => {
    let filteredList = rowList.filter((a) => a !== index);
    setRowList(filteredList);
  };

  const resetRow = () => {
    let filteredList = rowList.filter((a) => a === rowList[0]);
    setRowList(filteredList);
    setCurrentData([]);
  };

  useEffect(() => {
    console.log(currentData)
  }, [currentData])

  return (
    <>
      <div className="app-container">
        <h3>Search for Sessions</h3>
        {rowList.map((a) => {
          return (
            <>
              <div className="row-container">
                <Button
                  onClick={() => deleteRow(a)}
                  text="X"
                  type="button-delete"
                  disabled={a === 0}
                />
                <BorderRow
                  key={a}
                  onSelectedData={(data: any) =>
                    setCurrentData(currentData)
                  }
                  index={a}
                >
                  {Children}
                </BorderRow>
              </div>
            </>
          );
        })}
        <Button
          onClick={() => addRow()}
          text="And"
          type="button-add"
          disabled={rowList.length > 8}
        />
        {/* <Button
          onClick={() => console.log(rowList)}
          text="Search"
          type="button-search"
          disabled={rowList.length < 2}
          image={search}
        /> */}
        <Button
          onClick={() => resetRow()}
          text="Reset"
          type="button-reset"
          disabled={rowList.length < 2}
        />
      </div>
      <SqlBox compiledData={currentData} />
    </>
  );
}
