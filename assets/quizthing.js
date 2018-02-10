// Need to store the correct answer

function getQuestionData () {
	let fetchUrl = 'http://localhost:8080/questionData';

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			renderQuestionData(json);
		})
		.catch(error => {
			document.write(`Couldn't get questions: ${fetchUrl}`);
		});
}

function renderQuestionData (data) {
	document.getElementById('difficulty').innerHTML = `Difficulty: ${data.difficulty}`;
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

	document.getElementById('check-answer-button').style.visibility = 'visible';
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
			document.write(`Couldn't get questions: ${fetchUrl}`);
		});
}

function renderAnswerResponse (data) {
	let result = document.getElementById('result');

	if (data.correct == 1) {
		result.innerHTML = "That's right!";
	} else {
		result.innerHTML = "Sorry, try again.";
	}

	result.style.visibility = 'visible';
}

function prepPage () {
	document.getElementById('data-button').addEventListener('click', () => {
		getQuestionData();
	})

	document.getElementById('check-answer-button').addEventListener('click', () => {
		checkAnswer();
	})

	document.getElementById('check-answer-button').style.visibility = 'hidden';
	document.getElementById('result').style.visibility = 'hidden';
}

prepPage();