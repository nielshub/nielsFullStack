import * as CardFuncs from "./CardFuncs.mjs";

//Added functionality to arrays to remove repeated cards
Array.prototype.unique = (function(a) {
  return function() {
    return this.filter(a);
  };
})(function(a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

//-------------------------------------------------------------
//Code
//Initialize variables and objects from HTML
let form = document.forms[0];
let formCheck = document.forms[1];
let players = document.querySelector('input[name="players"]');
let CardZone = document.querySelector("#CardZone");
let CardTable = document.querySelector("#CardTable");
let checkwinner = document.querySelector("#checkwinner");
let Winner = document.querySelector("#Winner");
let Player = [];
let Cards = [];
let CardShowup = [];
let CardShowTable = [];

class ClassPlayer {
  constructor(name, Cards) {
    this.name = name;
    this.Card1 = CardFuncs.getRandomInt(0, 51, Cards);
    Cards.push(this.Card1);
    this.Card2 = CardFuncs.getRandomInt(0, 51, Cards);
    Cards.push(this.Card2);
    this.Rankscore = 0;
    this.Valuescore = 0;
    this.TotalScore = 0;
  }
  Result(CardShowTable) {
    let Score = CardFuncs.CalculateScore(
      this.Card1,
      this.Card2,
      CardShowTable
    );
    this.Rankscore = CardFuncs.getMaxOfArray(Score.rank);
    this.Valuescore = Score.ScoreValue;
    this.TotalScore = this.Rankscore * 100 + this.Valuescore;
  }
}

class TableCards {
  constructor(name, Cards) {
    this.name = name;
    this.Card = CardFuncs.getRandomInt(0, 51, Cards);
    Cards.push(this.Card);
  }
}

//Clean the table
CardFuncs.removeChildren(CardZone);
CardFuncs.removeChildren(CardTable);

//Players button -> Deal cards to the players & add 5 unshown cards to the table
form.addEventListener("submit", event => {
  event.preventDefault();
  Cards = [];
  let gameplayers = Number(players.value);
  CardFuncs.removeChildren(CardZone);
  CardFuncs.removeChildren(CardTable);
  CardFuncs.removeChildren(Results);
  for (let i = 0; i < gameplayers; i++) {
    Player[i] = new ClassPlayer(i + 1, Cards);
    let CardHand = document.createElement("div");
    CardHand.className = "CardHand";
    CardHand.innerHTML = `
          <p style="text-align: center;">Cards for player ${Player[i].name}</p>
          <div class = "Card2">
                <div class="Card">
                    <img src="cartas/JPEG/${CardFuncs.TranslatorCard.CardNumber(
                      Player[i].Card1
                    )}${CardFuncs.TranslatorCard.FamilyEnglish(
      Player[i].Card1
    )}.jpg"
                    height="150"
                    width="100">
                </div>
                <div class="Card">
                    <img src="cartas/JPEG/${CardFuncs.TranslatorCard.CardNumber(
                      Player[i].Card2
                    )}${CardFuncs.TranslatorCard.FamilyEnglish(
      Player[i].Card2
    )}.jpg"
                    height="150"
                    width="100">
                </div>
            </div>`;
    CardFuncs.addCards(CardZone, CardHand);
  }
  for (let i = 0; i < 5; i++) {
    let CardShowdown = document.createElement("div");
    CardShowdown.className = "CardShowdown";
    CardShowdown.innerHTML = `
            <div>
                <img src="cartas/JPEG/Gray_back.jpg"
                height="250"
                width="150">
            </div>`;
    CardFuncs.addCards(CardTable, CardShowdown);
    CardShowup[i] = new TableCards(i + 1, Cards);
  }
});

//Check button -> Unshow 5 table cards & check the results for each player
formCheck.addEventListener("submit", event => {
  event.preventDefault();
  CardFuncs.removeChildren(CardTable);
  CardFuncs.removeChildren(Results);
  CardFuncs.removeChildren(Winner);
  CardShowTable = [];
  for (let i = 0; i < 5; i++) {
    let CardShow = document.createElement("div");
    CardShow.className = "CardShowdown";
    CardShow.innerHTML = `
            <div>
                    <img src="cartas/JPEG/${CardFuncs.TranslatorCard.CardNumber(
                      CardShowup[i].Card
                    )}${CardFuncs.TranslatorCard.FamilyEnglish(
      CardShowup[i].Card
    )}.jpg"
                    height="250"
                    width="150">
            </div>`;
    CardFuncs.addCards(CardTable, CardShow);
    CardShowTable.push(CardShowup[i].Card);
  }
  for (let i = 0; i < Player.length; i++) {
    Player[i].Result(CardShowTable);
    console.log(Player[i].Rankscore, Player[i].Valuescore, Player[i].TotalScore)
    let HandValue = "";
    switch (Player[i].Rankscore) {
      case 1:
        HandValue = "Highcard";
        break;
      case 2:
        HandValue = "Pair";
        break;
      case 3:
        HandValue = "Double Pair";
        break;
      case 4:
        HandValue = "Trio";
        break;
      case 5:
        HandValue = "Ladder";
        break;
      case 6:
        HandValue = "Color";
        break;
      case 7:
        HandValue = "Full House";
        break;
      case 8:
        HandValue = "Poker";
        break;
    }
    let HandResult = document.createElement("div");
    HandResult.className = "CardHand";
    HandResult.innerHTML = `
            <div>
            <p style="text-align: center;">Result for player ${Player[i].name}</p>
            <p style="text-align: center;">${HandValue}</p>
            </div>
            `;
    CardFuncs.addCards(Results, HandResult);
  }
  const PlayerWinner = Player.reduce(function(prev, current) {
    return prev.TotalScore > current.TotalScore ? prev : current;
  }); 
  let WinnerResult = document.createElement("div");
  WinnerResult.className = "WinnerHand";
  WinnerResult.innerHTML = `
            <div>
            <p style="text-align: center;">Winner is ${PlayerWinner.name}</p>
            <p style="text-align: center;">WINS with a ${PlayerWinner.Rankscore} which has a max Card Value of ${PlayerWinner.Valuescore}</p>
            </div>
            `;
  CardFuncs.addCards(Winner, WinnerResult);
});
