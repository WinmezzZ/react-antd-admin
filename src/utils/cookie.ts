export function setCookie(cookieName: string, value: string, date?: Date) {
  document.cookie = cookieName + '=' + value + (date ? ';expires' + date?.toUTCString() : '');
}

export function getCookie(cookieName: string) {
  const cookie = document.cookie;
  const i = cookie.indexOf(cookieName);

  if (i == -1) {
    return null;
  } else {
    const starti = i + cookieName.length + 1;
    const endi = cookie.indexOf(';', starti);

    if (endi == -1) {
      return cookie.slice(starti);
    } else {
      return cookie.slice(starti, endi);
    }
  }
}

export function removeCookie(name: string) {
  const exp = new Date();

  exp.setTime(exp.getTime() - 1);
  const value = getCookie(name);

  if (value != null) {
    document.cookie = name + '=' + value + ';expires=' + exp.toUTCString();
  }
}
