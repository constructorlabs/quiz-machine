# QuizThing

A quiz game application - made as a weekend project for week 3 of
[Constructor Labs](https://constructorlabs.com/).

The app presents a series of multiple questions loaded from the [Open Trivia
Database](https://opentdb.com/) API, on the topic of computer programming.
The user must select one and press the _check answer_ button. If it's the
correct answer, the button will change to say _You got it!_ and can be pressed
again to load another question. The user's score is displayed and will go up
by 1 for every question answered. The questions begin at easy difficulty, and
will change to medium and then difficult after each 10 correct answers. The
user has the opportunity to make up to 3 incorrect tries for a 4-answer
question, or 1 try for a 2-answer question. If this limit is reached, the
message _Sorry, you didn't get it_ is displayed and the score reset to 0.

The app is built on the Express webserver framework and responsive CSS is used
to ensure it looks good at desktop and mobile sizes. To run the app, run
`node server.js` in the root directory, then browse to `http://localhost:8080`.
