const buttonsNumbers = document.querySelectorAll('.number')
const buttonsOperators = document.querySelectorAll('.operator')
const calculatorDisplay = document.getElementById('display')
const buttonsSpecials = document.querySelectorAll('.special')
const deleteLastNumber = document.getElementById('delete')
const displayFeedback = document.getElementById('display_feedback')

let firstValue = undefined
let secondValue = undefined
let operation = undefined
let enter = false
let decimal = false

const setDisplay = (element) => {
	calculatorDisplay.innerText = element
}

const setDisplayFeedback = () => {
	displayFeedback.style.backgroundColor = 'green'
	setTimeout(() => {
		displayFeedback.style.backgroundColor = 'transparent'
	}, 100)
}

const add = (num1, num2) => {
	return num1 + num2
}

const subtract = (num1, num2) => {
	return num1 - num2
}

const divide = (num1, num2) => {
	console.log('hi')
	if (num2 === 0) {
		return 'Im ashemed to be used by you'
	}
	return num1 / num2
}

const multiply = (num1, num2) => {
	return num1 * num2
}

const operate = (operator, num1, num2) => {
	num1 = parseFloat(num1)
	num2 = parseFloat(num2)
	let result = undefined
	switch (operator) {
		case '+':
			result = add(num1, num2)
			break
		case '-':
			result = subtract(num1, num2)
			break
		case '*':
			result = multiply(num1, num2)
			break
		case '/':
			result = divide(num1, num2)
			break
		default:
			break
	}
	if (typeof result === 'string') {
		return result
	}
	return result
}

const logNumbers = (value) => {
	// reset calculator after enter
	if (enter) {
		logSpecialKey('Escape')
		enter = !enter
	}

	if (!operation) {
		if (!firstValue) {
			firstValue = value
			setDisplay(firstValue)
			return
		}
		firstValue += value
		setDisplay(firstValue)
		return
	}

	if (!secondValue) {
		secondValue = value
		setDisplay(secondValue)
		return
	}
	secondValue += value
	setDisplay(secondValue)
	return
}

const logOperation = (operator) => {
	if (operation) {
		const newValue = operate(operation, firstValue, secondValue)
		firstValue = newValue.toString()
		secondValue = undefined
		operation = operator
		setDisplayFeedback()
		setDisplay(firstValue)
		return
	}
	setDisplayFeedback()
	operation = operator
}

const logSpecialKey = (value) => {
	if (value === 'Escape') {
		firstValue = undefined
		secondValue = undefined
		operation = undefined
		setDisplay(0)
		return
	} else if (value === 'Enter') {
		if (!firstValue || !secondValue || !operation) {
			return
		}

		const newValue = operate(operation, firstValue, secondValue)
		firstValue = newValue.toString()
		secondValue = undefined
		operation = undefined
		enter = true
		setDisplay(firstValue)
		return
	}
	// user clicked on delete
	// if operation delete from second value
	else if (operation) {
		const newValue = secondValue.slice(0, secondValue.length - 1)
		secondValue = newValue
		setDisplay(newValue)
		return
	}
	const newValue = firstValue.slice(0, firstValue.length - 1)
	firstValue = newValue
	setDisplay(newValue)
	return
}
buttonsNumbers.forEach((button) => {
	button.addEventListener('click', () => {
		logNumbers(button.innerText)
	})
})

buttonsOperators.forEach((operator) => {
	operator.addEventListener('click', () => {
		logOperation(operator.innerText)
	})
})

buttonsSpecials.forEach((button) => {
	button.addEventListener('click', () => {
		logSpecialKey(button.id)
	})
})

window.addEventListener('keyup', (e) => {
	const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
	const operationKeys = ['+', '-', '/', '*', '%']
	const specialKeys = ['Backspace', 'Escape', 'Enter']

	if (numberKeys.includes(e.key)) return logNumbers(e.key)
	if (operationKeys.includes(e.key)) return logOperation(e.key)
	if (specialKeys.includes(e.key)) return logSpecialKey(e.key)

	return
})
