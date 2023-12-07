var currentSection = 1;
var colorSection = true;
var canMoveOn = true;

document.getElementById("dropdown1").addEventListener("change", onclickk);
document
  .getElementById("dropdown3")
  .addEventListener("change", onLightOrHeavyChange);
document
  .getElementById("dropdown7")
  .addEventListener("change", onPaintOrStainChange);
document
  .getElementById("colorDropdown")
  .addEventListener("change", onColorChange);
document.getElementById("otherText1").addEventListener("change", onclickk);

function showLastSection() {
  if (!canMoveOn) return;

  document.getElementById("section" + currentSection).classList.add("hidden");

  currentSection--;

  if (currentSection == 6 && colorSection == false) {
    currentSection--;
  }

  if (currentSection < 1) {
    window.location.href = "index.html";
    return;
  }

  document
    .getElementById("section" + currentSection)
    .classList.remove("hidden");

  saveChoices();
}

function showNextSection() {
  if (!canMoveOn) return;

  // Hide the current section
  document.getElementById("section" + currentSection).classList.add("hidden");

  // Move to the next section
  currentSection++;
  if (currentSection == 6 && colorSection == false) {
    currentSection++;
  }

  // If all sections are displayed, go to page3.html
  if (currentSection > 7) {
    window.location.href = "page3.html";
    return;
  }

  // Show the next section
  document
    .getElementById("section" + currentSection)
    .classList.remove("hidden");

  saveChoices();
}

function onclickk() {
  var dropdown1 = document.getElementById("dropdown1");
  var otherInput = document.getElementById("otherInput1");
  var otherText = document.getElementById("otherText1");
  var errorMessage = document.getElementById("error");

  // Reset error message
  errorMessage.innerHTML = "";

  if (dropdown1.value === "other") {
    otherInput.style.display = dropdown1.value === "other" ? "block" : "none";

    var inputValue = otherText.value;
    var validInput = /^[a-zA-Z0-9.]+$/.test(inputValue);

    if (!validInput) {
      errorMessage.innerHTML =
        "Invalid characters detected. Please use only numbers, letters, or a period.";
      canMoveOn = false;
      return;
    } else {
      canMoveOn = true;
    }
  }
}

function onLightOrHeavyChange() {
  var dropdown3 = document.getElementById("dropdown3");
  var dropdown7 = document.getElementById("dropdown7");
  var stainOption = document.getElementById("stainOption");
  var header = document.getElementById("paintstain");

  if (dropdown3.value === "Light") {
    stainOption.style.display = "block";
    header.innerHTML = "Paint, Stain, or Plain?";
  } else {
    stainOption.style.display = "none";
    header.innerHTML = "Paint or Plain?";
  }
}

function onPaintOrStainChange() {
  var dropdown7 = document.getElementById("dropdown7");
  var section6 = document.getElementById("section6");
  var stainOption = document.getElementById("stainOption");

  if (dropdown7.value === "Stain" || dropdown7.value === "Plain") {
    colorSection = false;
  } else {
    colorSection = true;
  }
}

function onColorChange() {
  var colorDropdown = document.getElementById("colorDropdown");
  var otherColorInput = document.getElementById("otherColorInput");

  // Show or hide the "Other" input based on color dropdown selection
  otherColorInput.style.display =
    colorDropdown.value === "other" ? "block" : "none";
}

function saveChoices() {
  var choice1 =
    document.getElementById("dropdown1").value === "other"
      ? document.getElementById("otherText1").value
      : document.getElementById("dropdown1").value;
  var choice2 = document.getElementById("dropdown2").value;
  var choice3 = document.getElementById("dropdown3").value;
  var choice4 = document.getElementById("dropdown4").value;
  var choice5 = document.getElementById("colorDropdown").value;
  var choice6 = document.getElementById("dropdown6").value;
  var choice7 = document.getElementById("dropdown7").value;

  localStorage.setItem("choice1", choice1);
  localStorage.setItem("choice2", choice2);
  localStorage.setItem("choice3", choice3);
  localStorage.setItem("choice4", choice4);
  localStorage.setItem("choice5", choice5);
  localStorage.setItem("choice6", choice6);
  localStorage.setItem("choice7", choice7);
}
