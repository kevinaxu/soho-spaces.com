
window.onload = function () {
    var buttonElement = document.getElementById("klick");
    var inputElement = document.getElementById('test');
  
  
    if (buttonElement) {
      buttonElement.addEventListener('click', skriv);
    }
  
    function skriv() {
      var input = inputElement.value;
      alert("Hello " + input);
    }
  }

  