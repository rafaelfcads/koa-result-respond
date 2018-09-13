'use strict'

import getValue from './get-value'
import with from './with'

const log = (prefix, opts) => (result) => {
  const { logger, level } = opts
  const val = getValue(result)
  if (level === 'INFO') logger.info(val)
  if (level === 'ERROR' && Type.isError(result)) logger.error(val)
}

export default (ctx) => (prefix, opts) => with(ctx, log(prefix, opts))
