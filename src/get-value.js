'use strict'

import { Type } from 'result-tools'

export default (val) => Type.isOk(val) || Type.isError(val)
  ? val.get()
  : val
