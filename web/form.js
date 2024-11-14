const formElement = document.getElementById("task-form");
const formListElement = document.getElementById("task-list");
const textInputElement = document.getElementById("text-input");
const counterRemainingElement = document.getElementById("task-cnt-remaining");
const counterTotalElement = document.getElementById("task-cnt-total");

const tasks = [];

function addTask(name, isFinished) {
    const object = {"name": name, "finished": isFinished};

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    const textElement = document.createElement("span");
    textElement.innerText = name;

    const labelElement = document.createElement("label");
    labelElement.appendChild(checkboxElement);
    labelElement.appendChild(textElement);

    const removeElement = document.createElement("button");
    removeElement.classList.add("task-item-remove");

    const element = document.createElement("div");
    element.classList.add("task-item");
    element.appendChild(labelElement);
    element.appendChild(removeElement);

    checkboxElement.addEventListener("change", function (evt) {
        object.finished = checkboxElement.checked;
        triggerTasksChange();

        element.classList.toggle("task-item-completed", checkboxElement.checked);
    });

    removeElement.addEventListener("click", function (evt) {
        const index = tasks.indexOf(object);
        if (index >= 0) {
            tasks.splice(index, 1);
            triggerTasksChange();
        }

        formListElement.removeChild(element);
    });

    if (isFinished) {
        checkboxElement.checked = true;
        element.classList.add("task-item-completed");
    }

    formListElement.appendChild(element);
    tasks.push(object);
    triggerTasksChange();
}

function triggerTasksChange() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    counterRemainingElement.innerText = String(tasks.filter((task) => !task.finished).length);
    counterTotalElement.innerText = String(tasks.length);
}

formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const name = textInputElement.value.trim();
    if (name) {
        addTask(name, false);
    } else {
        alert("Введите названия задачи!");
    }

    return false;
});

const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
    for (const object of savedTasks) {
        addTask(object.name, object.finished);
    }
}
