'use strict'

import Debug from 'debug'
import wrapper from './wrapper'

const debug = Debug('koa-result-respond')

export default (ctx, result, opts) => {

  const status = result.isOk() ? 200 : 500
  const body = result.get()
  debug(`fromResult: status = ${status}, body = ${body}`)

  ctx.status = result.isOk() ? 200 : 500
  ctx.body = wrapper(body, opts)
}
