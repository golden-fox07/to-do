interface Task {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList {
  private Tasks: Task[] = [];

  addTask(todo: Task) {
    this.Tasks.push(todo);
  }

  removeTaskById(id: number) {
    this.Tasks = this.Tasks.filter((todo) => todo.id !== id);
  }

  gettasks() {
    return this.Tasks;
  }
}

class TodoListUI {
  private todoList: TodoList;

  constructor(todoList: TodoList) {
    this.todoList = todoList;
  }

  displayTasks() {
    const todoListElement = document.getElementById('todo-list')!;
    todoListElement.innerHTML = '';

    this.todoList.gettasks().forEach((task) => {
      const todoElement = document.createElement('li');
      todoElement.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button class="remove-todo" data-id="${task.id}">Remove</button>
            `;
      todoListElement.appendChild(todoElement);
    });
  }

  addTodo() {
    const newTodoInput = document.getElementById('new-todo') as HTMLInputElement;
    const newTodoText = newTodoInput.value.trim();

    if (newTodoText) {
      const newTodo: Task = {
        id: Date.now(),
        text: newTodoText,
        completed: false
      };
      this.todoList.addTask(newTodo);
      this.displayTasks();
      newTodoInput.value = "";
    }
  }

  removeTodoById(id: number) {
    this.todoList.removeTaskById(id);
    this.displayTasks();
  }

  bindEvents() {
    document
      .getElementById("add-todo")!
      .addEventListener("click", () => this.addTodo());

    document
    .getElementById("new-todo")!
    .addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        this.addTodo();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(".remove-todo")) {
        const id = parseInt(target.getAttribute("data-id")!);
        this.removeTodoById(id);
      }
    });
  }
}


const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
ui.bindEvents();
