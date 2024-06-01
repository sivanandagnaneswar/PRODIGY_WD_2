let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        difference = updatedTime - startTime;
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    startStopBtn.innerHTML = "Start";
    display.innerHTML = "00:00:00";
    laps.innerHTML = '';
    lapCount = 0;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap';
        lapTime.innerHTML = `Lap ${lapCount}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${(hours > 9 ? hours : "0" + hours)}:${(minutes > 9 ? minutes : "0" + minutes)}:${(seconds > 9 ? seconds : "0" + seconds)}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
