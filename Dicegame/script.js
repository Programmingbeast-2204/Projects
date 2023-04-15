"use strict";
// Selection Elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

// Selection conditions
let scores;
let currentScore;
let activePlayer;
let playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//Rolling Dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice role
    const diceEl = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice.classList.remove("hidden");
    dice.src = `dice-${diceEl}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (diceEl !== 1) {
      // Add dice to the current score
      currentScore += diceEl;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Add current score to active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score is>=100
    if (scores[activePlayer] >= 100) {
      // 3.Finish the game
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 4.Switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", function () {
  init();
});
