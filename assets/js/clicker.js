(() => {
    //before display of the page : Settings 
    //--------------------------------------    
        // ---- Setting of counter ----
        let counter = localStorage.getItem("count");
        if (counter === null || counter === "undefined") {
            counter = 0;
        }
        document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
        counter = Number(counter);
        console.log("setting counter : " + counter);
    
        // ---- Setting of _multiplier ----
        let _multiplier = localStorage.getItem("multiplier");
        if (_multiplier === null || _multiplier === "undefined") {
            _multiplier = 1;
        }
        _multiplier = Number(_multiplier);
        //set the display of the click button
        document.getElementById("clicker").innerHTML = `Click Me (+${_multiplier})`;
        console.log("setting _multiplier : " + _multiplier);
    
        //---- Setting of bonus flag ----
        let bonusBoolean = false;
    
        //---- Setting of each multiplier cost ----
        let multiplierCost;
        // default values if not already setted
        let multiplierDefaultCosts=[0,0,25,75,225,675];
        // for only indexes from 2 -> 5 : corresponding to the multiplier 2 -> 5
        for(i=2; i<=5; i++){
            // get values of the local stored multiplier costs with indexes =  'multiplierCost1', 'multiplierCost2', ...  'multiplierCost5'
            multiplierCost = localStorage.getItem(`multiplierCost${i}`);
    
            if (multiplierCost  === null || multiplierCost  === "undefined") {
                //if no value, then default value
                multiplierCost = multiplierDefaultCosts[i];
            }
            // format the multiplier cost into numeric
            multiplierCost = Number(multiplierCost);
            //display for each button, its cost
            document.getElementById(i).innerHTML = new Intl.NumberFormat().format(multiplierCost) + " $";
            console.log(`multiplierCost${i} : ${multiplierCost}`);
            localStorage.setItem(`multiplierCost${i}`, multiplierCost);
        };
    
        // ---- display buttons according the setted values ----
        enableDisablePurchaseButtons();
    
    
    // events managment
    //------------------------
        //-------- click button ------
        document.getElementById("clicker").addEventListener("click", () => {
            //if bonus activated then add twice the multiplier
            if (bonusBoolean){
                counter = counter + _multiplier *2;
            } else {
                counter = counter + _multiplier;
            }
    
            localStorage.setItem("count", counter);
            //console.log(counter);
            document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
    
            enableDisablePurchaseButtons();
        });
    
        //-------- reset button ------
        document.getElementById("reset").addEventListener("click", () => {
            localStorage.clear();
            document.location.reload();
            document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
    
            // Reset des boutons de droite
            document.getElementById("2").disabled = true;
            document.getElementById("3").disabled = true;
            document.getElementById("4").disabled = true;
            document.getElementById("5").disabled = true;
            document.getElementById("autoclicker").disabled = true;
            document.getElementById("bonus").disabled = true;
        });
    
        // ------- Boutons multiplicateurs -------
        Array.from(document.querySelectorAll("button.multiplier")).forEach($btn =>
            $btn.addEventListener(
                "click",
                () => (updateUI($btn.id), false),
            )
        );
    
        //-------- AutoClick button ------
        document.getElementById("autoclicker").addEventListener("click", () => {
            AutoClicker();
        });
    
        //-------- bonus button ------
        document.getElementById("bonus").addEventListener("click", () => {
            //get the current counter
            counter = parseInt(localStorage.getItem("count"));
            let bonusPrice = parseInt(document.getElementById("bonus").innerHTML,10);
    
            //if enough to get the bonus
            if (counter > bonusPrice) {
                //reduces the counter
                counter = counter - bonusPrice;
                //saves the new value of counter
                localStorage.setItem("count", counter);
                //displays the new value of the counter
                document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
                
                //activates the bonus flag 
                bonusBoolean = true;
    
                //saves the display of the button click-me , before activating the bonus
                let clickMePreviousDisplayString = document.getElementById("clicker").innerHTML;
    
                //sets the bonus button disabled
                //document.getElementById("bonus").disabled = true;
    
                //update display of purchase button
                enableDisablePurchaseButtons();
    
                //sets the timer at start time
                let time = 10;
                //launches the count down on the timer
                var x = setInterval(function () {
                    //sets the click button with the new display
                    document.getElementById("clicker").innerHTML = `BONUS ${time}s (+${_multiplier*2})`;
    
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
                        //document.getElementById("bonus").disabled = false;
                    }
                }, 1000);
            }
        });
    
    // -------- Fonctions ----------
    //------------------------------
        let priceAC = 5000; // Valeur temporaire du prix
        function autoAdd() {
            //counter++; // +1
            //if bonus activated then add twice the multiplier
            if (bonusBoolean){
                counter = counter + _multiplier *2;
            } else {
                counter = counter + _multiplier;
            }
            localStorage.setItem("count", counter);
            document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
            enableDisablePurchaseButtons();
        }
    
        function AutoClicker() { // Fonction autoclick
            if (counter >= priceAC) {   // Pas de négatif
                counter -= priceAC; // Retirer les points               
                enableDisablePurchaseButtons();
                autoAdd(); // Appel de la fonction qui fait +1
                setInterval(autoAdd, 1000); // Intervalle d'une seconde
            }
        }
    
        function updateUI(id) {
            const multiplier = document.getElementById(id);
            const score = document.getElementById("counter");
            const clicker = document.getElementById("clicker");
            const inflation = 2;
    
            let cost = parseInt((multiplier.innerHTML), 10);
    
            _multiplier = _multiplier * Number(id);
    
            // Update variables
            counter = counter - cost;
            // saves the counter
            localStorage.setItem("count", counter);
    
            cost = cost * inflation;
            
            // saves the new cost of the chosen multiplier
            localStorage.setItem(`multiplierCost${id}`, cost);
            //display in console
            console.log(`id = ${id} , multiplierCost${id} = ` + localStorage.getItem(`multiplierCost${id}`));
    
            // Update UI
            score.innerHTML = new Intl.NumberFormat().format(counter) + " $";
            clicker.innerHTML = `Click Me (+${_multiplier})`;
            multiplier.innerHTML = new Intl.NumberFormat().format(cost) + " $";
            document.getElementById(id).disabled = true;
            localStorage.setItem("multiplier", _multiplier);
            enableDisablePurchaseButtons();
        }
    
        function enableDisablePurchaseButtons(){
            //counter = parseInt(localStorage.getItem("count"));
            // Tests pour activer les autres boutons
            console.log("display buttons : counter = " + counter);
    
            for(i=2; i<=5;i++){
                console.log(`display buttons : id = ${i} , multiplierCost${i} = ` + localStorage.getItem(`multiplierCost${i}`));
                if (counter >= parseInt(localStorage.getItem(`multiplierCost${i}`))){
                    document.getElementById(i).disabled = false;
                } else {
                    document.getElementById(i).disabled = true;
                }
            }
            // if enough money to get the autoclicker
            if (counter >= 5000) {
                document.getElementById("autoclicker").disabled = false;
            } else {
                document.getElementById("autoclicker").disabled = true;
            }
            // if enough money to get the Bonus & if the bonusBoolean is not active, then set the button bonnus active
            if (counter >= 10000 && bonusBoolean == false) {
                document.getElementById("bonus").disabled = false;
            } else {
                document.getElementById("bonus").disabled = true;
            }
        }
    
    })();