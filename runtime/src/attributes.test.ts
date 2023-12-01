import { describe, test, expect } from "vitest";
import { removeStyle, setAttributes, setClass, setStyle } from "./attributes";

describe('attributes', () => {
  test('setAttribute add attributes to element', () => {
    const element = document.createElement('div')
    element.setAttribute('id', 'foo')

    expect(element.getAttribute('id')).toEqual('foo')
  })

  test('removeAttribute remove attributes from element', () => {
    const element = document.createElement('div')
    element.setAttribute('id', 'foo')
    element.removeAttribute('id')

    expect(element.getAttribute('id')).toEqual(null)
  })

  test('setAttributes and delete attributes lsit', () => {
    const element = document.createElement('div')
    element.setAttribute('id', 'foo')
    const attributes = { id: null, class: 'bar', 'data-is': 'test'}
    setAttributes(element, attributes)

    expect(element.getAttribute('id')).toEqual(null)
    expect(element.getAttribute('class')).toEqual('bar')
    expect(element.getAttribute('data-is')).toEqual('test')
  })
})

describe('class', () => {
  test('it add a string class', () => {
    const element = document.createElement('div')
    setClass(element, 'foo bar')

    expect(element.className).toEqual('foo bar')
  })

  test('it add an array of classes', () => {
    const element = document.createElement('div')
    setClass(element, ['foo', 'bar'])

    expect(element.className).toEqual('foo bar')
  })
})

describe('styles', () => {
  test('it add a style to an element', () => {
    const element = document.createElement('div')
    setStyle(element, 'color', 'red')

    expect(element.style.color).toEqual('red')
  })

  test.only('it remove a style from an element', () => {
    const element = document.createElement('div')
    setStyle(element, 'color', 'red')
    console.log(element.style.color) 
    removeStyle(element, 'color')

    expect(element.style.color).toEqual('')
  })
})
