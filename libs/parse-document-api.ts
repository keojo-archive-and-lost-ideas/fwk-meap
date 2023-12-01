interface DOMObject {
  tag: string;
  props: { [key: string]: string };
  children: DOMObject[];
  text?: string;
}

export function parseDocument(node: HTMLElement | Text | null | undefined): DOMObject | null {
  if (!node) return null;
  if (node.nodeType === Node.TEXT_NODE) {
    const textNode = node as Text;
    return { tag: '', props: {}, children: [], text: textNode.textContent || '' };
  }

  const elementNode = node as HTMLElement;
  let result: DOMObject = {
    tag: elementNode.tagName.toLowerCase(),
    props: {},
    children: []
  };

  // Get node attributes and add them to props
  for (let i = 0; i < elementNode.attributes.length; i++) {
    const attr = elementNode.attributes[i];
    result.props[attr.name] = attr.value;
  }

  // Get child nodes and call the function recursively
  for (let i = 0; i < elementNode.childNodes.length; i++) {
    const childNode = parseDocument(elementNode.childNodes[i] as HTMLElement | Text);
    if (childNode) {
      result.children.push(childNode);
    }
  }

  return result;
}