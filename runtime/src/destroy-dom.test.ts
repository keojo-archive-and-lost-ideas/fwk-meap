import { describe, test, expect } from "vitest";

import { destroyDOM } from "./destroy-dom";
import { mountDOM } from "./mount-dom";
import { createShadowElement } from "./shadowNodes";
import { parseDocument } from "../../libs/parse-document-api";


describe('destroy-dom', () => {
  test('it remove a text node', () => {
    const shadowText = createShadowElement('foo')
    const body = document.createElement('body')
    mountDOM({ vdom: shadowText, parentElement: body })

    destroyDOM({ vdom: shadowText })

    const parseBody = parseDocument(body)
    expect(parseBody?.children).toEqual([])
  })

  test('it remove a fragment with many children', () => {
    const shadowText = createShadowElement('foo')
    const shadowText2 = createShadowElement('bar')
    const shadowFragment = createShadowElement('div', {}, [shadowText, shadowText2])
    const body = document.createElement('body')
    mountDOM({ vdom: shadowFragment, parentElement: body })

    destroyDOM({ vdom: shadowFragment })

    const parseBody = parseDocument(body)
    expect(parseBody?.children).toEqual([])
  })


  test('it remove a element node with attributes', () => {
    const elementNode = createShadowElement('button', { id: 'foo', onClick: () => { console.log('hello world') } }, ['bar'])
    const body = document.createElement('body')
    mountDOM({ vdom: elementNode, parentElement: body })

    destroyDOM({ vdom: elementNode })

    const parseBody = parseDocument(body)
    expect(parseBody?.children).toEqual([])
  })
})