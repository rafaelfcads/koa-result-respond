'use strict'

import { Ok, Error } from 'result-tools'
import Router from 'koa-router'

export default new Router().
  get('/404', function(ctx) {
    const result = Error({ httpCode: 404, httpBody: 'Object not found' })
    return ctx.respondWith(result)
  }).

  get('/422', function(ctx) {
    const result = { httpCode: 422, httpBody: 'Some body' }
    return ctx.respondWith(result)
  }).

  get('/500/auto-message-true', function(ctx) {
    const result = Error('Some failure')
    return ctx.respondWith(result)
  }).

  get('/500/auto-message-false', function(ctx) {
    const result = Error('Some failure')
    return ctx.
      respond({ autoMessage: false }).
      with(result)
  }).

  get('/200', function(ctx) {
    const result = Ok('Created')
    return ctx.respondWith(result)
  }).

  get('/204', function(ctx) {
    // Even though we send 200, koa will send 204 back when there is no body
    return ctx.respondWith(Ok({ httpCode: 200 }))
  }).

  get('/200/simple-object', function(ctx) {
    return ctx.respondWith({ value: 1500.00 })
  }).

  get('/200/simple-value', (ctx) => ctx.respondWith(1500.00)).

  get('/204/undefined', (ctx) => ctx.respondWith())
