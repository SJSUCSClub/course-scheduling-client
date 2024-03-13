/**
 * Chooses a random element from an array.
 *
 * @param arr - The array to choose from.
 * @returns A random element from the array.
 */
const chooseRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export default chooseRandom;
