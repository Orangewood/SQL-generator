import { Key } from "react";

export interface DropdownOperator {
  value: string;
  text: string;
  type?: string;
}

export interface RowSignature {
  key: number;
  row: JSX.Element;
}

export interface RowDictionary {
  key: string | Key;
  data: RowDataType | undefined;
}

export interface RowDataType {
  column?: string;
  operator?: string;
  stringInput?: string;
  startRange?: string;
  endRange?: string;
}

export const stringDropdown: DropdownOperator[] = [
  { value: "=", text: "Equals" },
  { value: "contains", text: "Contains" },
  { value: "starts with", text: "Starts with" },
  { value: "in list", text: "In list" },
];

export const numberDropdown: DropdownOperator[] = [
  { value: "=", text: "Equals" },
  { value: "between", text: "Between" },
  { value: ">", text: "Greater than" },
  { value: "<", text: "Less than" },
  { value: "in list", text: "In list" },
];

export const predicateDropdown: DropdownOperator[] = [
  { value: "user_email", text: "User Email", type: "string" },
  { value: "screen_height", text: "Screen Height", type: "number" },
  { value: "screen_width", text: "Screen Width", type: "number" },
  { value: "visits", text: "# of Visits", type: "number" },
  { value: "user_first_name", text: "First Name", type: "string" },
  { value: "user_last_name", text: "Last Name", type: "string" },
  { value: "page_response", text: "Page Response Time", type: "number" },
  { value: "domain", text: "Domain", type: "string" },
  { value: "path", text: "Path", type: "string" },
];
