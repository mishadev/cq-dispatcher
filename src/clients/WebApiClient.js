import { LOAD_TODOS, ADD_TODO } from '../actions/ActionTypes'

const defaultTodos = [
{
  text: 'Rule the web',
  done: true
},
{
  text: 'Conquer the world',
  done: false
},
{
  text: 'Meet a girl',
  done: false
}]

let idx = 0;
export default {
  [LOAD_TODOS]: () =>
    new Promise((res, rej) => {
      setTimeout(() => {

        let serverResponse = {
          data: defaultTodos,
          error: null
        }

        res(serverResponse.data)
      }, 2000)
    }),
  [ADD_TODO]: (text) =>
    new Promise((res, rej) => {
      setTimeout(() => {

        if (idx++ % 2) {
          let serverResponse = {
            data: {
              text,
              done: false
            },
            error: null
          }
          res(serverResponse.data)
        } else {
          let serverResponse = {
            data: null,
            error: 'idx % 2 == 0 => Server Error'
          }
          rej(serverResponse.error)
        }
      }, 1000)
    }),
}
