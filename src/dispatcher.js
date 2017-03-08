import Vue from 'vue'
import { createStore } from 'redux'

import Binder from './Binder'
import reducer from './reducers'

const store = createStore(reducer)
const dispatcher = new Binder(Vue, store)

export default dispatcher
