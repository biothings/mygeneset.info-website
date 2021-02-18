import { Col } from "@/components/Table.vue";

export const sleep = (ms = 1000) =>
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

type DummyArray = (string | number | object)[];
interface DummyObject {
  [index: string]: string | number | {};
}

export const dummyJson = (depth = 0) => {
  const isArray = Math.random() < 0.5;

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

export const dummyTable = (cols: Col[], rows: number) =>
  Array(rows)
    .fill(null)
    .map(() =>
      cols
        .map(col => col.key)
        .reduce((object, key) => {
          let randomValue;
          if (key.includes("long_string"))
            randomValue = Array(20)
              .fill("")
              .map(() => randStr())
              .join(" ");
          else if (key.includes("string")) randomValue = randStr();
          else if (key.includes("number")) randomValue = randNum();
          return { ...object, [key]: randomValue };
        }, {})
    );
