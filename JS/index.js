import { Home } from "./Home.js";
new Home()

// ! Side Bar 
let left = false;
let navWidth = $(".inner-bar").innerWidth()
$("#sideBar").animate({left: -navWidth},200)
function openSideNav() {
  $("#sideBar").animate({left : -navWidth},500)
  $("#sideBtn").addClass("fa-bars")
  $("#sideBtn").removeClass("fa-xmark")
  for (let i = 0; i < 5; i++) {
    $(".inner-bar div a").eq(i).animate({top : 300},(i+5)*100)
  }
  left = false
}
function closeSideNav() {
  $("#sideBar").animate({left : 0},500)
  $("#sideBtn").removeClass("fa-bars")  
  $("#sideBtn").addClass("fa-xmark")
  for (let i = 0; i < 5; i++) {
    $(".inner-bar div a").eq(i).animate({top : 0},(i+5)*100)
  }
  left = true
}
$("#sideBtn").click(function () {
  if (left) {
    openSideNav()
  } else {
    closeSideNav()
  }
})
