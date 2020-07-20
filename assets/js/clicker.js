

(() => {

    let counter = Number(localStorage.getItem("count"));
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

    Array.from(document.querySelectorAll("button.multiplier")).forEach($btn =>
        $btn.addEventListener(
            "click",
            () => (updateUI($btn.id), false),
        )
    );

    let sufficientFunds = false;
    let _multiplier = 1;
    let _cost = 10;

    function updateUI(id) {
        const cost = document.getElementById(`cost-${id}`);
        const multiplier = document.getElementById(id);
        const score = document.getElementById("counter");
        const clicker = document.getElementById("clicker");
        const inflation = 2;

        _cost = Number(cost.innerHTML);

        balanceCheck();

        if (sufficientFunds) {
            _multiplier = _multiplier * Number(multiplier.innerHTML);

            // Update variables
            counter = counter - _cost;
            _cost = _cost * inflation;

            // Update UI
            score.innerHTML = counter;
            clicker.innerHTML = `Click Me (x${_multiplier})`;
            cost.innerHTML = _cost;

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