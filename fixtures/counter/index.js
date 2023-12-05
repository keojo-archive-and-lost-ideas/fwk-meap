import {createApp, createShadowElement, createShadowString} from '../../runtime/src'

createApp({
  state: 0,

  reducers: {
    add: (state, amount) => state + amount,
  },

  view: (state, emit) =>
  createShadowElement(
      'button',
      { on: { click: () => emit('add', 1) } },
      [state]
    ),
}).mount(document.querySelector('body'))