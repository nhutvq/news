"use strict";

const inputTask = document.querySelector("#input-task");
const btnAdd = document.querySelector("#btn-add");
const todoList = document.querySelector("#todo-list");

// Thêm sự kiện cho nút Add
btnAdd.addEventListener("click", function () {
  const todo = new Task(inputTask.value, currentUser.userName, false);
  todoArr.push(todo);
  saveToStorage("todoArr", todoArr);

  displaytodoList();

  inputTask.value = "";
});

// Hàm hiển thị danh sách ToDo
function displaytodoList() {
  let html = "";

  todoArr
    .filter((element) => element.owner === currentUser.userName)
    .forEach((element, idx) => {
      html += `<li onclick="toggle('${idx}')">${element.task}<span class="close" onclick="deleteToDo('${element.task}')">×</span></li>`;
    });
  todoList.innerHTML = html;
}
displaytodoList();

// Hàm xử lý khi click nút X
function deleteToDo(todo) {
  const todos = document.querySelectorAll("#todo-list li");

  todos.forEach(function (todoEl) {
    todoEl.addEventListener("click", function (e) {
      if (confirm("Are you sure ?")) {
        for (let i = 0; i < todoArr.length; i++) {
          if (todoArr[i].task === todo) {
            todoArr.splice(i, 1);
          }
        }
      }
      saveToStorage("todoArr", todoArr);
      displaytodoList();
      e.stopPropagation();
    });
  });
}

// Hàm toggle khi click task trong todoList
function toggle(idx) {
  const todos = document.querySelectorAll("#todo-list li");

  todos[idx].classList.toggle("checked");

  for (let i = 0; i < todoArr.length; i++) {
    const todo = todoArr.find(
      (item) =>
        item.owner === currentUser.userName &&
        item.task === todos[idx].textContent.slice(0, -1)
    );
    console.log(todo);
    todo.isDone = todos[idx].classList.contains("checked") ? true : false;
  }
  saveToStorage("todoArr", todoArr);
  // displaytodoList();
}
