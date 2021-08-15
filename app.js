const billAmount = document.querySelector("#billAmount");

const cashGiven = document.querySelector("#cashGiven");

const errorDiv = document.querySelector(".errorMsg");

const cashGivenDiv = document.querySelector(".cashGivenInput");

const changeReturnDiv = document.querySelector(".changeReturn");

const output = document.querySelector("#output");

const nextBtn = document.querySelector("#nextBtn");

const checkBtn = document.querySelector("#checkBtn");

const resetBtn = document.querySelector("#reset");

const noOfNotes = document.querySelectorAll(".noOfNotes");

const arrayNoteAmount = [2000, 500, 200, 100, 50, 20, 10, 5, 1];

//We are displaying cashGivenInput field only after billAmount is filled

nextBtn.addEventListener('click', () => {
    hideError();
    if (Number(billAmount.value) > 0) {
        nextBtn.style.display = "none";
        cashGivenDiv.style.display = "block";
    } else {
        showError("Enter valid bill amount.");
    }
})


checkBtn.addEventListener('click', () => {
    clearNoOfNotes();
    hideError();

    let billAmountValue = Number(billAmount.value);
    let cashGivenValue = Number(cashGiven.value);

    if (billAmountValue > 0 && cashGivenValue > 0) {
        if (!Number.isInteger(cashGivenValue)) {
            showError("Enter valid amount in cash given field.");
            resetBtn.style.display = "block";
            return;
        }
        if (billAmountValue > cashGivenValue) {
            showError("Cash given is less than bill, please enter right amount.");
            resetBtn.style.display = "block";
            return;
        }

        calculateNotes(billAmountValue, cashGivenValue);
    } else {
        showError("Enter valid bill amount & cash given to continue.");
        resetBtn.style.display = "block";
    }
})


resetBtn.addEventListener('click', () => {
    window.location.reload();
})

function calculateNotes(bill, cash) {
    let returnAmount = cash - bill;

    if (returnAmount < 1) {
        showError("No amount should be returned.");
        resetBtn.style.display = "block";
        return;
    }

    changeReturnDiv.style.display = "block";
    resetBtn.style.display = "block";

    for (let i = 0; i < arrayNoteAmount.length; i++) {
        returnAmount = compare(returnAmount, arrayNoteAmount[i], i);
    }
}

function compare(remainder, noteAmount, index) {
    if (remainder >= noteAmount) {
        let notes = Math.floor(remainder / noteAmount);
        remainder = remainder - notes * noteAmount;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder;
}

function clearNoOfNotes() {
    for (let notes of noOfNotes) {
        notes.innerText = "";
    }
}

function showError(text) {
    errorDiv.style.display = "block";
    errorDiv.innerText = text;
    changeReturnDiv.style.display = "none";
}

function hideError() {
    errorDiv.style.display = "none";
}