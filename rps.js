const playerRock = document.getElementById('player_rock')
const playerPaper = document.getElementById('player_paper')
const playerScissor = document.getElementById('player_scissors')
const fightBtn = document.getElementById('fight_btn')
const playerScore = document.getElementById('player_score')
const computerScore = document.getElementById('computer_score')
const roundWinnerPrompt = document.querySelector(
	'#round_winner_prompt'
)
const mainDiv = document.getElementById('main')

console.log(roundWinnerPrompt)
// buttons and their values
const playerButtons = [
	{ button: playerRock, value: 'rock' },
	{ button: playerPaper, value: 'paper' },
	{ button: playerScissor, value: 'scissors' },
]

//current player selection
let playerSelectionValue = undefined
let playerSelectionNode = undefined

let playerWins = 0
let computerWins = 0
let numberOfRounds = 0

function makePlayerSelection({ button, value }) {
	if (playerSelectionNode) {
		playerSelectionNode.classList.toggle('selected')
	}

	button.classList.toggle('selected')
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
		return 0
	} else if (beats[playerSelection] === computerSelection) {
		return 1
	} else {
		return 2
	}
}

const announceResult = (roundResults, computerSelection) => {
	let message = undefined
	switch (roundResults) {
		case 0:
			message = `Draw! Both played ${playerSelectionValue}`
			break
		case 1:
			playerWins++
			playerScore.innerText = playerWins
			message = `You Win! ${playerSelectionValue} beats ${computerSelection}`
			break
		case 2:
			computerWins++
			computerScore.innerText = computerWins
			message = `You Lose! ${computerSelection} beats ${playerSelectionValue}`
	}

	// check if there is a game winner
	if (playerWins === 5) {
		console.log('youre the winner!')
		return
	}

	if (computerWins === 5) {
		console.log('you looses ')
		return
	}

	// anounce round result

	roundWinnerPrompt.classList.toggle('prompActive')
	mainDiv.classList.toggle('prompActive')

	setTimeout(() => {
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
	}, 2000)
}

fightBtn.addEventListener('click', () => {
	if (!playerSelectionValue) {
		// give feedback to user!
		console.log('please select weapon')
		return
	}

	let computerSelection = computerSelect()
	const roundResults = playRound(
		playerSelectionValue,
		computerSelection
	)
	console.log(roundResults)
	announceResult(roundResults, computerSelection)
})
