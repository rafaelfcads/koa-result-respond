'use strict'

export default (ctx, log) => (result, opts) => {
  log(result)
  ctx.status = status
  ctx.body = getValue(result)
}
