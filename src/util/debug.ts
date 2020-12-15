export const sleep = (ms = 10) =>
  new Promise(resolve => window.setTimeout(resolve, ms));

export const dummyJson = (depth = 0) => {
  interface DummyObject {
    [index: string]: string | number | {};
  }
  const dummyObject: DummyObject = {};
  const keys = ["cat", "dog", "mouse", "apple", "pear", "cherry"];
  const rand = (array: string[]) =>
    array[Math.floor(Math.random() * array.length)];
  const entries = 5 + Math.round(Math.random() * 5);
  for (let index = 0; index < entries; index++) {
    const key = rand(keys) + "_" + rand(keys);
    const value =
      Math.random() < 0.2 && depth < 1
        ? dummyJson(depth + 1)
        : Math.round(Math.random() * 100);
    dummyObject[key] = value;
  }
  return dummyObject;
};
