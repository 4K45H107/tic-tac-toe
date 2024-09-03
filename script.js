console.log("Welcome to TicTacToe");

let music = new Audio("resource/music.mp3");
let ting = new Audio("resource/ting.mp3");
let gameover = new Audio("resource/gameover.mp3");
let turn = "X";
let gameEnd = false;
let count = 0;

const changeTurn = () => {
    return turn === "X"? "0":"X";
}

const checkWin = () => {
    let boxText = document.getElementsByClassName("boxtext");
    let wins = [
        [0,1,2,5,5,0], 
        [3,4,5,5,15,0], 
        [6,7,8,5,25,0], 
        [0,3,6,-5,15,90], 
        [1,4,7,5,15,90], 
        [2,5,8,15,15,90],
        [0,4,8,5,15,45], 
        [2,4,6,5,15,135]
    ]

    wins.forEach((win) => {
        if(boxText[win[0]].innerText === boxText[win[1]].innerText 
        && boxText[win[1]].innerText === boxText[win[2]].innerText
        && boxText[win[0]].innerText !== "") {
            document.querySelector('.info').innerText = `Player ${boxText[win[0]].innerText} has won the game`
            gameEnd = true;
            document.querySelector('.imgBox').getElementsByTagName("img")[0].style.width = "180px";
            count = 0;
            document.querySelector(".line").style.width = "20vw"
            document.querySelector(".line").style.transform = `translate(${win[3]}vw, ${win[4]}vw) rotate(${win[5]}deg)`
        }
    })

}

// Game Logic
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector('.boxtext');
    element.addEventListener("click", (e) => {
        if(boxText.innerText === "") {
            count += 1
            if (gameEnd) {
                return;
            }
            ting.play();
            boxText.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameEnd){
                if (count === 9) {
                    document.getElementsByClassName("info")[0].innerText = "Match Drawn";
                    count = 0;
                }
                else {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        }
    });
})

// Reset button event listener 
reset.addEventListener("click", () => {
    let boxText = document.querySelectorAll(".boxtext");
    Array.from(boxText).forEach((element) => {
        element.innerText = "";
    })
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = "Turn for X";
    gameEnd = false;
    document.querySelector('.imgBox').getElementsByTagName("img")[0].style.width = "0px";
    count = 0;
    document.querySelector(".line").style.width = "0"
})