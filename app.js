let gameSeq=[];
let userSeq=[];

let btns=["pink","orange","greyish","blue"];

let level=0;
let start=false;
let maxScore=0;


let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(start===false){
        console.log("game started");
        start=true;
        levelUp();
    }
    
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash" );
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash" );
    },250)
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level} `;

    //random button should be flash
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    console.log("Random color generated:",randColor);
    gameSeq.push(randColor);
    console.log("Game Sequence:",gameSeq);
    let randBtn=document.querySelector(`.${randColor}`);
    
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx]==gameSeq[idx]){
        
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
        
    }else{
        h2.innerHTML=`Game Over! Your score was ${level}.<br> Press any key to start.`;
        let body=document.querySelector("body");
        body.classList.add("red");
        setTimeout(function(){
            body.classList.remove("red");
        },200);

        if(maxScore<level){ //for HighScore
            maxScore=level;
        }
        highscore(maxScore);
        reset();
    }
}

function highscore(maxScore){
    let h2=document.createElement("h2");
    h2.innerText=`Your HighScore: ${maxScore}`;
    let div=document.querySelector(".container");
    div.previousElementSibling.appendChild(h2);
}


function btnpress(){
    let btn=this;
    console.log(this);
    let usercolor=btn.getAttribute("id");
    
    userSeq.push(usercolor);
    console.log("User Sequence:",userSeq);

    userFlash(btn);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    start=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}