import { describe, test, expect } from "vitest";
import { createShadowString, createShadowFragment, createShadowElement } from "./shadowNodes";
describe('createShadowString', () => {
  test('creates a virtual node', () => {
    const node = createShadowString('foo');
    expect(node).toEqual({
      type: 'text',
      value: 'foo'
    });
  });
});
describe('createShadowFragment', () => {
  test('it create a virtual node', () => {
    const node = createShadowFragment({
      vNodes: ['foo', 'bar']
    });
    expect(node).toEqual({
      type: 'fragment',
      children: [{
        type: 'text',
        value: 'foo'
      }, {
        type: 'text',
        value: 'bar'
      }]
    });
  });
  test('create virtual node with nested children', () => {
    const node = createShadowFragment({
      vNodes: ['foo', ['bar', 'baz']]
    });
    expect(node).toEqual({
      type: 'fragment',
      children: [{
        type: 'text',
        value: 'foo'
      }, ['bar', 'baz']]
    });
  });
});
describe('createShadowElement', () => {
  test('creates a virtual node', () => {
    const node = createShadowElement('div', {
      id: 'foo'
    }, ['bar']);
    expect(node).toEqual({
      tag: 'div',
      props: {
        id: 'foo'
      },
      children: [{
        type: 'text',
        value: 'bar'
      }],
      type: 'element'
    });
  }), test('remove nulls from children', () => {
    const node = createShadowElement('div', {
      id: 'foo'
    }, ['bar', null, 'baz']);
    expect(node).toEqual({
      tag: 'div',
      props: {
        id: 'foo'
      },
      children: [{
        type: 'text',
        value: 'bar'
      }, {
        type: 'text',
        value: 'baz'
      }],
      type: 'element'
    });
  }), test('handles nested children', () => {
    const node = createShadowElement('div', {
      id: 'foo'
    }, ['bar', null, ['baz', null, 'qux']]);
    expect(node).toEqual({
      tag: 'div',
      props: {
        id: 'foo'
      },
      children: [{
        type: 'text',
        value: 'bar'
      }, ['baz', null, 'qux']],
      type: 'element'
    });
  });
  test('handle text nodes', () => {
    const text = createShadowElement('span', {}, ['foo']);
    expect(text).toEqual({
      tag: 'span',
      props: {},
      children: [{
        type: 'text',
        value: 'foo'
      }],
      type: 'element'
    });
  });
});