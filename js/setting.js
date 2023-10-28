//人数とカード枚数の初期値
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
    numChangeTrigger = true;
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
var numChangeTrigger = false;
numConf.addEventListener("click", () => {
  //人数変更時に発火
  if (numChangeTrigger) {
    var children = document.querySelectorAll(".playerNameBox");
    for (let i = 0; i < children.length; i++) {
      nameList.removeChild(children[i]);
      playersName.pop();
    }
    numChangeTrigger = false;
  }
  //名前変更inputの生成
  if (!numChangeTrigger) {
    for (let i = 1; i <= playerNum; i++) {
      var nameBox = document.createElement("input");
      nameBox.className = "playerNameBox " + "playerName" + i;
      nameBox.id = "player_" + i;
      nameBox.placeholder = "player" + i;
      playersName.push(nameBox);
      nameList.appendChild(playersName[i - 1]);
    }
  }
  nameChangeBox.style.opacity = "1";
  nameChangeBox.style.zIndex = "100";
  nameChangeBox.style.visibility = "visible";
});
var close = document.getElementById("close");
var nameChangeMark = document.getElementById("nameChangeMark");
close.addEventListener("click", () => {
  var cnt = 0; //名前変更したことを教えるマークの表示設定
  nameChangeBox.style.opacity = "0";
  nameChangeBox.style.zIndex = "0";
  nameChangeBox.style.visibility = "hidden";
  for (let i = 1; i <= playerNum; i++) {
    if (playersName[i - 1].value) {
      cnt++;
      var playerName = playersName[i - 1].value;
      window.localStorage.setItem("playerName" + i, playerName);
    } else {
      var playerName = playersName[i - 1].placeholder;
      window.localStorage.setItem("playerName" + i, playerName);
    }
  }
  if (cnt > 0) {
    nameChangeMark.style.display = "block";
  } else {
    nameChangeMark.style.display = "none";
  }
});
