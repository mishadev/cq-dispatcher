import Vue from 'vue'
import { createStore } from 'redux'
import CQDispatcher from '../../src'

import Revue from 'revue'
import reducer from './reducers'

import webapi from './clients/webapi'

const dispatcher = new CQDispatcher(
  new Revue(Vue, createStore(reducer)), webapi)

export default dispatcher
