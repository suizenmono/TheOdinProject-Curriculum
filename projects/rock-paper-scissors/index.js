'use strict';

const uiInteract = document.querySelector(".interact");
const uiTitle = document.querySelector(".title");
const uiRound = document.querySelector(".round");
const uiCurrentScore = document.querySelector(".current-score");
const uiFinalScores = document.querySelector(".final-score");
const uiFinalPlayerScore = document.querySelector(".player-score");
const uiFinalComputerScore = document.querySelector(".computer-score");
const uiFinalDrawCount = document.querySelector(".draw-count");
const uiDescription = document.querySelector(".description");
const uiChoices = document.querySelector(".choices");
const uiReset = document.querySelector(".reset");
const uiResetBtn = document.querySelector("#btn-reset");
const uiOutcomeMsg = document.querySelector(".final-outcome-message");

const maxRounds = 6;
let playerScore = 0;
let computerScore = 0;
let roundCount = 1;
let drawCount = 0;
let finalOutcome = null;

document.querySelector("#btn-rock").addEventListener("click", startGame);
document.querySelector("#btn-paper").addEventListener("click", startGame);
document.querySelector("#btn-scissors").addEventListener("click", startGame);
uiResetBtn.addEventListener("click", initializeUI);

initializeUI();

function startGame(e) {
    let computerMove = setRNG();
    let playerMove;
    let roundOutcome;

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

    if (playerMove === computerMove) {
        roundOutcome = "draw";
        drawCount++;
    } else if (
        (playerMove === "Rock" && computerMove === "Scissors")
        || (playerMove === "Paper" && computerMove === "Rock")
        || (playerMove === "Scissors" && computerMove === "Paper")
    ) {
        roundOutcome = "win";
        playerScore++;
    } else {
        roundOutcome = "lose";
        computerScore++;
    }
    
    console.log(`
        ROUND #${roundCount} RESULT: ${roundOutcome}
        
        You did: ${playerMove}
        Computer did: ${computerMove}
        Current Player Score: ${playerScore}
        Current Computer Score: ${computerScore}
        Draws: ${drawCount}
        `);

    if (roundCount >= maxRounds) {
        
        if (playerScore > computerScore) {
            finalOutcome = "winner";
            console.log("You won the game!");
        } else if (playerScore === computerScore) {
            finalOutcome = "no contest";
            console.log("That's a draw!");
        } else {
            finalOutcome = "loser";
            console.log("You lost the game...");
        }

        updateUI(roundOutcome, finalOutcome, playerScore, computerScore, drawCount, playerMove, computerMove);
        
        console.log("Now reinitializing the game.");
        roundCount = 1;
        playerScore = 0;
        computerScore = 0;
        drawCount = 0;
        finalOutcome = null;
    } else {
        roundCount++;
        updateUI(roundOutcome, finalOutcome, playerScore, computerScore, drawCount, playerMove, computerMove);
    }
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

function initializeUI() {
    uiTitle.textContent = "Rock-Paper-Scissors";
    uiDescription.textContent = "What will you play?";
    uiResetBtn.textContent = "Next Round";
    uiCurrentScore.classList.remove("hidden");
    uiFinalScores.classList.add("hidden");
    uiChoices.classList.remove("hidden");
    uiReset.classList.add("hidden");
    uiOutcomeMsg.classList.add("hidden");
    uiInteract.style.backgroundColor = "var(--init-bg)";
    uiInteract.style.color = "var(--init-fg)";
    uiTitle.style.color = "var(--title-init)";
    uiResetBtn.style.backgroundColor = "var(--btn-bg-init)"
    uiResetBtn.style.color = "var(--btn-fg-init)";
    uiResetBtn.style.border = "var(--btn-border-init)";

    uiRound.textContent = `Round ${roundCount} of ${maxRounds}`;
    uiCurrentScore.textContent = `Current Score: ${playerScore}`;
}

function updateUI(_roundOutcome, _finalOutcome, _finalPlayerScore, _finalComputerScore, _finalDrawCount, _playerMove, _computerMove) { // consider using an object instead
    uiChoices.classList.add("hidden");
    uiReset.classList.remove("hidden");
    uiCurrentScore.classList.add("hidden");

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

    switch (_finalOutcome) {
        case null:
            break;
        case "winner":
            uiOutcomeMsg.textContent = "You won the game!";
            uiInteract.style.backgroundColor = "var(--win-bg)";
            uiInteract.style.color = "var(--win-fg)";
            uiResetBtn.style.backgroundColor = "var(--win-btn-bg)"
            uiResetBtn.style.color = "var(--win-btn-fg)";
            break;
        case "loser":
            uiOutcomeMsg.textContent = "You lost the game...";
            uiInteract.style.backgroundColor = "var(--lose-bg)";
            uiInteract.style.color = "var(--lose-fg)";
            uiResetBtn.style.backgroundColor = "var(--lose-btn-bg)"
            uiResetBtn.style.color = "var(--lose-btn-fg)";
            break;
        case "no contest":
            uiOutcomeMsg.textContent = "That's a draw!";
            uiInteract.style.backgroundColor = "var(--draw-bg)";
            uiInteract.style.color = "var(--draw-fg)";
            uiResetBtn.style.backgroundColor = "var(--draw-btn-bg)"
            uiResetBtn.style.color = "var(--draw-btn-fg)";
            break;
    }

    if (_finalOutcome) {
        uiOutcomeMsg.classList.remove("hidden");
        uiFinalScores.classList.remove("hidden");
        uiFinalPlayerScore.textContent = `You: ${_finalPlayerScore}`;
        uiFinalComputerScore.textContent = `Computer: ${_finalComputerScore}`;
        uiFinalDrawCount.textContent = `Draws: ${_finalDrawCount}`;
        uiResetBtn.textContent = "New Game";
        uiResetBtn.style.border = "none";
    }
}