'use strict'

import { defaults } from 'lodash/fp'
import respondWith from './with'

const defaultOpts = {
  autoMessage: true,
  logger: { info: console.log, error: console.log },
  level: 'ERROR'
}

const respond = (ctx, midOpts) => (opts) => {
  opts = defaults(midOpts, opts)
  return { with: respondWith(ctx, opts) }
}

export default function middleware(midOpts = defaultOpts) {

  return function(ctx, next) {
    ctx.respond = respond(ctx, midOpts)
    ctx.respondWith = (result) => respondWith(ctx, midOpts)(result)
    return next()
  }
}
