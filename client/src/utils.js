export const confirmationStatus = {
  expired: 1,
  nouser: 2,
  verified: 3,
  success: 4,
  error: 5
}

export const resetStatus = {
  expired: 1,
  nouser: 2,
  valid: 3,
  success: 4,
  error: 5
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function chunk (array, length) {
  const chunks = [], n = array.length;
  let i = 0;
  while (i < n)
    chunks.push(array.slice(i, i += length));

  return chunks;
}
