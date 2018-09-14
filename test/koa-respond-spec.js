'use strict'

import { Ok } from 'result-tools'
import koaRespond from '../src/koa-respond'

describe('koaRespond', function() {

  it('should return a function(ctx, next)', function() {
    const fn = koaRespond()
    expect(fn).to.be.a('function')
  })

  it('should define respond and respondWith', function() {

    const ctx = {}
    const nextStub = sinon.stub()
    koaRespond()(ctx, nextStub)
    expect(ctx.respond).to.be.a('function')
    expect(ctx.respondWith).to.be.a('function')
    expect(nextStub).to.be.called
  })

  it('when call respond should return respondWith', function() {

    const ctx = {}
    const nextStub = sinon.stub()
    koaRespond()(ctx, nextStub)

    const respondWith = ctx.respond()
    expect(respondWith).to.be.a('function')
  })

  it('when call respondWith should sent response back', function() {

    const ctx = {}
    const nextStub = sinon.stub()
    koaRespond()(ctx, nextStub)

    const result = Ok({ name: 'koa-result-respond' })
    ctx.respondWith(result)
    expect(ctx.status).to.be.eq(200)
    expect(ctx.body).to.be.deep.eq(result.get())
  })
})
