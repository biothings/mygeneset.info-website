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
export const stringifyJson = (data: Record<string, unknown>) =>
  JSON.stringify(data, null, 2);

// format array of arrays as csv string
export const stringifyCsv = (data: Array<Array<string>>) =>
  data.map((cell) => cell.join(",")).join("\n");

// format array of arrays as tsv string
export const stringifyTsv = (data: Array<Array<string>>) =>
  data.map((cell) => cell.join("\t")).join("\n");

// format array of arrays as gmx/gmt string
export const stringifyGmx = (data: Array<Array<string>>) =>
  data.map((cell) => cell.join("\t")).join("\n");

// download string as .json file
export const downloadJson = (data: string, filename: string) =>
  download([data], "text/json", filename, ".json");

// download string as .csv
export const downloadCsv = (data: string, filename: string) =>
  download([data], "text/csv", filename, ".csv");

// download string as .tsv
export const downloadTsv = (data: string, filename: string) =>
  download([data], "text/tab-separated-values", filename, ".tsv");

// download string as .gmx
export const downloadGmx = (data: string, filename: string) =>
  download([data], "text", filename, ".gmx");

// download string as .gmt
export const downloadGmt = (data: string, filename: string) =>
  download([data], "text", filename, ".gmt");
