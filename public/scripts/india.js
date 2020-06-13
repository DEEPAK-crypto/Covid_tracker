console.log("script loaded")
var drop = document.querySelector("#exampleFormControlSelect1");
console.log(drop.value)

document.querySelector("#button").addEventListener("click", function() {

    console.log(drop.value);
});