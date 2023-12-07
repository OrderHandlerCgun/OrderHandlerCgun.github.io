document.getElementById("name").innerText = localStorage.getItem("name");
document.getElementById("displayChoice1").innerText =
  localStorage.getItem("choice1");
document.getElementById("displayChoice2").innerText =
  localStorage.getItem("choice2");
document.getElementById("displayChoice3").innerText =
  localStorage.getItem("choice3");
document.getElementById("displayChoice4").innerText =
  localStorage.getItem("choice4");
document.getElementById("displayChoice5").innerText =
  localStorage.getItem("choice5");
document.getElementById("displayChoice6").innerText =
  localStorage.getItem("choice6");
document.getElementById("displayChoice7").innerText =
  localStorage.getItem("choice7");

function submitChoices() {
  var choice1 = localStorage.getItem("choice1");
  var choice2 = localStorage.getItem("choice2");
  var choice3 = localStorage.getItem("choice3");
  var choice4 = localStorage.getItem("choice4");
  var choice5 = localStorage.getItem("choice5");
  var choice6 = localStorage.getItem("choice6");
  var choice7 = localStorage.getItem("choice7");
  var sessionID = localStorage.getItem("OrderKey");
  var name = localStorage.getItem("name");

  var url =
    "https://script.google.com/macros/s/AKfycbxkWJaPR1XKghycDNWMwVUUyxcbDeJgjIhIeJUR9TwwbGOKR_ak9QHKpf6NpnlyZqre/exec";
  url += "?name=" + encodeURIComponent(name);
  url += "&shape=" + encodeURIComponent(choice1);
  url += "&size=" + encodeURIComponent(choice2);
  url += "&weight=" + encodeURIComponent(choice3);
  url += "&ms=" + encodeURIComponent(choice4);
  url += "&coat=" + encodeURIComponent(choice7);
  url += "&choice=" + encodeURIComponent(choice5);
  url += "&dimension=" + encodeURIComponent(choice6);
  url += "&orderid=" + encodeURIComponent(sessionID);

  document.getElementById("url").innerText = "Order Submission Received!";
  document.getElementById("submisison").style.display = "none";
  document.getElementById("Home").style.display = "block";

  fetch(url);
}
