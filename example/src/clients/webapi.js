import { LOAD_TODOS, ADD_TODO } from '../ActionTypes'

let idx = 0;
export default {
  [LOAD_TODOS]: function () {
    setTimeout(() => {

      let serverResponse = {
        data: [
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
        }],
        error: null
      }
      this.resolve(serverResponse.data)

    }, 2000)
  },
  [ADD_TODO]: function (text) {
    setTimeout(() => {

      if (idx++ % 2) {
        let serverResponse = {
          data: null,
          error: 'idx % 2 == 0 => Server Error'
        }
        this.reject(serverResponse.error)
      } else {
        let serverResponse = {
          data: {
            text,
            done: false
          },
          error: null
        }
        this.resolve(serverResponse.data)
      }

    }, 1000)
  }
}
