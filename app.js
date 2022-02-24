const clog = (target) => {
    console.log(target);
};

const getNumber = (el) => {
    return parseInt(el.innerHTML, 10);
};

const addButtonEvents = (parent, winCallback) => {
    for (const element of parent.children) {
        element.addEventListener("click", (e) => {
            let targetNum = parseInt(e.target.innerHTML, 10);
            const newTotal = targetNum + getNumber(totalDisplay);
            totalDisplay.innerHTML = newTotal;
            if (newTotal === 21) {
                winCallback();
            }
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

    const winCondition = () => {
        extraInfo.innerHTML = "You win!";
    };

    addButtonEvents(buttons, winCondition);

    clog(buttons.children);
});
