var form = document.getElementById("questionBox");
var answerList = document.getElementsByClassName("answers")

form.addEventListener("submit", sendInfo);

function sendInfo(event){
  event.preventDefault();

  console.log(answerList);
  var isTrue = (checkForSelection() == 'true')

  showAndHide(isTrue, function(){
    postData('http://localhost:8080/answer', {answer: isTrue})
      .then(function(data){

        console.log(data);
        console.log(data.question);

        manipulateDomToUpdateQuestion(data);

        }) // JSON from `response.json()` call
      .catch(error => console.error(error))
  })
}

//----------------------------------

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

function show(rightOrWrong){
  if(rightOrWrong){
    document.getElementsByClassName("successGIF")[0].style.display = "block";
  }
  else{
    document.getElementsByClassName("failureGIF")[0].style.display = "block";
  }
}

function hide(rightOrWrong){
  if(rightOrWrong){
    document.getElementsByClassName("successGIF")[0].style.display = "none";
  }
  else{
    document.getElementsByClassName("failureGIF")[0].style.display = "none";
  }
}

function showAndHide(rightOrWrong, callback){
  show(rightOrWrong);
  setTimeout(function(){
    hide(rightOrWrong);
    callback();
  }, 3000);
}



var categoryListenerDiv = document.getElementsByClassName("category")[0];

categoryListenerDiv.addEventListener("click", toggleCatPicker);

function toggleCatPicker(event){
  event.preventDefault();

  var catPickerDiv = document.getElementsByClassName("category-picker")[0];

  var currentVisibility = catPickerDiv.style.display;

  if (catPickerDiv.style.display == "" || catPickerDiv.style.display == "none"){
    catPickerDiv.style.display = "block";
  } else {
    catPickerDiv.style.display = "none";
  }
}


var categoryPickingForm = document.getElementById("category-selection");
var catList = document.getElementsByClassName("cat");

categoryPickingForm.addEventListener("submit", setNewCategory);

function setNewCategory(event){
  event.preventDefault();
  let newCat = checkForSelectionCategory();

  postData("http://localhost:8080/category", {newCat: newCat})
  .then(function(data){

    console.log(data)
    console.log(data.question)

    manipulateDomToUpdateQuestion(data);

    document.getElementsByClassName("category-picker")[0].style.display = "none";

    }) // JSON from `response.json()` call
  .catch(error => console.error(error))
}

function checkForSelectionCategory(){
  var itemValue;

  Array.from(catList).forEach(function(item){
    if(item.selected){
      console.log(item.value);
      itemValue = item.value;
    }
  });

  return itemValue;
}



function manipulateDomToUpdateQuestion(data){

  removeSelection();

  document.getElementById("question-text").innerHTML = data.question.question;

  var optionsToDisplayArray = data.question.optionsToDisplay;

  for (let i = 0; i< optionsToDisplayArray.length; i++){
    document.getElementById(`label${i}`).innerHTML = optionsToDisplayArray[i].answer;
    document.getElementById(`answer${i}`).value = optionsToDisplayArray[i].correct;
  }

  document.getElementById("score-tracker").innerHTML = data.score;
}
