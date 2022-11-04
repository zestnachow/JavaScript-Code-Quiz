// Storing references to retake quiz and clear score buttons
var highScoresDisplay = document.getElementById("high-scores-display");
var retakeBtn = document.getElementById("retake-btn");
var clearBtn = document.getElementById("clear-btn");

// clears local storage and reloads high scores page on button click
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

// relocates to starting page on click
retakeBtn.addEventListener("click", function() {
    window.location.replace("index.html");
})

// retrieves score list from local storage, sorts by descending score, and displays to users in an unordered list
var scoreList = localStorage.getItem("scoreList");
scoreList = JSON.parse(scoreList);
var sortedScoreList = scoreList.sort(function(a, b) {
    return b.userScore-a.userScore;
})
console.log(sortedScoreList);
if (sortedScoreList!== null) { 
    for (var i = 0; i < sortedScoreList.length; i++) {
        var scoreListItem = document.createElement("li");
        scoreListItem.textContent = sortedScoreList[i].initials + " " + sortedScoreList[i].userScore;
        highScoresDisplay.appendChild(scoreListItem);
    }
}