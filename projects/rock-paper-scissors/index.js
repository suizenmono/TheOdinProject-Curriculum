'use strict';

const uiContainer = document.querySelector(".game-container");
const uiTitle = document.querySelector(".title");
const uiDescription = document.querySelector(".description");
uiTitle.textContent = "Rock-Paper-Scissors";
uiDescription.textContent = "What will you play?";

document.querySelector("#btn-rock").addEventListener("click", startGame);
document.querySelector("#btn-paper").addEventListener("click", startGame);
document.querySelector("#btn-scissors").addEventListener("click", startGame);

function startGame(e) {
    let computerMove = setComputerMove();
    let playerMove;
    // const wins = [
    // playerMove === "Rock" && computerMove === "Scissors",
    // playerMove === "Paper" && computerMove === "Rock",
    // playerMove === "Scissors" && computerMove === "Paper"
    // ];
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

    drawUI(outcome, playerMove, computerMove);
}

function setComputerMove() {
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

    // console.log(rng, computerMove);
    return computerMove;
}

function drawUI(_outcome, _playerMove, _computerMove) {
    switch (_outcome) {
        case "win":
            uiContainer.style.backgroundColor = "#00ea79";
            uiContainer.style.color = "white";
            uiTitle.textContent = `${_playerMove} wins!`;
            break;
        case "lose":
            uiContainer.style.backgroundColor = "#d80839";
            uiContainer.style.color = "white";
            uiTitle.textContent = `${_playerMove} looses...`;
            break;
        case "draw":
            uiContainer.style.backgroundColor = "#ffe66b";
            uiContainer.style.color = "black";
            uiTitle.textContent = `${_playerMove} draws!`;
            break;
    }
    uiDescription.textContent = `You matched against ${_computerMove}`;
}