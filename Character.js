import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

function Character(data) {
  Object.assign(this, data);
  this.maxHealth = this.health;

  this.diceHtml = getDicePlaceholderHtml(this.diceCount);

  this.setDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((num) => `<div class="dice"><p class="diceNum">${num}</p></div>`)
      .join("");
  };

  this.takeDamage = function (attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, num) => total + num
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  };

  this.getHealthBarHtml = function () {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${
                      percent < 33 ? "danger" : percent < 66 ? "injured" : ""
                    }" 
                            style="width:${percent}%;">
                    </div>
                </div>`;
  };

  this.getCharacterHtml = function () {
    const { name, avatar, health, diceHtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                ${healthBar}
                <div class="health">health: <b> ${health} </b></div>
                <img class="avatar" src="${avatar}" />
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`;
  };
}

export default Character;
