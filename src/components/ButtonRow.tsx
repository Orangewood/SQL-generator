import { RowDataType } from "../services/AppTypes";
import Button from "./Button";
import SearchIcon from "../images/search.svg"

interface ButtonRowProps {
  rowData: (RowDataType | undefined)[];
  onReset: () => void;
  onSearch: (clicked: boolean) => void;
}
export default function ButtonRow(props: ButtonRowProps) {
  const { rowData, onSearch, onReset } = props;

  return (
    <>
      <Button
        onClick={() => onSearch(true)}
        text="Search"
        type="button-search"
        disabled={rowData.length < 1}
        image={SearchIcon}
      />
      <Button
        onClick={() => onReset()}
        text="Reset"
        type="button-reset"
        disabled={rowData.length < 2}
      />
    </>
  );
}
