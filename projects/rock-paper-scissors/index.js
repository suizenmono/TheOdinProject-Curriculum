'use strict';

const uiContainer = document.querySelector(".game-container");
const uiTitle = document.querySelector(".title");
const uiDescription = document.querySelector(".description");
const uiChoices = document.querySelector(".choices");
const uiReset = document.querySelector(".reset");
const uiResetBtn = document.querySelector("#btn-reset");

document.querySelector("#btn-rock").addEventListener("click", startGame);
document.querySelector("#btn-paper").addEventListener("click", startGame);
document.querySelector("#btn-scissors").addEventListener("click", startGame);
uiResetBtn.addEventListener("click", initialize);

initialize();

function initialize() {
    uiTitle.textContent = "Rock-Paper-Scissors";
    uiDescription.textContent = "What will you play?";
    uiChoices.classList.remove("hidden");
    uiReset.classList.add("hidden");
    uiContainer.style.backgroundColor = "var(--init-bg)";
    uiContainer.style.color = "var(--init-fg)";
}

function startGame(e) {
    let computerMove = setRNG();
    let playerMove;
    let outcome;

    switch (e.target.id) {
        case "btn-rock":
            playerMove = "Rock";
            break;
        case "btn-paper":
            playerMove = "Paper";
            break;
        case "btn-scissors":
            playerMove = "Scissors";
            break;
    }

    console.log("Player:", playerMove, "\nComputer:", computerMove);

    if (playerMove === computerMove) {
        outcome = "draw";
    } else if (
        (playerMove === "Rock" && computerMove === "Scissors")
        || (playerMove === "Paper" && computerMove === "Rock")
        || (playerMove === "Scissors" && computerMove === "Paper")
    ) {
        outcome = "win";
    } else {
        outcome = "lose";
    }
    
    console.log("Result:", outcome);
    updateUI(outcome, playerMove, computerMove);
}

function setRNG() {
    let rng = Math.random() * 3; // yields rng in [0,3)
    let computerMove;
    
    // excluded upper boundary means intervals are uniform => no bias
    if (rng < 1) {
        computerMove = "Rock";
    }
    else if (rng < 2) {
        computerMove = "Paper";
    }
    else { // rng >= 2 && rng < 3
        computerMove = "Scissors";
    }

    return computerMove;
}

function updateUI(_outcome, _playerMove, _computerMove) {
    uiChoices.classList.add("hidden");
    uiReset.classList.remove("hidden");

    switch (_outcome) {
        case "win":
            uiTitle.textContent = `${_playerMove} wins!`;
            uiContainer.style.backgroundColor = "var(--win-bg)";
            uiContainer.style.color = "var(--win-fg)";
            uiResetBtn.style.backgroundColor = "var(--win-btn-bg)"
            uiResetBtn.style.color = "var(--win-btn-fg)"
            break;
        case "lose":
            uiTitle.textContent = `${_playerMove} looses...`;
            uiContainer.style.backgroundColor = "var(--lose-bg)";
            uiContainer.style.color = "var(--lose-fg)";
            uiResetBtn.style.backgroundColor = "var(--lose-btn-bg)"
            uiResetBtn.style.color = "var(--lose-btn-fg)"
            break;
        case "draw":
            uiTitle.textContent = `${_playerMove} draws!`;
            uiContainer.style.backgroundColor = "var(--draw-bg)";
            uiContainer.style.color = "var(--draw-fg)";
            uiResetBtn.style.backgroundColor = "var(--draw-btn-bg)"
            uiResetBtn.style.color = "var(--draw-btn-fg)"
            break;
    }
    uiDescription.textContent = `You matched against ${_computerMove}`;
}