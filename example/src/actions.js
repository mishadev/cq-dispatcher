import Vue from 'vue'
import { createStore } from 'redux'
import CQActions from '../../src'

import Binder from './Binder'
import reducer from './reducers'

import webapi from './clients/webapi'

const actions = new CQActions(
  new Binder(Vue, createStore(reducer)), webapi)

export default actions
