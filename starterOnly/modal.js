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
const modal = document.querySelector(".modal-body");
const x = document.querySelector(".close");
const body=document.querySelector("body");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalbg.style.height = "100%";
  body.style.overflowY="hidden";
}

function closeLaunchModal() {
  modalbg.style.display = "none";
}

//closing form modal
x.addEventListener("click", () => {
  closeLaunchModal();
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

let formDataList = document.querySelectorAll(".formData");
console.log(formDataList);

// function validationMessage will send validation message to the user
function validationMessage() {
  formElement.style.display = "none";

  // div element
  const divValidation = document.createElement("div");
  divValidation.classList.add("confirmation");

  // new div element
  const newDiv = document.createElement("div");
  newDiv.classList.add("confirmation-div");
  divValidation.appendChild(newDiv);

  // message
  const textValidation = document.createElement("h3");
  textValidation.innerHTML = "Merci pour <br> votre inscription";

  //close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.addEventListener("click", () => {
    formElement.style.display = "block";
    formElement.reset();
    divValidation.style.display = "none";
    modalbg.style.display = "none";
    //! Do not reload the form ,only place again in the modal window
  });

  //* Closing modal
  // x modal button
  x.addEventListener("click", () => {
    modalbg.style.display = "none";
    window.location.reload();
  });

  // keyPress function
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLaunchModal(); 
        divValidation.style.display = "none";
        }
  });

  // appendChild
  modal.appendChild(divValidation);
  divValidation.appendChild(textValidation);
  divValidation.appendChild(closeButton);
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
function isValidQuantity(value = "") {
  const regexNumber = /^[0-9]$/;
  return value !== "" && regexNumber.test(value);
}

function isValidLocation() {
  let isLocationChecked = false;
  const locations = document.getElementById("formId").location;
  for (const location of locations) {
    if (location.checked) {
      isLocationChecked = true;
      break;
    }
  }
    return isLocationChecked;
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
    message: "L'email n'est pas valide !",
  },
  birthdate: {
    validationFunction: isValidBirthday,
    message: "La date de naissance n'est pas valide !",
  },
  quantity: {
    validationFunction: isValidQuantity,
    message: "La quantité n'est pas valide !",
  },
  location: {
    validationFunction: isValidLocation,
    message: "Vous devez choisir une option.",
  },
};

// function createError will create error if field is not properly inserted or is empty
function createError(id, message) {
  removeError(id);
  const elt = document.getElementById(id);
  elt.style.border = "2px solid red";
  let p = document.createElement("p");
  p.classList.add("error");
  p.textContent = message;
  p.style.color = "red";
  p.style.fontSize = "11px";
  elt.parentElement.appendChild(p);
}

// function removeError will delete all errors after creation if field is properly inserted
function removeError(id) {
  const ele = document.getElementById(id);
  console.log(ele);
  const errors = Array.from(ele.parentElement.querySelectorAll(".error"));
  console.log(errors);
  errors.forEach((err) => ele.parentElement.removeChild(err));
  ele.addEventListener("change",()=> {  ele.style.border = "none";
  ele.parentElement.querySelector(".error").remove();
}); 
}

function formSubmit(event) {
  event.preventDefault();
  // get form data
  const pouet = new FormData(this);
  console.log(pouet);
  const formData = Object.fromEntries(pouet);
  console.log(this); //Form Data didnt get all input fields
  console.log(formData); //Form Data didnt get all input fields
  const formDataEntries = Object.entries(formData);
  console.log(formDataEntries);
  const errors = [];
  const valid = [];

  // Verify if in formDataEntries key with name location existe
  if (!formDataEntries.location) {
    const validationFn = validators.location.validationFunction;
    if (validationFn()) {
      valid.push("location");
    } else {
      const errorMessage = validators.location.message;
      errors.push({ id: "location", message: errorMessage });
    }
  }

  // Looping through all entries in formDataEntries
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
  errors.forEach(({ id, message }) => createError(id, message));
  valid.forEach((id) => removeError(id));

  if (errors.length === 0) {
    // submit validation
    validationMessage();
    console.log('THANK YOU FOR YOU RESERVATION');
  }
}

formElement.addEventListener("submit", formSubmit);
