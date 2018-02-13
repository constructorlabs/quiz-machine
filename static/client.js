let answerGroup = document.getElementById('formWithAnswers');


function displayQuestionAndAnswers(displayData) {
  document.getElementById('welcomeHeader').innerHTML = '';
  document.getElementById('rightWrong').innerHTML = '';
  document.getElementById('question').innerHTML = displayData.question;
  document.getElementById('formWithAnswers').innerHTML = '';

  let newCorrect = document.createElement('button');
  newCorrect.setAttribute('id', 'correct');
  newCorrect.setAttribute('class', 'btn btn-lg btn-block')
  newCorrect.innerHTML = displayData.correct_answer;
  answerGroup.appendChild(newCorrect);

  let newWrong1 = document.createElement('button');
  newWrong1.setAttribute('id', 'wrong');
  newWrong1.setAttribute('class', 'btn btn-lg btn-block')
  newWrong1.innerHTML = displayData.incorrect_answers[0];
  answerGroup.appendChild(newWrong1);

  let newWrong2 = document.createElement('button');
  newWrong2.setAttribute('id', 'wrong');
  newWrong2.setAttribute('class', 'btn btn-lg btn-block')
  newWrong2.innerHTML = displayData.incorrect_answers[1];
  answerGroup.appendChild(newWrong2);

  let newWrong3 = document.createElement('button');
  newWrong3.setAttribute('id', 'wrong');
  newWrong3.setAttribute('class', 'btn btn-lg btn-block')
  newWrong3.innerHTML = displayData.incorrect_answers[2];
  answerGroup.appendChild(newWrong3);

  document.getElementById('points').innerHTML = "Your point score is" + " " + displayData.counter;
 }



answerGroup.addEventListener("click", checkAnswerAndGetNewQuestion);

function checkAnswerAndGetNewQuestion(event) {
  //listens for submit on buttons with answers
  //fetch from webserver (answer input)
  //if correct answer: 1. fetch request to webserver to up the counter 2.display counter with new points (DOM manipulation) 3. calls getNextQuestion
  //if wrong answer: 1. fetch request to webserver to reset counter 2.calls getNextQuestion
  event.preventDefault();

  let answer = event.target;
  if (answer.getAttribute('id') === 'correct') {
    document.getElementById('rightWrong').innerHTML = "CORRECT!";

    fetch('/check-answer/correct')
    .then(function(response){
      return response.json();
    }).then(function(newData){
      //do something
      displayQuestionAndAnswers(newData);
    })
  }
  else if (answer.getAttribute('id') === 'wrong'){
    document.getElementById('rightWrong').innerHTML = "OH NO! Wrong answer!";
    fetch('/check-answer/wrong')
    .then(function(response){
      return response.json();
    }).then(function(data){
      displayQuestionAndAnswers(data);
      //do something
    })
  }

}









//Working fetch

// fetch('http://localhost:8080/get-question')
// .then(function(response){
//   return response.json();
// }).then(function(data){
//   console.log(data);
// })




//Possible feature: Get next question-button
// function listenForGetNextQuestion(){
//   //no params
//   //event listener
//   //listens for click on "Get next question button"
//   //doesn't return anything
//   //calls getNextQuestion function to get next question
// }
// listenForGetNextQuestion();


// function displayQuestionAndAnswers(data) {
//   //param: question data
//   //identify question in question data
//   //identify answers in question data
//   //sort and arrange answers
//   //DOM manipulation to display question and answers
//   //doesn't return anything
//
//
//   console.log(data);
//   questionString = data.question;
//   data['incorrect_answers'].forEach(answer => answerOptionsObject.answer = false;
//   answerOptionsObject.data['correct_answer'] = true;
//   //answerArray.push(data['correct_answer']);
//   console.log(answerOptionsObject);
//
//   let block = document.createElement('div');
//   block.innerHTML = `<h3>${questionString}</h3>`;
//   display.appendChild(block);
//
// }



// function getQuestion() {
//   //no params
//   //performs fetch to webserver to get json object with question data
//   //doesn't return anything
//   //calls displayQuestion function with question data
//   fetch('http://localhost:8080/get-question')
//   .then(function(response){
//     return response.json();
//   }).then(function(data){
//     displayQuestionAndAnswers(data);
//
//   });
// }

//getQuestion();
