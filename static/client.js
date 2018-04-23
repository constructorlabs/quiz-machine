//a variable which we will use to append the answers
let answerGroup = document.getElementById('formWithAnswers');


//function to shuffle array of answers.
//will be called from displayQuestionAndAnswers()
function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

//function to do DOM manipulation to display question and answers
//calls shuffleArray() to randomly sort array of answers in order to display them in random order
function displayQuestionAndAnswers(displayData) {

  document.getElementById('welcomeHeader').innerHTML = '';
  document.getElementById('rightWrong').innerHTML = '';
  document.getElementById('correctAnswerWhenWrong').innerHTML = '';
  document.getElementById('question').innerHTML = displayData.question;
  document.getElementById('formWithAnswers').innerHTML = '';

  let newCorrect = document.createElement('button');
  newCorrect.setAttribute('id', 'correct');
  newCorrect.setAttribute('class', 'btn btn-lg btn-block')
  newCorrect.innerHTML = displayData.correct_answer;
  //answerGroup.appendChild(newCorrect);

  let newWrong1 = document.createElement('button');
  newWrong1.setAttribute('id', 'wrong');
  newWrong1.setAttribute('class', 'btn btn-lg btn-block')
  newWrong1.innerHTML = displayData.incorrect_answers[0];
  //answerGroup.appendChild(newWrong1);

  let newWrong2 = document.createElement('button');
  newWrong2.setAttribute('id', 'wrong');
  newWrong2.setAttribute('class', 'btn btn-lg btn-block')
  newWrong2.innerHTML = displayData.incorrect_answers[1];
  //answerGroup.appendChild(newWrong2);

  let newWrong3 = document.createElement('button');
  newWrong3.setAttribute('id', 'wrong');
  newWrong3.setAttribute('class', 'btn btn-lg btn-block')
  newWrong3.innerHTML = displayData.incorrect_answers[2];
  //answerGroup.appendChild(newWrong3);

  let answerArray = [newCorrect, newWrong1, newWrong2, newWrong3];
  let shuffledAnswers = shuffleArray(answerArray);

  answerGroup.appendChild(shuffledAnswers[0]);
  answerGroup.appendChild(shuffledAnswers[1]);
  answerGroup.appendChild(shuffledAnswers[2]);
  answerGroup.appendChild(shuffledAnswers[3]);

  document.getElementById('points').innerHTML = "Your score is" + " " + displayData.counter;

 }


//eventListener that listens for clicks on answerbuttons
//calls checkAnswerAndGetNewQuestion()
answerGroup.addEventListener("click", checkAnswerAndGetNewQuestion);



//checks attribute on button clicked
//displays message to user: correct/wrong
//calls server with a fetch request
//server responds with change in point counter and a new data set coming from server fetch from Quiz API
//calls displayQuestionAndAnswers() with new data
function checkAnswerAndGetNewQuestion(event) {
  //listens for submit on buttons with answers
  //fetch from webserver (answer input)
  //if correct answer: 1. fetch request to webserver to up the counter 2.display counter with new points (DOM manipulation) 3. calls server to get next question
  //if wrong answer: 1. fetch request to webserver to reset counter 2.display counter with reset points 3.calls server to get next question
  event.preventDefault();

  console.log(this);

  let answer = event.target;
  if (answer.getAttribute('id') === 'correct') {
    document.getElementById('rightWrong').innerHTML = "CORRECT!";
    //document.getElementById('points').innerHTML = 
    document.getElementById('');
    console.log(document.getElementById('level'));
    fetch('/check-answer/correct')
    .then(function(response){
      return response.json();
    }).then(function(newData){
      setTimeout(function() {displayQuestionAndAnswers(newData);}, 100);
      //displayQuestionAndAnswers(newData);
    })
  }
  else if (answer.getAttribute('id') === 'wrong'){

    document.getElementById('rightWrong').innerHTML = "OH NO! Wrong answer!";
    let shouldHaveAnswered = document.getElementById('correct').innerHTML;
    document.getElementById('correctAnswerWhenWrong').innerHTML = 'The correct answer was: ' + shouldHaveAnswered;
    //document.getElementById('points').innerHTML = "Your score is " + 0;
    document.getElementById('points').innerHTML = "You lost one point";
    fetch('/check-answer/wrong')
    .then(function(response){
      return response.json();
    }).then(function(newData){
      setTimeout(function() {displayQuestionAndAnswers(newData);}, 1000);
      //displayQuestionAndAnswers(newData);
    })
  }

}


let buttons = document.querySelectorAll('.optionFormButton');
console.log(buttons);
buttons.forEach(button => button.addEventListener('click', function(){

  console.log(this.dataset.id);
}));
