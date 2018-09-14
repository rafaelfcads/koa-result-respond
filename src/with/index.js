'use strict'

import isType from '../is-type'
import log from '../log'
import fromHttpResult from './from-http-result'
import fromResult from './from-result'

const hasHttpCode = (result) => isType(result)
  ? result.get().hasOwnProperty('httpCode')
  : result.hasOwnProperty('httpCode')

const hasHttpBody = (result) => isType(result)
  ? result.get().hasOwnProperty('httpBody')
  : result.hasOwnProperty('httpBody')

export default (ctx, logOpts) => (result, opts) => {

  log(ctx, logOpts)(result)

  if (hasHttpCode(result) || hasHttpBody(result)) {
    return fromHttpResult(ctx, result, opts)
  }

  if (isType(result)) return fromResult(ctx, result)

  ctx.status = !result ? 204 : 200
  ctx.body = result
}
