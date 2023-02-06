const playerRock = document.getElementById('player_rock')
const playerPaper = document.getElementById('player_paper')
const playerScissor = document.getElementById('player_scissors')
const fightBtn = document.getElementById('fight_btn')
const playerScore = document.getElementById('player_score')
const computerScore = document.getElementById('computer_score')

// buttons and their values
const playerButtons = [
	{ button: playerRock, value: 'rock' },
	{ button: playerPaper, value: 'paper' },
	{ button: playerScissor, value: 'scissor' },
]

//current player selection
let playerSelectionValue = undefined
let playerSelectionNode = undefined

let playerWins = 0
let computerWins = 0
let numberOfRounds = 0

function makePlayerSelection({ button, value }) {
	if (playerSelectionNode) {
		playerSelectionNode.classList.remove('selected')
	}

	button.classList.add('selected')
	playerSelectionValue = value
	playerSelectionNode = button
}

// add listener to each button in array
playerButtons.forEach((selection) => {
	selection.button.addEventListener('click', () => {
		makePlayerSelection(selection)
	})
})

function computerSelect() {
	let computerPick = Math.floor(Math.random() * 3)

	switch (computerPick) {
		case 0:
			computerPick = 'rock'
			break
		case 1:
			computerPick = 'scissors'
			break
		case 2:
			computerPick = 'paper'
	}
	return computerPick
}

const beats = {
	rock: 'scissors',
	scissors: 'paper',
	paper: 'rock',
}

const playRound = (playerSelection, computerSelection) => {
	numberOfRounds++
	if (playerSelection === computerSelection) {
		return `Draw! Both played ${playerSelection}`
	} else if (beats[playerSelection] === computerSelection) {
		playerWins++
		playerScore.innerText = playerWins
		return `You Win! ${playerSelection} beats ${computerSelection}`
	} else {
		computerWins++
		computerScore.innerText = computerWins
		return `You Lose! ${computerSelection} beats ${playerSelection}`
	}
}

fightBtn.addEventListener('click', () => {
	if (!playerSelectionValue) {
		// give feedback to user!
		console.log('please select weapon')
		return
	}
	const roundResults = playRound(
		playerSelectionValue,
		computerSelect()
	)
	console.log(roundResults)
})
