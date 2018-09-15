'use strict'

import Debug from 'debug'

const debug = Debug('koa-result-respond')

export default (ctx, result) => {

  debug(`fromResult:
    status = ${result.isOk() ? 200 : 500},
    body = ${result.get()}`)

  ctx.status = result.isOk() ? 200 : 500
  ctx.body = result.get()
}
