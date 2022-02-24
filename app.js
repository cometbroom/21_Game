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

const addButtonEvents = (parent, winCallback, computerTurn) => {
    for (const element of parent.children) {
        element.addEventListener("click", (e) => {
            let targetNum = parseInt(e.target.innerHTML, 10);
            const total = addToTotal(targetNum);
            if (total === 21) {
                winCallback();
                return;
            }
            computerTurn();
        });
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

    const winCondition = () => {
        extraInfo.innerHTML = "You win!";
    };

    const computerTurn = async () => {
        const options = [1, 2, 3];
        const randIndex = Math.floor(Math.random() * options.length);
        const randSleep = Math.floor(Math.random() * (1500 - 500 + 1) + 500);
        let total;

        //turnDisplay.children[0].style;
        changeTurnStyle(turnDisplay, "computer");
        await sleep(randSleep).then(() => {
            total = addToTotal(options[randIndex]);
        });
        if (total === 21) {
            extraInfo.innerHTML = "Computer won!";
        }
        changeTurnStyle(turnDisplay, "player");
    };

    addButtonEvents(buttons, winCondition, computerTurn);

    //clog(buttons.children);
});
