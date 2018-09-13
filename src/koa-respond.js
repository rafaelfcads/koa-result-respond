'use strict'

import { defaults } from 'lodash/fp'
import log from './log'
import with from './with'

export default function middleware(midOpts = {}) {

  midOpts = defaults({
    logger: { info: console.log, error: console.log },
    level: 'ERROR'
  }, midOpts)

  return (ctx, next) => {

    const noPrefixLog = log(ctx)('', midOpts)
    ctx.respond = {
      log: (prefix, opts = midOpts) => log(ctx)(prefix, opts),
      with: (result, opts) => with(ctx, noPrefixLog)(result, opts)
    }
    next()
  }
}
