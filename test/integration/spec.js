'use strict'

import respond from '../../src/koa-respond'
import supertest from 'supertest'
import Koa from 'koa'
import router from './router'

const app = new Koa()
app.use(respond())

app.use(router.routes())

const request = supertest(app.callback())

describe('integration/koa-respond', function () {

  it('sets the code to 404', function (done) {

    request.
      get('/404').
      expect(404).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ message: 'Object not found' })
        done()
      })
  })

  it('sets the code to 422', function (done) {

    request.
      get('/422').
      expect(422).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ message: 'Some body' })
        done()
      })
  })

  it('sets the code to 200', function (done) {

    request.
      get('/200').
      expect(200).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ message: 'Created' })
        done()
      })
  })

  it('sets the code to 500 and uses autoMessage', function (done) {

    request.
      get('/500/auto-message-true').
      expect(500).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ message: 'Some failure' })
        done()
      })
  })

  it('sets the code to 500 and does not use autoMessage', function (done) {

    request.
      get('/500/auto-message-false').
      expect(500).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.text).to.be.eq('Some failure')
        expect(res.body).to.be.deep.eq({})
        done()
      })
  })

  it('sets the code to 204 and has no content', function (done) {

    request.
      get('/204').
      expect(204).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({})
        done()
      })
  })

  it('sets the code to 200 when respond with pure object', function (done) {

    request.
      get('/200/simple-object').
      expect(200).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ value: 1500.00 })
        done()
      })
  })

  it('sets the code to 200 when respond with number', function (done) {

    request.
      get('/200/simple-value').
      expect(200).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({ message: 1500.00 })
        done()
      })
  })

  it('sets the code to 204 when respond with undefined', function (done) {

    request.
      get('/204/undefined').
      expect(204).
      end(function(err, res) {
        if (err) return done(err)
        expect(res.body).to.be.deep.eq({})
        done()
      })
  })
})
