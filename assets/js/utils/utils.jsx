export function isFunction(fn) {
  return fn && typeof fn === 'function'
}

export function tryExec(func, context, args) {
  return isFunction(func) ? func.apply(context, args) : func
}
