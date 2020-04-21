// Get the modal for game instrcutions
var modal = document.getElementById("myModal");

// Get the button that opens the modal instrcutions
var btn = document.getElementById("howToPlayBtn");

// Get the <span> element that closes the modal instrcutions
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal instrcutions
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal instrcutions
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it instrcutions
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal for diagram image
var modalImage = document.getElementById("myModalImage");

// Gets the image and uses caption
var img = document.getElementById("diagram");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("captionImage");
img.onclick = function(){
  modalImage.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get element to close the popup
var spanImage = document.getElementsByClassName("closeImage")[0];

// Closes the popup
spanImage.onclick = function() {
  modalImage.style.display = "none";
}