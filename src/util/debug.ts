export const sleep = (ms = 10) =>
  new Promise(resolve => window.setTimeout(resolve, ms));

const n = 3; // number of random entries to make per level
const k = 0.5; // probability of going one level deeper
const d = 3; // max depth
// random string generator
const randStr = () => {
  const keys = ["cat", "dog", "mouse", "apple", "pear", "cherry"];
  return keys[Math.floor(Math.random() * keys.length)];
};
// random number generator
const randNum = () => Math.round(Math.random() * 100);
// random value generator
const randVal = () => (Math.random() < 0.5 ? randStr() : randNum());

export const dummyJson = (depth = 0) => {
  const isArray = Math.random() < 0.5;

  type DummyArray = Array<string | number | object>;
  interface DummyObject {
    [index: string]: string | number | {};
  }

  const dummyArray: DummyArray = [];
  const dummyObject: DummyObject = {};

  for (let index = 0; index < n; index++) {
    const key = randStr() + "_" + randStr();

    let value;
    if (Math.random() < k && depth < d) value = dummyJson(depth + 1);
    else value = randVal();

    if (isArray) dummyArray.push(value);
    else dummyObject[key] = value;
  }

  return isArray ? dummyArray : dummyObject;
};

export const dummyTable = (cols: Array<string>, rows: number) => {
  return Array(rows)
    .fill(null)
    .map(() =>
      cols
        .map(col => col.replace(/[^a-z]/g, ""))
        .map(col => {
          if (col.includes("longstring"))
            return Array(20)
              .fill("")
              .map(() => randStr())
              .join(" ");
          else if (col.includes("string")) return randStr();
          else if (col.includes("number")) return randNum();
          else return "";
        })
    );
};
