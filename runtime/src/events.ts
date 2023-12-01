import { VirtualNode } from "./types"

export function addEventListener({ eventName, handler, element }: { eventName: string, handler: () => any, element: HTMLElement }) {
  element.addEventListener(eventName, handler)
  return handler
}

export function addEventListeners({ listeners = {}, element }: { listeners: object, element: HTMLElement }) {
  const addedListeners: Record<string, () => any> = {}

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener({ eventName, handler, element })
    addedListeners[eventName] = listener
  })

  return addedListeners
}

export function removeEventListeners({ element, listeners }: { element: HTMLElement | Text | null | undefined, listeners: {[key: string]: (event: Event) => void} }) {
  if(!element) return
  Object.entries(listeners).forEach(([eventName, handler]) => {
    element.removeEventListener(eventName, handler)
  })
}