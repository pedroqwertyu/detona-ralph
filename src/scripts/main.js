const state = {
    view: {
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: null,
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 90,
    }
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        clearInterval(state.values.timerId)
        clearInterval(state.values.countDownTimerId)
        alert("Game Over! Pontuação: " + state.values.result)
    }
}

function playSound(){
    let audio = new Audio("./src/audios/")
    audio.volume = 0.2
    audio.play()
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound()
            }
        })
    })
}

function init(){
    moveEnemy()
    addListenerHitbox()
}

init()
