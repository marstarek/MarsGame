var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 2000);
}

function showPage() {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".page-container").style.display = "block";
}

function showimg() {
    Swal.fire({
        imageUrl: "../img/p2.png",
        showCloseButton: true,
        imageWidth: 900,
        imageHeight: 500,
        showConfirmButton: false,
        width: 900,
        padding: 2,
    });
}
const correctAnswersArray = ["eraser", "ruler", "pencil", "book", "pen"];
let correctClicked = [];
let answersfields = document.querySelectorAll(".answer");
let choices = document.querySelectorAll(".choice");
let clickedChoice;
var correctaudio = new Audio("../mixkit-electric-fence-fx-2968.wav");

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
        if (!bagArray.includes(clickedChoice)) {
            e.target.innerHTML = ` <span class="addedChoice">${clickedChoice} <i class="bi bi-x-lg text-danger xicon"></i></span>`;
            // var audio = new Audio("../mixkit-electric-fence-fx-2968.wav");
            correctaudio.play();
            let xicon = document.querySelector(".xicon");

            function startBlinking() {
                myInterval2 = setInterval(function() {
                    (function() {
                        xicon.style.visibility = "visible";
                        myInterval = setTimeout(function() {
                            xicon.style.visibility = "hidden";
                        }, 200);
                    })()

                }, 400);
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
            e.target.innerHTML = ` <span class="addedChoice">${clickedChoice} <i class="bi bi-check-lg text-success"></i></span>`;
            var audio = new Audio("../XRZU42L-correct-answer-2.mp3");
            audio.play();
            deleteAnswer(clickedChoice)
        }

    }
}

function deleteAnswer(elemValue) {
    choices.forEach(element => {
        if (element.textContent == elemValue) {
            element.style.visibility = "hidden"
        }
    });
}


let choicesItems = document.querySelector(".choices-items")

function refresh() {
    let answersfields = document.querySelectorAll(".answer");
    for (let index = 0; index < answersfields.length; index++) {
        answersfields[index].innerHTML = `<p class="invisible">123456</p>`;
    }
    for (let q = 0; q < choices.length; q++) {
        choices[q].style.visibility = "visible"
        choices[q].classList = "choice"
    }
    correctClicked = []
}

function showAnswers() {
    let answersfields = document.querySelectorAll(".answer");
    for (let i = 0; i < answersfields.length; i++) {
        answersfields[
            i
        ].innerHTML = `<span class="addedChoice"> <i class="bi bi-check-lg text-success"></i></span>`;
    }
    answersfields.forEach((spanelm, index) => {
        const answerelm = correctAnswersArray[index];
        answersfields[
            index
        ].innerHTML = `<span class="addedChoice">${answerelm} <i class="bi bi-check-lg text-success"></i></span>`;
    });
}




// var eventHandler = () => {
//     let clientWidth = 1280;
//     let clientHeight = 960;
//     let ratio = window.innerHeight / clientHeight;
//     let baseRatio = clientWidth / clientHeight;
//     let windowRatio = window.innerWidth / window.innerHeight;
//     let widthP = window.innerWidth / clientWidth;
//     let heightP = window.innerHeight / clientHeight;
//     if (windowRatio > 4 / 3) {
//         let left = (window.innerWidth - clientWidth * ratio) / 2
//         let content = document.querySelector(".content");
//         let pagecontainer = document.querySelector(".page-container");
//         pagecontainer.style.left = ` ${left}px `
//             // content.style.transform = `scale(${ratio})`
//         pagecontainer.style.transform = `scale(${ratio})`
//     } else {
//         let content = document.querySelector(".content");
//         let pagecontainer = document.querySelector(".page-container");
//         pagecontainer.style.left = `0 `
//         ratio = window.innerWidth / clientWidth
//         pagecontainer.style.transform = `scale(${ratio})`
//     }
// };
// base = 8w 6h
// windo= 4/3=> 5/3
function rescaleWindow(e) {
    let clientWidth = 1280;
    let clientHeight = 960;
    let pagecontainer = document.querySelector(".page-container");
    const baseRatio = clientWidth / clientHeight;
    const windowRatio = window.innerWidth / window.innerHeight;
    if (windowRatio > baseRatio) {
        // العرض اكبر فا هنشتغل بنسبه الطول 
        const ratio = window.innerHeight / clientHeight;
        // النسبه اللي اتغير بيها 
        pagecontainer.style.left = `${(window.innerWidth - clientWidth * ratio) / 2
            }px`;
        pagecontainer.style.transform = `scale(${ratio})`;
        console.log(ratio);
        return;
    }
    pagecontainer.style.left = `0px`
    pagecontainer.style.transform = `scale(${window.innerWidth / clientWidth
        })`
}
window.addEventListener("resize", rescaleWindow);