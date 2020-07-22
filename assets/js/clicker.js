(() => {
    //before display of the page : Settings 
    //--------------------------------------    
        // ---- Setting of counter ----
        let counter = localStorage.getItem("count");
        if (counter === null || counter === "undefined")  counter = 0;
        //update the display of the counter value
        document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
        counter = Number(counter);
        //console.log("setting counter : " + counter);
    
        // ---- Setting of _multiplier ----
        let _multiplier = localStorage.getItem("multiplier");
        if (_multiplier === null || _multiplier === "undefined") _multiplier = 1;
        _multiplier = Number(_multiplier);
        //update the display of the click button
        document.getElementById("clicker").innerHTML = `Click Me (+${_multiplier})`;
        //console.log("setting _multiplier : " + _multiplier);
    
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
            //set with default value if no value in storage
            if (multiplierCost  === null || multiplierCost  === "undefined") multiplierCost = multiplierDefaultCosts[i];
            // format the multiplier cost into numeric
            multiplierCost = Number(multiplierCost);
            //display for each button, its cost
            document.getElementById(i).innerHTML = new Intl.NumberFormat().format(multiplierCost) + " $";
            //console.log(`multiplierCost${i} : ${multiplierCost}`);
            //saves each multiplier cost
            localStorage.setItem(`multiplierCost${i}`, multiplierCost);
        };
    
        // --- Setting of autoclick cost ----
        let autoClickCost = localStorage.getItem("autoClickCost");
        if (autoClickCost === null || autoClickCost === "undefined") autoClickCost = 1000;
        // format into numeric
        autoClickCost = Number(autoClickCost);
        localStorage.setItem("autoClickCost", autoClickCost);
        
        // // --- Setting of the number of autoclicks  ----
        let autoClickNumber = 0;
        // let autoClickNumber = localStorage.getItem("autoClickNumber");
        // if (autoClickNumber === null || autoClickNumber === "undefined") autoClickNumber = 0;
        // // format into numeric
        // autoClickNumber = Number(autoClickNumber);
        // localStorage.setItem("autoClickNumber", autoClickNumber);

        //set the display of the autoclick button
        document.getElementById("autoclicker").innerHTML = `${new Intl.NumberFormat().format(autoClickCost)}$ (${autoClickNumber})`;
        
        // --- Setting of bonus cost ----
        let bonusCost = localStorage.getItem("bonusCost");
        if (bonusCost === null || bonusCost === "undefined") {
            bonusCost = 5000;
        }
        // format into numeric
        bonusCost = Number(bonusCost);
        //set the display of the autoclick button
        //document.getElementById("bonus").innerHTML = `${bonusCost} $`;
        document.getElementById("bonus").innerHTML = `${new Intl.NumberFormat().format(bonusCost)} $`;
        localStorage.setItem("bonusCost", bonusCost);

        // ---- Setting of dinosaurus mode ----
        let dinosaurusMode = localStorage.getItem("dinosaurusMode");
        console.log("read : dinosaurusMode :" + dinosaurusMode);
        if (dinosaurusMode === null || dinosaurusMode === "undefined") dinosaurusMode = 0;
        dinosaurusMode = Number(dinosaurusMode);
        console.log("dinosaurusMode :" + dinosaurusMode);
        dinosaurusMode = localStorage.setItem("dinosaurusMode", dinosaurusMode);

        //cost inflation after each purchase
        const costInflation = 2;

        // ---- display buttons according the setted values ----
        enableDisablePurchaseButtons();
    
    // events managment
    //------------------------
        //-------- click button ------
        document.getElementById("clicker").addEventListener("click", () => {
            //if bonus activated then add twice the multiplier
            if (bonusBoolean){
                counter = counter + _multiplier * 2;
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
            bonusCost = parseInt(localStorage.getItem("bonusCost"));

            //if enough to get the bonus
            if (counter > bonusCost) {
                //reduces the counter & saves the new value of counter
                counter = counter - bonusCost;
                localStorage.setItem("count", counter);
                //displays the new value of the counter
                document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
                
                //activates the bonus flag 
                bonusBoolean = true;
    
                //saves the display of the button click-me , before activating the bonus
                let clickMePreviousDisplayString = document.getElementById("clicker").innerHTML;
    
                //update the bonus cost & saves the new value of bonus cost
                bonusCost = bonusCost * costInflation;
                localStorage.setItem("bonusCost", bonusCost);

                //update the display of the new bonus cost
                document.getElementById("bonus").innerHTML = new Intl.NumberFormat().format(bonusCost) + " $" ;
    
                //update display of purchase button
                enableDisablePurchaseButtons();
    
                //sets the timer at start time
                let time = 30;
                //launches the count down on the timer, interval = 1s 
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
                    }
                }, 1000);
            }
        });
    
        //-------- Dinosaurus button ------
        document.getElementById("dinosaurus").addEventListener("click", () => {
            
            console.log("click dino : " + localStorage.getItem("dinosaurusMode"));
            counter = parseInt(localStorage.getItem("count"));
            if (counter >= 10000){
                counter -= 10000;
                localStorage.setItem("count", counter);
                document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
                localStorage.setItem("dinosaurusMode", 1);
            }
            
        });
    // -------- Fonctions ----------
    //------------------------------
        function AutoClicker() { // Fonction autoclick
            if (counter >= autoClickCost) {   // Pas de négatif
                //counter
                counter -= autoClickCost; // Retirer les points 
                localStorage.setItem("count", counter);//saves the counter           
                //auto-click cost
                autoClickCost = autoClickCost * costInflation; // double the cost of the autoclick
                localStorage.setItem("autoClickCost", autoClickCost); //saves the autoclick cost
                //number of auto-clicks
                autoClickNumber ++; //increment the number of autoclicks
                //localStorage.setItem("autoClickNumber", autoClickNumber);//saves the number of autoclicks 
                document.getElementById("autoclicker").innerHTML = `${new Intl.NumberFormat().format(autoClickCost)}$ (${autoClickNumber})`;
                
                //update display of purchase buttons
                enableDisablePurchaseButtons();

                autoAdd(); // Appel de la fonction auto-addition
                setInterval(autoAdd, 1000); // Intervalle d'une seconde
            }
        }
    
        function autoAdd() {
            //if bonus activated then add twice the multiplier
            if (bonusBoolean){
                counter = counter + _multiplier * 2;
            } else {
                counter = counter + _multiplier;
            }

            localStorage.setItem("count", counter);
            document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";

            //update display of purchase buttons
            enableDisablePurchaseButtons();
        }

        function updateUI(id) {
            //get the multiplier cost 
            let cost = parseInt(localStorage.getItem(`multiplierCost${id}`));
            //console.log(cost);
            let dinosaurusMode = parseInt(localStorage.getItem("dinosaurusMode"));
            //compute the new value of the _multiplier & save itc
            console.log("dino : " + dinosaurusMode);
            if (dinosaurusMode == 1){
                _multiplier = _multiplier * Number(id);
            } else {
                _multiplier = _multiplier + Number(id);
            }
            localStorage.setItem("multiplier", _multiplier);

            // Update variables & save the counter
            counter = counter - cost;
            localStorage.setItem("count", counter);
    
            // compute the new cost of the chosen multiplier & save the it
            cost = cost * costInflation;
            localStorage.setItem(`multiplierCost${id}`, cost);
            //console.log(`id = ${id} , multiplierCost${id} = ` + localStorage.getItem(`multiplierCost${id}`));
    
            // Update counter , click-me button & mutliplier cost
            document.getElementById("counter").innerHTML = new Intl.NumberFormat().format(counter) + " $";
            document.getElementById("clicker").innerHTML = `Click Me (+${_multiplier})`;
            document.getElementById(id).innerHTML = new Intl.NumberFormat().format(cost)+ " $";
            
            //update the display of the multiplier buttons
            enableDisablePurchaseButtons();
        }
    
        function enableDisablePurchaseButtons(){
            let counter = parseInt(localStorage.getItem("count"));
            let dinosaurusMode = parseInt(localStorage.getItem("dinosaurusMode"));
            //console.log("display buttons : counter = " + counter);
    
            for(i=2; i<=5;i++){
                //console.log(`display buttons : id = ${i} , multiplierCost${i} = ` + localStorage.getItem(`multiplierCost${i}`));
                //if enough money then enable the purchase button for each multiplier
                if (counter >= parseInt(localStorage.getItem(`multiplierCost${i}`))){
                    document.getElementById(i).disabled = false;
                } else {
                    document.getElementById(i).disabled = true;
                }
            }
            // if enough money to get the autoclicker
            if (counter >= autoClickCost) {
                document.getElementById("autoclicker").disabled = false;
            } else {
                document.getElementById("autoclicker").disabled = true;
            }
            // if enough money to get the Bonus & if the bonusBoolean is not active, then set the button bonnus active
            if (counter >= bonusCost && bonusBoolean == false) {
                document.getElementById("bonus").disabled = false;
            } else {
                document.getElementById("bonus").disabled = true;
            }

            //if  dinosaurusMode = active , set the button disabled
            console.log("display : dinosaurusMode = " + dinosaurusMode);
            if (counter >= 10000 && dinosaurusMode == 0 ){
            //if (counter >= 10000  ){
                document.getElementById("dinosaurus").disabled = false;
            }  else {
                document.getElementById("dinosaurus").disabled = true;
            }   
        
        }
    
    })();