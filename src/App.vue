<template>
  <div id="app">
    <div class="game-board">
      <div class="header">
        <div class="logo-container">
          <img src="@/assets/logo-bonus.svg" alt="Rock Paper Scissors Lizard Spock" class="logo">
        </div>
        <div class="score-container">
          <div class="score-board">
            <span>SCORE</span>
            <div class="score">{{ score }}</div>
          </div>
        </div>
      </div>
      <div v-if="!playerChoice" class="choices-pentagon">
        <div v-for="choice in choices" :key="choice.name" class="choice" :class="choice.name" @click="makeChoice(choice)">
          <div class="icon">
            <img :src="require(`@/assets/images/icon-${choice.name}.svg`)" :alt="choice.name">
          </div>
        </div>
      </div>
      <div v-else class="results" :class="{ 'show-winner': showWinner }">
        <div class="choice-container">
          <div class="player-choice">
            <h2>YOU PICKED</h2>
            <div class="choice" :class="playerChoice.name">
              <div class="icon">
                <img :src="require(`@/assets/images/icon-${playerChoice.name}.svg`)" :alt="playerChoice.name">
              </div>
            </div>
          </div>
          <div class="house-choice">
            <h2>THE HOUSE PICKED</h2>
            <div v-if="houseChoice" class="choice" :class="houseChoice.name">
              <div class="icon">
                <img :src="require(`@/assets/images/icon-${houseChoice.name}.svg`)" :alt="houseChoice.name">
              </div>
            </div>
            <div v-else class="placeholder"></div>
          </div>
        </div>
        <div v-if="showWinner" class="result-container">
          <h1>{{ result }}</h1>
          <button @click="playAgain" class="play-again">PLAY AGAIN</button>
        </div>
      </div>
    </div>
    <button class="rules-btn" @click.stop="toggleRules">RULES</button>
    <div class="modal" v-if="showRules" @click.self="toggleRules">
      <div class="modal-content">
        <div class="modal-header">
          <h2>RULES</h2>
          <button class="close-btn" @click="toggleRules">&times;</button>
        </div>
        <img src="@/assets/image-rules-bonus.svg" alt="Game Rules" class="rules-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      choices: [
        { name: 'rock', beats: ['scissors', 'lizard'] },
        { name: 'paper', beats: ['rock', 'spock'] },
        { name: 'scissors', beats: ['paper', 'lizard'] },
        { name: 'lizard', beats: ['spock', 'paper'] },
        { name: 'spock', beats: ['scissors', 'rock'] }
      ],
      score: 0,
      showRules: false,
      playerChoice: null,
      houseChoice: null,
      result: null,
      showWinner: false
    };
  },
  methods: {
    makeChoice(choice) {
      this.playerChoice = choice;
      this.houseChoice = null;
      this.result = null;
      this.showWinner = false;
      setTimeout(() => {
        this.houseChoice = this.aiChoose();
        this.determineWinner();
      }, 1000);
    },
    aiChoose() {
      const randomIndex = Math.floor(Math.random() * this.choices.length);
      return this.choices[randomIndex];
    },
    determineWinner() {
      if (this.playerChoice.name === this.houseChoice.name) {
        this.result = "DRAW";
      } else if (this.playerChoice.beats.includes(this.houseChoice.name)) {
        this.result = "YOU WIN";
        this.score++;
      } else {
        this.result = "YOU LOSE";
        this.score = Math.max(0, this.score - 1);
      }
      this.showWinner = true;
    },
    resetGame() {
      this.playerChoice = null;
      this.houseChoice = null;
      this.result = null;
      this.showWinner = false;
    },
    playAgain() {
      this.resetGame();
    },
    toggleRules() {
      this.showRules = !this.showRules;
    }
  },
  created() {
    this.resetGame();
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.remove("preload");
    }, 500);
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');

:root {
    --scissors-gradient: linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%));
    --paper-gradient: linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%));
    --rock-gradient: linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%));
    --lizard-gradient: linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%));
    --spock-gradient: linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%));
    --dark-text: hsl(229, 25%, 31%);
    --score-text: hsl(229, 64%, 46%);
    --header-outline: hsl(217, 16%, 45%);
    --background: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Barlow Semi Condensed', sans-serif;
    background: var(--background);
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.game-board {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid var(--header-outline);
    border-radius: 15px;
    padding: 1rem 2rem;
    margin-bottom: 4rem;
    min-width: 700px;
    height: 150px;
}

.logo {
    height: 120px;
    align-self: flex-start;
}

.score-board {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 1rem 2rem;
    text-align: center;
    align-self: flex-start;
}

.score-board span {
    color: var(--score-text);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.score {
    color: var(--dark-text);
    font-size: 3rem;
    font-weight: 700;
}

.choices-pentagon {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 400px;
    margin: 0 auto 4rem;
}

.choice {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    box-shadow: 0 5px 0 rgba(0, 0, 0, 0.3);
}

.choice::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 5px 0 rgba(255, 255, 255, 0.3);
}

.choices-pentagon .scissors, .results .scissors { background: var(--scissors-gradient); }
.choices-pentagon .paper, .results .paper { background: var(--paper-gradient); }
.choices-pentagon .rock, .results .rock { background: var(--rock-gradient); }
.choices-pentagon .lizard, .results .lizard { background: var(--lizard-gradient); }
.choices-pentagon .spock, .results .spock { background: var(--spock-gradient); }

.choices-pentagon .scissors { top: 0; left: 50%; transform: translateX(-50%); }
.choices-pentagon .paper { top: 25%; right: 0; }
.choices-pentagon .rock { bottom: 0; right: 15%; }
.choices-pentagon .lizard { bottom: 0; left: 15%; }
.choices-pentagon .spock { top: 25%; left: 0; }

.icon {
    width: 80%;
    height: 80%;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon img {
    width: 50%;
    height: 50%;
}

.rules-btn {
    background-color: transparent;
    border: 1px solid #ffffff;
    color: #ffffff;
    padding: 0.5rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
}

.rules-btn:hover {
    background-color: #ffffff;
    color: var(--dark-text);
}

.choices-pentagon::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background-image: url('~@/assets/bg-pentagon.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    z-index: -1;
}

.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.modal-header h2 {
    color: var(--dark-text);
    text-transform: uppercase;
}

.close-btn {
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: var(--header-outline);
}

.rules-image {
    max-width: 100%;
    height: auto;
}

.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: calc(100vh - 250px);
    width: 100%;
    padding-top: 4rem;
}

.choice-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
}

.player-choice, .house-choice {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.results .choice {
    width: 270px;
    height: 270px;
    margin: 2rem 0;
}

.results .icon {
    width: 200px;
    height: 200px;
}

.result-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
}

.result-container h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    white-space: nowrap;
}

.play-again {
    background-color: #ffffff;
    border: none;
    color: var(--dark-text);
    padding: 1rem 3rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    z-index: 10;
}

.play-again:hover {
    color: hsl(349, 71%, 52%);
}

.placeholder {
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
}

@media (max-width: 768px) {
    body {
        padding: 2rem 1rem;
    }

    .game-board {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header {
        min-width: auto;
        width: 300px;
        padding: 1rem 1.5rem;
        margin-bottom: 3rem;
        border-radius: 8px;
        height: auto;
    }

    .logo {
        height: 60px;
    }

    .score-board {
        padding: 0.5rem 1.5rem;
        border-radius: 5px;
    }

    .score {
        font-size: 2.5rem;
    }

    .choices-pentagon {
        width: 300px;
        height: 300px;
        margin: 0 auto;
    }

    .choices-pentagon .choice {
        width: 110px;
        height: 110px;
    }

    .choices-pentagon .scissors { top: -20px; left: 50%; transform: translateX(-50%); }
    .choices-pentagon .paper { top: 70px; right: -20px; }
    .choices-pentagon .rock { bottom: -20px; right: 20px; }
    .choices-pentagon .lizard { bottom: -20px; left: 20px; }
    .choices-pentagon .spock { top: 70px; left: -20px; }

    .results {
        height: calc(100vh - 250px);
        padding: 1rem;
        margin-top: 0;
        justify-content: flex-start;
    }

    .choice-container {
        margin-top: 7rem;
        padding: 5px;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        max-width: 340px;
    }

    .player-choice, .house-choice {
        flex-direction: column-reverse;
    }

    .player-choice h2, .house-choice h2 {
        margin-top: 4rem;
        margin-left: 0.5rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .results .choice {
        width: 130px;
        height: 130px;
        margin-top: 5rem;
    }

    .results .icon {
        width: 100px;
        height: 100px;
    }

    .result-container {
        position: static;
        transform: none;
        margin-top: 2rem;
    }

    .result-container h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .play-again {
        padding: 0.8rem 2.5rem;
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    .rules-btn {
        position: fixed;
        left: 50%;
        bottom: 2rem;
        transform: translateX(-50%);
    }

    .placeholder {
        width: 130px;
        height: 130px;
    }

    .modal {
        background-color: #ffffff;
    }

    .modal-content {
        background-color: transparent;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 3rem;
    }

    .modal-header h2 {
        color: var(--dark-text);
        font-size: 2rem;
    }

    .close-btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        color: var(--header-outline);
    }

    .rules-image {
        max-width: 100%;
        height: auto;
        margin-bottom: auto;
    }
}
</style>
