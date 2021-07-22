import { useEffect } from "react";
import { useState } from "react";
import { isConstructorDeclaration } from "typescript";
import Body from "./components/Body";
import ButtonRow from "./components/ButtonRow";
import SqlBox from "./components/SqlBox";
import { RowDataType, RowDictionary } from "./services/AppTypes";

export default function App() {
  const [data, setData] = useState<(RowDictionary | undefined)[]>([]);
  const [showSql, setShowSql] = useState<boolean>(false);
  

  return (
    <div>
      <Body 
        onDataInput={(appData) => setData(appData)}/>
      <ButtonRow
        rowData={data.map((a) => a?.data)}
        onReset={() => {
          setData([]);
          setShowSql(false);
        }}
        onSearch={() => setShowSql(true)}
      />
      {showSql && <SqlBox compiledData={data.map((a) => a?.data)} />}
    </div>
  );
}
