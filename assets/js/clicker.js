(() => {

    // Base pour counter + boutons click et reset

    let counter = localStorage.getItem("count");
    console.log(counter);
    if (counter === null || counter === "undefined") {
        counter = 0;
    }
    document.getElementById("counter").innerHTML = counter;

    let _multiplier = localStorage.getItem("multiplier");
    console.log(_multiplier);
    if (_multiplier === null || _multiplier === "undefined") {
        _multiplier = 1;
    }
    
    //bonus flag
    let bonusBoolean = false;

    document.getElementById("clicker").addEventListener("click", () => {
        //if bonus activated then add twice the multiplier
        if (bonusBoolean){
            counter = counter + _multiplier *2;
        } else {
            counter = counter + _multiplier;
        }

        localStorage.setItem("count", counter);
        console.log(counter);
        document.getElementById("counter").innerHTML = counter;

        // Tests pour activer les autres boutons
        if (counter >= parseInt(document.getElementById("2").textContent)) {
            document.getElementById("2").disabled = false;
        }
        if (counter >= parseInt(document.getElementById("3").textContent)) {
            document.getElementById("3").disabled = false;
        }
        if (counter >= parseInt(document.getElementById("4").textContent)) {
            document.getElementById("4").disabled = false;
        }
        if (counter >= parseInt(document.getElementById("5").textContent)) {
            document.getElementById("5").disabled = false;
        }
        if (counter >= 5000) {
            document.getElementById("autoclicker").disabled = false;
        }
        if (counter >= 10000) {
            document.getElementById("bonus").disabled = false;
        }
    });

    document.getElementById("reset").addEventListener("click", () => {
        localStorage.clear();
        document.location.reload();
        document.getElementById("counter").innerHTML = counter;

        // Reset des boutons de droite
        document.getElementById("2").disabled = true;
        document.getElementById("3").disabled = true;
        document.getElementById("4").disabled = true;
        document.getElementById("5").disabled = true;
        document.getElementById("autoclicker").disabled = true;
        document.getElementById("bonus").disabled = true;
    });

    // Boutons multiplicateurs et bonus

    Array.from(document.querySelectorAll("button.multiplier")).forEach($btn =>
        $btn.addEventListener(
            "click",
            () => (updateUI($btn.id), false),
        )
    );


    document.getElementById("autoclicker").addEventListener("click", () => {
        AutoClicker();
    });

    document.getElementById("bonus").addEventListener("click", () => {
        //gets the current counter
        counter = parseInt(localStorage.getItem("count"));
        let bonusPrice = parseInt(document.getElementById("bonus").innerHTML,10);

        //let counter = parseInt(document.getElementById("counter").innerHTML);
        //if the counter > the required price
        if (counter > bonusPrice) {
            //reduces the counter
            counter = counter - bonusPrice;
            //saves the new value of counter
            localStorage.setItem("count", counter);
            //displays the new value of the counter
            document.getElementById("counter").innerHTML = counter;
            
            //saves the display of the button click-me , before activating the bonus
            let clickMePreviousDisplayString = document.getElementById("clicker").innerHTML;

            //sets the bonus button disabled
            document.getElementById("bonus").disabled = true;

            //activates the bonus flag 
            bonusBoolean = true;

            //sets the timer at start time
            let time = 10;
            //launches the count down on the timer
            var x = setInterval(function () {
                //sets the click button with the new display
                document.getElementById("clicker").innerHTML = `Bonus 200% for ${time}s (+${_multiplier*2})`;

                //decreases the timer
                time = time - 1;

                // if count down completed
                if (time < 0) {
                    // stop the timer
                    clearInterval(x);

                    //deactivates the bonus flag 
                    bonusBoolean = false;

                    //displays in the button clicker, the previous counter display
                    document.getElementById("clicker").innerHTML = clickMePreviousDisplayString;
                    //sets the bonus button enabled
                    document.getElementById("bonus").disabled = false;
                }
            }, 1000);
        }
    });


    // Fonctions
    let priceAC = 5000; // Valeur temporaire du prix
    function autoAdd() {
        //counter++; // +1
        //if bonus activated then add twice the multiplier
        if (bonusBoolean){
            counter = counter + _multiplier *2;
        } else {
            counter = counter + _multiplier;
        }
        document.getElementById("counter").innerHTML = counter; // Afficher
    }
    function AutoClicker() { // Fonction autoclick
        if (counter >= priceAC) {   // Pas de négatif
            counter -= priceAC; // Retirer les points               
            autoAdd(); // Appel de la fonction qui fait +1
            setInterval(autoAdd, 1000); // Intervalle d'une seconde
        }
    }

    // John

    function updateUI(id) {
        const multiplier = document.getElementById(id);
        const score = document.getElementById("counter");
        const clicker = document.getElementById("clicker");
        const inflation = 2;

        let cost = parseInt((multiplier.innerHTML), 10);

        _multiplier = _multiplier * Number(id);

        // Update variables
        counter = counter - cost;
        cost = cost * inflation;

        // Update UI
        score.innerHTML = counter;
        clicker.innerHTML = `Click Me (+${_multiplier})`;
        multiplier.innerHTML = `${cost} $`;
        document.getElementById(id).disabled = true;

    }

})();