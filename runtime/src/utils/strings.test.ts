import { describe, expect, test } from 'vitest'
import { isNotBlankOrEmptyString, isNotEmptyString } from './strings'

describe('isNotEmptyString', () => {
  test('empty string', () => {
    expect(isNotEmptyString('')).toBe(false)
  })
  test('not empty string', () => {
    expect(isNotEmptyString('hello')).toBe(true)
  })
})
describe('isNotBlankOrEmptyString', () => {
  test('empty string', () => {
    expect(isNotBlankOrEmptyString('')).toBe(false)
  })
  test('not empty string', () => {
    expect(isNotBlankOrEmptyString('hello')).toBe(true)
  })
})