import { useState } from "react";
import Body from "./components/Body";
import SqlBox from "./components/SqlBox";
import { RowDictionary } from "./services/AppTypes";

export default function App() {
  const [data, setData] = useState<(RowDictionary | undefined)[]>([]);
  const [showSql, setShowSql] = useState<boolean>(false);

  return (
    <div>
      <Body
        onDataInput={(appData) => setData(appData)}
        showSql={(clicked) => setShowSql(clicked)}
      />
      {showSql && <SqlBox compiledData={data.map((a) => a?.data)} />}
    </div>
  );
}
