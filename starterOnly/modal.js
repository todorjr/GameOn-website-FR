function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//*******/

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector(".btn-submit");
const formElement = document.querySelector("#formId");
const modal = document.querySelector(".modal-body");
const closeButtonX = document.querySelector(".close");
const body=document.querySelector("body");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeLaunchModal() {
  modalbg.style.display = "none";
  body.style.overflow="auto";
}

// function isValidFirstName will validate the name fields
function isValidFirstName(value = "") {
  const regexName = /^[A-Za-zÀ-ÿ-]{2,}$/i;  //pattern is used from regEx.com
  return value !== "" && regexName.test(value);
}

// function isValidLastName will validate the name fields
function isValidLastName(value = "") {
  const regexName = /^[A-Za-zÀ-ÿ-]{2,}$/i;  //pattern is used from regEx.com
  return value !== "" && regexName.test(value);
}

// function isValidEmail will validate the email input
function isValidEmail(value = "") {
  const regexEmail =
    /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;  //pattern is used from regEx.com
  return value !== "" && regexEmail.test(value);
}
// function isValidBirthday will validate the birthday input
function isValidBirthday(value = "") {
  const regexBirthDay = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;  //pattern is used from regEx.com
  return value !== "" && regexBirthDay.test(value);
}

// function isValidQuantity will validate the entered number
function isValidQuantity(value = "") {
  const regexNumber = /^[0-9]$/; //pattern is used from regEx.com
  return value !== "" && regexNumber.test(value);
}

//function isValidLocation will verify if one location is checked
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

// function createError will create error if field is not properly inserted or is empty
function createError(id, message) {
  removeError(id);
  const elt = document.getElementById(id);
  elt.style.border = "2px solid red";
  let p = document.createElement("p");
  p.classList.add("error");
  p.textContent = message;
  elt.parentElement.appendChild(p);
}

// function removeError will delete all errors after creation if field is properly inserted
function removeError(id) {
  const ele = document.getElementById(id);
  console.log(ele);
  const errors = Array.from(ele.parentElement.querySelectorAll(".error"));
  console.log(errors);
  errors.forEach((err) => ele.parentElement.removeChild(err));
  ele.addEventListener("change",()=> {
    ele.style.borderColor = "green";
    ele.parentElement.querySelector(".error").remove();
  }, { once: true }); 
}

// function formSubmit 
function formSubmit(event) {

  // prevent default behavior of browser
  event.preventDefault();

  // get form data
  const newFormData = new FormData(this);
  const formData = Object.fromEntries(newFormData);
  const formDataEntries = Object.entries(formData);
  const errors = [];
  const valid = [];

  // verify if in formDataEntries key with name location existe
  if (!formDataEntries.location) {
    const validationFn = validators.location.validationFunction;
    if (validationFn()) {
      valid.push("location");
    } else {
      const errorMessage = validators.location.message;
      errors.push({ id: "location", message: errorMessage });
    }
  }

  // looping through all entries in formDataEntries
  formDataEntries.forEach((entry) => { 
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
  });

   // for every element in errors array, createError function will be called and will create error message
  errors.forEach(({ id, message }) => createError(id, message));

   // for every element in valid array, removeError function will be called and will remove error message
  valid.forEach((id) => removeError(id));

  if (errors.length === 0) {
    // submit validation
    validationMessage();
    console.log('THANK YOU FOR YOU RESERVATION');
  }
}

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
  textValidation.innerHTML = "Merci pour <br> votre inscription ! 🤩";

  //close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.addEventListener("click", () => {
    formElement.style.display = "block";
    formElement.reset();
    divValidation.style.display = "none";
    modalbg.style.display = "none";
  });

  //* Closing modal

  closeButtonX.addEventListener("click", () => {
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

// validators is object where we will stored our key and values from formData (user input) (key is name of fields from form and value is user input)
const validators = {
  first: {
    validationFunction: isValidFirstName,
    message: "Le prénom n'est pas valide",
  },
  last: { validationFunction: isValidLastName, message: "Le nom n'est pas valide" },
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

//closing form modal
closeButtonX.addEventListener("click", closeLaunchModal)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// submiting a form
formElement.addEventListener("submit", formSubmit);
