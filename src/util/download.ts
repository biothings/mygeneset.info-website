// download json object as file
export const downloadJson = (data: object, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "text/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = url;
  link.download = (filename || "data") + ".json";
  link.click();
  window.URL.revokeObjectURL(url);
};
