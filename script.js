const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearAllBtn = document.getElementById("clear-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No tasks yet. Add one!";
    list.appendChild(emptyMessage);
    return;
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const label = document.createElement("label");
    label.className = "todo-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    item.appendChild(label);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  todos.unshift({
    id: Date.now(),
    text,
    completed: false,
  });

  saveTodos();
  renderTodos();
  input.value = "";
  input.focus();
});

clearAllBtn.addEventListener("click", () => {
  if (todos.length === 0) return;

  todos = [];
  saveTodos();
  renderTodos();
});

renderTodos();
