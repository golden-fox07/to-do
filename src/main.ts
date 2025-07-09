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
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="remove-todo" data-id="${task.id}" title="Delete Task">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                    <g fill="#e3b2ff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path></g></g>
                  </svg>
                </button>
            `;
        // Get elements
        const checkbox = todoElement.querySelector('.task-checkbox') as HTMLInputElement;
        const textSpan = todoElement.querySelector('.task-text') as HTMLSpanElement;

        // Add event listener for checkbox
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          textSpan.classList.toggle('completed', task.completed);
        });
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
    const button = target.closest(".remove-todo") as HTMLButtonElement | null;
    if (button) {
      const id = parseInt(button.getAttribute("data-id")!);
      this.removeTodoById(id);
     }
   });
  }
}


const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
ui.bindEvents();
