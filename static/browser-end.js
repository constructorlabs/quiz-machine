var form = document.getElementById("questionBox");
var answerList = document.getElementsByClassName("answers")

form.addEventListener("submit", sendInfo);

function sendInfo(event){
  event.preventDefault();

  console.log(answerList);
  var isTrue = (checkForSelection() == 'true')

  if(isTrue){
    alert ("correct");
  } else {
    alert ("wrong. Boo");
  }

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
