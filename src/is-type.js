'use strict'

import { Type } from 'result-tools'

export default (result) => Type.isOk(result) || Type.isError(result)
