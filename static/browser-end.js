var form = document.getElementById("questionBox");
var answerList = document.getElementsByClassName("answers")

form.addEventListener("submit", sendInfo);

function sendInfo(event){
  event.preventDefault();

  console.log(answerList);
  var isTrue = (checkForSelection() == 'true')




  postData('http://localhost:8080/answer', {answer: isTrue})
    .then(function(data){

      console.log(data)
      console.log(data.question)

      removeSelection();

      document.getElementById("question-text").innerHTML = data.question.question;

      var optionsToDisplayArray = data.question.optionsToDisplay;

      for (let i = 0; i< optionsToDisplayArray.length; i++){
        document.getElementById(`label${i}`).innerHTML = optionsToDisplayArray[i].answer;
        document.getElementById(`answer${i}`).value = optionsToDisplayArray[i].correct;
      }

  }) // JSON from `response.json()` call
    .catch(error => console.error(error))




  if(isTrue){
    console.log("correct");
    // tell the server we have correct answer
    // create a fetch to report the correct answer (increment points and fetch a new question)

    // create a route ON SERVER that will increment the score and fetch another question and return the question in JSON format - simple res.JSON in second then

  } else {
    console.log("wrong. Boo");
  }

}


function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *same-origin
    redirect: 'follow', // *manual, error
    referrer: 'no-referrer', // *client
  })
  .then(response => response.json()
) // parses response to JSON
}


function checkForSelection(){
  var itemValue;

  Array.from(answerList).forEach(function(item){
    if(item.checked){
      console.log(item.value);
      itemValue = item.value;
    }
  });

  return itemValue;
}


function removeSelection(){
  Array.from(answerList).forEach(function(item){
    if(item.checked){
      item.checked = false;
    }
  });
}
