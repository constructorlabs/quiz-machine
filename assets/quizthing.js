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
		switchButtonToNextQuestion();
	} else {
		if (data.triesMade < data.triesAllowed) {
			switchButtonToCheckAnswer(1);
		} else {
			// To do:
			// - keep track of tried answers and highlight
			//   the right one at this point
			// - reset score to 0
			switchButtonToNextQuestion(1);
		}
	}
}

function switchButtonToCheckAnswer (retry) {
	let actionButton = document.getElementById('action-button');
	actionButton.innerHTML = retry ? 'Try again!' : 'Check answer';
	actionButton.style.backgroundColor = '#6fc';
	actionButton.removeEventListener('click', getQuestionDataListener);
	actionButton.addEventListener('click', checkAnswerListener);
}

function switchButtonToNextQuestion (failed) {
	let actionButton = document.getElementById('action-button');
	actionButton.innerHTML = failed ? 'Sorry, you didn\'t get it.' : 'You got it!';
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