'use strict'

import log from './log'
import getValue from './get-value'

const debug = Debug('koa-result-respond')

export default (ctx, logOpts) => (result) => {
  log(ctx, logOpts)(result)

  debug(`Result isOk = ${result.isOk()} or isError = ${result.isError()}`)
  debug('Status', result.isOk() ? 200 : 500)
  debug('Body', getValue(result))
  ctx.status = result.isOk() ? 200 : 500
  ctx.body = getValue(result)
}
