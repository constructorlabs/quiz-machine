const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

let currentQuestion = 0;

app.use(bodyParser.json()); // parse incoming JSON
app.use('/static', express.static('static'));
app.set('view engine', 'hbs'); // use Handlebars as a view engine

app.get("/quiz", function(req,res){
  fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    let potentialAnswersArray = [].concat(json.results[0].incorrect_answers);
    potentialAnswersArray.push(json.results[0].correct_answer);

    console.log(potentialAnswersArray);
    json.results[0].optionsToDisplay = randomiseAnswers(potentialAnswersArray);

    potentialAnswersArray.forEach(function(item, index){
      console.log(item);
      let miniObject = {};
      miniObject.answer = item;

      if(item == json.results[0].correct_answer){
        miniObject.correct = true;
      } else {
        miniObject.correct = false;
      }

      potentialAnswersArray[index] = miniObject;

    });

    console.log(json.results[0]);

    res.render("display-question", json.results[0]);
  })
  .catch(function(error){
    res.status(500).json({error: "We failed our task"});
  });
});

app.listen(8080, function(){
  console.log("listening on port 8080");
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
