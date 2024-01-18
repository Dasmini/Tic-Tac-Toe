console.log("Lets begin")
let turn = "odd"
let player
let player1Point = 0
let player2Point = 0
let notChecked = 9
let isAllChecked = false

let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

//  [
//    ["X","X","O"],
//    ["X","O","X"],
//    ["O","O","X"]
//  ]

const resultSpace = document.getElementById("result")
const startButton = document.querySelector(".play-button")
startButton.addEventListener("click", startGame)
const box = document.querySelectorAll(".box")


const players = [
    {
        player: "",
        symbol: "O"
    },
    {
        player: "",
        symbol: "X"
    }
]

function startGame() {
    
    const player1 = document.querySelector("#player1").value
    players[0].player = player1
    const player2 = document.querySelector("#player2").value
    players[1].player = player2

    if (player1 && player2) {
        startButton.classList.add("display")
        document.querySelector(".box-container").classList.remove("display-1st")

        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener("click", function () {

                markBoxes(i)

            })
        }
    }
    else if(!player1 || !player2){
        alert("fill the fields")
    }
}

function markBoxes(i) {
    if (turn == "odd") {
        box[i].innerHTML = players[0].symbol
        turn = "even"

    }
    else {
        box[i].innerHTML = players[1].symbol
        turn = "odd"
    }
    updateGameBoard(box[i])
    if (isAllChecked == true) {
        checkStatus()
    }
}

function updateGameBoard(box) {

    let boardCount = 1

    for (row = 0; row < 3; row++) {
        for (column = 0; column < 3; column++) {
            if (box.id == boardCount) {
                if (gameBoard[row][column] == "") {
                    gameBoard[row][column] = box.textContent // should update only the respective index in the array
                    notChecked -= 1
                }

            }
            boardCount += 1

            if (notChecked == 0) {
                isAllChecked = true
            }
        }

    }
    console.log(gameBoard)
}



function checkStatus() {
    checkHorizontal()
    checkVertical()
    checkDiagonal()

    console.log("P1 :", player1Point, ", P2 :", player2Point)
    if (player1Point > player2Point) {
        resultSpace.textContent = players[0].player + " is the winner"
    }
    else if (player2Point > player1Point) {
        resultSpace.textContent = players[1].player + " is the winner"
    }
    else {
        resultSpace.textContent = "Its a tie"
    }

    document.querySelector(".rematch").classList.remove("display-1st")

}

function checkHorizontal() {
    for (let row = 0; row < 3; row++) {
        let countX = 0
        let countY = 0
        for (let column = 0; column < 3; column++) {
            if (gameBoard[row][column] == "X") {
                countX += 1     //check is X is in the whole row
            }
            else if (gameBoard[row][column] == "O") {
                countY += 1     //check is O is in the whole row
            }
        }
        addPoint(countX, countY)

    }
}

function checkVertical() {
    for (let column = 0; column < 3; column++) {
        let countX = 0
        let countY = 0
        for (let row = 0; row < 3; row++) {
            if (gameBoard[row][column] == "X") {
                countX += 1     //check is X is in the whole column
            }
            else if (gameBoard[row][column] == "O") {
                countY += 1     //check is O is in the whole column
            }
        }
        addPoint(countX, countY)
    }
}

function checkDiagonal() {
    let countXDiagonal1 = 0
    let countYDiagonal1 = 0
    let countXDiagonal2 = 0
    let countYDiagonal2 = 0
    for (let i = 0; i < 3; i++) {

        if (gameBoard[i][i] == "X") {
            countXDiagonal1 += 1     //check is X is in the whole row
        }
        else if (gameBoard[i][i] == "O") {
            countYDiagonal1 += 1     //check is O is in the whole row
        }

        if (gameBoard[i][2 - i] == "X") {
            countXDiagonal2 += 1
        }
        else if (gameBoard[i][2 - i] == "O") {
            countYDiagonal2 += 1
        }


        addPoint(countXDiagonal1, countYDiagonal1)
        addPoint(countXDiagonal2, countYDiagonal2)
    }
}

function addPoint(countX, countY) {
    if (countX == 3) {
        player1Point += 1   //if X is in a whole row
    }
    if (countY == 3) {
        player2Point += 1    //if O is in a whole row
    }
}