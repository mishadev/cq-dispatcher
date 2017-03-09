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
		'LOAD': function (next_page_id) {
			ajaxlib.get('http://example.com', { next_page_id })
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
			items: this.$select('reducer_name as items')
		}
	},
	mounted () {
		if (!this.items) {
			actions.Query('LOAD', 'next_page_id')
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
