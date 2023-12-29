// // i wanted to make the explaination of the dispatcher, the state and renderer a little more clear

// let counter = 0

// const dispatcher = {
//   subscriptions: new Map<string, Function[]>(),
//   afterEveryDispatch: [],
//   dispatch: function(action: string, payload?: any) {
//     this.subscriptions.get(action)?.forEach((callback: Function) => {
//       callback(payload)
//     })
//     this.afterEveryDispatch.forEach((callback: Function) => callback(payload))
//   },
// }


// const effects = {
//   increment: function() {
//     dispatcher.dispatch('increment')
//   },
//   decrement: function() {
//     dispatcher.dispatch('decrement')
//   },
// }

// effects.increment()
// effects.decrement()

// console.log("counter", counter)

// dispatcher.subscriptions.set('increment',[( payload)=> {
//   console.log('doing something')
//   counter++;
// }])
// dispatcher.subscriptions.set('decrement',[ (payload)=> {
//   console.log('doing something else')
//   counter--;
// }])

// effects.increment()
// effects.decrement()
// effects.increment()

// console.log("counter", counter)