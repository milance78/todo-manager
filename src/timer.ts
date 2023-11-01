class Timer {
    milisecondsInterval= 0;
    timerValue: string = "";
    initial: number = 0;
    intervalFunction!: Function;

    set initalValue(value: number){
        this.initial = value;
    }
    set intervalFunctionValue(value: Function){
        this.intervalFunction = value;
    } 

    get displayTimer(){
        const current = new Date().getTime();
        this.milisecondsInterval = current - this.initial;
        this.timerValue = `${this.hours()}:${this.minutes()}:${this.seconds()}`
        return this.timerValue
    }
    seconds = () => {
        const numberOfSeconds = Math.floor(this.milisecondsInterval / 1000);
        return numberOfSeconds % 60 < 10 ?
            "0" + numberOfSeconds % 60 :
            (numberOfSeconds % 60).toString();
    }
    minutes = () => {
        const numberOfMinutes = Math.floor(this.milisecondsInterval / 60000);
        return numberOfMinutes % 60 < 10 ?
            "0" + numberOfMinutes % 60 :
            (numberOfMinutes % 60).toString();
    }
    hours = () => {
        const numberOfHours = Math.floor(this.milisecondsInterval / 3600000);
        return numberOfHours % 24 < 10 ?
            "0" + numberOfHours % 24 :
            (numberOfHours % 24).toString();
    }
}

