var flipBtn = document.getElementById("flipBtn");
var flippedCards = [];
var flippedCardsNum = 0;
var getCardNum = 0;
var z_index = 0;
var r = document.getElementById("remaining");
var g = document.getElementById("get");
var cardsNum = window.localStorage.getItem("cardsNum");
var playersNum = window.localStorage.getItem("playersNum");
var finishModal = document.getElementById("finishModal");
var howtoBtn = document.getElementById("howtoBtn");
var howtoModal = document.getElementById("howtoModal");
var closeBtn = document.querySelectorAll("#close");
var retireBtn = document.getElementById("retireBtn");
var retireModal = document.getElementById("retireModal");
var canGet = false;

//ゲームアイテム周辺の設定
var playersField = document.getElementById("playerBox");
var rankField = document.getElementById("rankBox");
var players = [];
var buttons = [];
var pointBoxes = [];
var pointsChar = [];
var ranks = [];
for (let i = 1; i <= playersNum; i++) {
  //プレイヤーの配置
  var player = document.createElement("div");
  player.className = "player " + "player" + i;
  player.id = "player_" + i + "_" + playersNum;
  player.innerText = window.localStorage.getItem("playerName" + i);
  players.push(player);
  playersField.appendChild(players[i - 1]);

  //獲得ボタン
  var playerGetBtn = document.createElement("button");
  playerGetBtn.className = "getBtn";
  playerGetBtn.id = "getBtn" + i;
  playerGetBtn.innerText = "GET!";
  buttons.push(playerGetBtn);
  player.appendChild(buttons[i - 1]);

  //獲得枚数表示ボックス
  var pointBox = document.createElement("div");
  pointBox.className = "getPointNum";
  pointBox.innerText = "獲得: ";
  pointBoxes.push(pointBox);
  player.appendChild(pointBoxes[i - 1]);

  //獲得枚数文字
  var pointChar = document.createElement("span");
  pointChar.id = "myCard" + i;
  pointChar.innerText = "0枚";
  pointsChar.push(pointChar);
  pointBox.appendChild(pointsChar[i - 1]);

  //順位表
  var rankBox = document.createElement("p");
  rankBox.id = "rank" + i;
  rankBox.innerText = i + "位: ";
  ranks.push(rankBox);
  rankField.appendChild(ranks[i - 1]);
  var finalPointBox = document.createElement("span");
  finalPointBox.id = "finalPoint" + i;
  finalPointBox.className = "finalPoint";
  ranks[i - 1].appendChild(finalPointBox);
}

//プレイヤーのindexと獲得ポイントを記録(連想配列)
var playersList = [];
for (let i = 0; i < playersNum; i++) {
  var player = {};
  player.id = i + 1;
  player.point = 0;
  playersList.push(player);
}
console.log(playersList);
//カードの用意
var cardsField = document.getElementById("cardsField");
//裏向きのカードを用意
var card = document.createElement("div");
card.id = "cardR";
cardsField.appendChild(card);
var cardImg = document.createElement("img");
cardImg.src = "../img/back.png";
card.appendChild(cardImg);

//カードの種類を設定
var kinds = [];
var lists = [];
for (let i = 0; i <= 47; i++) {
  lists.push(i);
}
fisherYatesShuffle(lists);

var kind = cardsNum / 5;
if (kind != 48) {
  var rand = Math.floor(Math.random() * lists.length);
  if (rand + kind <= lists.length) {
    for (let i = 0; i < kind; i++) {
      kinds.push(lists[rand + i]);
    }
  } else {
    for (let i = 0; i < kind; i++) {
      kinds.push(lists[rand - i]);
    }
  }
}

//表向きのカードを用意
for (let i = 0; i < kind; i++) {
  for (let j = 0; j < 5; j++) {
    var card = document.createElement("div");
    card.id = "cardF";
    cardsField.appendChild(card);
    var cardImg = document.createElement("img");
    if (kind != 48) {
      cardImg.src = "../img/card" + kinds[i] + ".png";
      console.log(kinds[i]);
    } else {
      cardImg.src = "../img/card" + lists[i] + ".png";
      console.log(lists[i]);
    }
    card.appendChild(cardImg);
  }
}
var unflippedCardsF = document.querySelectorAll("#cardsField #cardF");
var unflippedCardsR = document.getElementById("cardR");
var cards = [];
//カードを格納
for (let i = 0; i < cardsNum; i++) {
  cards.push(unflippedCardsF[i]);
}
fisherYatesShuffle(cards);
r.innerHTML = cards.length;

//順位の初期化
var finalPoints = [];
for (let i = 0; i < playersNum; i++) {
  finalPoints.push(0);
}

var not = 0;
var sum;
//カードをめくる処理
flipBtn.addEventListener("click", () => {
  not++;
  if (not <= kind * 5) {
    canGet = true;
    var targetCard = cards[0];
    flippedCards.push(targetCard);
    targetCard.style.left = "63%";
    targetCard.style.zIndex = z_index;
    z_index++;
    cards.shift();
    flippedCardsNum++;
    getCardNum = flippedCardsNum;
    r.innerText = cards.length;

    //カードの獲得処理
    for (let i = 1; i <= playersNum; i++) {
      buttons[i - 1].addEventListener("click", () => {
        var get = document.getElementById("myCard" + i);
        if (canGet) {
          playersList[i - 1].point = playersList[i - 1].point + getCardNum;
          writeYourCards(get, playersList[i - 1].point);
        }
        writeGetCard(0);
        gotCards();
        canGet = false;

        sum = 0;
        for (let i = 0; i < playersNum; i++) {
          sum += playersList[i].point;
        }
        //ゲーム終了時の処理
        if (sum === kind * 5) {
          finish();
        }
      });

      if (cards.length === 0) {
        unflippedCardsR.style.display = "none";
      }
    }

    g.innerText = flippedCardsNum;
  }
});

//獲得予定カード(めくられた)枚数の書き込み
function writeGetCard(num) {
  flippedCardsNum = 0;
  g.innerText = num;
}
//獲得枚数の書き込み
function writeYourCards(target, getCardNum) {
  target.innerText = getCardNum + "枚";
}
//獲得されたカードの処理
function gotCards() {
  for (let i = 0; i < flippedCards.length; i++) {
    flippedCards[i].style.display = "none";
  }
}

//カードを始めにシャッフル
function fisherYatesShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//モーダルの表示
function modalDisplay(target) {
  target.classList.add("fadeIn");
}
function modalOpacity(target, opacity) {
  if (opacity === 1) {
    target.style.opacity = "1";
    target.style.zIndex = "999";
  } else {
    target.style.opacity = "0";
    target.style.zIndex = "unset";
  }
}

//遊び方の表示
howtoBtn.addEventListener("click", () => {
  modalOpacity(howtoModal, 1);
});
closeBtn[0].addEventListener("click", () => {
  modalOpacity(howtoModal, 0);
});

//ゲーム途中終了
retireBtn.addEventListener("click", () => {
  modalOpacity(retireModal, 1);
});
closeBtn[1].addEventListener("click", () => {
  modalOpacity(retireModal, 0);
});

//ゲーム終了
function finish() {
  playersList.sort(objectSort);
  var rankChar = 1;
  for (let i = 0; i < playersNum; i++) {
    var displayPoint = document.getElementById("finalPoint" + rankChar);
    displayPoint.innerText =
      "player" + playersList[i].id + "(" + playersList[i].point + "枚)";
    rankChar++;
  }
  setTimeout(modalDisplay(finishModal), 1000);
  setTimeout(modalOpacity(finishModal, 1), 1500);

  document.getElementById("fin").addEventListener("click", () => {
    Sessionclear(0);
  });
  document.getElementById("continue").addEventListener("click", () => {
    Sessionclear(0);
  });
}

//プレイヤーのポイント基準の降順ソート
function objectSort(a, b) {
  return b.point - a.point;
}
//sessionの削除
function Sessionclear(jump) {
  window.localStorage.clear();
  if (jump === 1) {
    location.href = "../html/start.html";
  }
}
