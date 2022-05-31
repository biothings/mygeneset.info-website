// split string into separate terms
const split = (string: string) =>
  string
    .replace(/[^a-zA-Z0-9]/g, " ") // replace any non-alphanumeric with space
    .replace(/([A-Z])/g, " $1") // put space before every capital letter
    .replace(/(.*)([0-9])/g, "$1$2 ") // put space before every first number
    .replace(/([0-9])(.*)/g, " $1$2") // put space after every last number
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word);

// convert string to Human Case
export const toHumanCase = (string: string) =>
  split(string)
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

// convert sting to camelCase
export const toCamelCase = (string: string) =>
  split(string)
    .map((word, index) =>
      index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word
    )
    .join("");
