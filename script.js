"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceImgEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// Game state variables
let currentScore, activePlayer, scores, playing;

// Initialization function
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImgEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// Function to switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Function to handle dice roll
const handleRoll = function () {
  if (playing) {
    // Generate a random roll
    let randomRoll = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceImgEl.classList.remove("hidden");
    diceImgEl.src = `dice-${randomRoll}.png`;

    // Check for rolled 1
    if (randomRoll !== 1) {
      // Add roll to current score
      currentScore += randomRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};

// Function to handle hold action
const handleHold = function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >=30
    if (scores[activePlayer] >= 30) {
      // Finish the game
      diceImgEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};

// Event listeners
btnRoll.addEventListener("click", handleRoll);
btnHold.addEventListener("click", handleHold);
btnNew.addEventListener("click", init);
