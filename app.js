new Vue({
    el: '#app',
    data: {
        choices: ['scissors', 'paper', 'rock', 'lizard', 'spock'],
        score: 12,
        showRules: false,
        playerChoice: null,
        houseChoice: null,
        result: null
    },
    methods: {
        makeChoice(choice) {
            this.playerChoice = choice;
            this.houseChoice = null;
            this.result = null;

            setTimeout(() => {
                this.houseChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
                this.determineWinner();
            }, 1000);
        },
        determineWinner() {
            const rules = {
                rock: ['scissors', 'lizard'],
                paper: ['rock', 'spock'],
                scissors: ['paper', 'lizard'],
                lizard: ['spock', 'paper'],
                spock: ['scissors', 'rock']
            };

            if (this.playerChoice === this.houseChoice) {
                this.result = "DRAW";
            } else if (rules[this.playerChoice].includes(this.houseChoice)) {
                this.result = "YOU WIN";
                this.score++;
            } else {
                this.result = "YOU LOSE";
                this.score--;
            }
        },
        playAgain() {
            this.playerChoice = null;
            this.houseChoice = null;
            this.result = null;
        },
        toggleRules() {
            this.showRules = !this.showRules;
        }
    }
});
