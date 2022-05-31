import { sleep } from "./debug";

// wait for element matching selector to appear
export const waitFor = async (
  // query selector
  selector = "",
  // max ms to wait before failing
  wait = 1000,
  // ms between checks
  interval = 10
): Promise<Element | void> => {
  // time at first check
  const startTime = window.performance.now();

  // loop through checks
  for (let check = 0; check < wait / interval; check++) {
    // if match found, return element
    const match = document?.querySelector(selector);
    if (match) return match;

    // if over wait limit, end checking and return void
    if (window.performance.now() + interval - startTime > wait) break;

    // wait a bit before next check
    await sleep(interval);
  }
};
