const welcome = document.querySelector(".welcome");
const startButton = document.querySelector(".start-button");
const quizContainer = document.querySelector(".quiz-container");
const questions = document.querySelector(".questions");
const answers = document.querySelector(".answers");
const multipleChoiceQuestions = [{
    question: "Question 1",
    choices: ["A", "B", "C", "D"],
    correct: "A"
}]
let score = 0;
quizContainer.style.display = "none";



function displayQuiz() {
    questions.innerHTML = "";
    answers.innerHTML = "";
    for (let i = 0; i < multipleChoiceQuestions.length; i++) {
        let userQuestion = multipleChoiceQuestions[i].question;
        var userAnswers = multipleChoiceQuestions[i].choices;
        questions.innerHTML = userQuestion;
    }
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
        if (chosen.textContent === multipleChoiceQuestions[0].correct) {
            console.log("Correct!");
            score++;
        } else {
            console.log("Wrong!");
            score--;
        } 
        if (score <= 0) {
            score = 0;
        }
        console.log(score);
        //displayQuestions();
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerHTML = "Quiz Over!";
    quizContainer.appendChild(h1);
    const p = document.createElement("p");
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
        
    })
}

startButton.addEventListener("click", function() {
    welcome.style.display = "none";
    quizContainer.style.display = "block";
    displayQuiz();
})

