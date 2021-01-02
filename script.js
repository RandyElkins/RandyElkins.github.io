// NOTE JQUERY Variables
const $yourBoard = $('.yourBoard');
const $computersBoard = $('.computersBoard');
const boardRows = ['header', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const boardColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('$computersBoard');
console.log($computersBoard);

const setupBoards = function() {

}

setupBoards();

const createBoard = function(playerComputer) {

}

$boardBuild = `<table>
`;

// Create the HTML for the Player & Computer Boards
for (let i = 0; i < boardRows.length; i++) {
    $boardBuild += `<tr>
    `;
    if (i > 0) {
        for (let j = 0; j < boardColumns.length; j++) {
            if (j !== 0) {
                $boardBuild += `<td class="cell row${boardRows[i]} col${boardColumns[j]}">${boardRows[i]}${boardColumns[j]}</td>
                `;
            } else {
                $boardBuild += `<th class="letters">${boardRows[i]}</th>
                `;
            }
        }
    } else {
        for (let j = 0; j < boardColumns.length; j++) {
            if (j !== 0) {
                $boardBuild += `<th class="numbers">${boardColumns[j]}</td>
                `;
            } else {
                $boardBuild += `<th class="empty"></th>
                `;
            }
        }
    }
    $boardBuild += `</tr>
    `;
}
$boardBuild += `</table>`;
console.log($boardBuild);
$computersBoard.append($boardBuild);

// NOTE Ship Class
// ACC = Aircraft Carrier = 5
// BAT = Battleship       = 4
// SUB = Submarine        = 3
// DES = Destroyer        = 3
// CRU = Cruiser          = 2

class Ship {
    constructor() {
        this.type = type;
        // this.
    }
}