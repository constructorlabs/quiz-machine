# Quiz machine

For this weekend weekend project we will create a quiz app. Please implement features from the set below.

- [v] Fork and clone the repo at <https://github.com/constructorlabs/quiz-machine>
- Implement unit tests as part of code and ensure a high code coverage
- App should use a responsive layout and work well at all screen sizes. It should also look fun and appealing
- Avoid external JS libraries. Standard Express support libraries, charting or responsive grid libraries are ok
- Use a Node Express server to fetch data from Open Trivia Database using their API - <https://opentdb.com/api_config.php>
- [v] On initial load it should render a page using node and display the first question
- [v] Subsequent questions should be rendered in browser
- On submit notify user if their answer was correct.
- [v] Each correct answer should increment the score. It's up to you how you want to score answers. You could apply a different score for different difficulty grades. After each correct answer display the next question<br>
  Hint: You can use server-side global variable object to store data
- [v] Reset the score on an incorrect answer
- Gradually increment difficulty level
- It should display same question on refresh
- Allow user to select question category
- [v] Avoid duplicate questions in a single session
- Gracefully handle any errors

Extensions

- Implement an extension of your choosing
- Show the user a 'happy' animated gif on a correct answer and a 'sad' gif on incorrect answer. You can use Giphy or other API to source gifs
- Implement a high score table, which displays names of players with highest scores as well as the time and date of their score
- Display statistics about player performance such as total questions played, average score, most popular category, category with highest percentage of correct etc.

Submission

- Document your solution in a README.md
- Make frequent commits, at least after each feature and push to origin
- Create a pull request after first push
- [v] Don't commit external dependencies. Use .gitignore
- Include your unit test coverage in README.md
