//Globals
let lockPlayer = false;
const sounds = {
  uiSound1: new Audio("./assets/sounds/Game_Invite.wav"),
  playerWon: new Audio("./assets/sounds/Negative_Bell_Bling_Game_Sound.wav"),
  computerWon: new Audio("./assets/sounds/Robot_Whoosh_Notification.wav"),
};

let winCondition;
let computerTurn;

//Wait for document to load.
document.addEventListener("DOMContentLoaded", () => {
  const totalDisplay = document.querySelector("#totalDisplay");
  const buttons = document.querySelector(".buttons");
  const extraInfo = document.querySelector(".extra-info");
  const turnDisplay = document.querySelector(".turn-display");

  //Display winner when they win and turn off events.
  winCondition = (winner) => {
    extraInfo.textContent = `${winner} wins!`;
    sounds[`${winner.toLowerCase()}Won`].play();

    deleteBtnEvents(buttons);
  };

  //Method for AI to predict win and choose a number accordingly
  const checkPossibleWin = (options) => {
    for (const number of options) {
      if (getNumber(totalDisplay) + number === 21) return number;
    }
    return null;
  };

  computerTurn = async () => {
    //Look at the options
    const options = [1, 2, 3];
    const randIndex = Math.floor(Math.random() * options.length);
    const randSleep = Math.floor(Math.random() * (1500 - 500 + 1) + 500);

    //Lockplayer while computer is taking a turn.
    lockPlayer = true;

    //CSS to change style of the player taking turn
    changeTurnStyle(turnDisplay, "computer");
    await sleep(randSleep);
    let nextMove = checkPossibleWin(options) || options[randIndex];
    const total = addToTotal(nextMove);
    if (total === 21) return winCondition("Computer");
    if (total > 21) return winCondition("No one");

    changeTurnStyle(turnDisplay, "player");
    lockPlayer = false;
  };

  addButtonEvents(buttons, winCondition, computerTurn);
});

function btnClicked(e) {
  if (lockPlayer === true) return;
  let targetNum = parseInt(e.target.innerHTML, 10);
  const total = addToTotal(targetNum);
  if (total === 21) return winCondition("Player");
  if (total > 21) return winCondition("No one");
  computerTurn();
}

const changeTurnStyle = (el, actor) => {
  const duration = 0.3;

  sounds.uiSound1.play();

  if (actor === "computer") {
    //gsap is animation library added in index.html
    gsap.to(el.children[0], { opacity: 0.2, duration });
    gsap.to(el.children[1], { opacity: 1, duration });
  } else {
    gsap.to(el.children[0], { opacity: 1, duration });
    gsap.to(el.children[1], { opacity: 0.2, duration });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Get number inside element
const getNumber = (el) => {
  return parseInt(el.innerHTML, 10);
};

//Add number x to total result
const addToTotal = (x) => {
  const newTotal = x + getNumber(totalDisplay);
  totalDisplay.innerHTML = newTotal;
  return newTotal;
};

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
