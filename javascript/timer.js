var timer1= document.getElementById("time"); 



function startTimer(duration) {
console.log('Starting timer');
var timer = duration, minutes, seconds;

var interVal = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var formattedTime = minutes + ":" + seconds;
    document.getElementById('timerVar').innerHTML = formattedTime;


    if (--timer < 0) {
        timer = duration;
        console.log(timer);

    }

    if (minutes == 0 && seconds == 0) {
        alert('You ran out of time! Try again?');
        clearInterval(interVal);
        location.reload();
        return false;
    }
}, 1000);
localStorage.setItem('interVal', interVal);

}

window.onload = function () {
var setTimer = 60 * 5,
display = document.querySelector('#time');
startTimer(setTimer, display);
};




