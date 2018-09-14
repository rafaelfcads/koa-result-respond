'use strict'

import log from './log'
import getValue from './get-value'

export default (ctx, logOpts) => (result) => {
  log(ctx, logOpts)(result)
  ctx.status = result.isOk() ? 200 : 500
  ctx.body = getValue(result)
}
