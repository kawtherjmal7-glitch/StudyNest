/* =========================================================
   STUDYVIBE - GAME ZONE
   Final games.js
========================================================= */


/* =========================================================
   QUESTIONS
========================================================= */

const questions = [

    {
        question: "Quel mot-clé permet de définir une fonction en Python ?",
        answers: ["function", "def", "func", "define"],
        correct: 1
    },

    {
        question: "Quel type de donnée contient True ou False ?",
        answers: ["String", "Integer", "Boolean", "Float"],
        correct: 2
    },

    {
        question: "Quel symbole est utilisé pour un commentaire en Python ?",
        answers: ["//", "#", "/* */", "<!-- -->"],
        correct: 1
    },

    {
        question: "Que donne 5 + 3 * 2 en Python ?",
        answers: ["16", "11", "13", "10"],
        correct: 1
    },

    {
        question: "Quelle fonction permet d'afficher quelque chose en Python ?",
        answers: ["show()", "display()", "print()", "write()"],
        correct: 2
    },

    {
        question: "Que signifie CPU ?",
        answers: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing User"
        ],
        correct: 0
    },

    {
        question: "Quelle unité mesure la capacité d'une mémoire ?",
        answers: ["Volt", "Ohm", "Octet", "Ampère"],
        correct: 2
    },

    {
        question: "Quel composant stocke les données à long terme ?",
        answers: [
            "RAM",
            "Disque SSD",
            "CPU",
            "Carte graphique"
        ],
        correct: 1
    },

    {
        question: "Que signifie RAM ?",
        answers: [
            "Random Access Memory",
            "Read Access Machine",
            "Rapid Application Memory",
            "Random Application Module"
        ],
        correct: 0
    },

    {
        question: "Quel composant exécute principalement les instructions ?",
        answers: [
            "CPU",
            "Clavier",
            "Écran",
            "Souris"
        ],
        correct: 0
    },

    {
        question: "Combien vaut 2² + 3² ?",
        answers: ["10", "11", "12", "13"],
        correct: 3
    },

    {
        question: "Quelle est la dérivée de x² ?",
        answers: ["x", "2x", "x²", "2"],
        correct: 1
    },

    {
        question: "Si f(x) = 2x + 3, combien vaut f(2) ?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },

    {
        question: "Quelle est la valeur de √49 ?",
        answers: ["6", "7", "8", "9"],
        correct: 1
    },

    {
        question: "Combien vaut 3 × 4 + 2 ?",
        answers: ["14", "20", "18", "12"],
        correct: 0
    },

    {
        question: "Quelle est l'unité SI de la force ?",
        answers: ["Joule", "Newton", "Watt", "Volt"],
        correct: 1
    },

    {
        question: "Quelle est la relation entre vitesse, distance et temps ?",
        answers: [
            "v = d × t",
            "v = d / t",
            "v = t / d",
            "v = d + t"
        ],
        correct: 1
    },

    {
        question: "Quelle est l'unité de la tension électrique ?",
        answers: ["Ampère", "Ohm", "Volt", "Watt"],
        correct: 2
    },

    {
        question: "Quelle est l'unité de la résistance électrique ?",
        answers: ["Volt", "Ohm", "Ampère", "Joule"],
        correct: 1
    },

    {
        question: "Quelle grandeur est mesurée en Ampère ?",
        answers: [
            "Tension",
            "Résistance",
            "Intensité du courant",
            "Puissance"
        ],
        correct: 2
    }

];


/* =========================================================
   GAME VARIABLES
========================================================= */

let currentQuestion = 0;

let score = 0;

let currentGame = "";

let gameQuestions = [];

let timer = 60;

let timerInterval = null;

let selected = false;


/* =========================================================
   GAME SETTINGS
========================================================= */

const gameSettings = {

    quiz: {
        questions: 10,
        time: 60,
        points: 10
    },

    speed: {
        questions: 20,
        time: 30,
        points: 5
    },

    math: {
        questions: 10,
        time: 45,
        points: 15
    },

    daily: {
        questions: 5,
        time: 30,
        points: 20
    }

};


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getGamesPlayed() {

    return Number(
        localStorage.getItem("gamesPlayed") || 0
    );

}


function getTotalScore() {

    return Number(
        localStorage.getItem("totalScore") || 0
    );

}


function getStreak() {

    return Number(
        localStorage.getItem("studyStreak") || 0
    );

}


/* =========================================================
   SAVE GAME RESULT
========================================================= */

function saveGameResult(pointsEarned) {

    let gamesPlayed = getGamesPlayed();

    let totalScore = getTotalScore();

    let streak = getStreak();


    gamesPlayed++;

    totalScore += pointsEarned;

    streak++;


    localStorage.setItem(
        "gamesPlayed",
        gamesPlayed
    );


    localStorage.setItem(
        "totalScore",
        totalScore
    );


    localStorage.setItem(
        "studyStreak",
        streak
    );


    /* Save last game */

    localStorage.setItem(
        "lastGame",
        currentGame
    );


    localStorage.setItem(
        "lastGameScore",
        pointsEarned
    );


    /* Study activities */

    let activities = Number(
        localStorage.getItem("studyActivities") || 0
    );


    activities++;


    localStorage.setItem(
        "studyActivities",
        activities
    );


    /* Achievement system */

    updateAchievements(
        gamesPlayed,
        totalScore,
        activities
    );

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function updateAchievements(
    gamesPlayed,
    totalScore,
    activities
) {

    /* First Step */

    localStorage.setItem(
        "achievement_firstStep",
        "true"
    );


    /* Game Player */

    if (gamesPlayed >= 1) {

        localStorage.setItem(
            "achievement_gamePlayer",
            "true"
        );

    }


    /* Study Master */

    if (activities >= 10) {

        localStorage.setItem(
            "achievement_studyMaster",
            "true"
        );

    }


    /* On Fire */

    if (getStreak() >= 7) {

        localStorage.setItem(
            "achievement_onFire",
            "true"
        );

    }


    /* Champion */

    if (totalScore >= 500) {

        localStorage.setItem(
            "achievement_champion",
            "true"
        );

    }

}


/* =========================================================
   SHUFFLE ARRAY
========================================================= */

function shuffle(array) {

    return array
        .map(value => ({
            value: value,
            sort: Math.random()
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(item => item.value);

}


/* =========================================================
   PREPARE QUESTIONS
========================================================= */

function prepareQuestions() {

    let shuffled =
        shuffle([...questions]);


    let amount =
        gameSettings[currentGame].questions;


    gameQuestions =
        shuffled.slice(
            0,
            Math.min(amount, shuffled.length)
        );

}


/* =========================================================
   START GAME
========================================================= */

function startGame(gameType) {

    currentGame = gameType;

    currentQuestion = 0;

    score = 0;

    selected = false;


    clearInterval(timerInterval);


    timer =
        gameSettings[gameType].time;


    prepareQuestions();


    /* Hide result */

    const resultArea =
        document.getElementById("resultArea");


    if (resultArea) {

        resultArea.classList.add("hidden");

    }


    /* Show game */

    const gameArea =
        document.getElementById("gameArea");


    if (gameArea) {

        gameArea.classList.remove("hidden");

    }


    updateCurrentScore();

    updateTimer();


    showQuestion();


    startTimer();


    /* Scroll */

    if (gameArea) {

        gameArea.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    if (
        currentQuestion >=
        gameQuestions.length
    ) {

        finishGame();

        return;

    }


    selected = false;


    const q =
        gameQuestions[currentQuestion];


    const questionElement =
        document.getElementById("question");


    const numberElement =
        document.getElementById("questionNumber");


    const answersElement =
        document.getElementById("answers");


    if (questionElement) {

        questionElement.textContent =
            q.question;

    }


    if (numberElement) {

        numberElement.textContent =
            "Question " +
            (currentQuestion + 1) +
            " / " +
            gameQuestions.length;

    }


    if (answersElement) {

        answersElement.innerHTML = "";

    }


    q.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement("button");


            button.className =
                "answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function() {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            answersElement.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT ANSWER
========================================================= */

function selectAnswer(
    index,
    button
) {

    if (selected) {

        return;

    }


    selected = true;


    const q =
        gameQuestions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            "#answers .answer"
        );


    /* Show correct answer */

    buttons.forEach(
        function(btn, i) {

            if (i === q.correct) {

                btn.classList.add(
                    "correct"
                );

            }

            btn.disabled = true;

        }
    );


    /* Correct */

    if (index === q.correct) {

        score +=
            gameSettings[currentGame].points;


        button.classList.add(
            "correct"
        );

    }

    /* Wrong */

    else {

        button.classList.add(
            "wrong"
        );

    }


    updateCurrentScore();


    /* Next question */

    setTimeout(
        function() {

            currentQuestion++;

            showQuestion();

        },
        700
    );

}


/* =========================================================
   CURRENT SCORE
========================================================= */

function updateCurrentScore() {

    const scoreElement =
        document.getElementById(
            "currentScore"
        );


    if (scoreElement) {

        scoreElement.textContent =
            score;

    }

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    clearInterval(timerInterval);


    timerInterval =
        setInterval(
            function() {

                timer--;

                updateTimer();


                if (timer <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    finishGame();

                }

            },
            1000
        );

}


/* =========================================================
   UPDATE TIMER
========================================================= */

function updateTimer() {

    const timerElement =
        document.getElementById(
            "timer"
        );


    if (timerElement) {

        timerElement.textContent =
            timer;

    }

}


/* =========================================================
   FINISH GAME
========================================================= */

function finishGame() {

    clearInterval(timerInterval);


    saveGameResult(score);


    /* Hide game */

    const gameArea =
        document.getElementById(
            "gameArea"
        );


    if (gameArea) {

        gameArea.classList.add(
            "hidden"
        );

    }


    /* Show result */

    const resultArea =
        document.getElementById(
            "resultArea"
        );


    if (resultArea) {

        resultArea.classList.remove(
            "hidden"
        );

    }


    /* Final score */

    const finalScore =
        document.getElementById(
            "finalScore"
        );


    if (finalScore) {

        finalScore.textContent =
            score + " points";

    }


    /* Message */

    const message =
        document.getElementById(
            "resultMessage"
        );


    if (message) {

        const maxScore =
            gameQuestions.length *
            gameSettings[currentGame].points;


        const percentage =
            maxScore > 0
                ? (score / maxScore) * 100
                : 0;


        if (percentage >= 90) {

            message.textContent =
                "🌟 Excellent! You're a StudyVibe star!";

        }

        else if (percentage >= 70) {

            message.textContent =
                "👏 Very good! Keep going!";

        }

        else if (percentage >= 50) {

            message.textContent =
                "💪 Good job! You can do even better!";

        }

        else {

            message.textContent =
                "📚 Keep practicing and try again!";

        }

    }


    /* Scroll */

    if (resultArea) {

        resultArea.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   RESTART GAME
========================================================= */

function restartGame() {

    startGame(currentGame);

}


/* =========================================================
   CLOSE GAME
========================================================= */

function closeGame() {

    clearInterval(timerInterval);


    const gameArea =
        document.getElementById(
            "gameArea"
        );


    const resultArea =
        document.getElementById(
            "resultArea"
        );


    if (gameArea) {

        gameArea.classList.add(
            "hidden"
        );

    }


    if (resultArea) {

        resultArea.classList.add(
            "hidden"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   UPDATE GAME PAGE STATS
========================================================= */

function updateGameStats() {

    const totalScore =
        document.getElementById(
            "totalScore"
        );


    const streak =
        document.getElementById(
            "streak"
        );


    const gamesPlayed =
        document.getElementById(
            "gamesPlayed"
        );


    if (totalScore) {

        totalScore.textContent =
            getTotalScore();

    }


    if (streak) {

        streak.textContent =
            getStreak();

    }


    if (gamesPlayed) {

        gamesPlayed.textContent =
            getGamesPlayed();

    }

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateGameStats();

    }
);


/* =========================================================
   UPDATE WHEN RETURNING TO PAGE
========================================================= */

window.addEventListener(
    "focus",
    function() {

        updateGameStats();

    }
);


/* =========================================================
   PREVENT DOUBLE SAVE
========================================================= */

window.addEventListener(
    "beforeunload",
    function() {

        clearInterval(
            timerInterval
        );

    }
);