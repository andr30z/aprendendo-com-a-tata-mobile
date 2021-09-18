/**
* This method randomize an existing array, that's it :D
* @author andr3z0
**/
export function shuffleArray<A>(array: Array<A>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
