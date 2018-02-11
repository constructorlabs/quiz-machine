
function makeUpPotentialAnswersArray(objectWithQuestionDetails) {

  let potentialAnswersArray = [].concat(objectWithQuestionDetails.incorrect_answers);
  potentialAnswersArray.push(objectWithQuestionDetails.correct_answer);

  potentialAnswersArray.forEach(function(item, index) {
    let miniObject = {};
    miniObject.answer = item;

    if (item == objectWithQuestionDetails.correct_answer) {
      miniObject.correct = true;
    } else {
      miniObject.correct = false;
    }

    potentialAnswersArray[index] = miniObject;

  });

  return potentialAnswersArray;

}

function randomiseAnswers(arrayOfAnswers) {
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

module.exports.randomiseAnswers = randomiseAnswers;
module.exports.makeUpPotentialAnswersArray = makeUpPotentialAnswersArray;
