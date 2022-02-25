//3 ai difficulties: harder means deeper prediction pattern: 17 medium, 13 hard.
// easy is the current which has predictionPattern towards 18 (computer turn)

//Globals
let lockPlayer = false;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const clog = (target) => {
    console.log(target);
};

const getNumber = (el) => {
    return parseInt(el.innerHTML, 10);
};

const addToTotal = (x) => {
    const newTotal = x + getNumber(totalDisplay);
    totalDisplay.innerHTML = newTotal;
    return newTotal;
};

const changeTurnStyle = (el, actor) => {
    if (actor === "computer") {
        el.children[0].style.opacity = "0.2";
        el.children[1].style.opacity = "1";
    } else {
        el.children[1].style.opacity = "0.2";
        el.children[0].style.opacity = "1";
    }
};

let winCondition;
let computerTurn;

function btnClicked(e) {
    if (lockPlayer === true) return;
    let targetNum = parseInt(e.target.innerHTML, 10);
    const total = addToTotal(targetNum);
    if (total === 21) {
        winCondition("Player");
        return;
    }
    if (total > 21) {
        winCondition("No one");
        return;
    }
    computerTurn();
}

const addButtonEvents = (parent) => {
    for (const element of parent.children) {
        element.addEventListener("click", btnClicked);
    }
};

const deleteBtnEvents = (parent) => {
    for (const element of parent.children) {
        element.removeEventListener("click", btnClicked);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const totalDisplay = document.querySelector("#totalDisplay");
    const buttons = document.querySelector(".buttons");
    const button1 = document.querySelector("#btn1");
    const button2 = document.querySelector("#btn2");
    const button3 = document.querySelector("#btn3");
    const extraInfo = document.querySelector(".extra-info");
    const turnDisplay = document.querySelector(".turn-display");

    winCondition = (winner) => {
        extraInfo.innerHTML = `${winner} wins!`;
        deleteBtnEvents(buttons);
    };

    const checkPossibleWin = (options) => {
        for (const number of options) {
            if (getNumber(totalDisplay) + number === 21) return number;
        }
        return -1;
    };

    computerTurn = async () => {
        const options = [1, 2, 3];
        const randIndex = Math.floor(Math.random() * options.length);
        const randSleep = Math.floor(Math.random() * (1500 - 500 + 1) + 500);
        let total;

        lockPlayer = true;

        //turnDisplay.children[0].style;
        changeTurnStyle(turnDisplay, "computer");
        await sleep(randSleep).then(() => {
            let possibleWinNum = checkPossibleWin(options);
            if (possibleWinNum === -1) total = addToTotal(options[randIndex]);
            else total = addToTotal(possibleWinNum);
        });
        if (total === 21) {
            winCondition("Computer");
            return;
        }
        if (total > 21) {
            winCondition("No one");
            return;
        }
        changeTurnStyle(turnDisplay, "player");
        lockPlayer = false;
    };

    addButtonEvents(buttons, winCondition, computerTurn);

    //clog(buttons.children);
});
