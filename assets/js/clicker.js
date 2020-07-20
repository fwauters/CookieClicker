

(() => {

    let counter = Number(localStorage.getItem("count"));
    console.log(counter);
    if (counter === null || counter === "undefined") {
        counter = 0;
    }
    document.getElementById("counter").innerHTML = counter;

    document.getElementById("clicker").addEventListener("click", () => {
        counter = counter + (Number(_multiplier));
        localStorage.setItem("count", counter);
        document.getElementById("counter").innerHTML = counter;
    });

    document.getElementById("reset").addEventListener("click", () => {
        localStorage.clear();
        document.location.reload();
        document.getElementById("counter").innerHTML = counter;
    });

    // John

    const multiplier = document.getElementById("multiplier");
    const clicker = document.getElementById("clicker");
    const value = document.getElementById("counter");
    const cost = document.getElementById("cost");
    let _multiplier = 1;
    let _cost = 10;
    let sufficientFunds = false;

    multiplier.addEventListener(
        "click",
        () => (updateUI(), false),
    );

    function updateUI() {
        balanceCheck();
        if (sufficientFunds) {
            // Update variables
            counter = counter - _cost;
            _multiplier *= 2;
            _cost = 10 * _multiplier;
            // Update UI
            value.innerHTML = counter;
            clicker.innerHTML = `Click Me x${_multiplier}`;
            cost.innerHTML = `${_cost}$`;
            // Reset balance
            sufficientFunds = false;
        }
    }

    function balanceCheck() {
        if (counter >= _cost) {
            sufficientFunds = true;
        } else {
            alert(`Insufficient funds!`);
        }
    }

})();