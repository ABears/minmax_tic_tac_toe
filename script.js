const Game = {

    turnIterator: 0,
    turnColor: null,
    turnVerificator: null,
    simulatorWinner: null,
    simulatorScore: null,
    verticalCounter: 0,
    horizontalCounter: 0,
    diagonalCounterRight: 0,
    diagonalCounterLeft: 0,
    cellList: [],
    playbleCells: [],

    setColor : function(iterator) {
        switch (iterator) {
            // case 0:
            //     this.turnColor =  'red';            
            //     break;
        
            default:
                this.turnColor =  'green';
                break;
        }
    }, 

    getColor: function() {
        return this.turnColor;
    },
    isAllReadyUse: function (target) {
        let cellColor = target.style.backgroundColor;
        if(cellColor != ''){
            return true;
        }
        return false;
    },
    isClickable: function (target) {
        const isCell = target.classList.contains('cell');

        return isCell;
    },
    onCellClicked: async function(e) {
        const target = e.target;
        const isAllReadyUse = this.isAllReadyUse(target);
        const isClickable = this.isClickable(target);

        if(isClickable && !isAllReadyUse){
            this.turnIterator += 1;
            this.setColor(this.turnIterator);
    
            const playerColor = this.getColor(); 
    
            target.style.backgroundColor = playerColor;
        }
    }, 
    setCellList: function(){
        this.cellList = document.getElementsByTagName('td');
    },
    getCellList: function(){
        this.setCellList();
        return this.cellList;
    },
    horizontalChecker: async function () {

        let cellList = this.getCellList()
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {
                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                j == 0  ? this.horizontalCounter = 0 : '';
                let cellColor = listToArray[i][j].style.backgroundColor;
                cellColor == this.turnColor ? this.horizontalCounter+=1 : '';
                this.horizontalCounter == 3 ? alert(String(this.turnColor) + ' win') : '';
            }
        }
    },
    verticalChecker: async function () {

        let cellList = this.getCellList();
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        for (let p = 0; p < 3; p++) {
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    if(j == p ){
                        i == 0 ? this.verticalCounter = 0 : '';
                        let cellColor = listToArray[i][j].style.backgroundColor;
                        cellColor == this.turnColor ? this.verticalCounter+=1 : '';
                        this.verticalCounter == 3 ? alert(String(this.turnColor) + ' win') : '';
                    }
                }
            }
            
        }

    },
    diagonalCheckerLeft: async function () {
        
        let cellList = this.getCellList();
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if(j == i){
                    i == 0 ? this.diagonalCounterLeft = 0 : '';
                    let cellColor = listToArray[i][j].style.backgroundColor;
                    cellColor == this.turnColor ? this.diagonalCounterLeft+=1 : '';
                    this.diagonalCounterLeft == 3 ? alert(String(this.turnColor) + ' win') : '';
                }
            }
        }
            

    },
    diagonalCheckerRight: async function () {
        
        let cellList = this.getCellList();
        let cellListCounter = 0;
        let listToArray = [];

        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        const p = 2;
            
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if(j == p - i){
                    i == 0 ? this.diagonalCounterRight  = 0 : '';
                    let cellColor = listToArray[i][j].style.backgroundColor;
                    cellColor == this.turnColor ? this.diagonalCounterRight +=1 : '';
                    this.diagonalCounterRight  == 3 ? alert(String(this.turnColor) + ' win') : '';
                }
            }
        }
            

    },
    horizontalSimulator: async function (currentBoard, color) {

        let cellList = currentBoard;
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {
                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                j == 0  ? this.horizontalCounter = 0 : '';
                let cellColor = listToArray[i][j].style.backgroundColor;
                let cellClassList = listToArray[i][j].classList;
                cellClassList.contains(color+'Balise') === true ? this.horizontalCounter +=1 : '';
                cellColor == color ? this.horizontalCounter+=1 : '';
                if(this.horizontalCounter == 3){
                    this.simulatorWinner = true;
                    color  == 'green' ? this.simulatorScore = {score: -10} :  this.simulatorScore = {score: 10};
                    for (let index = 0; index  < 3; index++) {
                        let hindex = j-index; 
                        getCell = listToArray[i][hindex];
                        getCell.style.backgroundColor.length == 0 ? this.simulatorScore = {position: getCell}: '';
                        console.log(this.simulatorScore);
                    }
                }
            }
        }
    },
    verticalSimulator: async function (currentBoard, color) {

        let cellList = currentBoard;
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        for (let p = 0; p < 3; p++) {
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    if(j == p ){
                        i == 0 ? this.verticalCounter = 0 : '';
                        let cellColor = listToArray[i][j].style.backgroundColor;
                        let cellClassList = listToArray[i][j].classList;
                        cellClassList.contains(color+'Balise') === true ? this.verticalCounter +=1 : '';
                        cellColor == color ? this.verticalCounter += 1 : '';
                        if(this.verticalCounter == 3){
                            this.simulatorWinner = true;
                            color  == 'green' ? this.simulatorScore = {score: -10} :  this.simulatorScore = {score: 10};
                            for (let index = 0; index  < 3; index++) {
                                let hindex = i-index; 
                                getCell = listToArray[hindex][j]
                                getCell.style.backgroundColor.length == 0 ? this.simulatorScore = {position: getCell}: '';
                            }
                        }
                    }
                }
            }
            
        }

    },
    diagonalSimulatorLeft: async function (currentBoard, color) {
        
        let cellList = currentBoard;
        let cellListCounter = 0;
        let listToArray = [];
        
        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if(j == i){
                    i == 0 ? this.diagonalCounterLeft = 0 : '';
                    let cellColor = listToArray[i][j].style.backgroundColor;
                    let cellClassList = listToArray[i][j].classList;
                    cellClassList.contains(color+'Balise') === true ? this.diagonalCounterLeft +=1 : '';
                    cellColor == color ? this.diagonalCounterLeft+=1 : '';
                    if(this.diagonalCounterLeft == 3){
                        this.simulatorWinner = true;
                        color  == 'green' ? this.simulatorScore = {score: -10} : this.simulatorScore = {score: 10};
                        for (let index = 0; index  < 3; index++) {
                            let hindex = i-index;
                            getCell = listToArray[hindex][hindex];
                            getCell.style.backgroundColor.length == 0 ? this.simulatorScore = {position: getCell}: '';
                        }
                    }
                }
            }
        }
            

    },
    diagonalSimulatorRight: async function (currentBoard, color) {
        
        let cellList = currentBoard;
        let cellListCounter = 0;
        let listToArray = [];

        for (let i = 0; i < 3; i++) {
            listToArray[i] = [];
            for (let j = 0; j < 3; j++) {

                listToArray[i][j] = cellList[cellListCounter];
                cellListCounter++;
            }
        }

        const p = 2;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if(j == p - i){
                    i == 0 ? this.diagonalCounterRight  = 0 : '';
                    let cellColor = listToArray[i][j].style.backgroundColor;
                    let cellClassList = listToArray[i][j].classList;
                    cellClassList.contains(color+'Balise') === true ? this.diagonalCounterRight +=1 : '';
                    cellColor == color ? this.diagonalCounterRight +=1 : '';
                    if(this.diagonalCounterRight == 3){
                        this.simulatorWinner = true;
                        for (let index = 0; index  < 3; index++) {
                            let hindex = i-index;
                            getCell = listToArray[index][p-index];
                            getCell.style.backgroundColor.length == 0 ? this.simulatorScore = {position: getCell}: '';
                            color  == 'green' ? this.simulatorScore = {score: -10} :  this.simulatorScore = {score: 10};
                        }
                    }
                }
            }
        }
            

    },
    simulator : async function (playbleArray, currentBoard){
        (async function (){
            this.simulatorScore = {score: -70};
        })()
        .then(() => {
            this.verticalSimulator(currentBoard, 'green');
            console.log(this.simulatorScore);
        })
        .then(() => {
            this.horizontalSimulator(currentBoard, 'green');
            console.log(this.simulatorScore);
        })
        .then(() => {
            this.diagonalSimulatorLeft(currentBoard, 'green');
            console.log(this.simulatorScore);
        })
        .then(() => {
            this.diagonalSimulatorRight(currentBoard, 'green');
            console.log(this.simulatorScore);
        })
        .then(() => {
            this.verticalSimulator(currentBoard, 'red');
        })
        .then(() => {
            this.horizontalSimulator(currentBoard, 'red');
        })
        .then(() => {
            this.diagonalSimulatorLeft(currentBoard, 'red');
        })
        .then(() => {
            this.diagonalSimulatorRight(currentBoard, 'red');
        })
        .then(() => {
            playbleArray.length == 0 ? this.simulatorScore = {score: 0} : '';     
        })
    },
    playableChecker: function(){
        
        let cellList = this.getCellList();
        let cellListCounter = 0;
        let playableArray = [];

        for (let i = 0; i < 9; i++) {
            getCellStyle = cellList[cellListCounter].style.backgroundColor;
            getCellStyle.length === 0 ? playableArray[i] = cellList[cellListCounter] : '';
            cellListCounter++;

        }

        this.playbleCells = playableArray;
    },
    getPlaybleCells: function(){
        this.playableChecker();
        return this.playbleCells;
    },
    winnerChecker: function() {
        this.verticalChecker()
        .then(() => {
            this.horizontalChecker();
        })
        .then(() => {
            this.diagonalCheckerLeft();
        })
        .then(() => {
            this.diagonalCheckerRight();
        });
    },
    iaTurn: function() {
        // Get playble cellules
        let playbleArray = this.playbleCells;
        // Get current board
        let cellList = this.getCellList();
        
        let moves = [];        
        (async () => {
            for (let i = 0; i < playbleArray.length; i++) {
    
                cellListToArray = Array.from(cellList);
                playbleIndex = cellListToArray.indexOf(playbleArray[i]);
                let move = {};
    
                if(playbleIndex != -1){
    
                    move.index = cellListToArray[playbleIndex];
                    cellListToArray[playbleIndex].classList.add('redBalise');
    
                   await this.simulator(playbleArray, cellListToArray)
                    .then((response) => {
                        move.score = this.simulatorScore;
                    });
    
                    cellListToArray[playbleIndex].classList.remove('redBalise');
                    moves.push(move);                    
                }
            }
            for (let j = 0; j < playbleArray.length; j++) {
    
                cellListToArray = Array.from(cellList);
                playbleIndex = cellListToArray.indexOf(playbleArray[j]);
                let move = {};
    
                if(playbleIndex != -1){
    
                    move.index = cellListToArray[playbleIndex];
                    cellListToArray[playbleIndex].classList.add('greenBalise');
    
                   await this.simulator(playbleArray, cellListToArray)
                    .then((response) => {
                        move.score = this.simulatorScore;
                    });
    
                    cellListToArray[playbleIndex].classList.remove('greenBalise');
                    moves.push(move);

                }
            }
            console.log(moves);
        })()
        .then(() => {
            let bestMove = null;
            let bestScore = -100; 
            for (let i = 0; i < moves.length; i++) {
                let move = moves[i];

                if(move.score == null) {
                    move.score = {
                        score: -70
                    }
                }
                if(move.score.score > bestScore) {
                    bestScore = move.score.score
                    bestMove = move ;
                }
            }
            return bestMove;
        })
        .then((bestMove) => {
            bestMove.index.style.backgroundColor = 'red';
        })
        
    }

}

window.addEventListener('click', function(e){
    Game.onCellClicked(e)
    .then(() =>  {
        Game.winnerChecker();
    })
    .then(() => {
        Game.getPlaybleCells();
    })
    .then(() => {
        Game.iaTurn();
    })
    .then(() =>  {
        Game.winnerChecker();
    })
});

let iter = 0;
let round = 0;

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
