var myVar;
let correctAnswersArray = ["eraser", "ruler", "pencil", "book", "pen"];
let correctClicked = [];
let answersfields = document.querySelectorAll(".answer");
let choices = document.querySelectorAll(".choice");
let clickedChoice;
var correctAudio = new Audio("../Windows 7 Error.mp3");
var incorrectAudio = new Audio("../notification.mp3");
let choicesItems = document.querySelector(".choices-items")
var modal = document.getElementById("myModal");
var helpModal = document.getElementById("myhelpModal");
var btn = document.getElementById("myBtn");
var helpBtn = document.getElementById("myBtn2");
var span = document.getElementsByClassName("close")[0];
var correctImg = document.createElement('img');
correctImg.src = '../img/tikMark-small.png';
var wrongImg = document.createElement('img');
wrongImg.src = '../img/crossMark-small.png';
wrongImg.style.width = "20px"
wrongImg.style.height = "20px"

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


function answerclicked(e) {
    if (clickedChoice && !correctClicked.includes(clickedChoice)) {
        if (!e.target.innerHTML.includes(123456)) return;
        if (!correctAnswersArray.includes(clickedChoice)) {
            e.target.innerHTML = ` <span class="addedChoice">${clickedChoice} </span>`;
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
            e.target.innerHTML = ` <span class="addedChoice">${clickedChoice} <img src='../img/tikMark-small.png' alt="" style="width: 20px;
            height: 20px; " /> </span>`;
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
        ].innerHTML = ` <span class="addedChoice" >${answerelm} <img src='../img/tikMark-small.png' style="width: 20px;
        height: 20px; " alt="" /> </span>`
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

function rescaleWindow(e) {
    let contenttWidth = 640;
    let contentHeight = 480;
    let pagecontainer = document.querySelector(".page-container");
    const firstfraction = contenttWidth / contentHeight;
    const windowfraction = window.innerWidth / window.innerHeight;
    if (windowfraction > firstfraction) {
        const fraction = window.innerHeight / contentHeight;
        pagecontainer.style.left = `${(window.innerWidth - contenttWidth * fraction) / 2
            }px`;
        pagecontainer.style.transform = `scale(${fraction})`;
        return;
    }
    pagecontainer.style.left = `0px`
    pagecontainer.style.transform = `scale(${window.innerWidth / contenttWidth
        })`
}
window.addEventListener("resize", rescaleWindow);
window.addEventListener("load", rescaleWindow);
// modal
btn.onclick = function() {
    modal.style.display = "block";
}
helpBtn.onclick = function() {
    helpModal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    helpModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}