export function parseDocument(node) {
    if (!node)
        return null;
    if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node;
        return { tag: '', props: {}, children: [], text: textNode.textContent || '' };
    }
    const elementNode = node;
    let result = {
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
        const childNode = parseDocument(elementNode.childNodes[i]);
        if (childNode) {
            result.children.push(childNode);
        }
    }
    return result;
}
