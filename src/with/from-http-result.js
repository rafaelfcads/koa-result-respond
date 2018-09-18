'use strict'

import Debug from 'debug'
import { get } from 'lodash/fp'
import isType from '../is-type'
import wrapper from './wrapper'

const debug = Debug('koa-result-respond')

export default (ctx, result, opts) => {

  const obj = isType(result) ? result.get() : result
  const status = get('httpCode', obj)
  const body = get('httpBody', obj)

  debug(`fromHttpResult: status = ${status}, body = ${body}`)
  if (status) ctx.status = status
  ctx.body = wrapper(body, opts)
}
