
let registerButton = document.getElementById("registerBtn");

// Feedback from clicking on register button
registerButton.addEventListener("click", function(){
    // Clears input field
    document.getElementById("RegisterForm").reset();

    // Change the color of the button
    registerButton.style.backgroundColor = "green";
    setTimeout(function(){ registerButton.style.backgroundColor = "antiquewhite"; }, 1000);
});