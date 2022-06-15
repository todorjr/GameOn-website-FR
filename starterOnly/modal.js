function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//creating variables with all field inputs
let userName = document.querySelector("#first");
let userSurname = document.querySelector("#last");
let userEmail = document.querySelector("#email");
let userBirthDay = document.querySelector("#birthdate");
let userLocation = document.getElementsByName("location"); //verify if this is correct to access to all locations
let btnSubmit = document.querySelector(".btn-submit");

let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// creating submiting function validate()

function valider() {
  let nom = userName.value;
  let prenom = userSurname.value;
  let date = userBirthDay.value;
  let email = userEmail.value;
  if (
    nom == "" &&
    prenom == "" &&
    date == "" &&
    email == "" &&
    validEmail.test(userEmail)
  ) {
    return alert("blabalaa");
  }
}
btnSubmit.addEventListener("click", valider());
