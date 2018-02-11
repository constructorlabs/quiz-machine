const serverEndFunctions = require('../libs/answerHelpers.js');



test('Randomise Answers', function(){
  const expected = [1, 9, 2, 8, 3, 7, 4, 6, 5] ;
  const result = serverEndFunctions.randomiseAnswers([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  expect(result.length).toEqual(expected.length);

  let expectedSorted = expected.sort((a,b) => a-b);
  let resultSorted = result.sort((a,b) => a-b);

  expect(resultSorted).toEqual(expectedSorted);
});

test("Make Up Potential Answers Array", function(){
  let objectWithQuestionDetails = {
    incorrect_answers : ["black", "blue", "brown"],
    correct_answer : "red"
  }

  let outcomeArray = [
    {answer: "black",
    correct: false},
    {answer: "blue",
    correct: false},
    {answer: "brown",
    correct: false},
    {answer: "red",
    correct: true
    },
  ];

  let result = serverEndFunctions.makeUpPotentialAnswersArray(objectWithQuestionDetails);

  expect(result).toEqual(outcomeArray);

})
