class TaskObject extends Timer {
    id;
    title;
    description;
    date;
    status;
    priority;
    isInProgress: boolean = false;
    editMode: boolean = false;

    constructor(
        id: string,
        title: string,
        description: string,
        date: string,
        status: string,
        priority: string,
    ) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.date = date;
    }

    set isInProgressValue(value: boolean) { this.isInProgress = value; }
    set idValue(value: string) { this.id = value; }
    set titleValue(value: string) { this.title = value; }
    set descriptionValue(value: string) { this.description = value; }
    set dateValue(value: string) { this.date = value }

    get dateValue() {
        return this.date !== '' ?
            this.date.split('-').reverse().join('-') : // european format
            this.todaysDate;
    }
    get todaysDate() {
        const todaysDateArray = new Date().toLocaleDateString("de-DE").split('.');
        Number(todaysDateArray[0]) < 10 ?
            todaysDateArray[0] = '0' + todaysDateArray[0] :
            todaysDateArray[0];
        Number(todaysDateArray[1]) < 10 ?
            todaysDateArray[1] = '0' + todaysDateArray[1] :
            todaysDateArray[1];
        return todaysDateArray.join('-');
    }
    get switchInProgress() {
        return !this.isInProgress ?
            {
                progressHandler: 'inProgressHandler(event)',
                buttonInProgress: 'inprogress-button',
                completedHandler: '',
                buttonCompleted : 'completed-button'
            } :
            {
                progressHandler: '',
                buttonInProgress: 'inprogress-button inprogress-on',
                completedHandler: 'completedHandler(event)',
                buttonCompleted : 'completed-button completed-button-inprogress' 
            }
    }
}

