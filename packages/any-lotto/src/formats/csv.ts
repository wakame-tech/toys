import Papa from "papaparse";

export const fetchData = async (url: string): Promise<string[]> => {
  const res = await fetch(url);
  const txt = await res.text();
  const rows = Papa.parse<string[]>(txt);
  const data = rows.data.map((row) => row[0]);
  console.log(data);
  return data;
};
