import CQActions from '../../src/CQActions'

import dispatcher from './dispatcher'
import WebApiClient from './clients/WebApiClient'

const actions = new CQActions(dispatcher, WebApiClient)

export default actions
