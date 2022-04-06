var myVar;
let correctAnswersArray = ["eraser", "ruler", "pencil", "book", "pen"];
let correctClicked = [];
let answersfields = document.querySelectorAll(".answer");
let choices = document.querySelectorAll(".choice");
let clickedChoice;
var correctAudio = new Audio("../Windows 7 Error.mp3");
var incorrectAudio = new Audio("../notification.mp3");
let choicesItems = document.querySelector(".choices-items")

function loader() {
    myVar = setTimeout(showContent, 200);
}

function showContent() {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".page-container").style.display = "block";
}
for (const choiceElem of choices) {
    choiceElem.addEventListener("click", clickChoice);
}
for (const answerElem of answersfields) {
    answerElem.addEventListener("click", answerclicked);
}

function addColorToChoices(clickedAnswer) {
    choices.forEach(element => {
        element.classList = "choice"
    });
    clickedAnswer.classList.add("choicecliced")
}

function clickChoice(e) {
    addColorToChoices(e.target)
    clickedChoice = e.target.dataset.elem.trim();
}
var correctImg = document.createElement('img');
correctImg.src = '../img/tikMark-small.png';
var wrongImg = document.createElement('img');
wrongImg.src = '../img/crossMark-small.png';

function answerclicked(e) {
    if (clickedChoice && !correctClicked.includes(clickedChoice)) {
        if (!e.target.innerHTML.includes(123456)) return;
        if (!correctAnswersArray.includes(clickedChoice)) {
            e.target.innerHTML = ` <span class="choice-js">${clickedChoice} </span>`;
            correctAudio.play();
            e.target.appendChild(wrongImg);

            function startBlinking() {
                myInterval2 = setInterval(function() {
                    (function() {
                        wrongImg.style.visibility = "visible";
                        myInterval = setTimeout(function() {
                            wrongImg.style.visibility = "hidden";
                        }, 200);
                    })()
                }, 300);
            }
            startBlinking();
            setTimeout(function() {
                e.target.innerHTML = `<p class="invisible">123456</p>`;
                clearInterval(myInterval);
                clearInterval(myInterval2);
            }, 900);
            return;
        } else {
            correctClicked.push(clickedChoice);
            e.target.innerHTML = ` <span class="choice-js">${clickedChoice} <img src='../img/tikMark-small.png' alt="" /> </span>`;

            incorrectAudio.play();
            removeChoice(clickedChoice)
        }

    }
}

function showAnswers() {
    answersfields.forEach((spanelm, index) => {
        const answerelm = correctAnswersArray[index];
        removeChoice(correctAnswersArray[index]);
        answersfields[
            index
        ].innerHTML = `<span class="choice-js">${answerelm} <i class="bi bi-check-lg text-success"></i></span>`;
    });

}

function removeChoice(elemValue) {
    choices.forEach(element => {
        if (element.textContent == elemValue) {
            element.style.visibility = "hidden"
        }
    });
}

function refresh() {
    for (let index = 0; index < answersfields.length; index++) {
        answersfields[index].innerHTML = `<p class="invisible">123456</p>`;
    }
    for (let q = 0; q < choices.length; q++) {
        choices[q].style.visibility = "visible"
        choices[q].classList = "choice"
    }
    correctClicked = []
}


// base = 8w 6h
// windo= 4/3=> 5/3
function rescaleWindow(e) {

    let clientWidth = 640;
    let clientHeight = 480;
    let pagecontainer = document.querySelector(".page-container");
    const basefraction = clientWidth / clientHeight;
    const windowfraction = window.innerWidth / window.innerHeight;
    if (windowfraction > basefraction) {
        // العرض اكبر فا هنشتغل بنسبه الطول 
        const fraction = window.innerHeight / clientHeight;
        // النسبه اللي اتغير بيها 
        pagecontainer.style.left = `${(window.innerWidth - clientWidth * fraction) / 2
            }px`;
        pagecontainer.style.transform = `scale(${fraction})`;
        console.log(fraction);
        return;
    }
    pagecontainer.style.left = `0px`
    pagecontainer.style.transform = `scale(${window.innerWidth / clientWidth
        })`
}
window.addEventListener("resize", rescaleWindow);
window.addEventListener("load", rescaleWindow);

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}