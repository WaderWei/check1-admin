// 对字符串进行加密
export function compileStr (code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}
// 字符串进行解密
export function uncompileStr (code) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

export function findObjArrWithIdArr (allArr, idArr) {
  let selectItems = []
  for (let i = 0; i < idArr.length; i++) {
    const selectItem = allArr.find(c => c.value === idArr[i])
    selectItems.push(selectItem)
  }
  return selectItems
}

export function KeyboardJackUp () {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 200)
}
