

(() => {

    // Base pour counter + boutons click et reset

    let counter = localStorage.getItem("count");
    console.log(counter);
    if (counter === null || counter === "undefined") {
        counter = 0;
    }
    document.getElementById("counter").innerHTML = counter;

    document.getElementById("clicker").addEventListener("click", () => {
        counter++;
        localStorage.setItem("count", counter);
        console.log(counter);
        document.getElementById("counter").innerHTML = counter;

        // Tests pour activer les autres boutons
        if (counter >= 50) {
            document.getElementById("plusTwo").disabled = false;
        }
        if (counter >= 200) {
            document.getElementById("plusThree").disabled = false;
        }
        if (counter >= 500) {
            document.getElementById("plusFour").disabled = false;
        }
        if (counter >= 2000) {
            document.getElementById("plusFive").disabled = false;
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
        document.getElementById("plusTwo").disabled = true;
        document.getElementById("plusThree").disabled = true;
        document.getElementById("plusFour").disabled = true;
        document.getElementById("plusFive").disabled = true;
        document.getElementById("autoclicker").disabled = true;
        document.getElementById("bonus").disabled = true;
    });

    // Boutons multiplicateurs et bonus
    
    document.getElementById("plusTwo").addEventListener("click", () => {
        
    });

    document.getElementById("plusThree").addEventListener("click", () => {
        
    });

    document.getElementById("plusFour").addEventListener("click", () => {
        
    });

    document.getElementById("plusFive").addEventListener("click", () => {
        
    });

    document.getElementById("autoclicker").addEventListener("click", () => {
        AutoClicker();
    });

    document.getElementById("bonus").addEventListener("click", () => {
        
    });


    // Fonctions
    let priceAC = 10; // Valeur temporaire du prix
    function autoAdd() {
        counter++; // +1
        document.getElementById("counter").innerHTML = counter; // Afficher
    }
    function AutoClicker() { // Fonction autoclick
        if (counter>=10) {   // Pas de négatif
            counter -= priceAC; // Retirer les points               
            autoAdd(); // Appel de la fonction qui fait +1
            setInterval (autoAdd, 1000); // Intervalle d'une seconde
        }
    }

})();