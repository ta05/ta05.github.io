/*------------------------------------------Timer----------------------------------------------------------------*/

var timeEl = document.getElementById("timer");

var totalSeconds = 100;
var secondsElapsed = 0;
var timerInterval;

function setTime() {
    timerInterval = setInterval(function() {
        secondsElapsed++;
        timeEl.textContent = "Time Remaining: " + (totalSeconds - secondsElapsed);
    
        if(totalSeconds - secondsElapsed <= 0) {
            clearInterval(timerInterval);
            displayResult();
        }

    }, 1000);
}

function clearTimer() {
    var score = Math.max(totalSeconds - secondsElapsed, 0);
    clearInterval(timerInterval);
    timeEl.textContent = "";
    secondsElapsed = 0;
    return score;
}

/*-------------------------------------------Quiz-----------------------------------------------------------------*/

const questions = [
    {
        question: "Commonly used data types do not include",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers"
        },
        correctAnswer: "c"
    },

    {
        question: "The condition of an if statement is enclosed within",
        answers: {
            a: "Parentheses",
            b: "Angular Brackets",
            c: "Curly Brackets",
            d: "Square Brackets"
        },
        correctAnswer: "a"
    },

    {
        question: "Arrays in JavaScript can be used to store _____",
        answers: {
            a: "Numbers",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "d"
    },

    {
        question: "String values must be enclosed within ______ when being assigned to a variable",
        answers: {
            a: "Double Angular Brackets",
            b: "Square Brackets",
            c: "Quotations",
            d: "Commas"
        },
        correctAnswer: "c"
    },

    {
        question: "What Math function is used to round up to the nearest whole number?",
        answers: {
            a: "Math.ceil",
            b: "Math.random",
            c: "Math.max",
            d: "Math.round"
        },
        correctAnswer: "a"
    }
]

var questionBox = document.getElementById("quiz-box");
var startBtn = document.querySelector("button");

var resultEl = document.createElement("p");
var initialsEl = document.createElement("label");
var enterInitialsEl = document.createElement("input");
var nextBtn = document.createElement("button");
var scoreSubmitBtn = document.createElement("button");
var restartBtn = document.createElement("button");

nextBtn.setAttribute("class", "offset-md-11 col-md-1", "id", "next-btn");
nextBtn.textContent = "Next";

scoreSubmitBtn.setAttribute("class", "offset-md-9 col-md-3", "id", "score-submit-btn");
scoreSubmitBtn.textContent = "Submit";

restartBtn.setAttribute("class", "col-md-3", "id", "restart-btn");
restartBtn.textContent = "Restart Quiz";

var prevResult = "";
var userAnswer;
var questionNumber = 0;
var finalScore;



function displayQuestion(questionNumber) {
    var output = [];
    var answerChoices = [];


    for (letter in questions[questionNumber].answers) {
        answerChoices.push(
            '<label>'
            + '<input type="radio" name="question' + questionNumber + '" value="' + letter + '">'
            + letter + '. ' + questions[questionNumber].answers[letter] +
            '</label><br>'
        );
    }

    output.push(
        '<div class="question">' + questions[questionNumber].question + '</div><br>'
        + '<div class="answers">' + answerChoices.join("") + '</div>'
    );

    questionBox.innerHTML = output.join("");
    questionBox.appendChild(nextBtn);
    questionBox.appendChild(resultEl);
}

function checkAnswer(questionNumber, userAnswer) {
    if (questions[questionNumber].correctAnswer === userAnswer)
        prevResult = "Correct";
    else {
        prevResult = "Incorrect";
        secondsElapsed += 10;
    }
    resultEl.textContent = prevResult;
}

function displayResult() {
    finalScore = clearTimer();
    clearBox();
    var finishTitle = document.createElement("h1");
    finishTitle.textContent = "Finish!";

    resultEl.textContent = "Your final score was " + finalScore;

    initialsEl.setAttribute("for", "initials", "class", "col-md-2 col-form-label");
    initialsEl.textContent = "Enter Initials: ";

    enterInitialsEl.setAttribute("type", "text", "name", "initials");
    initialsEl.appendChild(enterInitialsEl);

    initialsEl.appendChild(scoreSubmitBtn);

    questionBox.appendChild(finishTitle);
    questionBox.appendChild(resultEl);
    questionBox.appendChild(initialsEl);
}

function displayHighScores() {
    clearBox();
    headerEl = document.createElement("ol");
    headerEl.textContent = "High Scores";

        scoreEl = document.createElement("li");
        var lastUser = JSON.parse(localStorage.getItem("user"));
        scoreEl.textContent = lastUser.initials + " - " + lastUser.score;
        headerEl.appendChild(scoreEl);
    
    questionBox.appendChild(headerEl);
    questionBox.appendChild(restartBtn);
}

function clearBox() {
    questionBox.innerHTML = "";
}

startBtn.addEventListener("click", function (event) {
    clearBox();
    setTime();
    displayQuestion(questionNumber);
});

restartBtn.addEventListener("click", function (event) {
    questionNumber = 0;
    resultEl.textContent = "";
    clearBox();
    setTime();
    displayQuestion(questionNumber);
});

nextBtn.addEventListener("click", function (event) {
    var selectedAnswer = questionBox.querySelector('input[name=question' + questionNumber + ']:checked');
    if (questionNumber === questions.length - 1) {
        displayResult();
    }
    else {
        userAnswer = selectedAnswer.getAttribute('value');
        checkAnswer(questionNumber, userAnswer);
        questionNumber++;
        displayQuestion(questionNumber);
    }
});

scoreSubmitBtn.addEventListener("click", function (event) {
    var user = {
        initials: enterInitialsEl.value,
        score: finalScore
    };

    localStorage.setItem("user", JSON.stringify(user));
    displayHighScores();
});