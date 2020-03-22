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
            </div>
            <p>Card 1 -> ${CardFuncs.TranslatorCard.CardNumero(
              Player[i].Card1
            )} de ${CardFuncs.TranslatorCard.Family(Player[i].Card1)}</p>
            <p>Card 2 -> ${CardFuncs.TranslatorCard.CardNumero(
              Player[i].Card2
            )} de ${CardFuncs.TranslatorCard.Family(Player[i].Card2)}</p>`;
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
    let HandResult = document.createElement("div");
    HandResult.className = "CardHand";
    HandResult.innerHTML = `
            <div>
            <p style="text-align: center;">Result for player ${
              Player[i].name
            }</p>
            <p style="text-align: center;">${CardFuncs.CalculateScore(
              Player[i],
              CardShowTable
            )}</p>
            </div>
            `;
    CardFuncs.addCards(Results, HandResult);
  }
});
