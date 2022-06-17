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
function createError(message) {
  let p = document.createElement("p");
  p.classList.add("error");
  p.textContent = message;
  p.style.color = "red";
  p.style.fontFamily = "Impact,Charcoal,sans-serif";
  return p;
}
formData.forEach((data) => data.appendChild(createError("error")));
console.log(formData);

//creating confirmation message

const textValidation = document.createElement("h3");
textValidation.style.textAlign = "center";
textValidation.innerHTML = "Merci,Votre réservation a bien été enregistrée";

//*test validation functions
function isValidName() {
  const userName = document.querySelector("#first");
  const userSurname = document.querySelector("#last");
  const regexName = /^[A-Za-zÀ-ÿ-]{2,}$/i;
  if (
    userName !== null &&
    userSurname !== null &&
    regexName.test(userName.value, userSurname.value)
  ) {
    return true;
  } else {
    return false;
  }
}
function isValidEmail() {
  const regexEmail =
    /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  const userEmail = document.querySelector("#email");
  if (userEmail !== null && regexEmail.test(userEmail.value)) {
    return true;
  } else {
    return false;
  }
}
// Creating isValidBirthday function
function isValidBirthday() {
  const regexBirthDay = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  const userBirthDay = document.querySelector("#birthdate");
  if (userBirthDay !== null && regexBirthDay.test(userBirthDay.value)) {
  }
}

// Creating a function isValidQuantity
function isValidQuantity() {
  const regexQuantity = /^(0|[1-9][0-9]*)$/;
  const userQuantity = document.querySelector("#quantity");
  if (userQuantity !== null && regexQuantity.test(userQuantity.value)) {
  }
}
// Creating validLocation ()
function isValidLocation() {
  let radioBtnChecked = false;
  userLocations.forEach((location) => {
    if (location.checked) {
      radioBtnChecked = true;
    }
  });
  return radioBtnChecked;
}
// Creating isChecked ()  function

function isChecked() {}

// Creating submiting function validate()
function valider() {
  // debugger;
  // let nom = userName.value;
  // let prenom = userSurname.value;
  // let date = userBirthDay.value;
  // let email = userEmail.value;
  // let quantity = userQuantity.value;
  // if (
  //   nom !== null &&
  //   prenom !== null &&
  //   date !== null &&
  //   email !== null &&
  //   quantity !== null &&
  //   regexEmail.test(email) &&
  //   regexName.test(nom, prenom) &&
  //   regexBirthDay.test(date) &&
  //   regexQuantity.test(quantity)
  // ) {
  //   return console.log("blabalaa");
  // } else {
  //   return console.log("not working");
  // }
}

formElement.addEventListener("submit", function (event) {
  // prevent native form to send
  event.preventDefault();

  // get form data from #formId element
  const formData = new FormData(this);

  // get formData as an object with key=value
  const { first, last, email } = Object.fromEntries(formData);
  console.log(Object.fromEntries(formData));

  // initialiser le compteur d'erreur à 0
  //create for every field test functions

  //! if conditional will check if fields are 0 or 1 and depends on that will return message of succes or error message
  if (isValidName(first, last)) {
    // createError sur le champ "#first"
    // compter une nouvelle erreur
    console.log("l'nom est  valide");
  } else {
    console.log("l'nom n'est pas  valide");
  }

  if (isValidEmail(email)) {
    console.log("l'email est  valide");
  } else {
    console.log("l'email n'est pas valide");
  }

  // si le compteur est à 0 alors j'affiche le message de succès
  // sinon j'affiche le message d'erreur
});
