let startBtn = document.getElementById("startbtn");
let strictCheck = document.getElementById("strictCheck");
let strictText = document.getElementById("strictText");
let counter = document.getElementById("counter");
let button1 = document.getElementById("b1");
let button2 = document.getElementById("b2");
let button3 = document.getElementById("b3");
let button4 = document.getElementById("b4");

let sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
let soundbad = new Audio('http://spiritdimension.com/magical-music/soundvarg/vargan-07.mp3');
let soundwin = new Audio('http://www.freesfx.co.uk/rx2/mp3s/2/13930_1459878076.mp3');

class Game {

    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.computerSequence = [];
        this.gameStart = false;
        this.userTurn = false;
        this.updatePlayerSequence = this.updatePlayerSequence;
        this.startGame = this.start;
        this.winAmmount = 20;
    }

    start() {
        if (!this.gameStart) {
            this.gameStart = true;
            counter.innerHTML = this.sequence.length;
            this.plusOne();
        } else if (this.gameStart && this.computerSequence.length === 0) {
            this.restart('h');
        }
    }

    restart(arg) {
        this.sequence = [];
        this.playerSequence = [];
        this.computerSequence = [];
        this.userTurn = false;
        if (arg == 'h') {
            this.gameStart = true;
            counter.innerHTML = this.sequence.length;
            this.plusOne();
        }
    }

    youWin() {
        soundwin.play();
        counter.innerHTML = "You win!";
        this.gameStart = false;
        //this.userTurn = false;
        this.restart();
    }

    plusOne() {
        if (this.gameStart) {
            this.sequence.push(Math.floor((Math.random() * 4)) + 1);
            this.updatePlayerSequence();
            this.computerSequence = this.sequence.slice(0);
            this.playSequence();
        }
    }

    updatePlayerSequence() {
        this.playerSequence = this.sequence.slice(0);
    }

    playSequence() {
        if (this.computerSequence.length != 0 && this.gameStart) {
            let noteToPlay = this.computerSequence.shift()
            let timer = setTimeout(() => {
                this.playNote(noteToPlay);
                this.check("computer");
            }, 1000)

        }
    }

    userPlay(val) {
        if (this.userTurn) {
            if (this.playerSequence[0] === val) {
                this.playNote(val);
                this.playerSequence.shift();
                this.check("player");
            } else {
                this.wrongKey();
            }
        }
    }

    check(arg) {
        if (arg === "player") {
            if (this.playerSequence.length === 0) {
                this.userTurn = !this.userTurn;
                counter.innerHTML = this.sequence.length;
                if (this.sequence.length == this.winAmmount) {
                    this.youWin();
                }
                this.plusOne();
            }
        } else {
            if (this.computerSequence.length === 0) {
                this.userTurn = !this.userTurn;
            } else {
                this.playSequence();
            }
        }

    }

    wrongKey() {
        soundbad.play();
        if (strictCheck.checked) {
            this.restart('h')
        }
        console.log("you suck")
    }




    playNote(val) {

        switch (val) {
            case 1:
                sound1.play();
                button1.style.background = "#4E8C1A"
                setTimeout(function() {
                    button1.style.background = null
                }, 500)
                break;
            case 2:
                sound2.play()
                button2.style.background = "#8a272b"
                setTimeout(function() {
                    button2.style.background = null
                }, 500)
                break;
            case 3:
                sound3.play()
                button3.style.background = "#766c1e"
                setTimeout(function() {
                    button3.style.background = null
                }, 500)
                break;
            case 4:
                sound4.play()
                button4.style.background = "#1e3877"
                setTimeout(function() {
                    button4.style.background = null
                }, 500)
                break;
        }

    }

}

let simon = new Game;


document.addEventListener("DOMContentLoaded", function(event) {

startBtn.onclick = function() {
    simon.startGame()
};
button1.onclick = function() {
    simon.userPlay(1)
};
button2.onclick = function() {
    simon.userPlay(2)
};
button3.onclick = function() {
    simon.userPlay(3)
};
button4.onclick = function() {
    simon.userPlay(4)
};
strictText.onclick = function() {
    strictCheck.checked = !strictCheck.checked;
};





});