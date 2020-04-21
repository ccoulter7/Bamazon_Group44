function validate(){
 var fName = document.forms["playerDetails"]["fname"].value;
 var lName = document.forms["playerDetails"]["lname"].value;
 var cardName = document.forms["playerDetails"]["cardname"].value;
 var cardNumber = document.forms["playerDetails"]["cardnumber"].value;
 var securityNumber = document.forms["playerDetails"]["CSV"].value;


 localStorage.setItem("firstName", fName);
 localStorage.setItem("lastName", lName);






if(fName.length <2 ){
  alert("First Name must be greater than 1 character in length.");
  return false;
}else if (lName.length<2){
    alert("Second Name must be greater than 1 character in length.");
      return false;
    }  else if (cardName.length<2){
      alert("Name of card must be greater than 1 character in length.");
        return false;
      }else if (cardNumber.length!==16){
          alert("You must enter a 16 digit number.");
            return false;
          } else if (securityNumber.length!==3){
              alert("You must enter a 3 digit number.");
                return false;
              }




      }
