export class Dispatcher {
  #subs = new Map()
  #afterHandlers: any[] = []

  subscribe(commandName: string, handler: Function) {
    if (!this.#subs.has(commandName)) {
      this.#subs.set(commandName, [])
    }

    const handlers = this.#subs.get(commandName)
    if (handlers?.includes(handler)) {
      return () => { }
    }

    handlers?.push(handler)

    return () => {
      const idx = handlers?.indexOf(handler)
      handlers?.splice(idx, 1)
    }
  };

  afterEveryCommand(handler: () => any) {
    this.#afterHandlers.push(handler)

    return () => {
      const idx = this.#afterHandlers.indexOf(handler)
      this.#afterHandlers.splice(idx, 1)
    }
  }

  dispatch(commandName: string, payload: any) {
    if (this.#subs.has(commandName)) {
      this.#subs.get(commandName).forEach((handler: (arg: any) => any) => handler(payload))
    } else {
      console.warn(`No handlers for command: ${commandName}`)
    }

    this.#afterHandlers.forEach(handler => handler())
  }

  getHandlers(commandName: string) {
    return this.#subs.get(commandName)
  }

  getAfterHandlers() {
    return this.#afterHandlers
  }
}