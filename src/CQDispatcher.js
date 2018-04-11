import assert from 'assert'
import { success, rejected, fails } from './Convention'

export default class CQDispatcher {
  constructor(dispatcher, methods) {
    this._dispatch = dispatcher.dispatch.bind(dispatcher)
    this._methods = methods
    this._inprogress = {}
  }
  _async(method, action, type, key) {
    const promise = method(...action.args)
    return promise
      .then(result => {
        delete this._inprogress[key]
        return this._dispatch({
          ...action,
          result,
          type: success(type)
        })
      })
      .catch(error => {
        delete this._inprogress[key]
        this._dispatch({
          ...action,
          error,
          type: fails(type)
        })
      })
  }
  Command (type, ...args) {
    assert(typeof type === 'string')

    let command = { type, args }
    this._dispatch(command)

    let method = this._methods[type]
    if(typeof method !== 'function') return

    this._async(method, command, type)
  }
  Query (type, ...args) {
    assert(typeof type === 'string')

    let query = { type, args }
    let method = this._methods[type]
    let key = JSON.stringify(query)
    if (
      typeof method !== 'function' ||
      key in this._inprogress
    ) {
      this._dispatch({
        ...query,
        type: rejected(type),
      })
      return
    }
    this._inprogress[key] = null

    this._dispatch(query)
    this._async(method, query, type, key)
  }
}
