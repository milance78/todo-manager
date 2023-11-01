const todosCircularProgressElement: HTMLElement = document.querySelector(".red-ring")!;
const inprogressCircularProgressElement: HTMLElement = document.querySelector(".yellow-ring")!;
const completedCircularProgressElement: HTMLElement = document.querySelector(".green-ring")!;
const innerCircleElement: HTMLElement = document.querySelector(".circular-progress")!;

let degrees = 0;
let circularProgress: any;

const circularProgressFunction = (progressElement: HTMLElement) => {
    circularProgress = setInterval(() => {
        if (degrees < 361) {
            degrees += 2;
            if (progressElement === todosCircularProgressElement) {
                progressElement.style.background = `conic-gradient(lightcoral ${degrees}deg, rgb(241, 240, 240) 0deg)`;
            } else if (progressElement === inprogressCircularProgressElement) {
                progressElement.style.background = `conic-gradient(yellow ${degrees}deg, rgb(241, 240, 240) 0deg)`;
            }else if (progressElement === completedCircularProgressElement) {
                progressElement.style.background = `conic-gradient(lightgreen ${degrees}deg, rgb(241, 240, 240) 0deg)`;
            }
        } else {
            clearInterval(circularProgress);
            degrees = 0;
        }
    }, 2);
}

