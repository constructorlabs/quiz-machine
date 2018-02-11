const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');


let score = 0;
let seenQuestions = [];

app.use(bodyParser.json()); // parse incoming JSON
app.use('/static', express.static('static'));
app.set('view engine', 'hbs'); // use Handlebars as a view engine

app.get("/quiz", function(req, res) {
  getQuestion().then(function(questionJson) {
      res.render("display-question", questionJson);
    })
    .catch(function(error) {
      res.status(500).json({
        error: "We failed our task"
      });
    });
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

        console.log("second: ", optionsToDisplay);

        // console.log(seenQuestions);

        if (seenQuestions.indexOf(question) > -1) {
          // console.log("question that is already there: ",  question);
          resolve(getQuestion());
        } else {
          seenQuestions.push(question);

          // console.log('have a question');
          // console.log(question);

          let questionJson = {
            score: 0,
            question,
            optionsToDisplay,
          };

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


function makeUpPotentialAnswersArray(objectWithQuestionDetails) {

  let potentialAnswersArray = [].concat(objectWithQuestionDetails.incorrect_answers);
  potentialAnswersArray.push(objectWithQuestionDetails.correct_answer);

  console.log("first: ", potentialAnswersArray);

  potentialAnswersArray.forEach(function(item, index) {
    let miniObject = {};
    miniObject.answer = item;

    if (item == objectWithQuestionDetails.correct_answer) {
      miniObject.correct = true;
    } else {
      miniObject.correct = false;
    }

    console.log(potentialAnswersArray);
    potentialAnswersArray[index] = miniObject;

  });

  return potentialAnswersArray;

}

function randomiseAnswers(arrayOfAnswers) {
  var currentIndex = arrayOfAnswers.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arrayOfAnswers[currentIndex];
    arrayOfAnswers[currentIndex] = arrayOfAnswers[randomIndex];
    arrayOfAnswers[randomIndex] = temporaryValue;
  }
  return arrayOfAnswers;
}

module.exports.randomiseAnswers = randomiseAnswers;
module.exports.makeUpPotentialAnswersArray = makeUpPotentialAnswersArray;
