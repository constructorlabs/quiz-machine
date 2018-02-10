const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

const storage = {
	questionsAnswered : 0
};

app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.use('/assets', express.static('assets'));

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Are you kidding me with this
hbs.registerHelper( 'concat', (...args) => {
	return args.slice(0, -1).join('');
});

app.get('/', (req, res) => {
	showHome(req, res);
});

app.get('/questionData', (req, res) => {
	getQuestionData(req, res);
})

app.get('/datatest', (req, res) => {
	res.render('datatest');
})

// ---------------------------------------------------------------------------

function showHome (req, res) {
	let difficulty = 'easy';

	let fetchUrl = `https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}`;

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			let output = {
				difficulty : difficulty,
				question : json.results[0].question,
				answers : mergeAnswers(json.results)
			};
			console.log(output);
			res.render('home', output);
		})
		.catch(error => {
			res.status(500).json(
				{ error: `Couldn't get questions: ${fetchUrl}` }
			);
		});
}

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

function getQuestionData (req, res) {
	let difficulty = 'easy';

	let fetchUrl = `https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}`;

	fetch(fetchUrl)
		.then(response => {
			return response.json();
		})
		.then(json => {
			res.json({
				difficulty : difficulty,
				question : json.results[0].question,
				answers : mergeAnswers(json.results)
			});
		})
		.catch(error => {
			res.status(500).json(
				{ error: `Couldn't get questions: ${fetchUrl}` }
			);
		});
}

// --------------------------------------------------------------------------

app.listen(8080, function () {
		console.log('Starting Express server on port 8080.');
});