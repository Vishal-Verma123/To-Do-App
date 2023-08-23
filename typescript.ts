function addNewTask(): void {
    try {
      const inputField = document.getElementById("new-task-input") as HTMLInputElement;
      const taskText = inputField.value.trim();
  
      if (!taskText) {
        throw new Error("Please enter a task first");
      }
  
      const tasksList = document.getElementById("tasks-list") as HTMLUListElement;
  
      const presentItems = Array.from(tasksList.querySelectorAll("li span"));
  
      for (const taskItem of presentItems) {
        if (taskItem.textContent === taskText) {
          throw new Error(`${taskText} task is already in the list`);
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
      doneOption.textContent = "Done";
      statusDropdown.appendChild(todoOption);
      statusDropdown.appendChild(inProgressOption);
      statusDropdown.appendChild(doneOption);
  
      checkbox.addEventListener("change", updateTaskStatus);
      statusDropdown.addEventListener("change", updateTaskStatus);
  
      function updateTaskStatus(): void {
        if (statusDropdown.value === "Done") {
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
  
      updateTaskStatus();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
      searchInput?.addEventListener("input", searchTasks);
  
      function searchTasks(): void {
        const searchValue: string = searchInput?.value.toLowerCase() || "";
        const taskItems: HTMLLIElement[] = Array.from(document.querySelectorAll("li"));
  
        taskItems.forEach((taskItem) => {
          const taskName: string = taskItem.querySelector("span")?.textContent?.toLowerCase() || "";
  
          if (taskName.includes(searchValue)) {
            taskItem.style.display = "block";
          } else {
            taskItem.style.display = "none";
          }
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  });
  