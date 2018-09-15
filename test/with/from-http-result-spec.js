'use strict'

import { Ok, Error } from 'result-tools'
import fromHttpResult from '../../src/with/from-http-result'

describe('with/fromHttpResult', function() {

  context('when result is object', function() {

    it('should status to be eq 404 and empty body', function() {

      const ctx = {}
      const result = { httpCode: 404 }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.not.ok
    })

    it('should status to be eq 404 and body', function() {

      const ctx = {}
      const result = {
        httpCode: 404,
        httpBody: 'Object not found!'
      }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.eq('Object not found!')
    })

    it('should status to be eq 200 and empty body', function() {

      const ctx = {}
      const result = { httpCode: 200 }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(200)
      expect(ctx.body).to.be.not.ok
    })

    it('should status to be eq 200 and body', function() {

      const ctx = {}
      const result = {
        httpCode: 200,
        httpBody: 'Test'
      }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(200)
      expect(ctx.body).to.be.eq('Test')
    })

    it('should status be undefined and body', function() {

      const ctx = {}
      const result = { httpBody: 'Test' }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.not.ok
      expect(ctx.body).to.be.eq('Test')
    })
  })

  context('when Result is an Type', function() {

    it('should status to be eq 404 and empty body', function() {

      const ctx = {}
      const result = Ok({ httpCode: 404 })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.not.ok
    })

    it('should status to be eq 404 and body', function() {

      const ctx = {}
      const result = Ok({
        httpCode: 404,
        httpBody: 'Object not found!'
      })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.eq('Object not found!')
    })

    it('should status to be eq 200 and empty body', function() {

      const ctx = {}
      const result = Ok({ httpCode: 200 })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(200)
      expect(ctx.body).to.be.not.ok
    })

    it('should status to be eq 200 and body', function() {

      const ctx = {}
      const result = Ok({
        httpCode: 200,
        httpBody: 'Test'
      })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(200)
      expect(ctx.body).to.be.eq('Test')
    })

    it('should status be undefined and body', function() {

      const ctx = {}
      const result = Ok({ httpBody: 'Test' })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.not.ok
      expect(ctx.body).to.be.eq('Test')
    })
  })
})
