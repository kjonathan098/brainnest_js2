const mainDiv = document.getElementById('main')
const playerRock = document.getElementById('player_rock')
const playerPaper = document.getElementById('player_paper')
const playerScissor = document.getElementById('player_scissors')
const fightBtn = document.getElementById('fight_btn')
const playerScore = document.getElementById('player_score')
const computerScore = document.getElementById('computer_score')
const roundWinnerPrompt = document.querySelector('#round_winner_prompt')
const winnerPromptTitle = document.getElementById('winner_prompt_title')
const humanPromptGraphicDiv = document.getElementById('human_round_graphic')
const computerPromptGraphicDiv = document.getElementById('computer_round_graphic')
const roundPromptResults = document.getElementById('winner_prompt_results')

const humanHandsGraphics = [
	{ name: 'rock', src: `./media/human_rock.svg` },
	{ name: 'paper', src: `./media/human_paper.svg` },
	{ name: 'scissors', src: `./media/human_scissors.svg` },
]

const computerHandsGraphics = [
	{ name: 'rock', src: `./media/computer_rock.svg` },
	{ name: 'paper', src: `./media/computer_paper.svg` },
	{ name: 'scissors', src: `./media/computer_scissors.svg` },
]

// buttons and their values
const playerButtons = [
	{ button: playerRock, value: 'rock' },
	{ button: playerPaper, value: 'paper' },
	{ button: playerScissor, value: 'scissors' },
]

//current player selection
let playerSelectionValue = undefined
let playerSelectionNode = undefined

let computerSelection = undefined

let playerWins = 0
let computerWins = 0
let numberOfRounds = 0

let roundResults = undefined
let roundMessage = undefined
let gameWinner = false

let humanWinnerText = `Winner Winner Chicken Dinner! You win ${playerWins} to ${computerWins}`
let computerWinnerText = `GAME OVER! You lose ${playerWins} to ${computerWins}`

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
	computerSelection = computerPick
	return
}

const beats = {
	rock: 'scissors',
	scissors: 'paper',
	paper: 'rock',
}

const playRound = () => {
	numberOfRounds++
	if (playerSelectionValue === computerSelection) {
		return 0
	} else if (beats[playerSelectionValue] === computerSelection) {
		return 1
	} else {
		return 2
	}
}

const createResetButton = () => {
	const resetButton = document.createElement('button')
	resetButton.id = 'reset_button'
	resetButton.innerText = 'play again'
	resetButton.addEventListener('click', () => {
		playerSelectionValue = undefined

		computerSelection = undefined

		playerWins = 0
		computerWins = 0
		numberOfRounds = 0

		roundResults = undefined
		roundMessage = undefined
		gameWinner = false

		playerSelectionNode.classList.toggle('selected')
		playerSelectionNode = undefined
		playerScore.innerText = 0
		computerScore.innerText = 0
		roundWinnerPrompt.removeChild(resetButton)
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
	})

	roundWinnerPrompt.appendChild(resetButton)
}

const activatePrompt = () => {
	const humanHandImg = humanHandsGraphics.find(
		(humanHandsGraphics) => humanHandsGraphics.name === playerSelectionValue
	)
	const computerHandImg = computerHandsGraphics.find(
		(computerHandsGraphics) => computerHandsGraphics.name === computerSelection
	)

	humanPromptGraphicDiv.src = humanHandImg.src
	computerPromptGraphicDiv.src = computerHandImg.src

	if (gameWinner) {
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
		createResetButton()
		if (playerWins === 5)
			return (roundPromptResults.innerText = `Winner Winner Chicken Dinner! You win ${playerWins} to ${computerWins}`)
		roundPromptResults.innerText = `GAME OVER! You lose ${playerWins} to ${computerWins}`
		return
	}

	roundPromptResults.innerText = roundMessage

	roundWinnerPrompt.classList.toggle('prompActive')
	mainDiv.classList.toggle('prompActive')

	setTimeout(() => {
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
	}, 2000)
}

const announceResult = () => {
	switch (roundResults) {
		case 0:
			roundMessage = `Draw! Both played ${playerSelectionValue}`
			break
		case 1:
			playerWins++
			playerScore.innerText = playerWins
			roundMessage = `You Win! ${playerSelectionValue} beats ${computerSelection}`
			break
		case 2:
			computerWins++
			computerScore.innerText = computerWins
			roundMessage = `You Lose! ${computerSelection} beats ${playerSelectionValue}`
	}

	// check if there is a game winner
	if (playerWins === 5 || computerWins === 5) {
		console.log('youre the winner!')
		gameWinner = !gameWinner
	}
	// anounce round result

	activatePrompt()
}

fightBtn.addEventListener('click', () => {
	if (!playerSelectionValue) {
		// give feedback to user!
		console.log('please select weapon')
		return
	}

	computerSelect()
	roundResults = playRound()
	announceResult(roundResults, computerSelection)
})
