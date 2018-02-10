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
			document.getElementById('data-test').innerHTML =
				JSON.stringify(json, null, 2);
		})
		.catch(error => {
			document.write(`Couldn't get questions: ${fetchUrl}`);
		});
}

function prepPage () {
	document.getElementById('data-button').addEventListener('click', () => {
		getQuestionData();
	})
}

prepPage();