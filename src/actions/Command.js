import assert from 'assert'
import _ from 'lodash'

import dispatcher from '../dispatcher'
import WebApiClient from '../clients/WebApiClient'
import { success, fails } from './Convention'

function Command(type, ...args) {
  assert(_.isString(type))

  let command = { type, args }
  dispatcher.dispatch(command)
  let method = WebApiClient[type]
  if(!_.isFunction(method)) return

  method.apply(WebApiClient, command.args)
    .then(
      (result) =>
        dispatcher.dispatch({
          ...command,
          result,
          type: success(type)
        }),
      (error) =>
        dispatcher.dispatch({
          ...command,
          error,
          type: fails(type)
        })
    )
}

export default Command
