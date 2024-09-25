let startTime, updatedTime, difference = 0;
let running = false;
let interval;
const displayElement = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateDisplay, 1000);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    difference = 0;
    running = false;
    displayElement.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    displayElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = displayElement.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);
