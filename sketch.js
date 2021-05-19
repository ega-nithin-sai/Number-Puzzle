var gameState = 0;

var a00, a01, a02, a10, a11, a12, a20, a21, a22;

var sprites = [
	[a00, a01, a02]
	, [a10, a11, a12]
	, [a20, a21, a22]
];


var positions = [
	[[50, 50], [220, 50], [390, 50]]
	, [[50, 220], [220, 220], [390, 220]]
	, [[50, 390], [220, 390], [390, 390]]
];

// var randomNoArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var randomNoArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var emptyX = 0, emptyY = 0;

var reset;

var finishedImage;

function preload() {
	finishedImage = loadImage("Images/resetImage.png")
}

function setup() {
	createCanvas(600, 600);

	generateButtons();
}

function draw() {
	background(0);

	if (gameState == 1) {
		gameOver();
	}
	fill(255);
	textSize(18);
	text("Instructions: By clicking of the numbers, set them in the correct order.", 25, 30);

	drawSprites();
}

function generateButtons() {
	generateRandomNo();

	var idx = 0;

	for (var a = 0; a < 3; a++) {
		for (var b = 0; b < 3; b++) {
			var lable = randomNoArr[idx];
			if (lable == 9) {
				lable = "";
				emptyX = a;
				emptyY = b;
			}
			var btn = createButton(lable + "", randomNoArr[idx]);

			btn.attribute("myX", a);
			btn.attribute("myY", b);
			btn.style("font-size", "100px");
			btn.style("width", "150px");
			btn.style("height", "150px");
			btn.position(positions[a][b][0], positions[a][b][1]);
			sprites[a][b] = btn;

			btn.mouseClicked(action);
			idx++;

		}
	}
}

function action() {
	if (gameState == 1) return;
	var thisX = this.attribute("myX");
	var thisY = this.attribute("myY");
	var clickedButton = sprites[thisX][thisY];
	var emptyButton = sprites[emptyX][emptyY];

	if (this.value() == 9) {
		return;
	}

	if ((emptyX == thisX && Math.abs(emptyY - thisY) == 1) || (emptyY == thisY && Math.abs(emptyX - thisX) == 1)) {
		//backup curr value
		var currValue = this.value();

		//conver curr to empty
		this.html("");
		this.value(9);

		//make empty to curr
		emptyButton.html(currValue);
		emptyButton.value(currValue);

		//update emptyCX and emptyY
		emptyX = thisX;
		emptyY = thisY;

	}
	validateGameOver()
}

function validateGameOver() {
	var counter = 1;

	nithin: for (var a = 0; a < 3; a++) {
		for (var b = 0; b < 3; b++) {
			if (sprites[a][b].value() != counter) {
				break nithin;
			}
			counter++;
			if (counter == 10) {
				console.log("GAME OVER");
				console.log("CONGRATULATIONS");
				gameState = 1;
			}
		}
	}
}

function generateRandomNo() {
	var doesExist = false;
	var xyz = 0;

	for (var x = 0; x <= 9; x++) {
		do {
			xyz++;
			doesExist = false;
			temp = Math.trunc(random() * 10);
			for (var i = 0; i <= x; i++) {
				if (randomNoArr[i] == temp) {
					doesExist = true;
					break;
				}

			}//end of for loop

			if (!doesExist) {
				randomNoArr[x] = temp;
			}
		} while (doesExist);
	}
}

function gameOver() {
	if (gameState == 1) {
		tint(255, 128);
		imageMode(CENTER);
		image(finishedImage, 275, 275);

		strokeWeight(4);
		stroke("black");
		fill("white");
		textSize(20);
		text("Do You Want To Play Again?", 150, 250);

		reset = createButton("YES");
		reset.position(250, 320);
		reset.style("width", "75px");
		reset.style("height", "25px");
		reset.style("font-size", "16px");
		reset.mousePressed(playAgain);

		for (var a = 0; a < 3; a++) {
			for (var b = 0; b < 3; b++) {
				sprites[a][b].hide();
			}
		}
	}
}

function playAgain() {
	gameState = 0;
	generateButtons();
	this.hide();
}