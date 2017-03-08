import dotProp from 'dot-prop'

// to valid and match like `a as x.y.z`
const re = /^([\w\.-]+)\s+as\s+([\w\.-]+)$/i

function parseProp(prop) {
	let realProp = prop
	let storeProp = prop
	if (re.test(prop)) {
		[, storeProp, realProp] = prop.match(re)
	}
	return {storeProp, realProp}
}

function deepProp(obj, path){
	return path.split('.').reduce((o, p) => o[p], obj);
};

function _bind(Vue, store) {
	Vue.mixin({
		created() {
			if (this._bindProps) {
				const handleChange = () => {
					this._bindProps.forEach(prop => {
						const {storeProp, realProp} = prop
						if (realProp && storeProp) {
							dotProp.set(this, realProp, deepProp(store.getState(), storeProp))
						}
					})
				}
				this._unsubscribe = store.subscribe(handleChange)
			}
		},
		beforeDestroy() {
			if (this._unsubscribe) {
				this._unsubscribe()
			}
		}
	})
	Vue.prototype.$bind = function (prop) {
		this._bindProps = this._bindProps || []
		prop = parseProp(prop)
		this._bindProps.push(prop)
		return deepProp(store.getState(), prop.storeProp)
	}
}

export default class Revue {
	constructor(Vue, reduxStore) {
		this.store = reduxStore
		_bind(Vue, this.store)
	}
	dispatch(...args) {
    console.log(args[0]);
		return this.store.dispatch(...args)
	}
}
