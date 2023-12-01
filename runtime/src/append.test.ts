import { describe, test, expect } from "vitest";
import { appendFragmentNode, appendTextNode } from './append'
import { createShadowFragment, createShadowString } from "./shadowNodes";
//@ts-expect-error
import { toJSON } from 'dom-to-json'
import { parseDocument } from "../../libs/parse-document-api";

describe('render text node', () => {
  test('it append to the parent node', () => {
    const vTextNode = createShadowString('foo')
    const body = document.createElement('body')
    const node = appendTextNode({ node: vTextNode, parentElement: body })

    const JSONifiedHTML = toJSON(body)
    // nodeType https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
    expect(JSONifiedHTML).toEqual({
      nodeType: 1,
      tagName: 'body',
      attributes: [],
      childNodes: [{
        nodeType: 3,
        nodeName: '#text',
        nodeValue: 'foo',
        childNodes: []
      }]
    })
  })

  test('it create a ref to the dom node', () => {
    const vTextNode = createShadowString('foo')
    const body = document.createElement('body')
    appendTextNode({ node: vTextNode, parentElement: body })

    const JSONRef = parseDocument(vTextNode.domRef)
    console.log(JSONRef)

    expect(JSONRef).toEqual({ tag: '', props: {}, children: [], text: 'foo' })
  })
})

describe('render fragment node', () => {
  test(`domRef of fragmentNode should be the parentElement`, () => {
    const vFragmentNode = createShadowFragment({ vNodes: ['foo', 'bar'] })
    const body = document.createElement('body', )
    body.setAttribute('id', 'parent')
    appendFragmentNode({ node: vFragmentNode, parentElement: body })

    const JSONRef = parseDocument(vFragmentNode.domRef)
    expect(JSONRef).toEqual({
      tag: 'body',
      props: { id: 'parent' },
      children: [
        { tag: '', props: {}, children: [], text: 'foo' },
        { tag: '', props: {}, children: [], text: 'bar' }
      ]
    })
  })

  test('it append others nodes to the parent node', () => {
    const vFragmentNode = createShadowFragment({ vNodes: ['foo', 'bar'] })
    const body = document.createElement('body', )
    body.setAttribute('id', 'parent')
    appendFragmentNode({ node: vFragmentNode, parentElement: body })

    const parseBody = parseDocument(body)
    expect(parseBody).toEqual(
      {
        tag: 'body',
        props: { id: 'parent' },
        children: [
          { tag: '', props: {}, children: [], text: 'foo' },
          { tag: '', props: {}, children: [], text: 'bar' }
        ]
      }
    )
  })

  test('multiple siblings fragment will point to the same parent node', () => {
    const vFragmentNode = createShadowFragment({ vNodes: ['foo', 'bar'] })
    const vFragmentNode2 = createShadowFragment({ vNodes: ['foo', 'bar'] })
    const body = document.createElement('body', )
    body.setAttribute('id', 'parent')
    appendFragmentNode({ node: vFragmentNode, parentElement: body })
    appendFragmentNode({ node: vFragmentNode2, parentElement: body })

    const parseBody = parseDocument(body)
    expect(parseBody).toEqual(
      {
        tag: 'body',
        props: { id: 'parent' },
        children: [
          { tag: '', props: {}, children: [], text: 'foo' },
          { tag: '', props: {}, children: [], text: 'bar' },
          { tag: '', props: {}, children: [], text: 'foo' },
          { tag: '', props: {}, children: [], text: 'bar' }
        ]
      }
    )
    expect(vFragmentNode.domRef).toEqual(body)
    expect(vFragmentNode2.domRef).toEqual(body)
  })
})

describe('render element node', () => {
})