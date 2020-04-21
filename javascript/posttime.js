
var dt = new Date();

document.getElementById("datetime").innerHTML = dt.toLocaleTimeString('en-GB', { hour: "numeric", 
minute: "numeric"});



