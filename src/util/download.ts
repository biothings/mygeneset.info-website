// download file
const download = (
  data: string[],
  type: string,
  filename: string,
  extension: string
) => {
  const blob = new Blob(data, { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename + extension;
  link.click();
  window.URL.revokeObjectURL(url);
};

// format object as json string
export const stringifyJson = (data: object) => JSON.stringify(data, null, 2);

// format array of arrays as csv string
export const stringifyCsv = (data: [][]) =>
  data.map((cell) => cell.join(",")).join("\n");

// format array of arrays as tsv string
export const stringifyTsv = (data: [][]) =>
  data.map((cell) => cell.join("\t")).join("\n");

// download object as .json file
export const downloadJson = (data: object, filename: string) => {
  download([stringifyJson(data)], "text/json", filename, ".json");
};

// format array of arrays as gmx string
export const stringifyGmx = (data: [][]) =>
  data.map((cell) => cell.join("\t")).join("\n");

// download array of arrays as .csv
export const downloadCsv = (data: [][], filename: string) =>
  download([stringifyCsv(data)], "text/csv", filename, ".csv");

// download array of arrays as .tsv
export const downloadTsv = (data: [][], filename: string) => {
  download([stringifyTsv(data)], "text/tab-separated-values", filename, ".tsv");
};

// download array of arrays as .gmx
export const downloadGmx = (
  data: [][],
  filename: string,
  transpose: boolean
) => {
  download([stringifyTsv(data)], "text", filename, transpose ? ".gmt" : ".gmx");
};
