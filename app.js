const billAmt = document.querySelector("#bill-amount");

const cashGiven = document.querySelector("#cash-given");

const checkButton = document.querySelector("#check-button");

const message = document.querySelector("#error-message");

const countNotes = document.querySelectorAll(".no-of-notes");

const notes = [ 2000, 500, 100, 20, 10, 5, 1 ] ;

checkButton.addEventListener("click", function validateInput() {
    
    hideMessage();
    if ( billAmt.value > 0 ) {
        
        if ( cashGiven.value >= billAmt.value ) {
            
            const cashToBeReturned = cashGiven.value - billAmt.value;
            
            calculateNotes(cashToBeReturned);
        }
        else{
            showMessage("Bill amount should be less than or equal to Cash given. ");
        }
    }
    else if (isNaN(billAmt.value)) { 
        showMessage("Please enter a numerical value")
    }
    else {
        showMessage("Enter Valid Input")
    }
}) ;

function calculateNotes(cashToBeReturned) {
    
    for ( let i = 0; i < notes.length ; i++ ) {
        
        var numberOfNotes = Math.trunc( cashToBeReturned / notes[i] );

        cashToBeReturned = cashToBeReturned % notes[i];

        countNotes[i].innerText = numberOfNotes;
    }
}

function hideMessage(){
    message.style.display="none";
    
}

function showMessage(msg){
    message.style.display="block";
    message.innerText = msg;
}
