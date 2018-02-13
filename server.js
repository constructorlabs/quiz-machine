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



app.get('/quiz', function(req,res) {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
  .then(function(response){
    return response.json();
  }).then(function(json){
    let data = json.results[0];
    res.render('mainPage', data);
  }).catch(function(error){
    res.status(500).json({ error: 'We failed to fetch the question' });
  });
});


// app.get('/get-next-question', function(req, res) {
//
// })


app.get('/check-answer/:answer', function(req, res) {
  let answer = req.params.answer;
  if (answer === "correct") {
    storage.counter += 1;
    // get client to display counter
    //fetch new question from API
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(function(response){
      return response.json();
    }).then(function(json){
      let data = json.results[0];
      data.counter = storage.counter
      res.json(data);
    }).catch(function(error){
      res.status(500).json({ error: 'We failed to fetch the question' });
    });
  } else if (answer === "wrong") {
    storage.counter = 0;
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(function(response){
      return response.json();
    }).then(function(json){
      let data = json.results[0];
      data.counter = storage.counter
      res.json(data);
    }).catch(function(error){
      res.status(500).json({ error: 'We failed to fetch the question' });
    });
    //do something else
  }
})





//
// app.get('/', function(req, res) {
//   res.render('mainPage', req.body);
// });


// app.get('/get-question', function(req, res) {
//   if (storage.currentQuestion === null) {
//     fetch('https://opentdb.com/api.php?amount=1')
//     .then(function(response){
//       return response.json();
//     }).then(function(data){
//       res.json(data.results[0]);
//     });
//   }
//   else {
//     res.json(storage.currentQuestion);
//   }
// });


//app.post('/answer-question', ...)
//param = answer
//checks if answer is correct
//resets currentQuestion
//ups counter if correct
//resets counter if wrong
//res Yay/Nay + points








// app.post('/', function(req, res) {
//   fetch('https://opentdb.com/api.php?amount=1')
//   .then(function(response){
//     return response.json();
//   }).then(function(json){
//     let data = json.results[0];
//     let question = data.question;
//     res.render('quizViewer', data);
//   }).catch(function(error){
//     res.status(500).json({ error: 'We failed to fetch the question' });
//   });
// })



app.listen(8080, function(){
  console.log('I am listening on port 8080');
});






/// Maybe no longer needed
app.get('/temp', function(req, res) {
  fetch('https://opentdb.com/api.php?amount=1')
  .then(function(response){
    return response.json();
  }).then(function(json){
    let data = json.results[0];
    data.counter = storage.counter
    res.render('quizViewer', data);
  }).catch(function(error){
    res.status(500).json({ error: 'We failed to fetch the question' });
  });
});
