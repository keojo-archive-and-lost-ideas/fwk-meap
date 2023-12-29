// here i would like to show you how to use the dispatcher in a more complex way

let counter = 0
const view = (counter: number) => `
<button>increment</button>
<span>${counter}</span>
<button>decrement</button>
`

let dom;

const render = () => {
  dom = view(counter)
}

render()

console.log(dom)

const dispatcher = {
  subscriptions: new Map<string, Function[]>(),
  afterEveryDispatch: [],
  dispatch: function(action: string, payload?: any) {
    this.subscriptions.get(action)?.forEach((callback: Function) => {
      callback(payload)
    })
    this.afterEveryDispatch.forEach((callback: Function) => callback(payload))
  },
}

dispatcher.afterEveryDispatch.push(render)

dispatcher.subscriptions.set('increment',[( payload)=> {
  counter++;
}])

// const button = document.querySelector('button')
// button.addEventListener('click', () => {
//   dispatcher.dispatch('increment')
// })

dispatcher.dispatch('increment')

console.log(dom)