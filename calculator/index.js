const buttonsNumbers = document.querySelectorAll('.number')
const buttonsOperators = document.querySelectorAll('.operator')
const calculatorDisplay = document.getElementById('display')
const buttonsSpecials = document.querySelectorAll('.special')
const deleteLastNumber = document.getElementById('delete')

let firstValue = undefined
let secondValue = undefined
let operation = undefined
let decimale = false

const logNumbers = (value) => {
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

const operateTwo = (operator) => {
	console.log(operator, 'hi')
	if (operation) {
		const newValue = operate(operation, firstValue, secondValue)
		console.log(newValue)
		firstValue = newValue
		secondValue = undefined
		operation = operator
		setDisplay(newValue)
		return
	}
	operation = operator
}

const work = (value) => {
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
		setDisplay(newValue)
		return
	} else if (operation) {
		const newValue = secondValue.slice(0, secondValue.length - 1)
		secondValue = newValue
		setDisplay(newValue)
		return
	}
	const newValue = firstValue.slice(0, firstValue.length - 1)
	firstValue = newValue
	setDisplay(newValue)
}

// buttonsSpecials.forEach((button) => {
// 	button.addEventListener('click', () => {
// 		// pressed reset
// 		if (button.id === 'reset') {
// 			firstValue = undefined
// 			secondValue = undefined
// 			operation = undefined
// 			setDisplay(0)
// 			return
// 		}

// 		// pressed equal
// 		// check that all values are filled
// 		if (!firstValue || !secondValue || !operation) {
// 			return
// 		}
// 		const newValue = operate(operation, firstValue, secondValue)
// 		firstValue = newValue
// 		secondValue = undefined
// 		operation = undefined
// 		setDisplay(newValue)
// 		return
// 	})
// })

buttonsSpecials.forEach((button) => {
	button.addEventListener('click', () => {
		work(button.id)
	})
})

const setDisplay = (element) => {
	calculatorDisplay.innerText = element
}

const checkForDecimals = (value) => {
	return value.includes('.')
}

// add number
// buttonsNumbers.forEach((button) => {
// 	button.addEventListener('click', () => {
// 		// check if an operation exists
// 		if (!operation) {
// 			if (!firstValue) {
// 				firstValue = button.innerText
// 				setDisplay(firstValue)
// 				return
// 			}

// 			firstValue += button.innerText
// 			setDisplay(firstValue)
// 			return
// 		}
// 		// if operation exist log new event in second Value
// 		if (!secondValue) {
// 			secondValue = button.innerText
// 			setDisplay(secondValue)
// 			return
// 		}
// 		secondValue += button.innerText
// 		setDisplay(secondValue)
// 		return
// 	})
// })

buttonsNumbers.forEach((button) => {
	button.addEventListener('click', () => {
		logNumbers(button.innerText)
	})
})

// buttonsOperators.forEach((operator) => {
// 	operator.addEventListener('click', () => {
// 		// check if an operator exist
// 		if (operation) {
// 			const newValue = operate(operation, firstValue, secondValue)
// 			console.log(newValue)
// 			firstValue = newValue
// 			secondValue = undefined
// 			operation = operator.innerText
// 			setDisplay(newValue)
// 			return
// 		}
// 		operation = operator.innerText
// 	})
// })
buttonsOperators.forEach((operator) => {
	operator.addEventListener('click', () => {
		operateTwo(operator.innerText)
	})
})

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
	console.log(num2, 'hello')
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
			console.log(result)
			break
		default:
			break
	}
	if (typeof result === 'string') {
		return result
	}
	return result
}

deleteLastNumber.addEventListener('click', () => {
	if (operation) {
		const newValue = secondValue.slice(0, secondValue.length - 1)
		secondValue = newValue
		setDisplay(newValue)
		return
	}
	const newValue = firstValue.slice(0, firstValue.length - 1)
	firstValue = newValue
	setDisplay(newValue)
})

window.addEventListener('keyup', (e) => {
	const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
	const operationKeys = ['+', '-', '/', '*', '%']
	const specialKeys = ['Backspace', 'Escape', 'Enter']

	if (numberKeys.includes(e.key)) return logNumbers(e.key)
	if (operationKeys.includes(e.key)) return operateTwo(e.key)
	if (specialKeys.includes(e.key)) return work(e.key)

	return
})
