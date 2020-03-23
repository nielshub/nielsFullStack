//------------------------------------------------------
//Get Poker score with 2 hand cards and the table cards
export const CalculateScore = (Card1, Card2, CardTable) => {
  let ScoreCards = [];
  let ScoreCardsFamily = [];
  let count = {};
  let countF = {};
  let doublepair = 0;
  let doubletrio = 0;
  let poker = 0;
  let rank = [];
  let pair = [];
  let trio = [];
  let full = [];
  let boolLadder = false;
  //Join player ScoreCards hand table ScoreCards
  for (let i = 0; i < CardTable.length + 1; i++) {
    if (i < 5) {
      ScoreCards[i] = TranslatorCard.CardValue(CardTable[i]);
      ScoreCardsFamily[i] = TranslatorCard.FamilyEnglish(CardTable[i]);
    } else {
      ScoreCards[i] = TranslatorCard.CardValue(Card1);
      ScoreCardsFamily[i] = TranslatorCard.FamilyEnglish(Card1);
      ScoreCards[i + 1] = TranslatorCard.CardValue(Card2);
      ScoreCardsFamily[i + 1] = TranslatorCard.FamilyEnglish(Card2);
    }
  }
  //Score para Dobles / Pareja de Dobles / Trio / Poker
  ScoreCards.forEach(function(i) {
    count[i] = (count[i] || 0) + 1;
  });
  let number = Object.keys(count);
  let reps = Object.values(count);
  let highcard = getMaxOfArray(number);
  rank.push(1);
  for (let i = 0; i < number.length; i++) {
    if (reps[i] === 2) {
      rank.push(2);
      if (doublepair === 1) {
        pair[1] = number[i];
        rank.push(3);
      }
      if (doublepair === 2) {
        pair[2] = number[i];
      }
      doublepair++;
      pair[0] = number[i];
    }
    if (reps[i] === 3) {
      rank.push(4);
      if (doubletrio === 1) {
        trio[1] = number[i];
        rank.push(7); // If double trio then has FULL
      }
      doubletrio++;
      trio[0] = number[i];
    }
    if (reps[i] === 4) {
      rank.push(8);
      poker = number[i];
    }
  }
  //if rank has 2 & 4 -> rank becomes 7 (FULL)
  let x = rank.find(x => x === 4);
  let y = rank.find(x => x === 2);
  if (y === 2 && x === 4) {
    rank.push(7);
  }
  //Count Poker Ladder (ScoreCards.Number)
  ScoreCards.sort(function(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });
  ScoreCards.reverse();
  //Check for doubles and discard
  let CardNumbers = ScoreCards.unique();
  const reducer = (accumulator, currentValue, index, array) =>
    accumulator - (currentValue + 1) + array[index - 1];
  //Check only 5 ScoreCards for ladder
  let LadderScore = 0;
  if (CardNumbers.length === 5) {
    let Ladder = CardNumbers.reduce(reducer) - CardNumbers[0];
    if (Ladder === 0) {
      boolLadder = true;
      LadderScore = getMaxOfArray(CardNumbers);
    }
  }
  if (CardNumbers.length === 6) {
    let TopLadder = CardNumbers.slice(0, -1);
    let LowLadder = CardNumbers.slice(1);

    let TLadder = TopLadder.reduce(reducer) - TopLadder[0];
    let LLadder = LowLadder.reduce(reducer) - LowLadder[0];
    if (TLadder === 0 || LLadder === 0) {
      boolLadder = true;
      if (TLadder === 0) {
        LadderScore = getMaxOfArray(TopLadder);
      } else {
        LadderScore = getMaxOfArray(LowLadder);
      }
    }
  }
  if (CardNumbers.length === 7) {
    let TopLadder = CardNumbers.slice(0, -2);
    let MidLadder = CardNumbers.slice(1, -1);
    let LowLadder = CardNumbers.slice(2);

    let TLadder = TopLadder.reduce(reducer) - TopLadder[0];
    let LLadder = LowLadder.reduce(reducer) - LowLadder[0];
    let MLadder = MidLadder.reduce(reducer) - MidLadder[0];
    if (TLadder === 0 || LLadder === 0 || MLadder === 0) {
      boolLadder = true;
      if (TLadder === 0) {
        LadderScore = getMaxOfArray(TopLadder);
      }
      if (MLadder === 0) {
        LadderScore = getMaxOfArray(MidLadder);
      } 
      else {
        LadderScore = getMaxOfArray(LowLadder);
      }
    }
  }
  if (boolLadder) {
    rank.push(5);
  }
  //Count color
  let colorScore = 0;
  ScoreCardsFamily.forEach(function(i) {
    countF[i] = (countF[i] || 0) + 1;
  });
  let numberF = Object.keys(countF);
  let repsF = Object.values(countF);
  if (Math.max(repsF) > 4) {
    rank.push(6);
    colorScore = getMaxOfArray(numberF);
  }
  let ScoreValue = 0;
  switch(getMaxOfArray(rank)){
    case 1: ScoreValue = highcard;
    break;
    case 2: ScoreValue = getMaxOfArray(pair);
    break;
    case 3: ScoreValue = getMaxOfArray(pair);
    break;
    case 4: ScoreValue = getMaxOfArray(trio);
    break;
    case 5: ScoreValue = LadderScore;
    break;
    case 6: ScoreValue = colorScore;
    break;
    case 7: ScoreValue = getMaxOfArray(full.concat(pair,trio));
    break;
    case 8: ScoreValue = poker;
    break;
  }
  let Score = {
    rank: rank,
    ScoreValue: ScoreValue
  }
  return Score
};
//----------------------------------------------------------
//Random number without repeating a card already in the game
export const getRandomInt = (min, max, ArrayOfCards) => {
  let Card = Math.floor(Math.random() * (max - min)) + min;
  while (ArrayOfCards.includes(Card)) {
    Card = Math.floor(Math.random() * (max - min)) + min;
  }
  return Card;
};

//---------------------------------------------
//Translator from random number to a card value
export const TranslatorCard = {
  Family(element) {
    let Familia = Math.trunc(element / 13);
    switch (Familia) {
      case 0:
        Familia = "Rombos";
        break;
      case 1:
        Familia = "Picas";
        break;
      case 2:
        Familia = "Treboles";
        break;
      case 3:
        Familia = "Corazones";
        break;
    }
    return Familia;
  },
  FamilyEnglish(element) {
    let Familia = Math.trunc(element / 13);
    switch (Familia) {
      case 0:
        Familia = "D";
        break;
      case 1:
        Familia = "S";
        break;
      case 2:
        Familia = "C";
        break;
      case 3:
        Familia = "H";
        break;
    }
    return Familia;
  },
  CardNumber(element) {
    let Familia = Math.trunc(element / 13);
    let NumeroCarta = element - Familia * 13;
    switch (NumeroCarta) {
      case 0:
        NumeroCarta = "A";
        break;
      case 1:
        NumeroCarta = "2";
        break;
      case 2:
        NumeroCarta = "3";
        break;
      case 3:
        NumeroCarta = "4";
        break;
      case 4:
        NumeroCarta = "5";
        break;
      case 5:
        NumeroCarta = "6";
        break;
      case 6:
        NumeroCarta = "7";
        break;
      case 7:
        NumeroCarta = "8";
        break;
      case 8:
        NumeroCarta = "9";
        break;
      case 9:
        NumeroCarta = "10";
        break;
      case 10:
        NumeroCarta = "J";
        break;
      case 11:
        NumeroCarta = "Q";
        break;
      case 12:
        NumeroCarta = "K";
        break;
    }
    return NumeroCarta;
  },
  CardNumero(element) {
    let Familia = Math.trunc(element / 13);
    let NumeroCarta = element - Familia * 13;
    switch (NumeroCarta) {
      case 0:
        NumeroCarta = "As";
        break;
      case 1:
        NumeroCarta = "Dos";
        break;
      case 2:
        NumeroCarta = "Tres";
        break;
      case 3:
        NumeroCarta = "Cuatro";
        break;
      case 4:
        NumeroCarta = "Cinco";
        break;
      case 5:
        NumeroCarta = "Seis";
        break;
      case 6:
        NumeroCarta = "Siete";
        break;
      case 7:
        NumeroCarta = "Ocho";
        break;
      case 8:
        NumeroCarta = "Nueve";
        break;
      case 9:
        NumeroCarta = "Diez";
        break;
      case 10:
        NumeroCarta = "J";
        break;
      case 11:
        NumeroCarta = "Q";
        break;
      case 12:
        NumeroCarta = "K";
        break;
    }
    return NumeroCarta;
  },
  CardValue(element) {
    let Familia = Math.trunc(element / 13);
    let NumeroCarta = element - Familia * 13 + 1;
    return NumeroCarta;
  }
};
//---------------------------------------------
//Disable things
const disablebutton = element => {
  this.disabled = true;
};
//---------------------------------------------
//Add childs
export const addCards = (element1, element2) => {
  element1.appendChild(element2);
};
//---------------------------------------------
//Remove childs
export const removeChildren = element => {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
};
//---------------------------------------------
//Get MAX
export const getMaxOfArray = numArray => {
  return Math.max.apply(null, numArray);
};
