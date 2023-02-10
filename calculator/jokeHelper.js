const jokes = [
	'How do you count cows? -- With a cowculator.',
	'How do you say goodbye to a calculus teacher?....Calculator!',
	`Trust your calculator. It's something to count on`,
	'What did the calculator say to his friends? “You can count on me!”',
	'Farmer wanted to know how many were in his dairy herd, so he used a cowculator.',
]

const tellAJoke = () => {
	// const joke = jokes.Math.floor(Math.random() * jokes.length)
	const xx = Math.floor(Math.random() * jokes.length)
	return jokes[xx]
}
