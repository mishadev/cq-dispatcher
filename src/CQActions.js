import assert from 'assert'
import _ from 'lodash'
import { success, reject, fails } from './Convention'

export default class CQActions {
  constructor(dispatcher, methods) {
    this.dispatcher = dispatcher
    this.methods = methods
    this._inprogress = {}
  }
  _async(method, action, type) {
    return new Promise((res, rej) => {
      method.apply({ res, rej }, action.args)
    })
    .then(
      (result) => this.dispatcher.dispatch({
        ...action,
        result,
        type: success(type)
      }),
      (error) => this.dispatcher.dispatch({
        ...action,
        error,
        type: fails(type)
      })
    )
  }
  Command (type, ...args) {
    assert(_.isString(type))

    let command = { type, args }
    this.dispatcher.dispatch(command)

    let method = this.methods[type]
    if(!_.isFunction(method)) return

    this._async(method, command, type)
  }
  Query (type, ...args) {
    assert(_.isString(type))

    let query = { type, args }
    let method = this.methods[type]
    let key = JSON.stringify(query)
    if (!_.isFunction(method) || key in this._inprogress) {
      this.dispatcher.dispatch({
        ...query,
        type: reject(type),
      })
      return
    }
    this._inprogress[key] = null
    this.dispatcher.dispatch(query)

    this._async(method, query, type)
  }
}
