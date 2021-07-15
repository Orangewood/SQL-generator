import React, { useState } from "react";
import { ReactNode } from "react";
import "../sass/BorderRow.scss";
import Dropdown from "./Dropdown";

interface BorderRowProps {
  children: ReactNode;
  onSelectedData: (data: string[]) => void;
}

export default function BorderRow(props: BorderRowProps) {
  const { children } = props;
  const [rowType, setRowType] = useState<string | number>()
  const [rowData, setRowData] = useState<string[]>([]);
      /* {<Dropdown onSelect={() => }/>} */



  return (<>
    {/* <div className="row-container">
      {typeof(rowType) === "string" && <div>wat</div>}
    </div> */}

    </>
  )
}
