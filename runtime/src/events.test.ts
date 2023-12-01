import { describe, test, expect } from "vitest";
import { addEventListener, addEventListeners, removeEventListeners } from "./events";

describe('add events', () => {
  test('addEventListener should add the event ont the element and return the listener', () => {
    const element = document.createElement('div')
    const listener = addEventListener({ element, eventName: 'click', handler: () => { console.log('test') } })

    // there is not way to check for event listener on dom element 😭
    expect(JSON.stringify(listener.toString())).toEqual(JSON.stringify("() => {\n      console.log(\"test\");\n    }"))
  })

  test('addEventListeners should add the events on the element and return the listeners', () => {
    const element = document.createElement('div')
    const handlers = addEventListeners({ element, listeners:{
      click: () => { console.log('test') },
      mouseover: () => { console.log('test2') }
    }})

    const clickListeners = handlers['click']
    const mouseoverListeners = handlers['mouseover']
    console.log(JSON.stringify(clickListeners.toString()))
    expect(JSON.stringify(clickListeners.toString())).toEqual(JSON.stringify("() => {\n        console.log(\"test\");\n      }"))
    expect(JSON.stringify(mouseoverListeners.toString())).toEqual(JSON.stringify("() => {\n        console.log(\"test2\");\n      }"))
  })
})


// there is not way to check for event listener on dom element 😭
// describe('remove events', () => {})