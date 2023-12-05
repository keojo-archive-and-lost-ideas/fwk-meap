import { describe, expect, test } from 'vitest'
import {objectsDiff} from './ objects'

describe('checking objects', () => {
  test('same object', () => {
    const oldObj = {a: 1, b: 2}
    const newObj = {a: 1, b: 2}
    expect(objectsDiff(oldObj, newObj)).toEqual({
      added: [],
      removed: [],
      updated: []
    })
  })
  test('delete keys', () => {
    const oldObj = {a: 1, b: 2}
    const newObj = {a: 1}
    expect(objectsDiff(oldObj, newObj)).toEqual({
      added: [],
      removed: ['b'],
      updated: []
    })
  })
  test('add keys', () => {
    const oldObj = {a: 1}
    const newObj = {a: 1, b: 2}
    expect(objectsDiff(oldObj, newObj)).toEqual({
      added: ['b'],
      removed: [],
      updated: []
    })
  })
  test('update keys', () => {
    const oldObj = {a: 1, b: 2}
    const newObj = {a: 1, b: 3}
    expect(objectsDiff(oldObj, newObj)).toEqual({
      added: [],
      removed: [],
      updated: ['b']
    })
  })
})