// Select the various grids
const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.grid-display');
const userSquares = [];
const computerSquares = [];

// Select the various ship divs
const ships = document.querySelectorAll('.ship');
const shipGridDisplay = document.querySelector('.grid-display');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');
const shipType = ['destroyer', 'submarine', 'cruiser', 'battleship', 'carrier'];

// Select the various buttons and info areas
const startButton = document.querySelector('#start');
const $rotateButton = $('#rotate');
const turnDisplay = document.querySelector('#whoseTurn');
const infoDisplay = document.querySelector('#info');
const $hiddenMsgs = $('h2.fleetTitle');

// Set variables for horizontal/vertical ships, if the game's over, and current player (always start with the user)
let isHorizontal = true;
let isGameOver = false;
let currentPlayer = 'user';

const width = 10; // Make a 10x10 square grid

// Create boards
function createBoard(grid, squares) {
    for (let i = 0; i < width ** 2; i++) {
        const square = document.createElement('div');
        square.dataset.id = i;
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

// Ships
const shipArray = [{
        name: 'destroyer',
        directions: [
            [0, 1],
            [0, width * 1],
        ],
    },
    {
        name: 'submarine',
        directions: [
            [0, 1, 2],
            [0, width * 1, width * 2],
        ],
    },
    {
        name: 'cruiser',
        directions: [
            [0, 1, 2],
            [0, width * 1, width * 2],
        ],
    },
    {
        name: 'battleship',
        directions: [
            [0, 1, 2, 3],
            [0, width * 1, width * 2, width * 3],
        ],
    },
    {
        name: 'carrier',
        directions: [
            [0, 1, 2, 3, 4],
            [0, width * 1, width * 2, width * 3, width * 4],
        ],
    },
]

// Draw the computers ships in random locations
function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    randomDirection === 0 ? direction = 1 : direction = width;
    let randomStart = Math.abs(Math.floor(Math.random() * width ** 2 - (ship.directions[0].length * direction)));

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));
    } else {
        generate(ship);
    }
}

for (let i = 0; i < shipArray.length; i++) {
    generate(shipArray[i]);
}

// Rotate the ships
function rotate() {
    shipGridDisplay.classList.toggle('grid-display-vertical');
    destroyer.classList.toggle('destroyer-container-vertical');
    destroyer.classList.toggle('vertical');
    submarine.classList.toggle('submarine-container-vertical');
    submarine.classList.toggle('vertical');
    cruiser.classList.toggle('cruiser-container-vertical');
    cruiser.classList.toggle('vertical');
    battleship.classList.toggle('battleship-container-vertical');
    battleship.classList.toggle('vertical');
    carrier.classList.toggle('carrier-container-vertical');
    carrier.classList.toggle('vertical');

    isHorizontal ? isHorizontal = false : isHorizontal = true;
}

$rotateButton.on('click', rotate);

// Drag/drop user ships
ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
userSquares.forEach(square => square.addEventListener('dragstart', dragStart));
userSquares.forEach(square => square.addEventListener('dragover', dragOver));
userSquares.forEach(square => square.addEventListener('dragenter', dragEnter));
userSquares.forEach(square => square.addEventListener('dragleave', dragLeave));
userSquares.forEach(square => square.addEventListener('drop', dragDrop));
userSquares.forEach(square => square.addEventListener('dragend', dragEnd));

let selectedShipNameWithIndex;
let selectedShipGrabbedIndex;
let selectedShipLastIndex;
let draggedShip;
let draggedShipLength;
let draggedShipParent;
let draggedShipChildNodes;
let droppedShipMinIndex;
let droppedShipMaxIndex;

ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    // console.log('<<<<<<<<<<mousedown this>>>>>>>>>>');

    selectedShipNameWithIndex = e.target.id;
    selectedShipGrabbedIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    selectedShipLastIndex = parseInt(e.target.parentNode.lastChild.previousSibling.id.substr(-1));

    isHorizontal ? selectedShipLastIndex : selectedShipLastIndex = 10 * selectedShipLastIndex;
    isHorizontal ? selectedShipGrabbedIndex : selectedShipGrabbedIndex = 10 * selectedShipGrabbedIndex;
}))

function dragStart() {
    // console.log('<<<<<<<<<<dragStart this>>>>>>>>>>');
    // console.log(this.childNodes);
    draggedShip = this;
    draggedShipLength = (this.childNodes.length - 1) / 2;
    draggedShipParent = this.parentNode;
}

function dragOver(e) {
    // ********** IMPORTANT!!! **********
    // You NEED this next line, or else the drag/drop won't work
    e.preventDefault();
    // console.log('<<<<<<<<<<dragOver this>>>>>>>>>>');
    // this.innerText = 'i was here';
}

function dragEnter(e) {
    // ********** IMPORTANT!!! **********
    // You NEED this next line, or else the drag/drop won't work
    e.preventDefault();
    // console.log('dragEnter');
    // console.log(this);
}

function dragLeave() {
    // console.log('dragLeave');
    // console.log(this);
}

function dragDrop() {
    // console.log('<<<<<<<<<<dragDrop this>>>>>>>>>>');
    // console.log(this.dataset.id);

    // Record the min/max indices of the where the ship was dropped
    // This will be used later to determine if it goes over to the next line
    // If the 1st digits do NOT match when BOTH values are > 10, they spilling into the next line
    droppedShipMinIndex = parseInt(this.dataset.id) - selectedShipGrabbedIndex;
    droppedShipMaxIndex = droppedShipMinIndex + selectedShipLastIndex;

    // Create array of indices for the dragged ship
    const droppedShipMiddleIndices = [];
    if (isHorizontal) {
        for (let i = 0; i <= droppedShipMaxIndex - droppedShipMinIndex; i++) {
            droppedShipMiddleIndices.push(droppedShipMinIndex + i);
        }
    } else if (!isHorizontal) {
        for (let i = 0; i <= droppedShipMaxIndex - droppedShipMinIndex; i += 10) {
            droppedShipMiddleIndices.push(droppedShipMinIndex + i);
        }
    }

    // See if the dragged ship overlaps any already placed ship
    let overlap = false;
    for (let i = 0; i < droppedShipMiddleIndices.length; i++) {
        if (userGrid.children[droppedShipMiddleIndices[i]].classList.contains('taken')) {
            overlap = true;
        }
    }

    // Record the 1st Digit of the min/max droppedShip index
    // If the 2-digit values are > 10, but the 1st digits differ, then there's an wrap-around, which won't be considered valid input
    const min1stDigit = parseInt(String(droppedShipMinIndex).substr(0, 1));
    const max1stDigit = parseInt(String(droppedShipMaxIndex).substr(0, 1));

    let shipNameWithLastId = draggedShip.lastChild.previousSibling.id;
    // let shipNameWithLastId = draggedShip.children[1].id;
    let shipClass = shipNameWithLastId.slice(0, -2);
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
    shipLastId = shipLastId - selectedShipIndex;

    if (isHorizontal && (min1stDigit === max1stDigit || droppedShipMinIndex < 10 && droppedShipMaxIndex < 10) && !overlap) {
        for (let i = 0; i < draggedShipLength; i++) {
            let directionClass;
            if (i === 0) directionClass = 'start';
            if (i === draggedShipLength - 1) directionClass = 'end';
            userSquares[parseInt(this.dataset.id) - selectedShipGrabbedIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass);
        }
    } else if (!isHorizontal && droppedShipMaxIndex < width ** 2 && !overlap) {
        for (let i = 0; i < draggedShipLength; i++) {
            let directionClass;
            if (i === 0) directionClass = 'start';
            if (i === draggedShipLength - 1) directionClass = 'end';
            userSquares[parseInt(this.dataset.id) - selectedShipGrabbedIndex + width * i].classList.add('taken', 'vertical', directionClass, shipClass);
        }
    } else return;

    // Removed the dragged ship
    displayGrid.removeChild(draggedShipParent);
}

function dragEnd() {
    // console.log('<<<<<<<<<<dragEnd this>>>>>>>>>>');
    // console.log(this);
}


// Game Logic
function playGame() {
    if (isGameOver) return;
    if (currentPlayer === 'user') {
        computerGrid.classList.add('active');
        userGrid.classList.remove('active');
        turnDisplay.classList.add('yourTurn');
        turnDisplay.classList.remove('aliensTurn');
        turnDisplay.innerHTML = 'Your Turn';
        computerSquares.forEach(square => square.addEventListener('click', function(e) {
            revealSquare(square);
        }))
    }
    if (currentPlayer === 'computer') {
        computerGrid.classList.remove('active');
        userGrid.classList.add('active');
        turnDisplay.classList.remove('yourTurn');
        turnDisplay.classList.add('aliensTurn');
        turnDisplay.innerHTML = `Alien's Turn`;
        setTimeout(aliensTurn, 1000);
    }
}


startButton.addEventListener('click', () => {
    // Check if user has placed ALL ships before commencing play
    let takenCount = 0;
    userSquares.forEach(square => {
        if (square.classList.contains('taken')) {
            takenCount++;
        }
    });
    if (takenCount < 2 + 3 + 3 + 4 + 5) {
        alert('Please position your entire fleet before starting the operation.')
        return;
    }

    for (let i = 0; i < $hiddenMsgs.length; i++) {
        $hiddenMsgs[i].removeAttr('hidden');
    }

    infoDisplay.innerHTML = '';
    startButton.style.display = 'none';
    $rotateButton.css('display', 'none');
    // rotateButton.style.display = 'none';
    playGame();
});

let destroyerCount = 0;
let submarineCount = 0;
let cruiserCount = 0;
let battleshipCount = 0;
let carrierCount = 0;

function revealSquare(square) {
    // Set it such that the player canNOT pick a square they've already picked
    if (square.classList.contains('hit') || square.classList.contains('miss')) {
        alert("You've already shot at this coordinate location. Please pick another coordinate.");
        return;
    }
    if (!square.classList.contains('hit')) {
        if (square.classList.contains('destroyer')) destroyerCount++;
        if (square.classList.contains('submarine')) submarineCount++;
        if (square.classList.contains('cruiser')) cruiserCount++;
        if (square.classList.contains('battleship')) battleshipCount++;
        if (square.classList.contains('carrier')) carrierCount++;
    }
    if (square.classList.contains('taken')) {
        square.classList.add('hit');
        checkForWins(square);
    } else {
        square.classList.add('miss');
    };
    // checkForWins();
    currentPlayer = 'computer';
    playGame();
}

let cpuDestroyerCount = 0;
let cpuSubmarineCount = 0;
let cpuCruiserCount = 0;
let cpuBattleshipCount = 0;
let cpuCarrierCount = 0;

function aliensTurn() {
    // Pick a random box for the aliens to shoot
    let random = Math.floor(Math.random() * userSquares.length);

    // If the aliens have already shot at this location, pick another spot
    if (!userSquares[random].classList.contains('shot')) {
        if (userSquares[random].classList.contains('taken')) {
            userSquares[random].classList.add('hit', 'shot');
            checkForWins(userSquares[random]);
        } else {
            userSquares[random].classList.add('miss', 'shot');
        };

        if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++;
        if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++;
        if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++;
        if (userSquares[random].classList.contains('battleship')) cpuBattleshipCount++;
        if (userSquares[random].classList.contains('carrier')) cpuCarrierCount++;
    } else aliensTurn();
    // checkForWins();
    currentPlayer = 'user';
    computerGrid.classList.add('active');
    userGrid.classList.remove('active');
    turnDisplay.classList.add('yourTurn');
    turnDisplay.classList.remove('aliensTurn');
    turnDisplay.innerHTML = 'Your Turn';
}

function checkForWins(square) {
    if (destroyerCount === 2) {
        infoDisplay.classList.remove('lost');
        infoDisplay.classList.add('win');
        infoDisplay.innerHTML = "You sunk the alien's destroyer.";
        destroyerCount = 10;
        const cpuDestroyer = document.querySelectorAll('.destroyer.hit');
        cpuDestroyer.forEach(ship => {
            ship.classList.add('sunk');
            ship.innerText = "X";
        });
    }
    if (submarineCount === 3) {
        infoDisplay.classList.remove('lost');
        infoDisplay.classList.add('win');
        infoDisplay.innerHTML = "You sunk the alien's submarine.";
        submarineCount = 10;
        const cpuSubmarine = document.querySelectorAll('.submarine.hit');
        cpuSubmarine.forEach(ship => {
            ship.classList.add('sunk');
            ship.innerText = "X";
        });
    }
    if (cruiserCount === 3) {
        infoDisplay.classList.remove('lost');
        infoDisplay.classList.add('win');
        infoDisplay.innerHTML = "You sunk the alien's cruiser.";
        cruiserCount = 10;
        const cpuCruiser = document.querySelectorAll('.cruiser.hit');
        cpuCruiser.forEach(ship => {
            ship.classList.add('sunk');
            ship.innerText = "X";
        });
    }
    if (battleshipCount === 4) {
        infoDisplay.classList.remove('lost');
        infoDisplay.classList.add('win');
        infoDisplay.innerHTML = "You sunk the alien's battleship.";
        battleshipCount = 10;
        const cpuBattleship = document.querySelectorAll('.battleship.hit');
        cpuBattleship.forEach(ship => {
            ship.classList.add('sunk');
            ship.innerText = "X";
        });
    }
    if (carrierCount === 5) {
        infoDisplay.classList.remove('lost');
        infoDisplay.classList.add('win');
        infoDisplay.innerHTML = "You sunk the alien's carrier.";
        carrierCount = 10;
        const cpuCarrier = document.querySelectorAll('.carrier.hit');
        cpuCarrier.forEach(ship => {
            ship.classList.add('sunk');
            ship.innerText = "X";
        });
    }
    if (cpuDestroyerCount === 2) {
        infoDisplay.classList.remove('win');
        infoDisplay.classList.add('lost');
        infoDisplay.innerHTML = "The alien's sunk your destroyer.";
        cpuDestroyerCount = 10;
    }
    if (cpuSubmarineCount === 3) {
        infoDisplay.classList.remove('win');
        infoDisplay.classList.add('lost');
        infoDisplay.innerHTML = "The alien's sunk your submarine.";
        cpuSubmarineCount = 10;
    }
    if (cpuCruiserCount === 3) {
        infoDisplay.classList.remove('win');
        infoDisplay.classList.add('lost');
        infoDisplay.innerHTML = "The alien's sunk your cruiser.";
        cpuCruiserCount = 10;
    }
    if (cpuBattleshipCount === 4) {
        infoDisplay.classList.remove('win');
        infoDisplay.classList.add('lost');
        infoDisplay.innerHTML = "The alien's sunk your battleship.";
        cpuBattleshipCount = 10;
    }
    if (cpuCarrierCount === 5) {
        infoDisplay.classList.remove('win');
        infoDisplay.classList.add('lost');
        infoDisplay.innerHTML = "The alien's sunk your carrier.";
        cpuCarrierCount = 10;
    }
    if (destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount === 50) {
        infoDisplay.style.visibility = 'hidden';
        turnDisplay.classList.add('win');
        turnDisplay.innerHTML = 'CONGRATULATIONS, YOU WON!';
        gameOver();
    }
    if (cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount === 50) {
        infoDisplay.style.visibility = 'hidden';
        turnDisplay.classList.add('lost');
        turnDisplay.innerHTML = 'Bummer, the aliens won!';
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    startButton.removeEventListener('click', playGame);
    computerSquares.forEach(square => square.removeEventListener('click', function(e) {
        revealSquare(square);
    }))
}