/*const boxes = document.querySelectorAll(".boxes");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

const body = document.getElementsByTagName("body");
const start = document.querySelector("#start");
const board = document.querySelector("#board");
const finish = document.querySelector("#finish");

const elementPlayer1 = document.querySelector("#namePlayer1");
const elementPlayer2 = document.querySelector("#namePlayer2");


const gameUI = {
    // Adding the listeners on the board for clicking and hovering over the box
    addListeners: function () {
        boxes.forEach(element => {
            element.addEventListener("click", (event) => {
                // Check if box doesnt contain classes with symbols and add a new simbol. 
                // This prevents changing existing symbol
                if (!(event.target.classList.contains("box-filled-2") || event.target.classList.contains("box-filled-1"))) {
                    this.addSymbolToBox(game.isTurn, event.target, game.board);
                    // Trigger next round function to check for winner and switch turns
                    game.nextRound();
                    // Show active player
                    this.showPlayerTurn(game.isTurn);
                }
            });
            // Change background image on the hovered box. 
            element.addEventListener("mouseover", (event) => {
                if (!(event.target.classList.contains("box-filled-2") || event.target.classList.contains("box-filled-1"))) {
                    if (game.isTurn === "X") {
                        event.target.style.backgroundImage = "url(img/x.svg)";  
                    }
                    else if (game.isTurn === "O") {
                        event.target.style.backgroundImage = "url(img/o.svg)";  
                    }
                }
            });          
            // Remove background image when mouse is not over the box.  
            element.addEventListener("mouseout", (event) => {
                if (!(event.target.classList.contains("box-filled-2") || event.target.classList.contains("box-filled-1"))) {
                    event.target.style.backgroundImage = "none";
                }
            });
        });
    },
    // Showing specified view, and hiding other views
    showView: function(view, symbol) {
        const message = document.querySelector(".message");

        // Setting start view
        if (view === "start") {
            start.style.display ="";
            board.style.display ="none";
            finish.style.display ="none";
        }
        // Setting board view
        else if (view === "board") {
            start.style.display ="none";
            board.style.display ="";
            finish.style.display ="none";
        }
        // Setting finish view
        else if (view === "finish") {
            start.style.display ="none";
            board.style.display ="none";
            finish.style.display ="";

            // If game is finished and winner is "X"
            if (symbol === "X") {
                message.innerHTML = game.player2 + " is Winner";
                finish.classList.remove("screen-win-one");
                finish.classList.add("screen-win-two");
                finish.classList.remove("screen-win-tie");
            }
            // If game is finished and winner is "O"
            else if (symbol === "O") {
                message.innerHTML = game.player1 + " is Winner";
                finish.classList.remove("screen-win-two");
                finish.classList.add("screen-win-one");
                finish.classList.remove("screen-win-tie");
            }
            // If game is finished and there is no winner
            else if (symbol === "tie") {
                message.innerHTML = "It's a Tie";
                finish.classList.remove("screen-win-one");
                finish.classList.remove("screen-win-two");
                finish.classList.add("screen-win-tie");
            }        
        }
    },
    // Setting up the button which activates new game
    newGameButton: function(id) {
        let button = document.querySelector("#"+ id);
        button.addEventListener("click", (event) =>{
            // Resetting the game
            game.resetGame();

            // Setting player names
            elementPlayer1.innerHTML = game.player1;
            elementPlayer2.innerHTML = game.player2;

            // Showing the board
            this.showView("board", "");
        });        
    },
    // Adding a symbol which is at turn to the board - to the selected box
    addSymbolToBox: function (symbol, element, board) {

        // Getting the index number from the target box clicked 
        let index = element.getAttribute("id").replace("box", "");

        // Change class names based on the symbol which has the turn
        if (symbol === "X") {
            element.className = "box box-filled-2";
            board[index] = "X";
        } else {
            element.className = "box box-filled-1";
            board[index] = "O";
        }
    },
    // Shows which player has the turn by adding "active" class
    showPlayerTurn: function (symbol) {

        if (symbol === "O") {
            // Set the active player O
            player2.classList.remove("active");
            player1.classList.add("active");
        } else {
            // set the active player X
            player1.classList.remove("active");
            player2.classList.add("active");
        }
    }
}*/

