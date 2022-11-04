// Quiz variables
var score = 0;
var questionsIndex = 0;

// Timer variables
var time = 89;
var pauseInterval = 0;
var incorrectAnswerPenalty = 2;

// References to HTML elements
const welcome = document.querySelector(".welcome");
const startButton = document.querySelector(".start-button");
const quizContainer = document.querySelector(".quiz-container");
const questions = document.querySelector(".questions");
const answers = document.querySelector(".answers");
var timerEl = document.getElementById("timer");
// Question array
const multipleChoiceQuestions = [{
    question: "JavaScript is a(n) ____ language",
    choices: ["A) Object-Based", "B) Assembly", "C) Object-Oriented", "D) High-Level"],
    correct: "A) Object-Based"
},
{
    question: "Which JavaScript method displays a message to the console?",
    choices: ["A) console.write()", "B) console.message()", "C) console.log()", "D) console.output()"],
    correct: "C) console.log()"
}, 
{
    question: "Which of the following symbols denotes the beginning of a single-line comment in JavaScript?",
    choices: ["A) <--", "B) /*", "C) //", "D) ?"],
    correct: "C) //"
},
{
    question: "In JavaScript, 'function' and 'var' are examples of:",
    choices: ["A) reserved keywords", "B) declaration statements", "C) event listeners", "D) prototypes"],
    correct: "A) reserved keywords"
},
{
    question: "Which of the following is a logical operator?",
    choices: ["A) +", "B) -", "C) *", "D) &&"],
    correct: "D) &&"
},
{
    question: "What is the scope level of a variable declared outside the body of any function?",
    choices: ["A) Local", "B) Block", "C) Global", "D) Regional"],
    correct: "C) Global"
},
{
    question: "What is the value of an uninitialized variable?",
    choices: ["A) NaN", "B) undefined", "C) 0", "D) null"],
    correct: "B) undefined"
},
{
    question: "What JavaScript property returns the length of a string?",
    choices: ["A) .length", "B) .size", "C) .stringlength", "D) .strlength"],
    correct: "A) .length"
},
{
    question: "What JavaScript keyword returns the data type of a variable?",
    choices: ["A) type", "B) typeof", "C) datatype", "D) variabletype"],
    correct: "B) typeof"
},
{
    question: "Who initially developed JavaScript?",
    choices: ["A) Rasmus Lerdorf", "B) Bjarne Stroustrup", "C) Brendan Eich", "D) Guido van Rossum"],
    correct: "C) Brendan Eich"
}
]

// Hide quiz elements on initial page load
quizContainer.style.display = "none";
timerEl.setAttribute("display", "none");

function countDown() {
    if (pauseInterval === 0) {
        pauseInterval = setInterval(function() {
            timerEl.textContent = "Time Left: " + time + " seconds";
            time--;
            if (time < 0) {
                clearInterval(pauseInterval);
                timerEl.textContent = "";
                endQuiz();
            }
        }, 1000)
    }
}


function displayQuiz() {
    questions.innerHTML = "";
    answers.innerHTML = "";
    let userQuestion = multipleChoiceQuestions[questionsIndex].question;
    var userAnswers = multipleChoiceQuestions[questionsIndex].choices;
    questions.innerHTML = userQuestion;
    
    userAnswers.forEach(function(nextAnswer) {
        let listItem = document.createElement("li");
        listItem.innerHTML = nextAnswer;
        answers.appendChild(listItem);
        listItem.addEventListener("click", compareAnswers);
    })
}

function compareAnswers(event) {
    let chosen = event.target;
    if (chosen.matches("li")) {
        if (chosen.textContent === multipleChoiceQuestions[questionsIndex].correct) {
            alert("Correct!");
            score+= 10;
        } else {
            alert("Wrong!");
            score-= 2;
        } 
        if (score <= 0) {
            score = 0;
        }
        
        questionsIndex++;
        if (questionsIndex >= multipleChoiceQuestions.length) {
            clearInterval(pauseInterval);
            timerEl.textContent="";
            endQuiz();
        } else {
            displayQuiz();
        }
        
    }
}

function endQuiz() {
    timerEl.setAttribute("display", "none");
    quizContainer.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerHTML = "Quiz Over!";
    quizContainer.appendChild(h1);
    const p = document.createElement("p");
    score+= time;
    p.innerHTML = "Score: " + score;
    quizContainer.appendChild(p);
    const input = document.createElement("input");
    input.type = "text";
    input.textContent = "";
    quizContainer.appendChild(input);
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    quizContainer.appendChild(saveBtn);
    saveBtn.addEventListener("click", function() {
        var initials = input.value;
        if (initials === "") {
            alert("Please enter your initials")
        } else {
            var finalScore = {
                initials: initials,
                userScore: score,
            }
            console.log(finalScore);
            localStorage.setItem("userScore", JSON.stringify(finalScore));
        }
        var scoreList = localStorage.getItem("scoreList")
        if (scoreList === null) {
            scoreList = [];
        } else {
            scoreList = JSON.parse(scoreList)
        }
        scoreList.push(finalScore);
        var updatedScoreList = JSON.stringify(scoreList);
        localStorage.setItem("scoreList", updatedScoreList);
        window.location.replace("highscores.html");
    })
}

startButton.addEventListener("click", function() {
    welcome.style.display = "none";
    quizContainer.style.display = "block";
    timerEl.setAttribute("display", "block");
    timerEl.textContent = "Time Left: 90 seconds";
    countDown();
    displayQuiz();
})

