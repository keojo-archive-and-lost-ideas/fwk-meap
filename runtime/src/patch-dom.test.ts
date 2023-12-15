import { describe, test, expect } from "vitest";
import { patchDOM } from "./patch-dom";
import { createShadowElement, createShadowFragment, createShadowString } from "./shadowNodes";
import { mountDOM } from "./mount-dom";

describe('patchDOM', () => {
  test('error with non mounted dom', () => {
    const oldVdom = null;
    const newVdom = createShadowElement('div', {}, [
      createShadowElement('h1', {} , [
        createShadowString('hello fwk')
      ]),
      createShadowElement('p', {} , [
        'fwk is a frontend framework'
      ])
    ])
    const body = document.createElement('body')

    expect(() => patchDOM({oldVdom, newVdom, parentElement:body})).toThrowError('Can\'t patch DOM of type: object')
  })

  test('patch text', () => {
    const oldVdom = createShadowString('hello')
    const newVdom = createShadowString('world')
    const body = document.createElement('body')
    mountDOM({vdom: oldVdom, parentElement:body})
    patchDOM({oldVdom, newVdom, parentElement:body})

    expect(body.outerHTML).toBe('<body>world</body>')
  })

  test('patch element', () => {
    const oldVdom = createShadowElement('div', {}, [
      createShadowElement('h1', {} , [
        createShadowString('hello fwk')
      ]),
      createShadowElement('p', {} , [
        'fwk is a frontend framework'
      ])
    ])
    const newVdom = createShadowElement('div', {}, [
      createShadowElement('h1', {} , [
        createShadowString('hello fwk')
      ]),
      createShadowElement('p', {} , [
        'fwk is a frontend framework',
        createShadowElement('span', {}, [' and it is awesome'])
      ])
    ])
    const body = document.createElement('body')
    mountDOM({vdom: oldVdom, parentElement:body})
    patchDOM({oldVdom, newVdom, parentElement:body})

    expect(body.outerHTML).toBe('<body><div><h1>hello fwk</h1><p>fwk is a frontend framework<span> and it is awesome</span></p></div></body>')
  })

  test('patch children', () => {
    const oldVdom = createShadowFragment({vNodes: [
      createShadowElement('h1', {} , [
        createShadowString('hello fwk')
      ]),
      createShadowElement('p', {} , [
        'fwk is a frontend framework'
      ])
    ]})
    const newVdom = createShadowFragment({vNodes: [
      createShadowElement('h1', {} , [
        createShadowString('hello fwk')
      ]),
      createShadowElement('p', {} , [
        'fwk is a frontend framework',
        createShadowElement('span', {}, [' and it is awesome'])
      ])
    ]})
    const body = document.createElement('body')
    mountDOM({vdom: oldVdom, parentElement:body})
    patchDOM({oldVdom, newVdom, parentElement:body})
    expect(body.outerHTML).toBe('<body><h1>hello fwk</h1><p>fwk is a frontend framework<span> and it is awesome</span></p></body>')
  })
})