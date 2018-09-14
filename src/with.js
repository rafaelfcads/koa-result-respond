'use strict'

import getValue from './get-value'

export default (ctx, log) => (result) => {
  log(result)
  ctx.status = result.isOk() ? 200 : 500
  ctx.body = getValue(result)
}
