const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const answerHelpers = require('./libs/answerHelpers.js');
const makeUpPotentialAnswersArray = answerHelpers.makeUpPotentialAnswersArray;
const randomiseAnswers = answerHelpers.randomiseAnswers;

let score = 0;
let seenQuestions = [];
let questionMemory;

app.use(bodyParser.json()); // parse incoming JSON
app.use('/static', express.static('static'));
app.set('view engine', 'hbs'); // use Handlebars as a view engine

app.get("/quiz", function(req, res) {
  if (questionMemory){
    res.render("display-question", questionMemory)
  }
  else{
    getQuestion().then(function(questionJson) {
        res.render("display-question", questionJson);
      })
      .catch(function(error) {
        res.status(500).json({
          error: "We failed our task"
        });
      });
    }
});


var getQuestion = function() {
  return new Promise(function(resolve, reject) {
    fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {

        potentialAnswersArray = makeUpPotentialAnswersArray(json.results[0]);

        let question = json.results[0].question;
        let optionsToDisplay = randomiseAnswers(potentialAnswersArray);

        if (seenQuestions.indexOf(question) > -1) {
          resolve(getQuestion());
        } else {
          seenQuestions.push(question);

          let questionJson = {
            score,
            question,
            optionsToDisplay,
          };

          questionMemory = questionJson;
          resolve(questionJson);
        }

      });
  });
}

app.listen(8080, function() {
  console.log("listening on port 8080");
});

app.post("/answer", function(req, res, next) {
  console.log("/answer body:", req.body);

  if (req.body.answer) {
    score += 1;
  } else {
    score = 0;
  }

  getQuestion().then(function(question) {

    res.json({
      score,
      question,
    });
  });
});
