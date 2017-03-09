# cqrs-actions

> Flux command query action creator.

 An common query responsibility segregation action creator for 'flux-like' architecture. (Redux as an example)"


## Install

```sh
npm install --save-dev cqrs-actions
```

## Usage

```js
// actions.js
import Vue from 'vue'
import { createStore } from 'redux'
import Revue from 'revue'
import CQRSActions from 'cqrs-actions'

import reducer from './reducers'

const actions = new CQRSActions(
	new Revue(Vue, createStore(reducer)),
	{
		'LOAD': function () {
			ajaxlib.get('http://example.com')
				.then(this.resolve, this.reject)
		}
	}
)
export default actions

//vue
<script>
import actions from '../actions'

export default {
	data () {
		return {
			items: this.$bind('reducer_name as items')
		}
	},
	mounted () {
		if (!this.items) {
			actions.Query('LOAD')
		}
	},
	methods: {
		toggle (index) {
			actions.Command('TOGGLE', index)
		}
	}
}
</script>
```
