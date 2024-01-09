let startingMinutes = 0.15;
let time = startingMinutes * 60
let level = 0;
let countDown = document.getElementById('countdown');
document.getElementById('level').innerHTML = `level: ${level}`;

document.getElementById('button').onclick = function () {
    
   
        let interval = setInterval(updateCountdown, 1000);
    
}




    
function updateCountdown () {

let level = 0;

const minutes = Math.floor(time/60);
let seconds = time % 60;

seconds = seconds < 10 ? '0' + seconds : seconds;

countDown.innerHTML = `${minutes}:${seconds}`;
time--;

if (time<0) {
    time = 0;
    level++;
    document.getElementById('level').innerHTML = `level: ${level++}`;

        };
    };
