import { describe, test, expect } from "vitest";
import { appendElementNode, appendFragmentNode, appendTextNode } from './append';
import { createShadowElement, createShadowFragment, createShadowString } from "./shadowNodes";
import { parseDocument } from "../../libs/parse-document-api";
describe('append text node', () => {
  test('it append to the parent node', () => {
    const vTextNode = createShadowString('foo');
    const body = document.createElement('body');
    const node = appendTextNode({
      node: vTextNode,
      parentElement: body
    });
    const parseBody = parseDocument(body);
    // nodeType https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
    expect(parseBody).toEqual({
      tag: 'body',
      props: {},
      children: [{
        tag: '',
        props: {},
        children: [],
        text: 'foo'
      }]
    });
  });
  test('it create a ref to the dom node', () => {
    const vTextNode = createShadowString('foo');
    const body = document.createElement('body');
    appendTextNode({
      node: vTextNode,
      parentElement: body
    });
    const JSONRef = parseDocument(vTextNode.domRef);
    console.log(JSONRef);
    expect(JSONRef).toEqual({
      tag: '',
      props: {},
      children: [],
      text: 'foo'
    });
  });
});
describe('append fragment node', () => {
  test(`domRef of fragmentNode should be the parentElement`, () => {
    const vFragmentNode = createShadowFragment({
      vNodes: ['foo', 'bar']
    });
    const body = document.createElement('body');
    body.setAttribute('id', 'parent');
    appendFragmentNode({
      node: vFragmentNode,
      parentElement: body
    });
    const JSONRef = parseDocument(vFragmentNode.domRef);
    expect(JSONRef).toEqual({
      tag: 'body',
      props: {
        id: 'parent'
      },
      children: [{
        tag: '',
        props: {},
        children: [],
        text: 'foo'
      }, {
        tag: '',
        props: {},
        children: [],
        text: 'bar'
      }]
    });
  });
  test('it append others nodes to the parent node', () => {
    const vFragmentNode = createShadowFragment({
      vNodes: ['foo', 'bar']
    });
    const body = document.createElement('body');
    body.setAttribute('id', 'parent');
    appendFragmentNode({
      node: vFragmentNode,
      parentElement: body
    });
    const parseBody = parseDocument(body);
    expect(parseBody).toEqual({
      tag: 'body',
      props: {
        id: 'parent'
      },
      children: [{
        tag: '',
        props: {},
        children: [],
        text: 'foo'
      }, {
        tag: '',
        props: {},
        children: [],
        text: 'bar'
      }]
    });
  });
  test('multiple siblings fragment will point to the same parent node', () => {
    const vFragmentNode = createShadowFragment({
      vNodes: ['foo', 'bar']
    });
    const vFragmentNode2 = createShadowFragment({
      vNodes: ['foo', 'bar']
    });
    const body = document.createElement('body');
    body.setAttribute('id', 'parent');
    appendFragmentNode({
      node: vFragmentNode,
      parentElement: body
    });
    appendFragmentNode({
      node: vFragmentNode2,
      parentElement: body
    });
    const parseBody = parseDocument(body);
    expect(parseBody).toEqual({
      tag: 'body',
      props: {
        id: 'parent'
      },
      children: [{
        tag: '',
        props: {},
        children: [],
        text: 'foo'
      }, {
        tag: '',
        props: {},
        children: [],
        text: 'bar'
      }, {
        tag: '',
        props: {},
        children: [],
        text: 'foo'
      }, {
        tag: '',
        props: {},
        children: [],
        text: 'bar'
      }]
    });
    expect(vFragmentNode.domRef).toEqual(body);
  });
});
describe('append element node', () => {
  test('it can create any html element', () => {
    const shadowElement = createShadowElement('div', {
      id: 'foo'
    });
    const shadowElement2 = createShadowElement('span', {
      id: 'foo'
    });
    const body = document.createElement('body');
    appendElementNode({
      node: shadowElement,
      parentElement: body
    });
    appendElementNode({
      node: shadowElement2,
      parentElement: body
    });
    const parseBody = parseDocument(body);
    const jsonStringifyBody = JSON.stringify(parseBody);
    expect(jsonStringifyBody).toEqual(JSON.stringify({
      tag: 'body',
      props: {},
      children: [{
        tag: 'div',
        props: {
          id: 'foo'
        },
        children: []
      }, {
        tag: 'span',
        props: {
          id: 'foo'
        },
        children: []
      }]
    }));
  });
  test('it append to an element and have sub element appended to it', () => {
    const shadowElement = createShadowElement('div', {
      id: 'foo'
    }, ['bar']);
    const body = document.createElement('body');
    appendElementNode({
      node: shadowElement,
      parentElement: body
    });
    const parseBody = parseDocument(body);
    const stringifyBody = JSON.stringify(parseBody);
    expect(stringifyBody).toEqual(JSON.stringify({
      tag: 'body',
      props: {},
      children: [{
        tag: 'div',
        props: {
          id: 'foo'
        },
        children: [{
          tag: '',
          props: {},
          children: [],
          text: 'bar'
        }]
      }]
    }));
  });
});