// Element credit card
const creditCard = document.getElementById("creditCard");
creditCard.addEventListener('click', e => {
  slipCard(creditCard.getAttribute("data-visible") != 'front'? 'front' : 'back');
});
// Form fields to purchase
const fieldName = document.getElementById("fieldName");
const fieldNumber = document.getElementById("fieldNumber");
const fieldValid = document.getElementById("fieldValid");
const fieldCod = document.getElementById("fieldCod");
// Functions utils
function slipCard(to) {
  if (creditCard.getAttribute("data-visible") != to) creditCard.setAttribute("data-visible", to);
}
function numberOnly(value) {
  return value.replace(/\D+/g, '');
}
// Data taken from 'https://gist.github.com/erikhenrique/5931368'
function identifyCardFlag(value) {
  const imgFlagCard = document.getElementById('imgFlagCard');
  let flagPath = '';
  // Visa card
  if (value.substr(0, 1) == '4') flagPath = "./icons/visa.svg";
  // Mastercard
  if (value.substr(0, 1) == '5') flagPath = "./icons/mastercard.svg";
  // Elo 
  switch (value.substr(0, 6))  {
    case '636368':
    case '636369':
    case '438935':
    case '504175':
    case '451416':
    case '636297':
    case '506699':
      flagPath = './icons/elo.svg';
      break;
  }
  switch (value.substr(0, 4)) {
    case '5067':
    case '4576':
    case '4011':
      flagPath = './icons/elo.svg';
      break;
  }
  // Hipercard
  switch (value.substr(0, 2)) {
    case '38':
    case '60':
      flagPath = './icons/hipercard.svg';
      break;
  }
  //
  if (flagPath == '') {
    imgFlagCard.src = '';
    imgFlagCard.style.display = 'none';
  } else {
    imgFlagCard.src = flagPath;
    imgFlagCard.style.display = 'block';
  }
}
// Event for fields 
// Name for the card
fieldName.addEventListener("input", e => {
  const value = e.target.value?.substr(0, 44).toUpperCase();
  document.getElementById("nameCard").innerText = value;
  e.target.value = value;
  slipCard('front');
});
// Number for the card
fieldNumber.addEventListener("input", e => {
  const value = numberOnly(e.target.value);
  try {
    document.getElementById("numberPart1").innerText = value.substr(0, 4);
    // Part2 to card number
    if (value.length > 4 || value.length <= 8)
      document.getElementById("numberPart2").innerText = value.substr(4, 4)
    else if (value.length <= 4)
      document.getElementById("numberPart2").innerText = "";
    // Part3 to card number
    if (value.length > 8 || value.length <= 12)
      document.getElementById("numberPart3").innerText = value.substr(8, 4);
    else if (value.length <= 8)
      document.getElementById("numberPart3").innerText = "";
    // Part3 to card number
    if (value.length > 12 || value.length <= 16)
      document.getElementById("numberPart4").innerText = value.substr(12, 4)
    else if (value.length <= 12)
      document.getElementById("numberPart4").innerText = "";
    // Identify card flag and setter icon in card
    identifyCardFlag(value);
  } finally {
    let tempValue = value.substr(0, 4);
    if (value.length > 4) tempValue += ' ' + value.substr(4, 4);
    if (value.length > 8) tempValue += ' ' + value.substr(8, 4);
    if (value.length > 12) tempValue += ' ' + value.substr(12, 4);
    e.target.value = tempValue;
    slipCard('front');
  }
});
// Valid date the card
fieldValid.addEventListener("input", e => {
  let value = numberOnly(e.target.value);
  try {
    if (value.length > 2) value = value.substr(0, 2) + "/" + value.substr(2, 2);
    document.getElementById("valid").innerText = value;
  } finally {
    e.target.value = value.substr(0, 5);
    slipCard('front');
  }
});
// Security cod. the card
fieldCod.addEventListener("input", e => {
  e.target.value = e.target.value.substr(0, 4);
  document.getElementById("securityCode").innerText = e.target.value;
  slipCard('back');
});
// Card and form
const card = document.getElementsByClassName("card")[0];
const form = document.getElementById("purchaseForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // 
  const btnSubmitCard = document.getElementById("btnSubmitCard");
  btnSubmitCard.innerText = "Processing";
  btnSubmitCard.setAttribute("disabled", "disabled");
  const interval = window.setInterval(() => {
    btnSubmitCard.innerText += '.';
  }, 1000);

  window.setTimeout(() => {
    clearInterval(interval);
    btnSubmitCard.innerHTML = "Submit";
    btnSubmitCard.removeAttribute("disabled");
  }, 10000);
});

const pageResize = () => {
  creditCard.style.width = card.clientWidth + "px";
  creditCard.style.height = card.clientHeight + "px";
  creditCard.style.minWidth = card.clientWidth + "px";
  creditCard.style.minHeight = card.clientHeight + "px";

  document.getElementById('elementFieldsForm').style.maxWidth = card.clientWidth + "px";
};

// Event for a window change
window.onresize = (e) => {
  pageResize();
};
window.onload = (e) => {
  pageResize();
};