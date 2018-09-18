'use strict'

import { isNumber, isString } from 'lodash/fp'

export default (val, { autoMessage }) => {
  return !!autoMessage && (isNumber(val) || isString(val))
    ? { message: val }
    : val
}
