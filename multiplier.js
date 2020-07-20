const multiButton = document.getElementById("multi");
const clicker = document.getElementById("clicker");
const counter = document.getElementById("counter");
const cost = document.getElementById("cost");
const priceMultiplier = 1;
const enoughFunds = false;

multiButton.addEventListener(
    "click",
    () => (updateUI(), false),
);

function updateUI() {
    balanceCheck();
    if (enoughFunds) {
        clicker.innerHTML = Number(multiButton.value);
        priceMultiplier *= 1.5;

    }
}

function balanceCheck() {
    if (Number(counter.value) >= Number(cost.value)) {
        enoughFunds = true;
    }
}