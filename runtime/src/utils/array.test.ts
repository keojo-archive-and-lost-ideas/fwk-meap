import { describe, expect, test } from 'vitest'
import { mapTextNodes, withoutNulls } from './arrays'


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