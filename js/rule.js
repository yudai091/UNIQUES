var nextBtn1 = document.getElementById("page1NextBtn");
var nextBtn2 = document.getElementById("page2NextBtn");
var nextBtn3 = document.getElementById("page3NextBtn");
var backBtn2 = document.getElementById("page2BackBtn");
var backBtn3 = document.getElementById("page3BackBtn");
var backBtn4 = document.getElementById("page4BackBtn");
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");
var page4 = document.getElementById("page4");
var close = document.getElementById("close");

close.addEventListener("click", () => {
  page1.style.display = "block";
  page2.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
});

nextBtn1.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "block";
});
nextBtn2.addEventListener("click", () => {
  page2.style.display = "none";
  page3.style.display = "block";
});
nextBtn3.addEventListener("click", () => {
  page3.style.display = "none";
  page4.style.display = "block";
});
backBtn2.addEventListener("click", () => {
  page2.style.display = "none";
  page1.style.display = "block";
});
backBtn3.addEventListener("click", () => {
  page3.style.display = "none";
  page2.style.display = "block";
});
backBtn4.addEventListener("click", () => {
  page4.style.display = "none";
  page3.style.display = "block";
});
