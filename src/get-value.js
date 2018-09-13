'use strict'

import Type from 'result-tools/type'

export default (val) => Type.isOk(val) || Type.isError(val)
  ? val.get()
  : val
