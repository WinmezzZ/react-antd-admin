// import XLSX from 'xlsx'

export const setCookie =(cname, cvalue, exdays) => {  
  var d = new Date();  
  d.setTime(d.getTime() + (exdays*24*60*60*1000));  
  var expires = "expires="+d.toUTCString();  
  document.cookie = cname + "=" + cvalue + "; " + expires;  
}  
export const getCookie =(cname) => {  
  var name = cname + "=";  
  var ca = document.cookie.split(';');  
  for(var i = 0; i<ca.length; i++) {  
    var c = ca[i];  
    while (c.charAt(0) === ' ') c = c.substring(1);  
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);  
  }  
  return ""; 
} 

export const setStore = (name, content) => {
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

export const getStore = (name, isObject = false) => {
  let content;
  if (isObject) {
    content = JSON.parse(window.sessionStorage.getItem(name));
  }else {
    content = window.sessionStorage.getItem(name);
  }
	return content;
}

export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

export const getTime = (date = new Date(), sec = false) => {
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var Hours = date.getHours();
  var Minutes = date.getMinutes();
  var Seconds = date.getSeconds();
  var hms = 
    (Hours < 10 ? '0' + Hours : Hours) + '-' +
    (Minutes < 10 ? '0' + Minutes : Minutes) + '-' +
    (Seconds < 10 ? '0' + Seconds : Seconds);
  var time = 
    year + '-' + 
    (month < 10 ? '0' + month : month) + '-' + 
    (day < 10 ? '0' + day : day) + ( sec ? hms : '');
  return time;
}

export const sectToTime = (s) => {
  if(s > -1){
      var hour = Math.floor(s/3600);
      var min = Math.floor(s/60) % 60;
      var sec = Math.floor(s % 60);
      if(hour < 10) {
        hour = '0'+ hour + ":";
      } else {
        hour = hour + ':';
      }
      if(min < 10) {
        min = '0' + min + ':'
      } else {
        min = min + ':'
      }
      if(sec < 10) {
        sec = '0' + sec
      }
  }
  if (hour === '00:') {
    return min + sec
  }
  return hour + min + sec
}

export const launchFullscreen = (element) => {
  if(element) {
    if (element.requestFullScreen)
      return element.requestFullScreen();
    if (element.webkitRequestFullScreen)
      return element.webkitRequestFullScreen();
    if (element.mozRequestFullScreen)
      return element.mozRequestFullScreen();
    if (element.msRequestFullScreen)
      return element.msRequestFullScreen();
    if (element.oRequestFullScreen)
      return element.oRequestFullScreen();
  }else {
    if(document.exitFullscreen) 
      return document.exitFullscreen();
    if (document.mozCancelFullScreen)
      return document.mozCancelFullScreen();
    if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    }
  }
}

// export const exportTable = (json, downName, type) => {
//   let link = document.getElementById('download')
//   const downloadExl = function () {  // 导出到excel
//     let keyMap = [] // 获取键
//     for (let k in json[0]) {
//       keyMap.push(k)
//     }
//     console.info('keyMap', keyMap, json)
//     let tmpdata = [] // 用来保存转换好的json
//     json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
//       v: v[k],
//       position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
//     }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
//       tmpdata[v.position] = {
//         v: v.v
//       }
//     })
//     console.log(json)
//     let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
//     let tmpWB = {
//       SheetNames: ['mySheet'], // 保存的表标题
//       Sheets: {
//         'mySheet': Object.assign({},
//           tmpdata, // 内容
//           {
//             '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
//           })
//       }
//     }
//     let tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
//       {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
//     ))], {
//       type: ''
//     })  // 创建二进制对象写入转换好的字节流
//     var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
//     link.download = downName + '.xlsx'  // 下载名称
//     link.href = href  // 绑定a标签
//     link.click()  // 模拟点击实现下载
//     setTimeout(function () {  // 延时释放
//       URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
//     }, 100)
//   }
//   const s2ab = function (s) { // 字符串转字符流
//     var buf = new ArrayBuffer(s.length)
//     var view = new Uint8Array(buf)
//     for (var i = 0; i !== s.length; ++i) {
//       view[i] = s.charCodeAt(i) & 0xFF
//     }
//     return buf
//   }
//   const getCharCol = function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
//     let s = ''
//     let m = 0
//     while (n > 0) {
//       m = n % 26 + 1
//       s = String.fromCharCode(m + 64) + s
//       n = (n - m) / 26
//     }
//     return s
//   };
//   downloadExl()
// }