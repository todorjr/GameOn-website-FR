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
let userName = document.querySelector("#first");
let userSurname = document.querySelector("#last");
let userEmail = document.querySelector("#email");
let userBirthDay = document.querySelector("#birthdate");
let userQuantity = document.querySelector("#quantity");
let userLocations = document.getElementsByName("location"); //verify if this is correct to access to all locations
let btnSubmit = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// RegEx Declarations
const regexEmail =
  /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
const regexName = /^[A-Za-zÀ-ÿ-]{2,}$/i;
const regexBirthDay = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const regexQuantity = /^(0|[1-9][0-9]*)$/;

// Creating validLocation ()
function validLocation() {
  let radioBtnChecked = false;
  userLocations.forEach((location) => {
    if (location.checked) {
      radioBtnChecked = true;
    }
  });
  return radioBtnChecked;
}

// create error messages ,change html by adding <p>ERROR MESSAGES</p> under input field

// Creating submiting function validate()
function valider() {
  debugger;
  let nom = userName.value;
  let prenom = userSurname.value;
  let date = userBirthDay.value;
  let email = userEmail.value;
  let quantity = userQuantity.value;
  if (
    nom !== null &&
    prenom !== null &&
    date !== null &&
    email !== null &&
    quantity !== null &&
    regexEmail.test(email) &&
    regexName.test(nom, prenom) &&
    regexBirthDay.test(date) &&
    regexQuantity.test(quantity)
  ) {
    return console.log("blabalaa");
  } else {
    return console.log("not working");
  }
}

btnSubmit.addEventListener("click", valider());
