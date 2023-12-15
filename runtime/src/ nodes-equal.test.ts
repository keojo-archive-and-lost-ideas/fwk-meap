import { describe, expect, it, test } from 'vitest'
import { areNodesEqual } from './ nodes-equal'
import { createShadowElement, createShadowFragment, createShadowString } from './shadowNodes'
import { VirtualNode } from './types'

describe('areNodesEqual', () => {
  test('returns true for two text elements', () => {
    const nodeOne = createShadowString('hello')
    const nodeTwo = createShadowString('world')
    expect(areNodesEqual(nodeOne, nodeTwo)).toBe(true)
  })

  test('returns true for two fragment elements', () => {
    const nodeOne = createShadowFragment({vNodes: []})
    const textNode = createShadowString('hello')
    const nodeTwo = createShadowFragment({vNodes: [textNode]})

    expect(areNodesEqual(nodeOne, nodeTwo)).toBe(true)
  })

  test('returns false for two different tag element nodes', () => {
    const nodeOne = createShadowElement('div')
    const nodeTwo = createShadowElement('span')

    expect(areNodesEqual(nodeOne, nodeTwo)).toBe(false)
  })

  test('returns true for two same tag element nodes', () => {
    const nodeOne = createShadowElement('div')
    const nodeTwo = createShadowElement('div')

    expect(areNodesEqual(nodeOne, nodeTwo)).toBe(true)
  })
})