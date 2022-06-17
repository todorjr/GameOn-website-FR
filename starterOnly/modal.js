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
const btnSubmit = document.querySelector(".btn-submit");
const formElement = document.querySelector("#formId");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

let formData = document.querySelectorAll(".formData");

/**
 * Generate a error element.
 * @param {string} message Text to display
 */

// function createError will create error if field is not properly inserted or is empty
function createError(id, message) {
  removeError(id);
  const elt = document.getElementById(id);
  elt.style.border = "5px solid red";
  let p = document.createElement("p");
  p.classList.add("error");
  p.textContent = message;
  p.style.color = "red";
  elt.parentElement.appendChild(p);
}
// function removeError will delete all errors after creation if field is properly inserted
function removeError(id) {
  const ele = document.getElementById(id);
  const errors = Array.from(ele.parentElement.getElementsByClassName("error"));
  console.log("errors", errors);
  errors.forEach((err) => ele.parentElement.removeChild(err));
}
console.log(formData);

// function validationMessage will send validation message to the user
function validationMessage() {
  const textValidation = document.createElement("h3");
  textValidation.style.textAlign = "center";
  textValidation.innerHTML = "Merci,Votre réservation a bien été enregistrée";
}

// validation functions for all fields
function isValidName(value = "") {
  const regexName = /^[A-Za-zÀ-ÿ-]{2,}$/i;
  return value !== "" && regexName.test(value);
}
function isValidEmail(value = "") {
  const regexEmail =
    /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  return value !== "" && regexEmail.test(value);
}
// Creating isValidBirthday function
function isValidBirthday(value = "") {
  const regexBirthDay = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  return value !== "" && regexBirthDay.test(value);
}

function isValidLocation() {
  let radioBtnChecked = false;
  userLocations.forEach((location) => {
    if (location.checked) {
      radioBtnChecked = true;
    }
  });
  return radioBtnChecked;
}
// validators is object where we will stored our key and values from formData (user input) (key is name of fields from form and value is user input)
const validators = {
  first: {
    validationFunction: isValidName,
    message: "Le prénom n'est pas valide",
  },
  last: { validationFunction: isValidName, message: "Le nom n'est pas valide" },
  email: {
    validationFunction: isValidEmail,
    message: "L'email' n'est pas valide",
  },
  birthdate: {
    validationFunction: isValidBirthday,
    message: "La date de naissance n'est pas valide",
  },
};

function formSubmit(event) {
  // prevent native form to send
  event.preventDefault();

  // get form data
  const formData = Object.fromEntries(new FormData(this));
  const formDataEntries = Object.entries(formData);
  const errors = [];
  const valid = [];

  for (const entry of formDataEntries) {
    const keyName = entry[0];
    const value = entry[1];
    if (validators[keyName]) {
      const validationFn = validators[keyName].validationFunction;
      if (validationFn(value)) {
        valid.push(keyName);
      } else {
        const errorMessage = validators[keyName].message;
        errors.push({ id: keyName, message: errorMessage });
      }
    }
  }

  console.log(errors);

  errors.forEach(({ id, message }) => createError(id, message));
  valid.forEach((id) => removeError(id));

  if (errors.length === 0) {
    // submit validation
  }

  // si le compteur est à 0 alors j'affiche le message de succès
  // sinon j'affiche le message d'erreur
}

formElement.addEventListener("submit", formSubmit);
