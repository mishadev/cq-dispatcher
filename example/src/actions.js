import Vue from 'vue'
import { createStore } from 'redux'
import CQRSActions from '../../src'

import Revue from 'revue'
import reducer from './reducers'

import webapi from './clients/webapi'

const actions = new CQRSActions(
  new Revue(Vue, createStore(reducer)), webapi)

export default actions
