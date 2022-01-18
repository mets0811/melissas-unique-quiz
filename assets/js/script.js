//questions, answers, correct answer
const questions = [
    {
        question: "What is the capital of USA?",
        answers: ["Florida", "Washington", "Washington DC", "California"],
        correct: "Washington DC"
    },
    {
        question: "How many continents are in the world?",
        answers: ["4", "6", "7", "10"],
        correct: "7"
    },
    {
        question: "How many stars are on the American Flag?",
        answers: ["10", "50", "40", "25"],
        correct: "50"
    }
]

//high scores
var highScores = [];

//variables
var timer = 50;
var questionCount = 0;

//selectors
//start button selector
var startBtn = document.querySelector("#start-btn");
//container selectors
var introContainerEl = document.querySelector("#intro-container");
var questionContainerEl = document.querySelector("#question-container");
var gameoverContainerEl = document.querySelector("#game-over-screen");
var highScoresContainerEl = document.querySelector("#high-scores-screen");
//questions and answers
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
//submit score
var submitScoreEl = document.querySelector("#submit-score");
var scoreSubmitInputEl = document.querySelector("#score-submit-input");
//high scores
var highScoresButtonEl = document.querySelector("#high-scores-button");
var mainMenuBtnEl = document.querySelector("#main-menu-btn");
var resetScoresBtnEl = document.querySelector("#reset-scores-btn");
var scoresContainerEl = document.querySelector("#high-scores-container");
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
        if (highScoresContainerEl.style.display === "block") {
            clearInterval(interval);
            //stops gameOver()
            return;
        }

        if (timer === 0 || questionCount === questions.length) {
            clearInterval(interval);
            gameOver();
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
            var div = document.createElement("div");
            div.textContent = (i + 1) + ". ";
            var answerBtn = document.createElement("button");
            answerBtn.className = "btn answer-btn";
            answerBtn.textContent = questions[questionCount].answers[i];

            div.appendChild(answerBtn);
            answersEl.appendChild(div);
        }
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
    if (answer !== questions[questionCount].correct) {
        timer = timer - 5;
        timerEl.textContent = timer;
    }

    questionCount = questionCount + 1;

    if (questionCount === questions.length) {
        gameOver();
    }
}

function gameOver() {
    questionContainerEl.style.display = "none";
    gameoverContainerEl.style.display = "block";
}

function submitHandler(event) {
    event.preventDefault();
    var initials = scoreSubmitInputEl.value;
    var highScore = {name: initials, score: timer};
    highScores.push(highScore);

    highScoresScreen();
}

function highScoresScreen() {
    scoresBoard();
    introContainerEl.style.display = "none";
    questionContainerEl.style.display = "none";
    gameoverContainerEl.style.display = "none";
    highScoresContainerEl.style.display = "block";

    //resets UI for next quiz attempt
    timerEl.textContent = 50;
}

function mainMenu() {
    highScoresContainerEl.style.display = "none";
    introContainerEl.style.display = "block";
}

function scoresBoard() {
    saveScores();
    while (scoresContainerEl.firstChild) {
        scoresContainerEl.removeChild(scoresContainerEl.firstChild);
    }

    for (var count = 0; count < highScores.length; count++) {
        var scoreDiv = document.createElement("div");
        scoreDiv.className = "score-div";
        scoreDiv.textContent = highScores[count].name + " - " + highScores[count].score;
        scoresContainerEl.appendChild(scoreDiv);
    }
}

function resetScores() {
    highScores = [];
    scoresBoard();
}

function saveScores() {
    highScores.sort(function(x, y) {
        return y.score - x.score;
    });

    highScores = highScores.slice(0, 5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadScores() {
    var savedScores = localStorage.getItem("highScores");

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    highScores = savedScores;
}

//events
startBtn.addEventListener("click", startQuiz);
//click event for when a question answer is clicked
answersEl.addEventListener("click", answerHandler);
//click event to submit initials
submitScoreEl.addEventListener("click", submitHandler);
//click event for main menu button
mainMenuBtnEl.addEventListener("click", mainMenu);
//click event for reset scores button
resetScoresBtnEl.addEventListener("click", resetScores);
//click event for high scores in header
highScoresButtonEl.addEventListener("click", highScoresScreen);

loadScores();