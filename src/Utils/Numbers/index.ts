/**
 * Function that return some integer between two integer number
 * @param min
 * @param max
 * @author andr30z
 **/
export function getRandomInt(min: number, max: number) {
  if (min > max) return 0;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
