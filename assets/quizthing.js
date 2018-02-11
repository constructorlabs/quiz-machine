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

function startOver () {
	let fetchUrl = 'http://localhost:8080/startOver';

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

	switchButton('Check answer', '#6fc', getQuestionDataListener, checkAnswerListener);
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
	if (data.correct == 1) {
		switchButton('You got it!', '#6cf', checkAnswerListener, getQuestionDataListener);
	} else {
		if (data.triesMade < data.triesAllowed) {
			switchButton('Try again!', '#6fc', getQuestionDataListener, checkAnswerListener)
		} else {
			switchButton('Sorry, you didn\'t get it.', '#6cf', checkAnswerListener, startOverListener);
		}
	}
}

function switchButton (label, backgroundColor, removeListener, addListener) {
	let actionButton = document.getElementById('action-button');
	actionButton.innerHTML = label;
	actionButton.style.backgroundColor = backgroundColor;
	actionButton.removeEventListener('click', removeListener);
	actionButton.addEventListener('click', addListener);
}

function checkAnswerListener () {
	checkAnswer();
}

function getQuestionDataListener () {
	getQuestionData();
}

function startOverListener () {
	startOver();
}

function prepPage () {
	getCurrentQuestion();

	document.getElementById('action-button').addEventListener('click', checkAnswerListener);
}

prepPage();