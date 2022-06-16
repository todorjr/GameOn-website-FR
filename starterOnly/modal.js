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
let userName = document.querySelector("#first");
let userSurname = document.querySelector("#last");
let userEmail = document.querySelector("#email");
let userBirthDay = document.querySelector("#birthdate");
let userQuantity = document.querySelector("#quantity");
let userLocations = document.getElementsByName("location"); //verify if this is correct to access to all locations
let btnSubmit = document.querySelector(".btn-submit");
const formElement = document.querySelector("#formId");

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

// create error messages
let formData = document.querySelectorAll(".formData");

/**
 * Generate a error element.
 * @param {string} message Text to display
 */
function createError(message) {
  let p = document.createElement("p");
  p.classList.add("error");
  p.textContent = message;
  return p;
}

// for (i = 0; i < formData.length; i++) {
//   formData[i].appendChild(div);
// }
formData.forEach((data, i) => data.appendChild(createError("error" + i)));
console.log(formData);

//creating confirmation message
const textValidation = document.createElement("h3");
textValidation.style.textAlign = "center";
textValidation.innerHTML = "Merci,Votre réservation a bien été enregistrée";

// Creating submiting function validate()
function valider() {
  // debugger;
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

formElement.addEventListener("submit", function (event) {
  // prevent native form to send
  event.preventDefault();

  // get form data from #formId element
  const formData = new FormData(this);
  // get formData as an object with key=value
  const { first, last, email } = Object.fromEntries(formData);

  // initialiser le compteur d'erreur à 0
  //create for every field test functions

  if (!isValidName(first)) {
    // createError sur le champ "#first"
    // compter une nouvelle erreur
  }
  if (!isValidEmail(last)) {
    alert("l'email n'est pas valide");
  }
  if (!isValidEmail(email)) {
    alert("l'email n'est pas valide");
  }

  // si le compteur est à 0 alors j'affiche le message de succès
  // sinon j'affiche le message d'erreur
});
