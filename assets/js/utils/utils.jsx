export function isFunction(fn) {
  return fn && typeof fn === 'function'
}

export function tryExec(func, context, args) {
  return isFunction(func) ? func.apply(context, args) : func
}

export function tryTransform(func, context, item) {
  return isFunction(func) ? func.call(context, item) : item
}

export function tryGet(target, field) {
  return target && target[field]
}

// 把undefined和truthy转换为true
export function asBool(x, undefIsTrue = true) {
  return undefIsTrue ? (!!x || x === undefined) : !!x
}
