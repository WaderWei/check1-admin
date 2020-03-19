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

export function getUser () {
  return JSON.parse(sessionStorage.getItem('user'))
}

export function changeValueToUser (arr, roleType) {
  let user = []
  if (!Array.isArray(arr)) {
    return user
  }
  for (let i = 0; i < arr.length; i++) {
    user.push({ userId: arr[i].value, roleType: roleType })
  }
  return user
}

export function changeUserToValue (arr) {
  let user = []
  if (!Array.isArray(arr)) {
    return user
  }
  for (let i = 0; i < arr.length; i++) {
    user.push({ value: arr[i].userId, label: arr[i].lastName, brief: arr[i].roleType })
  }
  return user
}

export function getCurrentTime (isTime = true) {
  let now = new Date()
  let clock = ''
  let year = now.getFullYear() // 年
  clock += year + '-'
  let month = now.getMonth() + 1 // 月
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  let day = now.getDate() // 日
  if (day < 10) {
    clock += '0'
  }
  if (isTime === true) {
    clock += day + ' '
    let hh = now.getHours() // 时
    if (hh < 10) {
      clock += '0'
    }

    clock += hh + ':'
    let mm = now.getMinutes() // 分
    if (mm < 10) {
      clock += '0'
    }
    clock += mm + ':'
    let ss = now.getSeconds() // 秒
    if (ss < 10) {
      clock += '0'
    }
    clock += ss
  }
  return clock
}
