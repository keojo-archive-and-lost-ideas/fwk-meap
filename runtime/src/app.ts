import { destroyDOM } from './destroy-dom'
import { mountDOM } from './mount-dom'
import { Dispatcher } from './dispatcher'
import { VirtualNode } from './types'


export function createApp({ state, view, reducers = {} }: { state: any, view: any, reducers?: any }) {
  let parentElement: HTMLElement | null = null
  let vdom: VirtualNode = null
  let isMounted = false

  const dispatcher = new Dispatcher()
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

  function emit(eventName: string, payload: any) {
    dispatcher.dispatch(eventName, payload)
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName]

    const subs = dispatcher.subscribe(actionName, (payload: any) => {
      state = reducer(state, payload)
    })
    subscriptions.push(subs)
  }

  function renderApp() {
    if(vdom) {
      destroyDOM({ vdom })
    }

    vdom = view(state, emit)
    mountDOM({ vdom, parentElement })
  }

  return {
    mount(_parentElement: HTMLElement) {
      if (isMounted) {
        throw new Error('App is already mounted')
      }
      parentElement = _parentElement
      renderApp()

      isMounted = true
    },

    unmount() {
      destroyDOM({ vdom })
      vdom = null
      subscriptions.forEach((unsubscribe) => unsubscribe())
      isMounted = false
    },

    emit(eventName, payload) {
      emit(eventName, payload)
    },
  }

}

export default createApp