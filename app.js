const clog = (target) => {
    console.log(target);
};

document.addEventListener("DOMContentLoaded", () => {
    const totalDisplay = document.querySelector("#totalDisplay");
    const buttons = document.querySelector(".buttons");
    const button1 = document.querySelector("#btn1");
    const button2 = document.querySelector("#btn2");
    const button3 = document.querySelector("#btn3");
    const extraInfo = document.querySelector(".extra-info");

    const getNumber = (el) => {
        return parseInt(el.innerHTML, 10);
    };
    const winCondition = () => {
        extraInfo.innerHTML = "You win!";
    };

    clog(buttons.children);

    for (const element of buttons.children) {
        element.addEventListener("click", (e) => {
            let targetNum = parseInt(e.target.innerHTML, 10);
            const newTotal = targetNum + getNumber(totalDisplay);
            totalDisplay.innerHTML = newTotal;
            if (newTotal === 21) {
                winCondition();
            }
        });
    }
});
