

(() => {

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
    });

    document.getElementById("reset").addEventListener("click", () => {
        localStorage.clear();
        document.location.reload();
        document.getElementById("counter").innerHTML = counter;
    });

    document.getElementById("autoclicker").addEventListener("click", () => {
        AutoClicker();
    });

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