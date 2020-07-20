

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

})();