<template>
	<div class="write">
		<input type="text" class="input-todo" v-model="todoText"><button class="add" @click="addTodo()">add todo</button>
		<h3>{{ todos.error }}</h3>
		<h2>Writable todos</h2>
		{{ todos.isLoading ? 'Loading...' : '' }}
		{{ todos.isPosting ? 'Posting...' : '' }}
		<ul class="todos" v-if="todos.items && todos.items.length > 0">
			<li class="todo" :class="{del: todo.done}" v-for="(todo, index) in todos.items" key="$index" v-text="todo.text" @click="toggleTodo(index)"></li>
		</ul>
	</div>
</template>

<script>
import Query from '../actions/Query'
import Command from '../actions/Command'
import { LOAD_TODOS, TOGGLE_TODO, ADD_TODO } from '../actions/ActionTypes'
import { has } from 'lodash'

export default {
	data () {
		return {
			todoText: '',
			todos: this.$bind('todos')
		}
	},
	mounted () {
		if (!has(this.todos, 'items')) {
			Query(LOAD_TODOS)
		}
	},
	methods: {
		toggleTodo (index) {
			Command(TOGGLE_TODO, index)
		},
		addTodo (text = this.todoText) {
			if (!text) return

			Command(ADD_TODO, text)

			this.todoText = ''
		},
	}
}
</script>
