import { describe, test, expect } from "vitest";
import { mountDOM } from "./mount-dom";
import { createShadowElement, createShadowFragment, createShadowString } from "./shadowNodes";
import { parseDocument } from "../../libs/parse-document-api";

describe('mountDOM', () => {
  test('it mount a simple dom', () => {
    const shadowText = createShadowString('foo')
    const body = document.createElement('body')
    mountDOM({ vdom: shadowText, parentElement: body })

    const parseBody = parseDocument(body)
    expect(parseBody).toEqual({ tag: 'body', props: {}, children: [{ tag: '', props: {}, children: [], text: 'foo' }] })
  })

  test('it mount a fragment with many children', () => {
    const shadowText = createShadowString('foo')
    const shadowText2 = createShadowString('bar')
    const shadowFragment = createShadowFragment({ vNodes: [shadowText, shadowText2] })
    const body = document.createElement('body')
    mountDOM({ vdom: shadowFragment, parentElement: body })

    const parseBody = parseDocument(body)
    expect(parseBody).toEqual({
      tag: 'body',
      props: {},
      children: [
        { tag: '', props: {}, children: [], text: 'foo' },
        { tag: '', props: {}, children: [], text: 'bar' }
      ]
    })
  })

  test('it mount a element node with attributes', () => {
    const elementNode = createShadowElement('button', { id: 'foo', onClick: () => { console.log('hello world') } }, ['bar'])
    const body = document.createElement('body')
    mountDOM({ vdom: elementNode, parentElement: body })

    const parseBody = parseDocument(body)
    expect(JSON.stringify(parseBody)).toEqual(JSON.stringify({
      tag: 'body',
      props: {},
      children: [{
        tag: 'button',
        props: { id: 'foo' },
        children: [{ tag: '', props: {}, children: [], text: 'bar' }],
      }]
    }))
  })
})

// there is a way to write an export mountDOM somehow
