'use strict'

import Debug from 'debug'
import { get, getOr } from 'lodash/fp'
import isType from '../is-type'

const debug = Debug('koa-result-respond')

export default (ctx, result) => {

  const obj = isType(result) ? result.get() : result
  const status = getOr(200, 'httpCode', obj)
  const body = get('httpBody', obj)

  debug(`fromHttpResult: status = ${status}, body = ${body}`)
  ctx.status = status
  ctx.body = body
}
