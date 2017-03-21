var todoApp = new Vue({
    el: '#todo_container',
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
            // ID of Task. For every new item in the array the id gets increased by 1
            var idCounter = this.todos.length+1;
            // Gets the last item of the array
            var lastTodo = this.todos[this.todos.length-1];

            // Item is the last task in the array
            if(todo === lastTodo) {
                this.todos.push(
                    {
                        id: idCounter,
                        name: '',
                        done: false,
                        priority: 'Normal'
                    });
                setTimeout(function () {
                    $('#todo_container li').find('.todos-text').focus();
                }, 5);
            }
        }
    }
});