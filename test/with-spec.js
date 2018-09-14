'use strict'

import { Ok, Error } from 'result-tools'
import log from '../src/log'
import respondWith from '../src/with'

describe('with', function() {

  it('should status to be eq 200 and body', function() {

    const ctx = {}
    const logger = log(ctx, { level: 'NONE' })
    const result = Ok('Ok value')

    respondWith(ctx, logger)(result)
    expect(ctx.status).to.be.eq(200)
    expect(ctx.body).to.be.eq(result.get())
  })

  it('should status to be eq 500 and body', function() {

    const ctx = {}
    const logger = log(ctx, { level: 'NONE' })
    const result = Error('Error value')

    respondWith(ctx, logger)(result)
    expect(ctx.status).to.be.eq(500)
    expect(ctx.body).to.be.eq(result.get())
  })
})
