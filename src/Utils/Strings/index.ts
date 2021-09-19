/**
* Function that replace a character in string by another string.
* @param index position of character to be replaced.
* @param str string where replacement will occur.
* @param replacement string/number that will replace a given index inside the ```str``` string.
* @author andr3z0
**/
export function replaceAt(index: number, str: string, replacement: number | string) {
  return (
    str.substr(0, index) + replacement + str.substr(index + String(replacement).length)
  );
}
