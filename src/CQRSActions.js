import assert from 'assert'
import { success, rejected, fails } from './Convention'

export default class CQRSActions {
  constructor(dispatcher, methods) {
    this._dispatch = dispatcher.dispatch.bind(dispatcher)
    this._methods = methods
    this._inprogress = {}
  }
  _async(method, action, type) {
    return new Promise((resolve, reject) => {
      method.apply({ resolve, reject }, action.args)
    })
    .then(
      (result) => this._dispatch({
        ...action,
        result,
        type: success(type)
      }),
      (error) => this._dispatch({
        ...action,
        error,
        type: fails(type)
      })
    )
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
    this._async(method, query, type)
  }
}
