'use strict'

import isType from '../is-type'
import log from '../log'
import fromHttpResult from './from-http-result'
import fromResult from './from-result'
import wrapper from './wrapper'

const hasProperty = (result, property) => isType(result)
  ? result.get() && result.get().hasOwnProperty(property)
  : result && result.hasOwnProperty(property)

const hasHttpCode = (result) => hasProperty(result, 'httpCode')
const hasHttpBody = (result) => hasProperty(result, 'httpBody')

export default (ctx, opts) => (result) => {

  log(ctx, opts)(result)

  if (hasHttpCode(result) || hasHttpBody(result)) {
    return fromHttpResult(ctx, result, opts)
  }

  if (isType(result)) return fromResult(ctx, result, opts)

  ctx.body = wrapper(result, opts)
}
