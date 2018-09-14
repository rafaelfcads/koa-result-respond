'use strict'

import { defaults } from 'lodash/fp'
import respondWith from './with'

const defaultLogOpts = {
  logger: { info: console.log, error: console.log },
  level: 'ERROR'
}

const respond = (ctx, midOpts) => (opts) => {
  opts = defaults(defaultLogOpts, midOpts)
  return { with: respondWith(ctx, opts) }
}

export default function middleware(midOpts = {}) {

  return function(ctx, next) {
    ctx.respond = respond(ctx, midOpts)
    ctx.respondWith = (result, opts) => respondWith(ctx, midOpts)(result, opts)
    return next()
  }
}
