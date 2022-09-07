"use strict";
console.log("Success");
//Inputs
const billInput = document.querySelector(".Total__bill");
const peopleInput = document.querySelector(".Total__people");
const customInput = document.querySelector(".bill__tip--custom");
//Button
const tips = document.querySelectorAll(".bill__tip");

const Totalperson = document.querySelector(".total");
const Totaltip = document.querySelector(".tip");

const reset = document.querySelector(".reset");
console.log(customInput);
let bill = 0;
let Tip = 0;
customInput.addEventListener("input", function (e) {
  if (!+e.target.value) {
    e.target.classList.add("red");
    Tip = 0;
    return;
  }
  e.target.classList.remove("red");
  Tip = +e.target.value;
  confirmValue("Tip");
});
const checkValue = function (input) {
  let val = +input.value ?? 0;
  if (!val) {
    bill = 0;
    input.classList.add("red");
    return;
  }
  input.classList.remove("red");
  bill = val;
};
const confirmValue = (val) => {
  if (val == "bill") {
    if (!peopleInput.value || Tip === 0) return;
    displayResult(Totalperson, Totaltip);
  }
  if (val == "Tip") {
    if (!peopleInput.value || bill === 0) return;
    displayResult(Totalperson, Totaltip);
  }
};
billInput.addEventListener("input", function (e) {
  checkValue(e.target);
  confirmValue("bill");
});
tips.forEach((tip) => {
  tip.addEventListener("click", function (e) {
    let current = document.querySelector(".active-tip");
    if (current) {
      current.classList.remove("active-tip");
      console.log(e.target.classList.contains("bill__tip--custom"));
      if (!e.target.classList.contains("bill__tip--custom")) {
        e.target.classList.add("active-tip");
        Tip = +e.target.textContent.split("%")[0];
        confirmValue("Tip");
      }

      return;
    }
    if (!e.target.classList.contains("bill__tip--custom")) {
      e.target.classList.add("active-tip");
      customInput.classList.remove("red");
      Tip = +e.target.textContent.split("%")[0];
      if (!peopleInput.value || bill === 0) return;
      displayResult(Totalperson, Totaltip);
    }
  });
});
const displayResult = function (person, tip) {
  const amountPerperson = bill / peopleInput.value;
  const tipPerPerson = amountPerperson * (Tip / 100);
  person.textContent = `$${(amountPerperson + tipPerPerson).toFixed(2)}`;
  tip.textContent = `$${tipPerPerson.toFixed(2)}`;
  const currentTip = +tip.textContent.split("$")[1];
  const currentamount = +person.textContent.split("$")[1];
  if (!(currentTip > 0) || !(currentamount > 0)) {
    reset.classList.remove("active");
    return;
  }
  reset.classList.add("active");
};
peopleInput.addEventListener("input", function (e) {
  if (bill == 0 || Tip == 0) {
    console.log("Error");
    return;
  }
  if (!e.target.value || e.target.value == Infinity) {
    console.log(bill, Tip);
    return;
  }
  displayResult(Totalperson, Totaltip);
});
reset.addEventListener("click", function (e) {
  if (!reset.classList.contains("active")) return;
  bill = 0;
  Tip = 0;
  billInput.value = peopleInput.value = customInput.value = "";
  document.querySelector(".active-tip")?.classList.remove("active-tip");
  Totalperson.textContent = Totaltip.textContent = `$0.00`;
  reset.classList.remove("active");
});
