function getNextQuestion() {
  //no params
  //performs fetch to webserver to get json object with question data
  //doesn't return anything
  //calls displayQuestion function with question data
}

getNextQuestion();

function displayQuestion() {
  //param: question data
  //identify question in question data
  //identify answers in question data
  //sort and arrange answers
  //DOM manipulation to display question and answers
  //doesn't return anything
}

function listenForAnswer() {
  //no params
  //event listener
  //listens for submit on radio buttons with answers
  //app post to webserver (answer)
  //if correct answer: 1. post to webserver to up the counter 2.display counter with new points (DOM manipulation) 3. calls getNextQuestion
  //if wrong answer: 1. post to webserver to reset counter 2.calls getNextQuestion
}


fetch('http://localhost:8080/get-question')
.then(function(response){
  return response.json();
}).then(function(data){
  console.log(data);
})




//Possible feature: Get next question-button
// function listenForGetNextQuestion(){
//   //no params
//   //event listener
//   //listens for click on "Get next question button"
//   //doesn't return anything
//   //calls getNextQuestion function to get next question
// }
// listenForGetNextQuestion();
