//questions, answers, correct answer
const questions = [
    {
        question: "Hello?",
        answers: ["Hi!", "Bye!", "Wow", "Cool"],
        correct: "Hi!"
    },
    {
        question: "Question 2",
        answers: ["1", "2", "3", "4"],
        correct: "2"
    }
]

//high scores
var highScores = [];

//variables
var timer = 50;
var questionCount = 0;

//selectors
//button selectors
var startBtn = document.querySelector("#start-btn");
//container selectors
var introContainerEl = document.querySelector("#intro-container");
var questionContainerEl = document.querySelector("#question-container");
//questions and answers
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
//timer selector
var timerEl = document.querySelector("#timer");

//functions
function startQuiz() {
    //reset the quiz
    timer = 50;
    questionCount = 0;

    //starts the timer and displays the first question
    timerStart();
    firstQuestion();
}

function timerStart() {
    var interval = setInterval(function() {
        if (timer === 0) {
            clearInterval(interval);
            console.log("game over")
            //end game - hide question container - reveal end game screen container
        } else {
            timer = timer - 1;
            timerEl.textContent = timer;
        }
    }, 1000);
}

function firstQuestion() {
    introContainerEl.style.display = "none";
    questionContainerEl.style.display = "block";

    questionCreator();
}

function questionCreator() {
    if (questionCount < questions.length) {
        while (answersEl.firstChild) {
            answersEl.removeChild(answersEl.firstChild);
        }

        questionEl.textContent = questions[questionCount].question;

        for (var i = 0; i < questions[questionCount].answers.length; i++) {
            var answerBtn = document.createElement("button");
            answerBtn.className = "btn answer-btn";
            answerBtn.textContent = questions[questionCount].answers[i];

            answersEl.appendChild(answerBtn);
        }

        questionCount = questionCount + 1;
    }
}

function answerHandler(event) {
    if (event.target.className === "btn answer-btn") {
        var selectedAnswer = event.target.textContent;
        checkAnswer(selectedAnswer);
        questionCreator();
    }
}

function checkAnswer(answer) {
    if (answer !== questions[questionCount - 1].correct) {
        timer = timer - 5;
    }
}

//events
startBtn.addEventListener("click", startQuiz);
//click event for when a question answer is clicked
answersEl.addEventListener("click", answerHandler);
//click event to submit initials
//click event for main menu button
//click event for reset scores button
//click event for high scores in header

//do the initials screen
//display it and hide question container
//get value of initials typed in and save with score (time left) in object in high scores array
//make sure to preventDefault() in the function or the submit will refresh the page

//do the high scores screen
//for loop to display the high scores like used for the answers on the question function
//h2 for "High Scores" and a div for the scores. Also want 2 buttons "Main Menu" and "Reset Scores"

//save and load with local
//look this up online or do later

//reset scores
//highScores array, set it to []

//go to main menu
//reset timer and question count. Hide high scores, display intro container

//go to high scores screen from clicking header
//click event to launch high scores screen when it is clicked