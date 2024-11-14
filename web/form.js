const formElement = document.getElementById("task-form");
const formListElement = document.getElementById("task-list");
const textInputElement = document.getElementById("text-input");
const counterRemainingElement = document.getElementById("task-cnt-remaining");
const counterTotalElement = document.getElementById("task-cnt-total");
const dayOfWeekElements = document.querySelectorAll(".task-days > *");

const tasks = [];
let currentDayOfWeek = 0;

function renderTask(object, isNew = false) {
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    const textElement = document.createElement("span");
    textElement.innerText = object.name;

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

        element.classList.add("task-item-removing-anim");
        setTimeout(function () {
            formListElement.removeChild(element);
        }, 250);
    });

    if (object.finished) {
        checkboxElement.checked = true;
        element.classList.add("task-item-completed");
    }

    if (isNew) {
        element.classList.add("task-item-appear");
    }

    formListElement.appendChild(element);
}

function setDoW(day) {
    console.log("DoW: " + day);

    currentDayOfWeek = day;

    for (let i = 0; i < dayOfWeekElements.length; i++) {
        const isActive = (i === day);
        dayOfWeekElements[i].classList.toggle("task-day-current", isActive);
    }

    // Reset all children!
    formListElement.innerHTML = "";

    for (const object of tasks) {
        if (object.dayOfWeek === day) {
            renderTask(object, false);
        }
    }

    localStorage.setItem("day-of-week", String(day));
    triggerTasksChange();
}

function triggerTasksChange() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const dayTasks = tasks.filter((task) => (task.dayOfWeek === currentDayOfWeek));
    const unfinishedTasks = dayTasks.filter((task) => (!task.finished));
    counterRemainingElement.innerText = String(unfinishedTasks.length);
    counterTotalElement.innerText = String(dayTasks.length);
}

function init() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasks.push(...savedTasks);
    }

    const savedDayOfWeek = localStorage.getItem("day-of-week");
    if (savedDayOfWeek) {
        setDoW(parseInt(savedDayOfWeek));
    } else {
        setDoW(0);
    }
}

formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const name = textInputElement.value.trim();
    if (name) {
        const object = {"name": name, "finished": false, "dayOfWeek": currentDayOfWeek};
        tasks.push(object);
        renderTask(object);
        triggerTasksChange();
    } else {
        alert("Введите названия задачи!");
    }

    return false;
});

init();
