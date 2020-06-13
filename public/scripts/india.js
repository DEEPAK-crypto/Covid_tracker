console.log("script loaded")
var drop = document.querySelector("#state");
console.log(drop.value)

document.querySelector("#button").addEventListener("click", function() {

    console.log(drop.value);
});