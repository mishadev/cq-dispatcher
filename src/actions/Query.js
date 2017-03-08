import assert from 'assert'
import _ from 'lodash'

import store from '../store'
import WebApiClient from '../clients/WebApiClient'
import { success, reject, fails } from './Convention'

let _inprogress = {}
function Query(type, ...args) {
  assert(_.isString(type))

  let query = { type, args }
  let method = WebApiClient[type]
  let key = JSON.stringify(query)
  if (!_.isFunction(method) || key in _inprogress) {
    store.dispatch({
      ...query,
      type: reject(type),
    })
    return
  }

  _inprogress[key] = null
  store.dispatch(query)
  method.apply(WebApiClient, query.args)
    .then(
      (result) =>
        store.dispatch({
          ...query,
          result,
          type: success(type)
        }),
      (response) =>
        store.dispatch({
          ...query,
          error,
          type: fails(type)
        })
    )
}

export default Query
