document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span>
                        <div>
                            <button onclick="toggleTask(this)">✔</button>
                            <button onclick="deleteTask(this)">❌</button>
                        </div>`;
        taskList.appendChild(li);
        saveTasks();
        taskInput.value = "";
    }
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function toggleTask(button) {
    button.parentElement.parentElement.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const taskList = document.getElementById("taskList");
        JSON.parse(savedTasks).forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${task.text}</span>
                            <div>
                                <button onclick="toggleTask(this)">✔</button>
                                <button onclick="deleteTask(this)">❌</button>
                            </div>`;
            if (task.completed) {
                li.classList.add("completed");
            }
            taskList.appendChild(li);
        });
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}
