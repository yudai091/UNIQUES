var playerNum = 4;
var cardsKind = 12;
var playerNumBtn = document.querySelectorAll(".radio-num__input");
var cardNumBtn = document.querySelectorAll(".radio-kind__input");

//プレイヤー人数を設定
for (let i = 0; i < playerNumBtn.length; i++) {
  if (i === 0) {
    window.localStorage.setItem("playersNum", playerNum);
  }
  playerNumBtn[i].addEventListener("change", () => {
    playerNum = document.querySelector(".radio-num__input:checked").value;
    window.localStorage.setItem("playersNum", playerNum);
  });
}

//カードの種類を元に枚数を設定
for (let i = 0; i < cardNumBtn.length; i++) {
  if (i === 0) {
    window.localStorage.setItem("cardsNum", cardsKind * 5);
  }
  cardNumBtn[i].addEventListener("change", () => {
    cardsKind = document.querySelector(".radio-kind__input:checked").value;
    window.localStorage.setItem("cardsNum", cardsKind * 5);
  });
}

//プレイヤーネームの変更
var numConf = document.getElementById("numConf");
var nameChangeBox = document.getElementById("nameChangeBox");
var nameList = document.getElementById("nameList");
var playersName = [];
var created = false;
numConf.addEventListener("click", () => {
  if (created) {
    var children = document.querySelectorAll(".playerNameBox");
    for (let i = 0; i < children.length; i++) {
      nameList.removeChild(children[i]);
    }
    created = false;
  }
  if (!created) {
    for (let i = 1; i <= playerNum; i++) {
      var nameBox = document.createElement("input");
      nameBox.className = "playerNameBox " + "playerName" + i;
      nameBox.id = "player_" + i + "_" + playersName;
      nameBox.placeholder = "player" + i;
      playersName.push(nameBox);
      nameList.appendChild(playersName[i - 1]);
    }
    created = true;
  }
  nameChangeBox.style.opacity = "1";
  nameChangeBox.style.zIndex = "100";
  nameChangeBox.style.visibility = "visible";
});
var close = document.getElementById("close");
close.addEventListener("click", () => {
  nameChangeBox.style.opacity = "0";
  nameChangeBox.style.zIndex = "0";
  nameChangeBox.style.visibility = "hidden";
  for (let i = 1; i <= playerNum; i++) {
    if (playersName[i - 1].value) {
      var playerName = playersName[i - 1].value;
      window.localStorage.setItem("playerName" + i, playerName);
    } else {
      var playerName = playersName[i - 1].placeholder;
      window.localStorage.setItem("playerName" + i, playerName);
    }
    console.log(
      "P" + i + " : " + window.localStorage.getItem("playerName" + i)
    );
  }
});
