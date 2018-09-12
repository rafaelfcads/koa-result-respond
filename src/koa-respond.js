'use strict'

import { defaults } from 'lodash/fp'
import Type from 'result-tools/type'

const getValue = (result) => Type.isOk(result) || Type.isError(result)
  ? result.get()
  : result

const log = function log(result, opts) {
  const { logger, level } = opts
  const val = getValue(result)
  if (level === 'INFO') logger.info(val)
  if (level === 'ERROR' && Type.isError(result)) logger.error(val)
}

const respond = (ctx, opts) => (status, result) => {
  log(result, opts)
  ctx.status = status
  ctx.body = getValue(result)
}

export default function middleware(opts = {}) {

  opts = defaults({
    logger: { info: console.log, error: console.log },
    level: 'ERROR'
  }, opts)

  return (ctx, next) => {
    ctx.respond = respond(ctx, opts)
    next()
  }
}
