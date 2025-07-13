'use strict';

const uiContainer = document.querySelector(".game-container");
const uiTitle = document.querySelector(".title");
const uiRound = document.querySelector(".round");
const uiScore = document.querySelector(".score");
const uiDescription = document.querySelector(".description");
const uiChoices = document.querySelector(".choices");
const uiReset = document.querySelector(".reset");
const uiResetBtn = document.querySelector("#btn-reset");
const uiOutcomeMsg = document.querySelector(".final-outcome-message");

let playerScore = 0;
let roundCount = 1;
const maxRounds = 6;

document.querySelector("#btn-rock").addEventListener("click", startGame);
document.querySelector("#btn-paper").addEventListener("click", startGame);
document.querySelector("#btn-scissors").addEventListener("click", startGame);
uiResetBtn.addEventListener("click", initializeUI);

initializeUI();

function initializeUI() {
    uiTitle.textContent = "Rock-Paper-Scissors";
    uiDescription.textContent = "What will you play?";
    uiScore.classList.remove("hidden");
    uiChoices.classList.remove("hidden");
    uiReset.classList.add("hidden");
    uiOutcomeMsg.classList.add("hidden");
    uiContainer.style.backgroundColor = "var(--init-bg)";
    uiContainer.style.color = "var(--init-fg)";
    uiTitle.style.color = "var(--title-init)";

    uiRound.textContent = `Round ${roundCount} of ${maxRounds}`;
    uiScore.textContent = `Current Score: ${playerScore}`;
}

function startGame(e) {
    let computerMove = setRNG();
    let playerMove;
    let roundOutcome;
    let finalScore;
    let finalOutcome = null;

    console.log("Round #:", roundCount);

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
        roundOutcome = "draw";
    } else if (
        (playerMove === "Rock" && computerMove === "Scissors")
        || (playerMove === "Paper" && computerMove === "Rock")
        || (playerMove === "Scissors" && computerMove === "Paper")
    ) {
        roundOutcome = "win";
        playerScore++;
    } else {
        roundOutcome = "lose";
    }
    
    console.log("Round result:", roundOutcome);
    console.log("Current player score:", playerScore);

    if (roundCount >= maxRounds) {
        finalScore = playerScore;
        if (playerScore > maxRounds / 2) {
            finalOutcome = "winner";
            console.log("Final result: You're the winner!");
        } else if (playerScore === maxRounds / 2) { // no draw possible if maxRounds is an odd number
            finalOutcome = "no contest";
            console.log("Final result: That's a draw!");
        } else {
            finalOutcome = "loser";
            console.log("Final result: You lost...");
        }
        console.log("Now reinitializing the game.");
        roundCount = 1;
        playerScore = 0;
    } else {
        roundCount++;
    }
    
    updateUI(roundOutcome, finalOutcome, finalScore, playerMove, computerMove);
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

function updateUI(_roundOutcome, _finalOutcome, _finalScore, _playerMove, _computerMove) {
    uiChoices.classList.add("hidden");
    uiReset.classList.remove("hidden");
    uiScore.classList.add("hidden");

    switch (_roundOutcome) {
        case "win":
            uiTitle.textContent = `${_playerMove} wins!`;
            uiTitle.style.color = "var(--title-win)";
            break;
        case "lose":
            uiTitle.textContent = `${_playerMove} looses...`;
            uiTitle.style.color = "var(--title-lose)";
            break;
        case "draw":
            uiTitle.textContent = `${_playerMove} draws!`;
            uiTitle.style.color = "var(--title-draw)";
            break;
    }

    uiDescription.textContent = `You matched against ${_computerMove}`;

    if (_finalOutcome) {
        uiOutcomeMsg.classList.remove("hidden");
        uiScore.textContent = `Final Score: ${_finalScore}/${maxRounds}`;
        uiScore.classList.remove("hidden");
    }

    switch (_finalOutcome) {
        case "winner":
            uiOutcomeMsg.textContent = "You won the game!";
            uiContainer.style.backgroundColor = "var(--win-bg)";
            uiContainer.style.color = "var(--win-fg)";
            uiResetBtn.style.backgroundColor = "var(--win-btn-bg)"
            uiResetBtn.style.color = "var(--win-btn-fg)";
            break;
        case "loser":
            uiOutcomeMsg.textContent = "You lost the game...";
            uiContainer.style.backgroundColor = "var(--lose-bg)";
            uiContainer.style.color = "var(--lose-fg)";
            uiResetBtn.style.backgroundColor = "var(--lose-btn-bg)"
            uiResetBtn.style.color = "var(--lose-btn-fg)";
            break;
        case "no contest":
            uiOutcomeMsg.textContent = "That's a draw!";
            uiContainer.style.backgroundColor = "var(--draw-bg)";
            uiContainer.style.color = "var(--draw-fg)";
            uiResetBtn.style.backgroundColor = "var(--draw-btn-bg)"
            uiResetBtn.style.color = "var(--draw-btn-fg)";
            break;
    }
}