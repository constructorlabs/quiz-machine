const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const answerHelpers = require('./libs/answerHelpers.js');
const makeUpPotentialAnswersArray = answerHelpers.makeUpPotentialAnswersArray;
const randomiseAnswers = answerHelpers.randomiseAnswers;

const categoryOptions = [
  {"id":9,"name":"General Knowledge"},
  {"id":10,"name":"Entertainment: Books"},
  {"id":11,"name":"Entertainment: Film"},
  {"id":12,"name":"Entertainment: Music"},
  {"id":13,"name":"Entertainment: Musicals & Theatres"},
  {"id":14,"name":"Entertainment: Television"},
  {"id":15,"name":"Entertainment: Video Games"},
  {"id":16,"name":"Entertainment: Board Games"},
  {"id":17,"name":"Science & Nature"},
  {"id":18,"name":"Science: Computers"},
  {"id":19,"name":"Science: Mathematics"},
  {"id":20,"name":"Mythology"},
  {"id":21,"name":"Sports"},
  {"id":22,"name":"Geography"},
  {"id":23,"name":"History"},
  {"id":24,"name":"Politics"},
  {"id":25,"name":"Art"},
  {"id":26,"name":"Celebrities"},
  {"id":27,"name":"Animals"},
  {"id":28,"name":"Vehicles"},
  {"id":29,"name":"Entertainment: Comics"},
  {"id":30,"name":"Science: Gadgets"},
  {"id":31,"name":"Entertainment: Japanese Anime & Manga"},
  {"id":32,"name":"Entertainment: Cartoon & Animations"}];


let score = 0;
let seenQuestions = [];
let questionMemory;
let questionDifficulty = "easy"
let currentCategory = 9;
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
          error: "We're sorry. Something is broken."
        });
      });
    }
});


var getQuestion = function() {
  return new Promise(function(resolve, reject) {
    if (score <= 10){
      questionDifficulty = "easy";
    }
    else if (score <= 20){
      questionDifficulty = "medium";
    }
    else {
      questionDifficulty = "hard";
    }

    fetch(`https://opentdb.com/api.php?amount=1&category=${currentCategory}&difficulty=${questionDifficulty}&type=multiple`)
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
            categoryOptions,
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
    console.log(score);
    res.json({
      score,
      question,
    });
  });
});

app.post("/category", function(req,res){
  console.log(req.body.newCat);
  currentCategory = req.body.newCat;

  getQuestion().then(function(question) {
    console.log(score);
    res.json({
      score,
      question,
    });
  });

})
