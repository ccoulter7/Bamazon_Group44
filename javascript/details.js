var options= document.getElementById("gameSumContainer"); 
window.onload = function () {
    
var fName = localStorage.getItem('firstName');
var lName = localStorage.getItem('lastName');
var timeTaken = localStorage.getItem('timeTaken');
var score = localStorage.getItem('score');
var attempts = localStorage.getItem('attempts');

console.log(timeTaken);




document.getElementById('fNameVal').innerHTML = fName;
document.getElementById('lNameVal').innerHTML = lName;
document.getElementById('timerValue').innerHTML = timeTaken;
document.getElementById('userFinalScore').innerHTML = score;
document.getElementById('finalAttemptsValue').innerHTML = attempts;
    };