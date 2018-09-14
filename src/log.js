'use strict'

import { Type } from 'result-tools'
import getValue from './get-value'

export default (ctx, opts) => (result) => {
  const { logger, level } = opts
  const val = getValue(result)
  if (level === 'INFO') logger.info(val)
  if (level === 'ERROR' && Type.isError(result)) logger.error(val)
}
