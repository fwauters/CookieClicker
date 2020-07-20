const multiButton = document.getElementById("multi");
const clicker = document.getElementById("clicker");
const counter = document.getElementById("counter");
const cost = document.getElementById("cost");
let priceMultiplier = 1;
let enoughFunds = false;

multiButton.addEventListener(
    "click",
    () => (updateUI(), false),
);

function updateUI() {
    balanceCheck();
    console.log(enoughFunds);
    if (enoughFunds) {
        clicker.innerHTML = `${clicker.innerHTML} x2`;

        priceMultiplier *= 2;
        counter.innerHTML = counter.innerHTML - cost.innerHTML;
        cost.innerHTML = cost.innerHTML * priceMultiplier;
    }
}

function balanceCheck() {
    if (Number(counter.innerHTML) >= Number(cost.innerHTML)) {
        enoughFunds = true;
    }
}