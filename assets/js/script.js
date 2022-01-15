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

/* 
example of targeting the text of a clicked element - for use with answers
document.querySelector("main").addEventListener("click", function() {
    console.log(event.target.textContent)
}) 
*/