export interface DOMAttributes {
  class?: string;
  classNames?: string[];
  style?:  Record<string, string>;
  [key: string]: any
}

export const DOM_TYPES = {
  TEXT: 'text',
  ELEMENT: 'element',
  FRAGMENT: 'fragment',
} as const

export const ARRAY_DIFF_OP = {
  ADD: 'add',
  REMOVE: 'remove',
  MOVE: 'move',
  NOOP: 'noop',
} as const


interface Node {
  domRef?: HTMLElement | Text | null;
}

/*
* VirtualTextNode represents a text node in the virtual DOM.
* since all Node have type virtualTextNode is type of `text`
* since we need the value of the text node, we add a value property of type string
*/
export interface VirtualTextNode extends Node {
  type: 'text'
  value: string;
  domRef?: Text;
} 

/*
* VirtualElementNode represents an element node in the virtual DOM.
* since all Node have type virtualElementNode is type of `element`
* since we need the tag of the element node, we add a tag property of type string
* since we need the props of the element node, we add a props property of type DOMAttributes
* since we need the children of the element node, we add a children property of type VirtualNode[]
*/
export interface VirtualElementNode extends Node {
  type: 'element';
  tag: string | object;
  props: DOMAttributes | null;
  children: VirtualNode[];
  listeners?: { [key: string]: (event: Event) => void };
  domRef?: HTMLElement;
}

/*
* VirtualFragmentNode represents a fragment node in the virtual DOM.
* since all Node have type virtualFragmentNode is type of `fragment`
* TODO: i'm not too sure why we need fragment, i must explain it
*/
export interface VirtualFragmentNode extends Node {
  type: 'fragment';
  children: VirtualNode[];
}

// Here, I've defined VitrualNode as a type that can be any of the three specific node types, null, or string
export type VirtualNode = VirtualTextNode | VirtualElementNode | VirtualFragmentNode | null | string | Array<string|null> ;
export type MontedVirtualNode = VirtualTextNode | VirtualElementNode | VirtualFragmentNode

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export type Vdom = VirtualNode