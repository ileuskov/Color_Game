//define variables
var numSquares = 12; // default number of squares when starting the website
var colors = generateRandomColors(numSquares); // an array that contains 6 or any given number of elements
var squares = document.querySelectorAll(".square"); // selecting all the squares in one variable
var pickedColor = pickColor(); // variable that stores the picked color (the color that is to be guessed in the game)
var colorDisplay = document.querySelector("#colorDisplay"); // variable that represents the RGB colors that is to be guessed in the headline (h1) of the page
var messageDisplay = document.querySelector("#message"); // variable that stores the text that says "Correct" or "Try again" at the top of the page
var h1 = document.querySelector("h1"); // variable that stores h1
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        modeButtons[2].classList.remove("selected");
        modeButtons[3].classList.remove("selected");
        this.classList.add("selected");

        if(this.textContent === "Easy"){
            numSquares = 3;
        }
        else if (this.textContent === "Hard") {
            numSquares = 6;
        }
        else if (this.textContent === "Extreme") {
            numSquares = 9;
        }
        else {
            numSquares = 12;
        }
        
        reset();
    });
}

function reset(){

        //generate random colors
        colors = generateRandomColors(numSquares);
        //pick a new random color from the array
        pickedColor = pickColor();
        //change colorDisplay to match picked color
        colorDisplay.textContent = pickedColor;
        resetButton.textContent = "New colors";

        messageDisplay.textContent = "";
        //change colors of the squares
        for(var i = 0; i < squares.length; i++){
            if(colors[i]){
                squares[i].style.display = "block";
                squares[i].style.background = colors[i];
            }
            else{
                squares[i].style.display = "none";
            }
        }
        h1.style.background = "steelblue";
};

// easyBtn.addEventListener("click", function(){
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");

//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;

//     for(var i = 0; i < squares.length; i++){
//         if(colors[i]){
//             squares[i].style.background = colors[i];
//         }
//         else{
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click", function(){
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");

//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;

//     for(var i = 0; i < squares.length; i++){
//             squares[i].style.background = colors[i];
//             squares[i].style.display = "block";
//         }
// });


colorDisplay.textContent = pickedColor; // Text that shows which color is to be guessed



resetButton.addEventListener("click", function(){
    reset();
});

// resetButton.addEventListener("click", function(){
//     //generate random colors
//     colors = generateRandomColors(numSquares);
//     //pick a new random color from the array
//     pickedColor = pickColor();
//     //change colorDisplay to match picked color
//     colorDisplay.textContent = pickedColor;

//     messageDisplay.textContent = "";
//     this.textContent = "New colors";
//     //change colors of the squares
//     for(var i = 0; i < squares.length; i++){
//         squares[i].style.backgroundColor = colors[i];
//     }
//     h1.style.background = "steelblue";
// });


//Square management
for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i]; // add colors from the array to the squares on the page in the beginning of the game

    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor; // variable that stores colors of every square

        if(clickedColor === pickedColor){ // if the color of the chosen square is the color that is to be guessed then the game is won
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play again?"
            changeColors(clickedColor); // all the squares turn into the color of the square that was the right one
            h1.style.backgroundColor = clickedColor; // h1 turns into the color that had to be guessed as well
        }
        else{ // if the chosen square colors is not right
            this.style.backgroundColor = "#232323"; // then it "disappears" (turning into the color of the background)
            messageDisplay.textContent = "Try again"; // and we get a messafe at the top: "Try again"
        }
    });
}

// function that changes the colors of all the squares into the color that was to be guessed. This function is called only when the right square is chosen
function changeColors(color) { 
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

// randomly assign a color from the colors array
function pickColor() {
   var random = Math.floor(Math.random()* colors.length);
   return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor())
    }
    return arr;
}

// creating random RGB colors with the help of 3 random numbers that each represent red, green and blue. Then concatenating a correct rgb color in a string and returning this string
function randomColor() {
    var red = Math.floor(Math.random() * 256 );
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    var rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rgb;
}
