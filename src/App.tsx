import { useEffect } from "react";
import { Children, useState } from "react";
import BorderRow from "./components/BorderRow";
import Button from "./components/Button";
import SqlBox from "./components/SqlBox";
import search from "./images/search.svg";
import "./sass/App.scss";
import { RowDataType } from "./services/AppTypes";

//TODO: Memoize rows to retain values, instead of rerender on delete

export default function App() {
  const [rowList, setRowList] = useState<number[]>([0]);
  const [rawData, setRawData] = useState<Array<RowDataType | undefined>>([]);
  const [allRowData, setAllRowData] = useState<Array<RowDataType | undefined>>(
    []
  );

  const addRow = () => {
    let increment = rowList.slice(-1)[0] + 1;
    setRowList([...rowList, increment]);
  };

  const deleteRow = (index: number) => {
    let filteredList = rowList.filter((a) => a !== index);
    setRowList(filteredList);
  };

  const resetRow = () => {
    setRowList([]);
    setAllRowData([]);
  };

  useEffect(() => {
    if (rowList.length === 0) setRowList([0]);
  }, [rowList]);

  const searchRows = (data: Array<RowDataType | undefined>) => {
    if (!data) return;

    let sqlResults = Array.from(
      new Set(
        data.filter(
          (a) =>
            a?.column &&
            a.operator &&
            (a.stringInput || (a.startRange && a.endRange))
        )
      )
    );
    setAllRowData(sqlResults);
  };

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
                  onSelectedData={(data: RowDataType | undefined) => {
                    setRawData([...allRowData, data]);
                  }}
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
        <Button
          onClick={() => searchRows(rawData)}
          text="Search"
          type="button-search"
          disabled={rowList.length < 1}
          image={search}
        />
        <Button
          onClick={() => resetRow()}
          text="Reset"
          type="button-reset"
          disabled={rowList.length < 2}
        />
      </div>
      <SqlBox compiledData={allRowData} />
    </>
  );
}
