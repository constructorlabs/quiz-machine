const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

let currentQuestion = 0;
let score = 0;

app.use(bodyParser.json()); // parse incoming JSON
app.use('/static', express.static('static'));
app.set('view engine', 'hbs'); // use Handlebars as a view engine

app.get("/quiz", function(req,res){
  getQuestion().then(function(questionJson){
    res.render("display-question", questionJson);
  })
  .catch(function(error){
    res.status(500).json({error: "We failed our task"});
  });
});


var getQuestion = function () {
  return new Promise(function(resolve, reject) {
  fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {


      let potentialAnswersArray = [].concat(json.results[0].incorrect_answers);
      potentialAnswersArray.push(json.results[0].correct_answer);

      let optionsToDisplay = randomiseAnswers(potentialAnswersArray);

      potentialAnswersArray.forEach(function(item, index) {
        let miniObject = {};
        miniObject.answer = item;

        if (item == json.results[0].correct_answer) {
          miniObject.correct = true;
        } else {
          miniObject.correct = false;
        }

        potentialAnswersArray[index] = miniObject;

      });

      let question =json.results[0].question;

      console.log('have a question');
      console.log(question);

      let questionJson = {
        question,
        optionsToDisplay,
      };

      resolve(questionJson);
    });
});
}

app.listen(8080, function(){
  console.log("listening on port 8080");
});

app.post("/answer", function(req, res, next){
  console.log("/answer body:", req.body);

  if (req.body.answer) {
    score += 1;
  } else {
    score = 0;
  }


  getQuestion().then(function(question){


    res.json({
      score,
      question,
    });
  });



});




function randomiseAnswers(arrayOfAnswers){
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
