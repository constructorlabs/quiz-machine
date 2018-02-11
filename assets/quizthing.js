function getCurrentQuestion () {
	let fetchUrl = 'http://localhost:8080/currentQuestion';

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			renderQuestionData(json);
		})
		.catch(error => {
			document.write(`Couldn't get question: ${fetchUrl}`);
		});
}

function getCurrentQuestion () {
	let fetchUrl = 'http://localhost:8080/currentQuestion';

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			renderQuestionData(json);
		})
		.catch(error => {
			document.write(`Couldn't get question: ${fetchUrl}`);
		});
}

function getQuestionData () {
	let fetchUrl = 'http://localhost:8080/newQuestion';

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			renderQuestionData(json);
		})
		.catch(error => {
			document.write(`Couldn't get question: ${fetchUrl}`);
		});
}

function renderQuestionData (data) {
	document.getElementById('difficulty-value').innerHTML = data.difficulty;
	document.getElementById('questions-answered').innerHTML = data.score;
	document.getElementById('question').innerHTML = data.question;

	let answerCount = 0;
	let answersBlock = document.getElementById('answers');

	while (answersBlock.firstChild) {
		answersBlock.removeChild(answersBlock.firstChild);
	}

	data.answers.forEach(answer => {
		let answerChoiceBlock = document.createElement('div');
		answerChoiceBlock.setAttribute('class', 'answer-choice');
		answersBlock.appendChild(answerChoiceBlock);

		let answerChoice = document.createElement('input');
		answerChoice.setAttribute('type', 'radio');
		answerChoice.setAttribute('name', 'question');
		answerChoice.setAttribute('id', `answer-${++answerCount}`);
		answerChoice.setAttribute('value', answer);
		answerChoiceBlock.appendChild(answerChoice);

		let answerChoiceLabel = document.createElement('label');
		answerChoiceLabel.setAttribute('for', `answer-${answerCount}`);
		answerChoiceLabel.innerHTML = answer;
		answerChoiceBlock.appendChild(answerChoiceLabel);
	});

	switchButtonToCheckAnswer();

	document.getElementById('result').style.visibility = 'hidden';
}

function checkAnswer () {
	let chosenAnswer = document.querySelector('input[name=question]:checked');

	if (!chosenAnswer) return;

	let checkAnswer = chosenAnswer.value;

	let fetchUrl = 'http://localhost:8080/checkAnswer';
	let fetchBody = `{"check":"${checkAnswer}"}`;

	fetch(fetchUrl, {
			method : 'POST',
			body : fetchBody,
  			headers : new Headers({
			    'Content-Type' : 'application/json'
			})
		})
		.then(response => {
			return response.json();
		})
		.then(json => {
			renderAnswerResponse(json);
		})
		.catch(error => {
			document.write(`Couldn't get question: ${fetchUrl}`);
		});
}

function renderAnswerResponse (data) {
	let result = document.getElementById('result');

	if (data.correct == 1) {
		result.innerHTML = 'That\'s right!';
		switchButtonToNextQuestion();
	} else {
		if (data.triesMade < data.triesAllowed) {
			result.innerHTML = 'Try again!';
		} else {
			// To do:
			// - keep track of tried answers and highlight
			//   the right one at this point
			// - reset score to 0
			result.innerHTML = 'Sorry, you didn\'t get it.';
			switchButtonToNextQuestion();
		}
	}

	result.style.border = '4px dashed #000';
	result.style.visibility = 'visible';
}

function switchButtonToCheckAnswer () {
	let actionButton = document.getElementById('action-button');
	actionButton.innerHTML = 'Check answer';
	actionButton.style.backgroundColor = '#6fc';
	actionButton.removeEventListener('click', getQuestionDataListener);
	actionButton.addEventListener('click', checkAnswerListener);
}

function switchButtonToNextQuestion () {
	let actionButton = document.getElementById('action-button');
	actionButton.innerHTML = 'Next question';
	actionButton.style.backgroundColor = '#6cf';
	actionButton.removeEventListener('click', checkAnswerListener);
	actionButton.addEventListener('click', getQuestionDataListener);
}

function checkAnswerListener () {
	checkAnswer();
}

function getQuestionDataListener () {
	getQuestionData();
}

function prepPage () {
	getCurrentQuestion();

	document.getElementById('action-button').addEventListener('click', checkAnswerListener);
}

prepPage();