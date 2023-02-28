export function formatSearch(se: string) {
  se = decodeURIComponent(se);
  se = se.substr(1); //从起始索引号提取字符串中指定数目的字符
  const arr = se.split('&'); //把字符串分割为字符串数组
  const obj: Record<string, string> = {};
  let newarr = [];

  arr.forEach((v, i) => {
    //数组遍历
    console.log(v);
    console.log(i);
    newarr = v.split('=');

    if (typeof obj[newarr[0]] === 'undefined') {
      obj[newarr[0]] = newarr[1];
    }
  });

  return obj;
}
