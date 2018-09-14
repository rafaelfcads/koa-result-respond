'use strict'

import { Ok, Error } from 'result-tools'
import log from '../src/log'

describe('log', function() {

  it('should not log nothing', function() {

    const infoStub = sinon.stub()
    const errorStub = sinon.stub()
    const ctx = {}
    const opts = {
      logger: {
        info: infoStub,
        error: errorStub
      },
      level: 'NONE'
    }

    const result = Ok('Ok value')
    log(ctx, opts)(result)
    expect(infoStub).to.have.not.been
    expect(errorStub).to.have.not.been.called
  })

  it('should call logger.info', function() {

    const infoStub = sinon.stub()
    const errorStub = sinon.stub()
    const ctx = {}
    const opts = {
      logger: {
        info: infoStub,
        error: errorStub
      },
      level: 'INFO'
    }

    const result = Ok('Ok value')
    log(ctx, opts)(result)
    expect(infoStub).to.have.been.calledWith(result.get())
    expect(errorStub).to.have.not.been.called
  })

  it('should call logger.error', function() {

    const infoStub = sinon.stub()
    const errorStub = sinon.stub()
    const ctx = {}
    const opts = {
      logger: {
        info: infoStub,
        error: errorStub
      },
      level: 'ERROR'
    }

    const result = Error('Error value')
    log(ctx, opts)(result)
    expect(errorStub).to.have.been.calledWith(result.get())
    expect(infoStub).to.have.not.been.called
  })
})
