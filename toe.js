const Player_X = 'X'
const Player_O = 'O'
winningStates: [
    //verticle
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],

    //horizontal
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],

    //diagonal
    ['0', '4', '8'],
    ['2', '4', '6']
]

const playerStatus = document.querySelector('.display')
const cellElements = document.getElementById('cell')
const boardElement = document.getElementById('board-container')
const winningMessageElment = document.getElementById('winningMessage')
const restartButton = document.getElementById('restart')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false


restartButton.addEventListener('click' , startGame)

function startGame() {
    isPlayer_O_Turn = false // this makes X be first player
    restartButton.forEach(cell => {
        cell.classList.remove(Player_X)
        cell.classList.remove(Player_O)
        cell.removeEventListener('click' , handleCellClick)
        cell.addEventListener('click' , handleCellClick, {once:true})
    })
    setBoardHover()
    winningMessageTextElement.classList.remove('show')
}

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? Player_O : Player_X
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHover()
	}
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `It's a draw!`
    }else {
        winningMessageTextElement.innerText = `"Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
    winningMessageTextElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(Player_X) || cell.classList.contains(Player_O)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHover() {
	boardElement.classList.remove(Player_X)
	boardElement.classList.remove(Player_O)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(Player_O)
	} else {
		boardElement.classList.add(Player_X)
	}
}

function checkWin(currentClass) {
	return winningStates.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}
