// KEYPRESS=game start --->level 1 + btnflash
let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];

let highScore = localStorage.getItem("highScore") || 0;
let highScoreDisplay = document.querySelector("#highScore");
highScoreDisplay.innerText = highScore;

let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress", function(){
    if(started==false){
    console.log("Game Started");
    started=true;
    levelUp();
}
})
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")},250);
    
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")},250);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {

        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
           document.body.classList.add("gameover");
        // document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function () {
                       document.body.classList.remove("gameover");

            // document.querySelector("body").style.backgroundColor = "white";
            // document.querySelector("body").style.Color = "black";
        }, 150);

        reset();
    }
}


function btnPress(){
    console.log(this);
    // console.log("button was pressed");
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    // console.log(userColor);
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

