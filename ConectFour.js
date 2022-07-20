const { Console } = require("./console");

const console = new Console();

playConectFour();
function playConectFour() {
  const game = initGame();
  let continueDialog = initYesNoDialog();
  game.writeWelcome();
  do {
    game.playGame();
    continueDialog.read();
  } while (initYesNoDialog.wantToContinue === true);
}

function initGame() {
  return {
    board: [
      ["*", "1", "2", "3", "4", "5", "6", "7"],
      ["1", "_", "_", "_", "_", "_", "_", "_"],
      ["2", "_", "_", "_", "_", "_", "_", "_"],
      ["3", "_", "_", "_", "_", "_", "_", "_"],
      ["4", "_", "_", "_", "_", "_", "_", "_"],
      ["5", "_", "_", "_", "_", "_", "_", "_"],
      ["6", "_", "_", "_", "_", "_", "_", "_"],
      
    ],
    TOKEN_X: `X`,
    TOKEN_Y: `Y`,
    TOKEN_EMPTY: `_`,
    ROWS: 7,
    COLUMNS: 8,
    HAVE_TO_CONECT: 4,
    turn: 0,
    PLAYERS: 2,
    movement: undefined,

    writeWelcome() {
      console.writeln(`Welcome to Connect 4 \n`);
    },
    playGame() {
      do {
        this.boardView();
        this.readToken();
        this.putToken();
        this.nextTurn();
      } while (!this.isConectFour("X") && !this.isConectFour("Y"));
      this.writeWinner();
    },

    boardView() {
      for (let row = 0; row <= this.ROWS ; row++) {
        console.writeln(this.board[row]);}
    },
    readToken() {
      let readedColumn = 0;
      do {
        fullFillederror = false;
        marginsError=false
        readedColumn = console.readNumber(`select column[1-7]`);
        if (readedColumn > 7 || readedColumn < 1) {
          marginsError = true;
          console.writeln(`Remember to insert a column number between 1-7`);
        }
        
        if (!marginsError && this.board[1][readedColumn] !== `_`) {
          console.writeln(
            `The selected column is full filled, select another column [1-7]`

          );
          fullFillederror = true;
        }
      } while (marginsError|| fullFillederror);
      this.movement = readedColumn;
    },
    putToken() {
      let choosenColumn = this.movement;
      let searchEmptyRow = 0;
      for (let row = 0; row < this.ROWS; row++) {
        if (this.board[row][choosenColumn] === `_`) {
          searchEmptyRow = row;
        }
      }
      this.board[searchEmptyRow][choosenColumn] = this.getToken();
    },
    nextTurn: function () {
      this.turn = (this.turn + 1) % this.PLAYERS;
    },
    isConectFour(token) {
      let conectFour = false;
      let distanceToMargin = 4;
      let horizontalTop = 7;
      let verticalTop = 6;
      //vertical restando -1
      for (let i = distanceToMargin; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (
            this.board[i][j] === token &&
            this.board[i - 1][j] === token &&
            this.board[i - 1][j] === token &&
            this.board[i - 2][j] === token &&
            this.board[i - 2][j] === token &&
            this.board[i - 3][j] === token
          ) {
            conectFour = true;
          }
        }
      }

      //vertical sumando +1
      for (let i = 1; i < this.board.length && i < distanceToMargin; i++) {
        for (let j = 1; j < this.board[i].length; j++) {
          if (
            this.board[i][j] === token &&
            this.board[i + 1][j] === token &&
            this.board[i - 1][j] === token &&
            this.board[i + 2][j] === token &&
            this.board[i - 2][j] === token &&
            this.board[i + 3][j] === token
          ) {
            conectFour = true;
          }
        }
      }

      //horizontal restando -1
      for (let i = 1; i < this.board.length; i++) {
        for (let j = distanceToMargin; j < this.board[i].length; j++) {
          if (
            this.board[i][j] === token &&
            this.board[i][j - 1] === token &&
            this.board[i][j - 1] === token &&
            this.board[i][j - 2] === token &&
            this.board[i][j - 2] === token &&
            this.board[i][j - 3] === token
          ) {
            conectFour = true;
          }
        }
      }

      //horizontal sumando +1
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length && j < horizontalTop; j++) {
          if (
            this.board[i][j] === token &&
            this.board[i][j + 1] === token &&
            this.board[i][j - 1] === token &&
            this.board[i][j + 2] === token &&
            this.board[i][j - 2] === token &&
            this.board[i][j + 3] === token
          ) {
            conectFour = true;
          }
        }
      }
      //diagonal a la derecha
      for (let i = verticalTop; i >= distanceToMargin; i--) {
        for (
          let j = 1;
          j < this.board[i].length && j <= distanceToMargin;
          j++
        ) {
          if (
            this.board[i][j] === token &&
            this.board[i - 1][j + 1] === token &&
            this.board[i - 1][j + 1] === token &&
            this.board[i - 2][j + 2] === token &&
            token &&
            this.board[i - 2][j + 2] === token &&
            this.board[i - 3][j + 3] === token
          ) {
            conectFour = true;
          }
        }
      }

      for (let i = verticalTop; i >= distanceToMargin; i--) {
        for (
          let j = horizontalTop;
          j < this.board[i].length && j >= distanceToMargin;
          j--
        ) {
          if (
            this.board[i][j] === token &&
            this.board[i - 1][j - 1] === token &&
            this.board[i - 1][j - 1] === token &&
            this.board[i - 2][j - 2] === token &&
            token &&
            this.board[i - 2][j - 2] === token &&
            this.board[i - 3][j - 3] === token
          ) {
            conectFour = true;
          }
        }
      }

      return conectFour;
    },
    getToken() {
      return this.turn === 0 ? this.TOKEN_X : this.TOKEN_Y;
    },

    getWinner() {
      return this.turn === 0 ? this.TOKEN_Y : this.TOKEN_X;
    },

    writeWinner() {
      console.writeln(`Victoria para ${this.getWinner()}`);
    },
  };
}

function initYesNoDialog() {
  return {
    answer: ``,
    wantToContinue: true,
    read() {
      let game= initGame();
      let error = false;
      do {
        this.answer = console.readString(
          `¿Do you want to play againg? [yes-no] `
        );
        if (this.answer != `yes` && this.answer != `no`) {
          console.writeln(`please, write [yes-no]`);
          error = true;
        }
        if (this.answer === `no`) {
          console.writeln(`Ok see you latter!`);
          this.wantToContinue = false;
        }

        if(this.answer===`yes`){
          this.wantToContinue=true;
        }
      } while (error);
    },
  };
}
