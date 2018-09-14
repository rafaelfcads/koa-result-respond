'use strict'

import { Ok, Error } from 'result-tools'
import getValue from '../src/get-value'

describe('getValue', function() {

  it('should return Ok value', function() {
    const result = Ok('test')
    expect(getValue(result)).to.be.eq(result.get())
  })

  it('should return Error value', function() {
    const result = Error('test')
    expect(getValue(result)).to.be.eq(result.get())
  })

  it('should return value as it is when it is not Result Type', function() {
    const value = 'Test'
    expect(getValue(value)).to.be.eq(value)
  })
})
