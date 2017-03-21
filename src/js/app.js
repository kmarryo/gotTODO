var todoApp = new Vue({
    el: '#todo-container',
    data: {
        todos: [
            {
                id: 1,
                name: '',
                done: false,
                priority: 'Normal'
            }
        ]
    },
    ready: function () {
        //this.checkDone();
    },
    methods: {
        toggleDone: function (todo) {
            todo.done = !todo.done;
        },
        deleteTodo: function (todo) {
            var index = this.todos.indexOf(todo)
            this.todos.splice(index, 1)
        },
        setPriority: function (todo) {
            todo.priority === 'High' ? todo.priority = 'Normal' : todo.priority = 'High';
        },
        addItem: function (todo) {
            var idCounter = this.todos.length+1;
            console.log('this.todos.length', this.todos.length);

            if(todo === this.todos[this.todos.length-1]) {
                this.todos.push(
                    {
                        id: idCounter,
                        name: '',
                        done: false,
                        priority: 'Normal'
                    });
            }
        }
    }
});