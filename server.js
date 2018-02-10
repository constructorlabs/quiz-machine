const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const storage = {
  counter: 0,
  currentQuestion: null,
}

app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use('/static', express.static('static'));


app.get('/temp', function(req, res) {
  fetch('https://opentdb.com/api.php?amount=1')
  .then(function(response){
    return response.json();
  }).then(function(json){
    let data = json.results[0];
    res.render('quizViewerTemplate', data);
  }).catch(function(error){
    res.status(500).json({ error: 'We failed to fetch the question' });
  });
});

app.get('/', function(req, res) {
  res.render('mainPage', req.body);
});

app.get('/get-question', function(req, res) {
  if (storage.currentQuestion === null) {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(function(response){
      return response.json();
    }).then(function(data){
      res.json(data.results[0]);
      storage.currentQuestion = data.results[0];
    });
  }
  else {
    res.json(storage.currentQuestion);
  }
});

// app.post('/', function(req, res) {
//   fetch('https://opentdb.com/api.php?amount=1')
//   .then(function(response){
//     return response.json();
//   }).then(function(json){
//     let data = json.results[0];
//     let question = data.question;
//     res.render('quizViewerTemplate', data);
//   }).catch(function(error){
//     res.status(500).json({ error: 'We failed to fetch the question' });
//   });
// })



app.listen(8080, function(){
  console.log('I am listening on port 8080');
});
