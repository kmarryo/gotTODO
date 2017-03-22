var todoApp = new Vue({
    el: '#todo_container',
    data: {
        todos: [
            {
                id: 1,
                name: '',
                done: false,
                priority: 'Normal',
                important: false
            }
        ]
    },
    mounted: function () {
        this.$nextTick(function () {
            
        });
    },
    methods: {
        toggleDone: function (todo) {
            todo.done = !todo.done;
        },
        deleteTodo: function (todo) {
            var index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
        setPriority: function (todo) {
            // Checks in which state the priority is and toggles between 'High' and 'Normal' when the Priority-Button is clicked
            todo.priority === 'High' ? todo.priority = 'Normal' : todo.priority = 'High';

            // Checks if the priority is set to High - triggers the class Binding on the li
            todo.important = !todo.important;
            console.log('todo.important', todo.important);
            
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