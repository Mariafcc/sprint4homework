var startButton = document.getElementById("start-bt");
var nextButton = document.getElementById("next-bt");
var questionContainerElement = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEL = document.getElementById("answer-buttons");
var currentQuestionIndex = 0;
var buttons = document.getElementById("buttons");
var time = 60;
var timerId;
var timerEl = document.getElementById("time");
var currentScore = 0;
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var scoreContainer = document.getElementById("score");
var mainCon = document.getElementById("mainContainer");
var scores = [];
var totalCon = document.getElementById("total");

function startGame() {
  currentQuestionIndex = 0;
  console.log("Started");
  buttons.setAttribute("class", "hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  questionContainerElement.removeAttribute("class");
  setNextQuestion();
  timerId = setInterval(function () {
    time--;
    timerEl.innerHTML = time;
    if (time < 0) {
      clearInterval(timerId);
      timerEl.textContent = "";
      alert("Time is up!");
      scoreContainer.style.display = "block";
      mainCon.style.display = "none";
    }
  }, 1000);
  console.log(timerEl);
  setNextQuestion();
}

function setNextQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);
  questionEl.textContent = currentQuestion.question;

  answerButtonsEL.innerHTML = "";

  currentQuestion.choices.forEach(function (choice) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "choice");
    btn.setAttribute("value", choice);
    btn.textContent = choice;
    btn.onclick = checkAnswer;
    answerButtonsEL.appendChild(btn);
  });
}

function checkAnswer() {
  console.log(this.value);
  console.log(questions[currentQuestionIndex]);

  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    console.log(timerEl);
  } else {
    currentScore++;
    answerButtonsEL.textContent = currentScore;
    console.log("correct");
    console.log(currentScore);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    clearInterval(timerId);
    scoreContainer.style.display = "block";
    mainCon.style.display = "none";
  } else {
    setNextQuestion();
  }
  if (currentScore === questions.length) {
    scoreContainer.style.display = "block";
    mainCon.style.display = "none";
  }
}

function highScore() {
  var nameIn = document.getElementById("name").value;
  var storedScores = localStorage.getItem("scores");
  if (storedScores) {
    scores = JSON.parse(storedScores);
  } else scores = [];
  scores.push({ name: nameIn, score: currentScore });
  localStorage.setItem("scores", JSON.stringify(scores));
  var highScoreCon = document.getElementById("highscore");
  highScoreCon.innerHTML = "";
  for (var prop of scores) {
    highScoreCon.innerHTML += "<li>" + prop.name + "  " + prop.score + "</li>";
    console.log(prop);
  }
  scoreContainer.style.display = "none";
  totalCon.style.display = "block";
  // clearInterval(timerId);
}

function clearHighScore() {
  localStorage.removeItem("scores");
  scores = [];
  var highScoreCon = document.getElementById("highscore");
  highScoreCon.innerHTML = "";
}

function resetQuiz() {
  scoreContainer.style.display = "none";
  totalCon.style.display = "none";
  mainCon.style.display = "block";
  // var highScoreCon = document.getElementById("reset");
  // highScoreCon.innerHTML = "";
  document.getElementById("question-container").setAttribute("class", "hide");
  document.getElementById("time").innerHTML = "0";
  document.getElementById("buttons").classList.remove("hide");
  clearInterval(timerId);
  time = 60;
}

var questions = [
  {
    question: "Where is Chicago located?",
    choices: ["Illinois", "Michigan", "Ohio", "Texas"],
    answer: "Illinois",
  },
  {
    question: "Where is Dallas located?",
    choices: ["Illinois", "South Dakota", "Iowa", "Texas"],
    answer: "Texas",
  },
  {
    question: "Where is Los Angeles located?",
    choices: ["Georgia", "Wisconsin", "California", "Texas"],
    answer: "California",
  },
  {
    question: "Where is Las Vegas located?",
    choices: ["Nevada", "Michigan", "Idaho", "Florida"],
    answer: "Nevada",
  },
];

startButton.onclick = startGame;
