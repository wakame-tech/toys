import Papa from "papaparse";
import { Theme } from "./model";

export const fetchThemes = async (url: string): Promise<Theme[]> => {
  const res = await fetch(url);
  const txt = await res.text();
  const rows = Papa.parse<string[][]>(txt);
  const data = rows.data.map((row) => row.join(","));
  return data;
};
