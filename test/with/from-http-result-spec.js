'use strict'

import { Ok, Error } from 'result-tools'
import fromHttpResult from '../../src/with/from-http-result'

describe('with/fromHttpResult', function() {

  context('when result is object', function() {

    it('should status to be eq 204 when body is empty', function() {

      const ctx = {}
      const result = { httpCode: 200 }
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(204)
    })

    it('should status to be eq 404 when opts.emptyBody.httpCode is used', function() {

      const ctx = {}
      const result = { httpCode: 200 }
      const opts = {
        emptyBody: {
          httpCode: 404,
          value: 'Object not found!'
        }
      }
      fromHttpResult(ctx, result, opts)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.eq('Object not found!')
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
  })

  context('when Result is an Type', function() {

    it('should status to be eq 204 when body is empty', function() {

      const ctx = {}
      const result = Ok({ httpCode: 200 })
      fromHttpResult(ctx, result)
      expect(ctx.status).to.be.eq(204)
    })

    it('should status to be eq 404 when opts.emptyBody.httpCode is used', function() {

      const ctx = {}
      const result = Ok({ httpCode: 200 })
      const opts = {
        emptyBody: {
          httpCode: 404,
          value: 'Object not found!'
        }
      }
      fromHttpResult(ctx, result, opts)
      expect(ctx.status).to.be.eq(404)
      expect(ctx.body).to.be.eq('Object not found!')
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
  })
})
