/**
 * 获取一个字符串值在指定字符串第n次出现的位置
 */
export function getStrTimesIndex(str: string, cha: string, num: number) {
  let x = str.indexOf(cha);

  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }

  return x;
}
