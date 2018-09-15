'use strict'

import { Ok, Error } from 'result-tools'
import fromResult from '../../src/with/from-result'

describe('with/fromResult', function() {

  it('should status to be eq 200 when is Ok', function() {

    const ctx = {}
    const result = Ok('Ok value')

    fromResult(ctx, result)
    expect(ctx.status).to.be.eq(200)
    expect(ctx.body).to.be.eq(result.get())
  })

  it('should status to be eq 500 and body', function() {

    const ctx = {}
    const result = Error('Error value')

    fromResult(ctx, result)
    expect(ctx.status).to.be.eq(500)
    expect(ctx.body).to.be.eq(result.get())
  })
})
