import assert from 'assert'
import _ from 'lodash'

import store from '../store'
import WebApiClient from '../clients/WebApiClient'
import { success, fails } from './Convention'

function Command(type, ...args) {
  assert(_.isString(type))

  let command = { type, args }
  store.dispatch(command)
  let method = WebApiClient[type]
  if(!_.isFunction(method)) return

  method.apply(WebApiClient, command.args)
    .then(
      (result) =>
        store.dispatch({
          ...command,
          result,
          type: success(type)
        }),
      (error) =>
        store.dispatch({
          ...command,
          error,
          type: fails(type)
        })
    )
}

export default Command
