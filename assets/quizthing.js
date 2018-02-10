function mergeAnswers (input) {
	let data = input[0];
	let incorrect = data.incorrect_answers;
	let correct = data.correct_answer;

	return shuffle([...incorrect, correct]);
}

// https://stackoverflow.com/a/12646864/3358139
function shuffle (array) {
		for (let i = array.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
}

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

	data.answers.forEach(answer => {
		let answerChoiceBlock = document.createElement('div');
		document.getElementById('form-answers').appendChild(answerChoiceBlock);

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
}

function prepPage () {
	document.getElementById('data-button').addEventListener('click', () => {
		getQuestionData();
	})
}

prepPage();