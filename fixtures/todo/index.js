import {createApp, createShadowElement, createShadowFragment} from '../../runtime/src'

const state = {
  currentTodo: '',
  edit: {
    idx: null,
    original: null,
    edited: null,
  },
  todos: ['Walk the dog', 'Water the plants'],
}

const reducers = {
  'update-current-todo': (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),

  'add-todo': (state) => ({
    ...state,
    currentTodo: '',
    todos: [...state.todos, state.currentTodo],
  }),

  'start-editing-todo': (state, idx) => ({
    ...state,
    edit: {
      idx,
      original: state.todos[idx],
      edited: state.todos[idx],
    },
  }),

  'edit-todo': (state, edited) => ({
    ...state,
    edit: { ...state.edit, edited },
  }),

  'save-edited-todo': (state) => {
    const todos = [...state.todos]
    todos[state.edit.idx] = state.edit.edited

    return {
      ...state,
      edit: { idx: null, original: null, edited: null },
      todos,
    }
  },

  'cancel-editing-todo': (state) => ({
    ...state,
    edit: { idx: null, original: null, edited: null },
  }),

  'remove-todo': (state, idx) => ({
    ...state,
    todos: state.todos.filter((_, i) => i !== idx),
  }),
}

function CreateTodo({ currentTodo }, emit) {
  return createShadowElement('div', {}, [
    createShadowElement('label', { for: 'todo-input' }, ['New TODO']),
    createShadowElement('input', {
      type: 'text',
      id: 'todo-input',
      value: currentTodo,
      on: {
        input: ({ target }) => emit('update-current-todo', target.value),
        keydown: ({ key }) => {
          if (key === 'Enter' && currentTodo.length >= 3) {
            emit('add-todo')
          }
        },
      },
    }),
    createShadowElement(
      'button',
      {
        disabled: currentTodo.length < 3,
        on: { click: () => emit('add-todo') },
      },
      ['Add']
    ),
  ])
}

function TodoList({ todos, edit }, emit) {
  return createShadowElement(
    'ul',
    {},
    todos.map((todo, i) => TodoItem({ todo, i, edit }, emit))
  )
}

function TodoItem({ todo, i, edit }, emit) {
  const isEditing = edit.idx === i

  const editTodo =  createShadowElement('li', {}, [
    createShadowElement('input', {
      value: edit.edited,
      on: {
        input: ({ target }) => emit('edit-todo', target.value)
      },
    }),
    createShadowElement(
      'button',
      {
        on: {
          click: () => emit('save-edited-todo')
        }
      },
      ['Save']
    ),
    createShadowElement(
      'button',
      {
        on: {
          click: () => emit('cancel-editing-todo')
        }
      },
      ['Cancel']
    ),
  ])

  const viewTodo = createShadowElement('li', {}, [
    createShadowElement(
      'span',
      {
        on: {
          dblclick: () => emit('start-editing-todo', i)
        }
      },
      [todo]
    ),
    createShadowElement(
      'button',
      {
        on: {
          click: () => emit('remove-todo', i)
        }
      },
      ['Done']
    ),
  ])

  return isEditing ? editTodo : viewTodo
}

function App(state, emit) {
  const abc  = createShadowFragment({vNodes: [
    createShadowElement('h1', {}, ['My TODOs']),
    CreateTodo(state, emit),
    TodoList(state, emit),
  ]})

  console.log('App', { abc })
  return abc
}



createApp({ state, reducers, view: App }).mount(document.body)

