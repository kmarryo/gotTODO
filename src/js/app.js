var todoApp = new Vue({
    el: '#todo-container',
    data: {
        todos: [
            {
                id: 1,
                name: 'Wash my car',
                done: false,
                priority: 0
            },
            {
                id: 2,
                name: 'Go for a walk',
                done: false,
                priority: 0
            },
            {
                id: 3,
                name: 'Do sports',
                done: false,
                priority: 1
            },
            {
                id: 4,
                name: 'Learn JavaScrizzle',
                done: true,
                priority: 1
            }
        ]
    },
    ready: function () {
        this.checkDone();
    },
    methods: {
        checkDone: function () {
            for(var i = 0; i<this.todos.length; i++) {
                console.log(this.todos[i].done);
            }
        }
    }
});