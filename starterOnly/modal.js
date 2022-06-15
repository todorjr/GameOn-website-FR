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
const form = document.querySelector("#formId");

let userName = document.querySelector("#first");
let userSurname = document.querySelector("#last");
let userEmail = document.querySelector("#email");
let userBirthDay = document.querySelector("#birthdate");
let userLocation = document.getElementsByName("location"); //verify if this is correct to access to all locations
let btnSubmit = document.querySelector(".btn-submit");

const regexEmail =
  /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
// creating submiting function validate()

function valider() {
  let nom = userName.value;
  let prenom = userSurname.value;
  let date = userBirthDay.value;
  let email = userEmail.value;
  // debugger;
  if (
    nom !== null &&
    prenom !== null &&
    date !== null &&
    email !== null &&
    regexEmail.test(email)
  ) {
    return alert("blabalaa");
  } else {
    return alert("not working");
  }
}

btnSubmit.addEventListener("click", valider());
