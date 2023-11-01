

const displayStartNewTask = () => {
    asideTopElement.replaceChildren();
    const startNewTaskElement = document.createElement('div');
    startNewTaskElement.setAttribute('class', 'start-new-task');
    startNewTaskElement.setAttribute('onclick', 'displayInputForm()');
    startNewTaskElement.innerHTML = `
        <h2>New task</h2>
        <div>+</div>
    `;
    asideTopElement.appendChild(startNewTaskElement);
}
const displayInputForm = () => {
    asideTopElement.replaceChildren();
    const newTaskContainerElement = document.createElement('div')!;
    newTaskContainerElement.setAttribute('class', 'new-task-container');

    newTaskContainerElement.innerHTML = `
     <section class="task-form-container">
        <form class="task-input-form" onsubmit="formHandler(event)">
            <label for="title-input">task title</label>
            <input type="text" id="title-input">
            <label for="description-input">description</label>
            <textarea name="" id="description-input" rows="5"></textarea>
            <label for="date">date</label>
            <input type="date" id="date-input">
            <div class="statusAndPriority-inputs-container">
                <div class="status-input-container">
                    <label for="status-input">status</label>
                    <select name="" id="status-input">
                        <option value="task">TASK</option>
                        <option value="in progress">IN PROGRESS</option>
                        <option value="completed">COMPLETED</option>
                    </select>
                </div>
                <div class="priority-input-container">
                    <label for="priority-input">priority</label>
                    <select name="" id="priority-input">
                        <option value="low">LOW</option>
                        <option value="medium">MEDIUM</option>
                        <option value="high">HIGH</option>
                    </select>
                </div>
            </div>
            <button class="create-task-button">CREATE A TASK</button>
        </form>
    </section>
    `;

    asideTopElement.appendChild(newTaskContainerElement);
    // this setTimeout without any miliseconds attribute enables css transition to happen
    setTimeout(() => newTaskContainerElement.classList.add('visible'));
}
const displayUncompletedTasks = () => {
    uncompletedTasksListElement.replaceChildren();

    taskObjectsArray.forEach((task) => {

        const uncompletedTaskElement = document.createElement('div');
        Object.assign(uncompletedTaskElement, {
            className: "uncompleted-task",
            id: task.id,
        });

        // here I set the non progress timer TO ZERO - I set initialValue to now and the calculation in line 84 is called also now, so the displayed result is calculated to zero seconds
        !task.isInProgress && (task.initalValue = new Date().getTime());

        uncompletedTaskElement.innerHTML = `            
                <div class="uncompleted-task-header">
                    <div class="uncompleted-task-title">${task.title}</div>
                    <p>date: ${task.dateValue}</p>
                </div>
                <div class="uncompleted-task-description">${task.description}</div>
                <div class="lower-buttons-section">
                    <div class="crud-icons">
                        <div class="editConfirmEditContainer" onclick="editConfirmEditHandler(event, '${task.id}')"
                        id = "${task.id}">
                            <i class="edit-confirmEdit fa-regular fa-pen-to-square"></i>
                         </div>
                        <div class="deleteAcceptEditContainer" onclick="deleteCancelEditHandler(event, '${task.id}')"
                        id ='${task.id}'>
                            <i class="delete-acceptEdit fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                     
                    <div class="timer-container">${task.displayTimer}</div>
                    <div class="inprogress-button-container"
                         id = "${task.id}" 
                         onclick = "${task.switchInProgress.progressHandler}">
                        <div class="inprogress-rail" id = "${task.id}">
                            <div 
                            class="${task.switchInProgress.buttonInProgress}"
                            id = "${task.id}">
                            </div>
                        </div>
                        <p id = "${task.id}">in progress</p>
                    </div>
                    <button class="${task.switchInProgress.buttonCompleted}"
                            id="${task.id}" 
                            onclick= "${task.switchInProgress.completedHandler}"
                            >completed</button>
                </div>`;

        // if the task is in progress, the time growing should continue
        if (task.isInProgress) {
            task.intervalFunctionValue = setInterval(() => {
                uncompletedTaskElement.querySelector('.timer-container')!.textContent = task.displayTimer;
            }, 100);
        }

        uncompletedTasksListElement.append(uncompletedTaskElement);

    });
}
const displayDeleteAlert = (_event: any, _id: string) => {
    const deleteAlertElement = document.createElement('div');
    deleteAlertElement.setAttribute('class', 'delete-alert');

    deleteAlertElement.innerHTML = `
        Delete task?
        <button onclick="removeTask('${_id}')">
            <i class="fa-solid fa-check"></i>
        </button>
        <button onclick="cancelDeleteHandler(event)">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    _event.target.closest('.lower-buttons-section').append(deleteAlertElement);
}
const displayCompletedTasks = (title: string, date: string, time: string) => {
    const completedItemElement = document.createElement('div');
    completedItemElement.setAttribute('class','completed-item')
    completedItemElement.innerHTML = `
        <p class="completed-title">${title}</p>
        <p class="completed-date">${date}</p>
        <p class="completed-time">${time}</p>
    `;
    completedTasksListElement.append(completedItemElement);
}

