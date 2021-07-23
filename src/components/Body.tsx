import React, { useState } from "react";
import { RowDataType, RowDictionary } from "../services/AppTypes";
import BorderRow from "./BorderRow";
import Button from "./Button";
import "../sass/Body.scss";
import { useEffect } from "react";
import SearchIcon from "../images/search.svg";

//TODO: Memoize rows to prevent rerender

interface BodyProps {
  onDataInput: (data: (RowDictionary | undefined)[]) => void;
  showSql: (clicked: boolean) => void;
}

export default function Body(props: BodyProps) {
  const { onDataInput, showSql } = props;
  const row = (
    <BorderRow
      key={Date.now() + "row"}
      onSelectedData={(data: RowDataType | undefined) => {
        setRawData([...rawData, { key: Date.now() + "row", data: data } as RowDictionary]);
        showSql(false);
      }}
    />
  );

  const [rowList, setRowList] = useState<JSX.Element[]>([row]);
  const [rawData, setRawData] = useState<(RowDictionary | undefined)[]>([]);

  const addRow = () => {
    let addedRow = [...rowList, row];
    setRowList(addedRow);
    showSql(false);
  };

  const deleteRow = (index: React.Key | null) => {
    if (!index) return;
    setRowList((rowList) => rowList.filter((a) => a.key !== index));
    setRawData((dictionaryList) =>
      dictionaryList.filter((a) => a?.key !== index)
    );
    showSql(false);
  };

  const resetData = () => {
    setRowList([row]);
    rawData.length = 0;
    setRawData([]);
    showSql(false);
  };

  useEffect(() => {
    onDataInput(rawData);
    console.log(rawData);
    // eslint-disable-next-line
  }, [rawData]);

  return (
    <>
      <div className="app-container">
        <h3>Search for Sessions</h3>
        {rowList.map((a) => {
          return (
            <div className="row-container" key={a.key}>
              <Button
                onClick={() => {
                  if (rowList.length === 1) {
                    resetData();
                    return;
                  }
                  deleteRow(a.key);
                }}
                text="X" //could use .svg
                type="button-delete"
              />
              <BorderRow
                key={a.key}
                onSelectedData={(data: RowDataType | undefined) => {
                  let wat =  rawData.findIndex((b) => a.key === b?.key)
                  rawData.map((b) => {
                    if(a.key === b?.key) {
                      console.log(rawData[wat])
                    }
                  })
                  setRawData([
                    ...rawData,
                    { key: a.key, data: data } as RowDictionary,
                  ]);
                  showSql(false);
                }}
              />
            </div>
          );
        })}
        <Button
          onClick={() => addRow()}
          text="And"
          type="button-add"
          disabled={rowList.length > 8}
        />
        <hr className="solid" />
        <div className="row-button">
          <Button
            onClick={() => showSql(true)}
            text="Search"
            type="button-search"
            disabled={rowList.length < 1}
            image={SearchIcon}
          />
          <Button
            onClick={() => resetData()}
            text="Reset"
            type="button-reset"
            disabled={rowList.length < 1}
          />
        </div>
      </div>
    </>
  );
}
