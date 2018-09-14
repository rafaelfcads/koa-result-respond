'use strict'

import { defaults } from 'lodash/fp'
import log from './log'
import respondWith from './with'

const defaultLogOpts = {
  logger: { info: console.log, error: console.log },
  level: 'ERROR'
}

export default function middleware(midOpts = {}) {

  return function(ctx, next) {

    ctx.respond = (opts) => {
      opts = defaults(defaultLogOpts, midOpts)
      const logger = log(ctx, opts)
      return respondWith(ctx, logger)
    }
    ctx.respondWith = (result, opts) => {
      const logger = log(ctx, midOpts)
      respondWith(ctx, logger)(result, opts)
    }
    next()
  }
}
