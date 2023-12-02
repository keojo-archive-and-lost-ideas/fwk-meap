import { describe, test, expect } from "vitest";
import { createApp } from "./app";
import { createShadowElement } from "./shadowNodes";
import { parseDocument } from "../../libs/parse-document-api";

describe('createApp', () => {
  test('it create an app', () => {
    const app = createApp({
      state: {},
      view: (state:any, emit:any) => {
        return (
          createShadowElement('div', { id: 'foo' }, ['bar']),
        )
      },
      reducers: {}
    })
    const body = document.createElement('body')
    app.mount(body)

    const parseBody = parseDocument(body)
    console.log(parseBody)
    const stringifyBody = JSON.stringify(parseBody)
    console.log(stringifyBody)

    expect(stringifyBody).toEqual(JSON.stringify({
      tag: 'body',
      props: {},
      children: [{ tag: "div", props: { id: "foo" }, children: [{ tag: "", props: {}, children: [], text: "bar" }] }]
    }))
  })
})