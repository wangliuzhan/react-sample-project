export function isFunction(fn) {
  return fn && typeof fn === 'function'
}

export function tryExec(func, context) {
  return isFunction(func) ? func.call(context) : func
}
