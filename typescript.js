function addNewTask() {
    try {
        var inputField = document.getElementById("new-task-input");
        var taskText = inputField.value.trim();
        if (!taskText) {
            throw new Error("Please enter a task first");
        }
        var tasksList_1 = document.getElementById("tasks-list");
        var presentItems = Array.from(tasksList_1.querySelectorAll("li span"));
        for (var _i = 0, presentItems_1 = presentItems; _i < presentItems_1.length; _i++) {
            var taskItem = presentItems_1[_i];
            if (taskItem.textContent === taskText) {
                throw new Error("".concat(taskText, " task is already in the list"));
            }
        }
        var taskListItem_1 = document.createElement("li");
        var checkbox_1 = document.createElement("input");
        checkbox_1.type = "checkbox";
        var taskSpan_1 = document.createElement("span");
        taskSpan_1.textContent = taskText;
        var statusDropdown_1 = document.createElement("select");
        var todoOption = document.createElement("option");
        todoOption.textContent = "To Do";
        var inProgressOption = document.createElement("option");
        inProgressOption.textContent = "In Progress";
        var doneOption = document.createElement("option");
        doneOption.textContent = "Done";
        statusDropdown_1.appendChild(todoOption);
        statusDropdown_1.appendChild(inProgressOption);
        statusDropdown_1.appendChild(doneOption);
        checkbox_1.addEventListener("change", updateTaskStatus);
        statusDropdown_1.addEventListener("change", updateTaskStatus);
        function updateTaskStatus() {
            if (statusDropdown_1.value === "Done") {
                checkbox_1.disabled = false;
                if (checkbox_1.checked) {
                    taskSpan_1.style.textDecoration = "line-through";
                }
                else {
                    taskSpan_1.style.textDecoration = "none";
                }
            }
            else {
                checkbox_1.disabled = true;
                taskSpan_1.style.textDecoration = "none";
            }
        }
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            tasksList_1.removeChild(taskListItem_1);
        });
        taskListItem_1.appendChild(checkbox_1);
        taskListItem_1.appendChild(taskSpan_1);
        taskListItem_1.appendChild(statusDropdown_1);
        taskListItem_1.appendChild(deleteButton);
        tasksList_1.appendChild(taskListItem_1);
        inputField.value = "";
        updateTaskStatus();
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
        else {
            console.error("An unexpected error occurred:", error);
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    try {
        var searchInput_1 = document.getElementById("search-input");
        searchInput_1 === null || searchInput_1 === void 0 ? void 0 : searchInput_1.addEventListener("input", searchTasks);
        function searchTasks() {
            var searchValue = (searchInput_1 === null || searchInput_1 === void 0 ? void 0 : searchInput_1.value.toLowerCase()) || "";
            var taskItems = Array.from(document.querySelectorAll("li"));
            taskItems.forEach(function (taskItem) {
                var _a, _b;
                var taskName = ((_b = (_a = taskItem.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
                if (taskName.includes(searchValue)) {
                    taskItem.style.display = "block";
                }
                else {
                    taskItem.style.display = "none";
                }
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred:", error);
        }
        else {
            console.error("An unexpected error occurred:", error);
        }
    }
});
