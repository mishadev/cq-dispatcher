import {
  ADD_TODO,
  TOGGLE_TODO,
  LOAD_TODOS
} from '../actions/ActionTypes'

import { success, fails } from '../actions/Convention'

const _reduce = {
  [LOAD_TODOS]: (state) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [success(LOAD_TODOS)]: (state, result) => {
    return {
      ...state,
      items: result,
      isLoading: false
    }
  },
  [ADD_TODO]: (state, text) => {
    return {
      ...state,
      isPosting: true
    }
  },
  [success(ADD_TODO)]: (state, text) => {
    return {
      ...state,
      isPosting: false,
      error: null,
      items: [
        ...state.items,
        {
          text: text,
          done: false
        }
      ]
    }
  },
  [fails(ADD_TODO)]: (state, text, error) => {
    return {
      ...state,
      isPosting: false,
      error: `Error: ${error} adding: ${text}`
    }
  },
  [TOGGLE_TODO]: (state, index) => {
    return {
      ...state,
      items: state.items.map((todo, i) => {
        if (i === index) {
          return {
            text: todo.text,
            done: !todo.done
          }
        }
        return todo
      })
    }
  }
}

export default function todos(state = {}, action) {
  if (!_reduce[action.type]) return state

  let args = [...action.args]
  if ('result' in action) args.push(action.result)
  else if ('error' in action) args.push(action.error)

  return _reduce[action.type](state, ...args);
}
