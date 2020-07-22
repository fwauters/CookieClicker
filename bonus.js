let counter = parseInt(localStorage.getItem("count"));
//console.log("counter : " + counter);
if (counter === null || counter === undefined){
    counter = 0;
}
var multiplier = 1;

//---------------------------------
//by default the bonus option is deactivated
var bonusBoolean = false;

//console.log("multiplier : " + multiplier);
document.getElementById("bonus").addEventListener("click", () => {
    //gets the current counter
    counter = parseInt(localStorage.getItem("count"));
    let price = 100;
     
    //let counter = parseInt(document.getElementById("counter").innerHTML);
    //if the counter > the required price
    if (counter > price){
        //reduces the counter
        counter = counter - price;  
        //saves the new value of counter
        localStorage.setItem("count", counter);
        //displays the new value of the counter
        //document.getElementById("counter").innerHTML = counter.toString(10);
        document.getElementById("counter").innerHTML = localStorage.getItem("count");
        
        //sets the Bonus active
        bonusBoolean = true;

        //sets the bonus button disabled
        document.getElementById("bonus").disabled=true;
        //sets the timer at start time
        let time = 10; 
        //launches the count down on the timer
        var x = setInterval(function() {
            let string;
            //sets the click button with the new display
            document.getElementById("clicker").innerHTML = `Bonus 200% for ${time}s`;
            
            //decreases the time
            time = time - 1;
            
            // if count down completed
            if (time < 0){
                // stop the timer
                clearInterval(x);

                //sets back the display of the click button
                //console.log("end timer : multiplier: " + multiplier);
                switch(multiplier){
                    case 1 : string = "+1"; break;
                    case 2 : string = "+2"; break;
                    case 3 : string = "+3"; break;
                    case 4 : string = "+4"; break;
                    case 5 : string = "+5"; break;
                }

                //sets inactive the bonus option 
                bonusBoolean = false;
                //displays in the button clicker, the previous counter
                document.getElementById("clicker").innerHTML = string;
                //sets the bonus button enabled
                document.getElementById("bonus").disabled=false;
            } 
        },1000);
    }
});

document.getElementById("clicker").addEventListener("click", () => {
    let modifier;
    //let counter = parseInt(document.getElementById("counter").innerHTML);
    let counter = parseInt(localStorage.getItem("count"));
    //console.log("multiplier: " + multiplier);
    switch(multiplier){
        case 1 : modifier = 1; break;
        case 2 : modifier = 2; break;
        case 3 : modifier = 3; break;
        case 4 : modifier = 4; break;
        case 5 : modifier = 5; break;
    }
    //count the new value of the counter
    (bonusBoolean) ? counter += modifier * 3 : counter += modifier ;
    localStorage.setItem("count", counter);
    //document.getElementById("counter").innerHTML = counter.toString(10);
    document.getElementById("counter").innerHTML = localStorage.getItem("count");
});

