import { describe, expect, test } from 'vitest'
import { arraysDiff, mapTextNodes, withoutNulls } from './arrays'


describe('withoutNulls', () => {
  test('filters nulls', () => {
    expect(withoutNulls(["1", null, "2", null, "3"])).toEqual(["1", "2", "3"])
  })
})

describe('mapTextNodes', () => {
  test('convert only string node', () => {
    expect(mapTextNodes(
      ["hello-world",
      { type: 'text', value: 'sample-text' },
      {
        type: 'element',
        tag: 'div',
        props: {},
        children: [{ type: 'text', value: 'foo' }],
      }
    ])).toEqual([
      { type: 'text', value: "hello-world" },
      { type: 'text', value: "sample-text" },
      {
        type: 'element',
        tag: 'div',
        props: {},
        children: [{ type: 'text', value: 'foo' }],
      }
    ])
  })
})

describe('arraysDiff', () => {
  test('same array', () => {
    const oldArray = [1, 2, 3]
    const newArray = [1, 2, 3]
    expect(arraysDiff(oldArray, newArray)).toEqual({
      added: [],
      removed: [],
    })
  })

  test('delete items', () => {
    const oldArray = [1, 2, 3]
    const newArray = [1, 2]
    expect(arraysDiff(oldArray, newArray)).toEqual({
      added: [],
      removed: [3],
    })
  })

  test('add items', () => {
    const oldArray = [1, 2]
    const newArray = [1, 2, 3]
    expect(arraysDiff(oldArray, newArray)).toEqual({
      added: [3],
      removed: [],
    })
  })
})

// describe('ArrayWithOriginalIndices', () => {

// })

// describe('arraysDiffSequence', () => {
  
// })