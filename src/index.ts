
const asideTopElement: HTMLElement = document.querySelector('.aside-top')!;
const uncompletedTasksListElement: HTMLElement = document.querySelector('.uncompleted-tasks-list')!;
const completedTasksListElement: HTMLElement = document.querySelector('.completed-list-body')!;
const uncompletedNumberElement: HTMLElement = document.querySelector('.uncompleted-number-display')!;
const inProgressNumberElement: HTMLElement = document.querySelector('.inprogress-number-display')!;
const completedNumberElement: HTMLElement = document.querySelector('.completed-number-display')!;

let uncompleted: number = 0;
let completed: number = 0;
let inProgress: number = 0;

// main data storage
let taskObjectsArray: TaskObjectsArray = [];

type TaskObjectsArray = {
    timerValue: string;
    descriptionValue: any;
    titleValue: string;
    editMode: boolean;
    intervalFunction: any;
    displayTimer: string;
    intervalFunctionValue: any;
    initial: number;
    initalValue: number;
    switchInProgress: any;
    isInProgressValue: boolean;
    dateValue: string;
    todaysDate: string;
    id: string;
    title: string;
    description: string;
    date: string;
    status: string;
    priority: string;
    isInProgress: boolean;
}[];

window.onload = () => displayStartNewTask();

const formHandler = (event: any) => {

    event.preventDefault();

    const titleInputElement: HTMLInputElement =
        asideTopElement.querySelector('#title-input')!;
    const descriptionInputElement: HTMLInputElement =
        asideTopElement.querySelector('#description-input')!;
    const dateInputElement: HTMLInputElement =
        asideTopElement.querySelector('#date-input')!;
    const statusInputElement: HTMLInputElement =
        asideTopElement.querySelector('#status-input')!;
    const priorityInputElement: HTMLInputElement =
        asideTopElement.querySelector('#priority-input')!;

    const uniqueID = crypto.randomUUID();

    const taskObject: TaskObject = new TaskObject(
        uniqueID,
        titleInputElement.value,
        descriptionInputElement.value,
        dateInputElement.value,
        statusInputElement.value,
        priorityInputElement.value,
    );

    if (titleInputElement.value !== "") {

        // updating main storage, adding new object into it
        taskObjectsArray = [...taskObjectsArray, taskObject];

        // displaying number of uncompleted
        uncompleted++;
        uncompletedNumberElement.textContent = `${uncompleted}`;

        displayUncompletedTasks();
        displayStartNewTask();
    }else{
        titleInputElement.placeholder = 'please enter title!!';
    }

}
const inProgressHandler = (event: any) => {

    const particularTaskContainer = event.target.closest('.uncompleted-task');

    particularTaskContainer.querySelector('.inprogress-button-container')!.removeAttribute("onclick");
    particularTaskContainer.querySelector('.completed-button')!.setAttribute('onclick', 'completedHandler(event)');
    particularTaskContainer.querySelector('.inprogress-button')!.classList.add("inprogress-on");
    particularTaskContainer.querySelector('.completed-button')!.classList.add("completed-button-inprogress");

    inProgress++;
    uncompleted--;

    inProgressNumberElement.textContent = `${inProgress}`;
    uncompletedNumberElement.textContent = `${uncompleted}`;

    circularProgressFunction(inprogressCircularProgressElement);


    taskObjectsArray.forEach((task) => {
        // there was a problem with event target here, it was always different
        if (event.target.id === task.id) {
            task.isInProgressValue = true;
            task.initalValue = new Date().getTime();
            task.intervalFunctionValue = setInterval(() => {
                particularTaskContainer.querySelector('.timer-container')!.textContent = task.displayTimer;
            }, 100);
        }
    });
}
const completedHandler = (event: any) => {

    const particularTaskContainer = event.target.closest('.uncompleted-task');

    event.target.removeAttribute("onclick");
    event.target.classList.add('completed-button-clicked');
    particularTaskContainer.querySelector('.inprogress-button-container')!.classList.add('inprogress-completed');

    circularProgressFunction(completedCircularProgressElement);

    const checkIconElement = document.createElement("i");
    checkIconElement.setAttribute('class', 'fa-solid fa-check');
    event.target.replaceChildren(checkIconElement);

    completed++;
    completedNumberElement.textContent = `${completed}`;

    setTimeout(() => {
        taskObjectsArray.forEach((task) => {
            if (event.target.id === task.id) {
                clearInterval(task.intervalFunction);
                displayCompletedTasks(task.title, task.dateValue, task.timerValue)
            }
        });
        removeTask(event.target.id);
    }, 2000);
}
const cancelDeleteHandler = (event: any) => {
    event.target.closest('.lower-buttons-section').querySelector('.delete-alert').remove();
}
const editConfirmEditHandler = (event: any, id: string) => {
    const particularTaskContainer = event.target.closest('.uncompleted-task');
    const titleElement = particularTaskContainer.querySelector('.uncompleted-task-title')!;
    const descriptionElement = particularTaskContainer.querySelector('.uncompleted-task-description')!;

    taskObjectsArray.forEach((task) => {
        if (id === task.id && !task.editMode) {
            titleElement.focus();
            titleElement.contentEditable = true;
            descriptionElement.contentEditable = true;
            titleElement.style.background = 'white'
            descriptionElement.style.background = 'white'
            particularTaskContainer.querySelector('.edit-confirmEdit').className = 'edit-confirmEdit fa-solid fa-check';
            particularTaskContainer.querySelector('.delete-acceptEdit').className = 'delete-acceptEdit fa-solid fa-xmark';
            task.editMode = true;
        } else if (id === task.id && task.editMode) {
            particularTaskContainer.querySelector('.edit-confirmEdit').className = 'edit-confirmEdit fa-regular fa-pen-to-square';
            particularTaskContainer.querySelector('.delete-acceptEdit').className = 'delete-acceptEdit fa-solid fa-trash-can';
            titleElement.contentEditable = false;
            descriptionElement.contentEditable = false;
            titleElement.style.background = 'inherit';
            descriptionElement.style.background = 'inherit';
            task.titleValue = titleElement.textContent;
            task.descriptionValue = descriptionElement.textContent;
            task.editMode = false;
        }
    });


};
const deleteCancelEditHandler = (event: any, id: string) => {
    const particularTaskContainer = event.target.closest('.uncompleted-task');
    const titleElement = particularTaskContainer.querySelector('.uncompleted-task-title')!;
    const descriptionElement = particularTaskContainer.querySelector('.uncompleted-task-description')!;

    taskObjectsArray.forEach((task) => {

        if (id === task.id && !task.editMode) {
            displayDeleteAlert(event, id);
        } else if (id === task.id && task.editMode) {
            particularTaskContainer.querySelector('.edit-confirmEdit').className = 'edit-confirmEdit fa-regular fa-pen-to-square';
            particularTaskContainer.querySelector('.delete-acceptEdit').className = 'delete-acceptEdit fa-solid fa-trash-can';
            titleElement.style.background = 'inherit';
            descriptionElement.style.background = 'inherit';
            titleElement.textContent = task.title;
            descriptionElement.textContent = task.description;
            task.editMode = false;
        }
    })

};
const removeTask = (uniqueID: string) => {

    taskObjectsArray.forEach(task => {
        if (uniqueID === task.id) {
            clearInterval(task.intervalFunction);

            // executes only once because only one element fulfills the codition
            const updatedObjectsArray = taskObjectsArray.filter(e => e.id !== task.id);
            taskObjectsArray = [...updatedObjectsArray];
            if (!task.isInProgress) {
                uncompleted--
                uncompletedNumberElement.textContent = `${uncompleted}`;
            } else {
                inProgress--
                inProgressNumberElement.textContent = `${inProgress}`;
            }
        }
    });

    // displaying updated array
    displayUncompletedTasks();
}



