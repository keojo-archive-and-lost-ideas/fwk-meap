export function setAttributes(element:HTMLElement, attributes: Record<string, any>) {
  const { class: className, style, ...otherAttrs } = attributes

  if (className) {
    setClass(element, className)
  }

  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(element, prop, value as any)
    })
  }

  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttribute(element, name, value)
  }
}

// TODO: implement setClass
export function setClass(element:HTMLElement, className:string | string[]) {
  element.className = ''

  if (typeof className === 'string') {
    element.className = className
  }

  if (Array.isArray(className)) {
    element.classList.add(...className)
  }
}

// TODO: implement setStyle
// keyof CSSStyleDeclaration
export function setStyle(element: HTMLElement, name: string, value: string | null): void {
  //@ts-ignore
  element.style[name] = value;
}

export function removeStyle(element:HTMLElement, name:string) {
  //@ts-ignore
  element.style[name] = ''
}

// TODO: implement setAttribute

export function setAttribute(element:HTMLElement, name:string, value:string | null) {
  if (value == null) {
    removeAttribute(element, name)
  } else if (name.startsWith('data-')) {
    element.setAttribute(name, value)
  } else {
    (element as any)[name] = value
  }
}

export function removeAttribute(element:HTMLElement, name:string) {
  (element as any)[name] = null
  element.removeAttribute(name)
}