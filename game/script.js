let levelImages = {
    4:  ["img/unnamed.jpg", "img/unnamed2.jpg"],
    8:  ["img/unnamed.jpg", "img/unnamed2.jpg", "img/unnamed3.jpg", "img/unnamed4.jpg"],
    12: ["img/unnamed.jpg", "img/unnamed2.jpg", "img/unnamed3.jpg", "img/unnamed4.jpg", "img/unnamed5.jpg", "img/unnamed6.jpg"]
};

let currentLevel = 4;

let firstCard = null;
let secondCard = null;
let canClick = true;
let moves = 0;

/* ---START LEVEL--- */
function startLevel(level) {
    currentLevel = level;

    let board = document.getElementById("gameBoard");
    let movesText = document.getElementById("moves");

    board.innerHTML = "";
    moves = 0;
    movesText.textContent = "Moves: 0";

    firstCard = null;
    secondCard = null;
    canClick = true;

    let images = levelImages[level];
    let cards = images.concat(images);

    // Shuffle cards
    cards.sort(() => 0.5 - Math.random());

    // Create cards
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.value = cards[i];

        card.innerHTML =
            '<div class="card-inner">' +
                '<div class="card-front">?</div>' +
                '<div class="card-back">' +
                    '<img src="' + cards[i] + '" alt="card">' +
                '</div>' +
            '</div>';

        card.addEventListener("click", function () {
            flipCard(card);
        });

        board.appendChild(card);
    }
};

/* ---FLIP CARD--- */
function flipCard(card) {
    if (!canClick) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;

        moves++;
        document.getElementById("moves").textContent = "Moves: " + moves;

        checkCards();
    }
};

/* ---CHECK MATCH--- */
function checkCards() {
    canClick = false;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetCards();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 900);
    }
};

/* ---RESET TURN--- */
function resetCards() {
    firstCard = null;
    secondCard = null;
    canClick = true;
};

/* ---WIN CHECK--- */
function checkWin() {
    let allCards = document.querySelectorAll(".card");

    let allMatched = Array.from(allCards).every(card =>
        card.classList.contains("matched")
    );

    if (allMatched) {
        showWinMessage();
    }
};

/* ---WIN SCREEN--- */
function showWinMessage() {
    let message = document.createElement("div");
    message.className = "win-message";

    message.innerHTML = `
        🎉 YOU WON! 🎉<br>
        Moves: ${moves}<br><br>
        <button id="playAgainBtn">Play Again</button>
    `;

    document.body.appendChild(message);

    document.getElementById("playAgainBtn").addEventListener("click", function () {
        message.remove();
        startLevel(currentLevel);
    });
};

// How to Play modal logic
let howBtn = document.getElementById("howBtn");
let modal = document.getElementById("howModal");
let closeBtn = document.getElementById("closeBtn");

howBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});

// close if user clicks outside box
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});