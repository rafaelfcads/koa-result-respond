'use strict'

import getValue from '../src/get-value'

describe('GetValue', function() {

  it('should return Ok value', function() {
    const result = Ok('test')
    expect(getValue(result)).to.be.eq(result.get())
  })
})
