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
const matchWinnerTitleDiv = document.getElementById('game_winner_title')

console.log(playerRock)

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
let playerSelectedWeapon = undefined
let playerSelectedWeaponNode = undefined

let computerSelectedWeapon = undefined

let playerRoundWins = 0
let computerRoundWins = 0
let totalRounds = 0

let roundResults = undefined
let roundMessage = undefined
let matchWinner = false

const matchOverGraphic = document.createElement('img')
matchOverGraphic.id = 'match_over_graphic'

// add listener to each button in array

playerButtons.forEach((weapon) => {
	weapon.button.addEventListener('click', () => {
		if (playerSelectedWeaponNode) {
			playerSelectedWeaponNode.classList.toggle('selected')
		}

		weapon.button.classList.toggle('selected')
		playerSelectedWeapon = weapon.value
		playerSelectedWeaponNode = weapon.button
	})
})

const createResetButton = () => {
	const resetButton = document.createElement('button')
	resetButton.id = 'reset_button'
	resetButton.innerText = 'play again'
	roundWinnerPrompt.appendChild(resetButton)

	resetButton.addEventListener('click', () => {
		playerSelectedWeapon = undefined
		computerSelectedWeapon = undefined

		playerRoundWins = 0
		computerRoundWins = 0
		totalRounds = 0

		roundResults = undefined
		roundMessage = undefined
		matchWinner = false

		playerScore.innerText = 0
		computerScore.innerText = 0

		playerSelectedWeaponNode.classList.toggle('selected')
		playerSelectedWeaponNode = undefined

		matchWinnerTitleDiv.removeChild(matchOverGraphic)
		roundWinnerPrompt.removeChild(resetButton)
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
	})
}

const announceResults = () => {
	const humanHandImg = humanHandsGraphics.find(
		(humanHandsGraphics) => humanHandsGraphics.name === playerSelectedWeapon
	)
	const computerHandImg = computerHandsGraphics.find(
		(computerHandsGraphics) => computerHandsGraphics.name === computerSelectedWeapon
	)

	humanPromptGraphicDiv.src = humanHandImg.src
	computerPromptGraphicDiv.src = computerHandImg.src

	roundWinnerPrompt.classList.toggle('prompActive')
	mainDiv.classList.toggle('prompActive')

	if (matchWinner) {
		matchWinnerTitleDiv.appendChild(matchOverGraphic)

		createResetButton()
		if (playerRoundWins === 5) {
			matchOverGraphic.src = '/media/chicken_neon.gif'
			roundPromptResults.innerText = `Winner Winner Chicken Dinner! You win ${playerRoundWins} to ${computerRoundWins}`
			return
		}
		matchOverGraphic.src = '/media/game_over_neon.gif'
		roundPromptResults.innerText = `You lose ${playerRoundWins} to ${computerRoundWins}`
		return
	}

	roundPromptResults.innerText = roundMessage

	setTimeout(() => {
		roundWinnerPrompt.classList.toggle('prompActive')
		mainDiv.classList.toggle('prompActive')
	}, 2000)
}

const logRoundResults = () => {
	switch (roundResults) {
		case 0:
			roundMessage = `Draw! Both played ${playerSelectedWeapon}`
			break
		case 1:
			playerRoundWins++
			playerScore.innerText = playerRoundWins
			roundMessage = `You Win! ${playerSelectedWeapon} beats ${computerSelectedWeapon}`
			break
		case 2:
			computerRoundWins++
			computerScore.innerText = computerRoundWins
			roundMessage = `You Lose! ${computerSelectedWeapon} beats ${playerSelectedWeapon}`
	}

	// check if there is a game winner
	if (playerRoundWins === 5 || computerRoundWins === 5) {
		matchWinner = !matchWinner
	}
}

const playRound = () => {
	totalRounds++

	const beats = {
		rock: 'scissors',
		scissors: 'paper',
		paper: 'rock',
	}

	if (playerSelectedWeapon === computerSelectedWeapon) {
		return 0
	} else if (beats[playerSelectedWeapon] === computerSelectedWeapon) {
		return 1
	} else {
		return 2
	}
}

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
	computerSelectedWeapon = computerPick
	return
}

fightBtn.addEventListener('click', () => {
	if (!playerSelectedWeapon) {
		// give feedback to user!
		alert('please select weapon')
		return
	}

	computerSelect()
	roundResults = playRound()
	logRoundResults()
	announceResults()
})
