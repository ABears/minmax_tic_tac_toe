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
    circleImage: './images/tic_tac_circle.jpg',
    crossImage: './images/tic_tac_cross.jpg',
    lostGIF: './images/lost_animation.gif',
    winnerGIF: './images/winner_animation.gif',
    tieGIF: './images/tie_animation.gif',
    setColor : function(iterator) {
        iteratorMod = iterator % 2;
        switch (iteratorMod) {
            case 0:
                this.turnColor =  'red';            
                break;
        
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
    // Cell clicked function
    onCellClicked: async function(e) {

        const target = e.target;

        // Check if cell is free
        const isAllReadyUse = this.isAllReadyUse(target);

        // Check if target is cellule
        const isClickable = this.isClickable(target);

        if(isClickable && !isAllReadyUse){

            this.turnIterator += 1;
            this.setColor(this.turnIterator);
            const playerColor = this.getColor(); 
            // Attribute player color
            target.style.backgroundColor = playerColor;
            target.style.backgroundImage = 'linear-gradient(#fff, #fff)';
            
            // Append player image
            let new_image = document.createElement('img');            
            target.appendChild(new_image);
            new_image.setAttribute('src', this.crossImage);
            new_image.setAttribute('class', 'img-fluid w-100 h-100');
        }
    }, 
    setCellList: function(){
        this.cellList = document.getElementsByTagName('td');
    },
    getCellList: function(){
        this.setCellList();
        return this.cellList;
    },
    getWinner: function (turnColor) {
        if(turnColor == 'red'){
            $('.winning-statement-img').attr('src', this.lostGIF);
            $('.winning-statement').text('YOU LOOSE');
            return true;
        }
        else if(turnColor == 'tie') {
            $('.winning-statement-img').attr('src', this.tieGIF);
            $('.winning-statement').text('IT\'S A TIE');
            return true;
        }
        $('.winning-statement-img').attr('src', this.winnerGIF);
        $('.winning-statement').text('YOU WIN');
    },
    // Horizontal checker
    horizontalChecker: function () {

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
                this.horizontalCounter == 3 ? $('.winning-bar').removeClass('d-none') : '';
                this.horizontalCounter == 3 ? $('.winner-blocker').css('z-index', '10000') : '';
                this.horizontalCounter == 3 ? this.getWinner(this.turnColor) : '';
                if(this.horizontalCounter == 3 &&  i == 2){
                    $('.winning-bar').css('margin-top', $(listToArray[i][j]).width()+10)
                }
                else if(this.horizontalCounter == 3 &&  i == 0){
                    $('.winning-bar').css('margin-top', -$(listToArray[i][j]).width()-10)
                }

            }
        }
    },
    // Vertical checker
    verticalChecker: function () {

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
                        this.verticalCounter == 3 ? $('.winning-bar').removeClass('d-none'): '';
                        this.verticalCounter == 3 ?  $('.winning-bar').css('transform', 'rotate(90deg)'): '';
                        this.verticalCounter == 3 ? $('.winner-blocker').css('z-index', '10000') : '';
                        this.verticalCounter == 3 ? this.getWinner(this.turnColor) : '';
                        if(this.verticalCounter == 3 &&  j == 2){
                            $('.winning-bar').css('margin-left', $(listToArray[i][j]).width()+10)
                        }
                        else if(this.verticalCounter == 3 &&  j == 0){
                            $('.winning-bar').css('margin-left', -$(listToArray[i][j]).width()-10)
                        }
                    }
                }
            }
            
        }

    },
    // Diagonal checker left
    diagonalCheckerLeft: function () {
        
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
                    this.diagonalCounterLeft == 3 ? $('.winning-bar').removeClass('d-none'): '';
                    this.diagonalCounterLeft == 3 ?  $('.winning-bar').css('transform', 'rotate(45deg)'): '';
                    this.diagonalCounterLeft == 3 ? $('.winner-blocker').css('z-index', '10000') : '';
                    this.diagonalCounterLeft == 3 ? this.getWinner(this.turnColor) : '';
                }
            }
        }
            

    },
    // Diagonal checker right
    diagonalCheckerRight: function () {
        
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
                    this.diagonalCounterRight == 3 ?  $('.winning-bar').removeClass('d-none'): '';
                    this.diagonalCounterRight == 3 ? $('.winning-bar').css('transform', 'rotate(-45deg)'): '';
                    this.diagonalCounterRight == 3 ? $('.winner-blocker').css('z-index', '10000') : '';
                    this.diagonalCounterRight == 3 ? this.getWinner(this.turnColor) : '';
                }
            }
        }
    },
    // Horizontal simulator
    horizontalSimulator: function (currentBoard, color) {

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
                    for (let index = 0; index  < 3; index++) {
                        let hindex = j-index; 
                        getCell = listToArray[i][hindex];
                        if(color  == 'green' && getCell.style.backgroundColor.length == 0){
                            this.simulatorScore  = {score: -10};
                        }
                        else if(color  != 'green' && getCell.style.backgroundColor.length == 0){
                            this.simulatorScore  = {score: 10};
                        }
                    }
                }
            }
        }
    },
    // Vertical simulator
    verticalSimulator: function (currentBoard, color) {

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
                            for (let index = 0; index  < 3; index++) {
                                let hindex = i-index; 
                                getCell = listToArray[hindex][j]
                                if(color  == 'green' && getCell.style.backgroundColor.length == 0){
                                    this.simulatorScore  = {score: -10};
                                }
                                else if(color  != 'green' && getCell.style.backgroundColor.length == 0){
                                    this.simulatorScore  = {score: 10};
                                }
                            }
                        }
                    }
                }
            }
            
        }

    },
    // Diagonal simulator left
    diagonalSimulatorLeft: function (currentBoard, color) {
        
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
                            if(color  == 'green' && getCell.style.backgroundColor.length == 0){
                                this.simulatorScore  = {score: -10};
                            }
                            else if(color  != 'green' && getCell.style.backgroundColor.length == 0){
                                this.simulatorScore  = {score: 10};
                            }
                        }
                    }
                }
            }
        }
            

    },
    // Diagonal simulator right
    diagonalSimulatorRight: function (currentBoard, color) {
        
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
                            if(color  == 'green' && getCell.style.backgroundColor.length == 0){
                                this.simulatorScore  = {score: -10};
                            }
                            else if(color  != 'green' && getCell.style.backgroundColor.length == 0){
                                this.simulatorScore  = {score: 10};
                            }
                        }
                    }
                }
            }
        }
            

    },
    // Simulator launcher
    simulator : async function (playbleArray, currentBoard){
            this.simulatorScore = {score: -70};
            this.verticalSimulator(currentBoard, 'green');
            this.horizontalSimulator(currentBoard, 'green');
            this.diagonalSimulatorLeft(currentBoard, 'green');
            this.diagonalSimulatorRight(currentBoard, 'green');
            this.verticalSimulator(currentBoard, 'red');
            this.horizontalSimulator(currentBoard, 'red');
            this.diagonalSimulatorLeft(currentBoard, 'red');
            this.diagonalSimulatorRight(currentBoard, 'red');
            playbleArray.length == 0 ? this.simulatorScore = {score: 0} : '';   
    },
    // Return possible moves
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
    // Get playble cells
    getPlaybleCells: function(){
        this.playableChecker();
        return this.playbleCells;
    },
    // Action for first moves
    firstTurnMoves: function () {
        let angleCenterList = ['#0', '#2', '#6', '#8', '#4'];
        let crossList = ['#1', '#5', '#3', '#7', '#4'];
        bestMove = null;
        let centerCell = $(angleCenterList[4])[0];
        let rand = Math.floor(Math.random() /2 * 8);
        for(index = 0; index < angleCenterList.length - 1; index++){
            let cell = $(angleCenterList[index])[0];
            if(cell.style.backgroundColor == 'green'){
                bestMove = {
                    index: $(angleCenterList[4])[0],
                    score: -10
                }
                return bestMove
            }
        }
        for(index = 0; index < crossList.length; index++){
            let cell = $(crossList[index])[0];
            if(cell.style.backgroundColor == 'green'){
                bestMove = {
                    index: $(angleCenterList[index])[0],
                    score: -10
                }
                return bestMove
            }
        }
        if(centerCell.style.backgroundColor == 'green'){
            bestMove = {
                index: $(angleCenterList[rand])[0],
                score: -10
            }
            return bestMove;
        }

        bestMove = {
            index: $(angleCenterList[rand])[0],
            score: -10
        }

        return bestMove;

    },
    firstSpeak: function(){
        this.turnIterator += 2;
        let new_image = document.createElement('img');
        $('#4')[0].style.backgroundColor = 'red';
        $('#4')[0].style.backgroundImage = 'linear-gradient(#fff, #fff)';
        $('#4')[0].appendChild(new_image);
        new_image.setAttribute('src', this.circleImage);
        new_image.setAttribute('class', 'img-fluid w-100');
    },
    // Winner checker function 
    winnerChecker: function() {
        this.verticalChecker();
        this.horizontalChecker();
        this.diagonalCheckerLeft();
        this.diagonalCheckerRight();
    },
    isTie: function() {
        this.playbleCells.length == 0 ? $('.winner-blocker').css('z-index', '10000') : '';
        this.playbleCells.length == 0 ? Game.getWinner('tie') : ''; 
        return this.playbleCells.length;
    },
    // Ia turn function
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
            // // Maybe add a level condition here
            // if(this.turnIterator == 2){
            //     bestMove = this.firstTurnMoves(moves);
            // }
            // else if($('#4')[0].style.backgroundColor.length == 0){
            //     bestMove = {
            //         index: $('#4')[0],
            //         score: -10
            //     }
            // }
            
            let new_image = document.createElement('img');
            bestMove.index.style.backgroundColor = 'red';
            bestMove.index.style.backgroundImage = 'linear-gradient(#fff, #fff)';
            bestMove.index.appendChild(new_image);
            new_image.setAttribute('src', this.circleImage);
            new_image.setAttribute('class', 'img-fluid w-100');
        })
        .then(()=>{
            this.winnerChecker();
            this.getPlaybleCells();
            this.isTie();
        })
    }
}



$('td').on('click', function(e){
    if(e.target.classList.contains('cell')){
        Game.onCellClicked(e)
        .then(() =>  {
            Game.winnerChecker();
        })
        .then(() => {
            Game.getPlaybleCells();
        })
        .then(() =>{
            Game.isTie();
        })
        .then(() => {
            Game.turnIterator += 1;
            Game.setColor(Game.turnIterator);
            Game.iaTurn();
        })
    }
});

$('.winner-blocker').click(function(){
    window.location.reload();
})

$('.logo-gh').click(function(){
    window.location = 'https://github.com/ABears/minmax_tic_tac_toe';
})

$('.play-button').click(function(){
    $('.logo-gh').fadeOut();
    $('.menu-container').slideUp(800);
    setTimeout(function(){
        $('.menu-container').remove();
        $('.title-game').css('color', 'pink');
        $('.logo-gh').fadeIn();
        
    },800)
    setTimeout(function(){
        Game.firstSpeak();
    },900)
})
