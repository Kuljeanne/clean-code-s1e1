
var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".btn-add");
var incompleteTaskHolder = document.querySelector(".tasks-list__incompleted");
var completedTasksHolder = document.querySelector(".tasks-list__completed");


//New task list item
var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li");
  listItem.className = "tasks-list__item";

  var checkBox = document.createElement("input");

  var label = document.createElement("label");
  
  var editInput = document.createElement("input");
  
  var editButton = document.createElement("button");
  
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'task task-name';

  checkBox.type = "checkbox";
  checkBox.className = "task-check";
  editInput.type = "text";
  editInput.className = "task task-editing";

  editButton.innerText = "Edit";
  editButton.className = "btn btn-edit";

  deleteButton.className = "btn btn-delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList = 'btn__img'

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask = function () {

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

}

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.task-editing');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".btn-edit");
  var containsClass = listItem.classList.contains("tasks-list__item_activ");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("tasks-list__item_activ");
};


var deleteTask = function () {
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);

}


var taskCompleted = function () {
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector(".task-check");
  var editButton = taskListItem.querySelector(".btn-edit");
  var deleteButton = taskListItem.querySelector(".btn-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

