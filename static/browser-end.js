var form = document.getElementById("questionBox");
var answerList = document.getElementsByClassName("answers")

form.addEventListener("submit", sendInfo);

function sendInfo(event){
  event.preventDefault();

  console.log(answerList);
  checkForSelection();

  // radio buttons have value checked

}

function checkForSelection(){
  Array.from(answerList).forEach(function(item){
    if(item.checked){
      console.log(item.value);
      console.log(currentQuestion);
      return item.value;
    }
  });
}
