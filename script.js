function addNewTask() {
  const inputField = document.getElementById("new-task-input");
  const taskText = inputField.value.trim();

  if (taskText === "") {
    alert("Please enter a task first");
  } else {
    const tasksList = document.getElementById("tasks-list");

    const existingTaskItems = tasksList.querySelectorAll("li span");

    for (const taskItem of existingTaskItems) {
      if (taskItem.textContent === taskText) {
        alert(taskText + " task is already in the list");
        return;
      }
    }

    const taskListItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const statusDropdown = document.createElement("select");
    const todoOption = document.createElement("option");
    todoOption.textContent = "To Do";
    const inProgressOption = document.createElement("option");
    inProgressOption.textContent = "In Progress";
    const doneOption = document.createElement("option");
    doneOption.textContent = "Completed";
    statusDropdown.appendChild(todoOption);
    statusDropdown.appendChild(inProgressOption);
    statusDropdown.appendChild(doneOption);

    checkbox.addEventListener("change", updateTaskStatus);
    statusDropdown.addEventListener("change", updateTaskStatus);

    function updateTaskStatus() {
      if (statusDropdown.value === "Completed") {
        checkbox.disabled = false;
        if (checkbox.checked) {
          taskSpan.style.textDecoration = "line-through";
        } else {
          taskSpan.style.textDecoration = "none";
        }
      } else {
        checkbox.disabled = true;
        taskSpan.style.textDecoration = "none";
      }
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasksList.removeChild(taskListItem);
    });

    taskListItem.appendChild(checkbox);
    taskListItem.appendChild(taskSpan);
    taskListItem.appendChild(statusDropdown);
    taskListItem.appendChild(deleteButton);

    tasksList.appendChild(taskListItem);
    inputField.value = "";

    updateTaskStatus(taskListItem);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", searchTasks);

  function searchTasks() {
    const searchValue = searchInput.value.toLowerCase();
    const taskItems = document.querySelectorAll("li");

    taskItems.forEach((taskItem) => {
      const taskName = taskItem.querySelector("span").textContent.toLowerCase();

      if (taskName.includes(searchValue)) {
        taskItem.style.display = "block";
      } else {
        taskItem.style.display = "none";
      }
    });
  }
});
