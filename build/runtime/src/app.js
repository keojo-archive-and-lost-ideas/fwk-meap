import { destroyDOM } from './destroy-dom';
import { mountDOM } from './mount-dom';
import { Dispatcher } from './dispatcher';
export function createApp({
  state,
  view,
  reducers = {}
}) {
  let parentElement = null;
  let vdom = null;
  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];
  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }
  for (const actionName in reducers) {
    const reducer = reducers[actionName];
    const subs = dispatcher.subscribe(actionName, payload => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }
  function renderApp() {
    if (vdom) {
      destroyDOM({
        vdom
      });
    }
    vdom = view(state);
    mountDOM({
      vdom,
      parentElement
    });
  }
  return {
    mount(_parentElement) {
      parentElement = _parentElement;
      renderApp();
    },
    unmount() {
      destroyDOM({
        vdom
      });
      vdom = null;
      subscriptions.forEach(unsubscribe => unsubscribe());
    }
  };
}
export default createApp;