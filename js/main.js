(function(){
// game.js
    function TicTacToe () {
            this.player1 = "";
            this.player2 = "";
            this.characterArray = ["X", "O"];
            this.isTurn = "";
            this.board = [0, 1, 2,
                          3, 4, 5,
                          6, 7, 8];
    }

    // Deciding who is going to first start "X" or "O"
    TicTacToe.prototype.randomTurn = function () {
        let randomIndex = Math.floor(Math.random() * this.characterArray.length);
        let randomCharacter = this.characterArray[randomIndex];
        this.isTurn = randomCharacter;
    }


    // Resetting the game
    TicTacToe.prototype.resetGame = function () {
        const boxes = document.querySelectorAll(".boxes li");

        // Resetting the board    
        this.board = [0, 1, 2,
                    3, 4, 5,
                    6, 7, 8];
        
        // Randoming the turn
        this.randomTurn();
        // Showing active player
        gameUI.showPlayerTurn(game.isTurn);

        // Removing symbols from board by resetting box classes and background images
        boxes.forEach((element) => {
            element.className = "box";
            element.style.backgroundImage = "none";
        });

        // Getting player names
        this.player1 = prompt("Player one (O) please enter your name. To play VS Computer type 'AI':");
        this.player2 = prompt("Player two (X) please enter your name:");

        // Computer makes a move if player1 name is "ai"
        // Only for first move on the board if it is computer's turn
        if (this.isTurn === "O") {
            if (this.player1 !== "") {
                if (this.player1.toLowerCase() === "ai") {
                    // Calculating the best move with minimax algorithm
                    let bestSpot = this.minimax(this.board, "O")
                    // Making the move based on best move position
                    this.computerPlay(bestSpot.index);
                }
            }
        }
    }

    // Change which player has the turn
    TicTacToe.prototype.changeTurn = function() {
        if (this.isTurn === "X") {
            this.isTurn = "O";

            // Computer makes a move if player1 name is "ai"
            if (this.player1 !== "") {
                if (this.player1.toLowerCase() === "ai") {
                    let bestSpot = this.minimax(this.board, "O")
                    this.computerPlay(bestSpot.index);
                }
            }
        }
        else if (this.isTurn === "O") {
            this.isTurn = "X";
        }
    }

    // Find all empty boxes on the board
    TicTacToe.prototype.emptyBoxes = function(board) {
        return board.filter(box => box !== "X" && box !== "O");
    }

    // Go to next round
    TicTacToe.prototype.nextRound = function() {

        let whoWon = "";

        // Checking if there is a winner before players can make a move
        if (this.winning(this.board, "X")) {
            whoWon = "X";
        }
        else if (this.winning(this.board, "O")) {
            whoWon = "O";
        }

        // If X won
        if (whoWon === "X") {
            // If there is a winner, show finish screen with message for "X" player
            gameUI.showView("finish", "X");
        } 
        // If O won
        else if (whoWon === "O") {
            // If there is a winner, show finish screen with message for "O" player
            gameUI.showView("finish", "O");
        }
        
        // If there is no winner and there are no empty boxes, go to finish screen and make it a draw
        if (this.emptyBoxes(this.board).length === 0 && whoWon === "") {
            gameUI.showView("finish", "tie");
        }
        
        // Change turn if there are any empty boxes
        if (this.emptyBoxes(this.board).length > 0) {
            this.changeTurn();
        }    
    }

    // AI Minimax algorithm
    TicTacToe.prototype.minimax =  function(newBoard, player) {
    
        // Find available spots
        let availableSpots = this.emptyBoxes(newBoard);

        // Checks for the terminal states such as win, lose, and tie 
        // and returning a value accordingly
        // If human player
        if (this.winning(newBoard, "X")){
            return {score:-10};
        }
        // If ai player
        else if (this.winning(newBoard, "O")){
            return {score:10};
        }
        else if (availableSpots.length === 0){
            return {score:0};
        }

        // An array to collect all the objects
        let moves = [];

        // Loop through available spots
        for (let i = 0; i < availableSpots.length; i++){

            // Create an object for each and store the index of that spot 
            let move = {};
            move.index = newBoard[availableSpots[i]];

            // Set the empty spot to the current player
            newBoard[availableSpots[i]] = player;

            // Collect the score resulted from calling minimax 
            // on the opponent of the current player
            if (player == "O"){
            let result = this.minimax(newBoard, "X");
            move.score = result.score;
            }
            else{
            let result = this.minimax(newBoard, "O");
            move.score = result.score;
            }
            // Reset the spot to empty
            newBoard[availableSpots[i]] = move.index;

            // Push the object to the array
            moves.push(move);

        }

        // If it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove;
    
        if (player === "O"){
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        } else {

        // Else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if (moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // Return the chosen move (object) from the moves array
        return moves[bestMove];
        
    }

    // Computer makes the move according to the index value he gets from minimax function (best move)
    TicTacToe.prototype.computerPlay = function (index) {
        const id  = "#box" + index;
        const box = document.querySelector(id);

        // If there are empty boxes, add a symbol to best postion
        if(this.emptyBoxes.length > 0) {
            gameUI.addSymbolToBox(this.isTurn, box, this.board);

            // Trigger next round function to check for winner and switch turns
            this.nextRound();
            box.style.backgroundImage = "";

            // Show which player is active
            gameUI.showPlayerTurn(this.isTurn);
        }
        
    }

    // Checking if there is a winner on a board for specific player
    TicTacToe.prototype.winning = function (board, player){
        if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
        } else {
        return false;
        }
    }

    // gameUI.js
    const boxes = document.querySelectorAll(".boxes");
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
    }
        
    // main.js
    const game = new TicTacToe();

    // Showing the start screen at load
    gameUI.showView("start");

    // Randomizing which symbol plays first
    game.randomTurn();

    // Highlighting player on turn
    gameUI.showPlayerTurn(game.isTurn);

    // Adding listeners to all box elements
    gameUI.addListeners();
    // Adding listeners to new game buttons based on their id's
    gameUI.newGameButton("startScreenButton");
    gameUI.newGameButton("finishScreenButton");

}());