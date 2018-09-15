'use strict'

import { Ok, Error } from 'result-tools'
import respondWith from '../../src/with'

describe('with/index', function() {

  it('should call fromHttpResult when hasHttpCode within an object', function() {

    const ctx = {}
    const logOpts = {}
    const result = { httpCode: 500 }

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.eq(500)
    expect(ctx.body).to.be.not.ok
  })

  it('should call fromHttpResult when hasHttpCode within a Result.Type', function() {

    const ctx = {}
    const logOpts = {}
    const result = Error({ httpCode: 422 })

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.eq(422)
    expect(ctx.body).to.be.not.ok
  })

  it('should call fromHttpResult when hasHttpBody within an object', function() {

    const ctx = {}
    const logOpts = {}
    const result = { httpBody: 'Success' }

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.not.ok
    expect(ctx.body).to.be.eq('Success')
  })

  it('should call fromHttpResult when hasHttpBody within a Result.Type', function() {

    const ctx = {}
    const logOpts = {}
    const result = Error({ httpBody: 'Object not found!' })

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.not.ok
    expect(ctx.body).to.be.eq('Object not found!')
  })

  it('should call fromResult when it is a Result.Type', function() {

    const ctx = {}
    const logOpts = {}
    const result = Error('Error value')

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.eq(500)
    expect(ctx.body).to.be.eq(result.get())
  })

  it('should return number in ctx.body', function() {

    const ctx = {}
    const logOpts = {}
    const result = 1000.00

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.not.ok
    expect(ctx.body).to.be.eq(result)
  })

  it('should return string in ctx.body', function() {

    const ctx = {}
    const logOpts = {}
    const result = 'Success'

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.not.ok
    expect(ctx.body).to.be.eq(result)
  })

  it('should return object in ctx.body', function() {

    const ctx = {}
    const logOpts = {}
    const result = { ok: 1 }

    respondWith(ctx, logOpts)(result)
    expect(ctx.status).to.be.not.ok
    expect(ctx.body).to.be.eq(result)
  })
})
