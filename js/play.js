
// this is to actually load the images as well as the elements that would be in the game as well as what would be inserted intop the game.
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const cityImage = new Image();
cityImage.src = "images/City.png";
const groundImage = new Image();
groundImage.src="images/ground.png";
const obstacleImage = new Image();
obstacleImage.src = "images/wooden_box.png";
const obstacleImage2 = new Image();
obstacleImage2.src = "images/traffic_cone.png";
const playerImage = new Image();
playerImage.src = "images/Character.png";
const forestImage = new Image();
forestImage.src = "images/forest.png";
const rockImage = new Image();
rockImage.src = "images/Rock.png";
const logImage = new Image();
logImage.src = "images/bush.png";
const forestgroundImage = new Image();
forestgroundImage.src = "images/forestground.png";
const bushWidth = 100;
const bushHeight = 90;
const bushY = 280;
const lavaImage = new Image();
lavaImage.src = "images/Lava.png";
const lavafloor = new Image();
lavafloor.src = "images/lavafloor.png"
const magmarock = new Image();
magmarock.src = "images/magmarock.png";
const minivolcano = new Image();
minivolcano.src = "images/minivolcano.png";
const jumpSound = new Audio("sounds/jump.mp3");
const gameoverSound = new Audio("sounds/gameover.mp3");
const hitSound = new Audio("sounds/hitSound.mp3");

jumpSound.volume = 0.5;
gameoverSound.volume = 0.5;
hitSound.volume = 0.5;

playerImage.onload = function(){
    drawPlayer();
};

//defining variables such as movement and the assets.
class Player {
    constructor(){
        this.x=100;
        this.y=200;
        this.speed=4;
        this.health=3;
    }

    takeDamage(){
        if(this.health > 0){
            this.health--;
        }
    }

    heal(){
        this.health=3;
    }
}
const player=new Player();
let playerX=100;
let playerY=200;
let isJumping=false;
let velocityY=0;
let gravity=0.5;
let groundY=300;
let obstacleX=500;
let obstacleX2=700;
let movingLeft=false;
let movingRight=false;
let playerSpeed=4;
let normalSpeed=4;
let isSlowed=false;
class ScoreManager{
    constructor(){
        this.score=0;
    }
    addPoints(points){
        this.score+=points;
    }
    reset(){
        this.score=0;
    }
    getScore(){
        return this.score;
    }
}
const scoreManager = new ScoreManager();
let score=0;
let frameCount=0;
let obsticleSpeed=4;
let currentWorld=1;
let currentFrame=0;
let animationCounter=0;
let isMoving=false;
let cityX=0;
let citySpeed=2;
let obstacle1Hit=false;
let obstacle2Hit=false;
let perfectText="";
let perfectTimer=0;
let lastTime=0;
let deltaTime=1;
let minimumGap=120;
let MovingLeft=false;
let MovingRight=false;
let gameStarted=false;
let playerHealth=3;
let gameWon=false;
let scoreSaved=false;


//drawing the player as well as all the assets such as the groubd abd obstacles. and to repeat it as it will look like iots forever when really its just the same pictures goin on forever.
function drawPlayer() {


    if (playerImage.complete && playerImage.naturalWidth > 0) {
        if(!isSlowed || Math.floor(Date.now() / 150) % 2 ===1){        
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(playerImage, currentFrame * 128, 0, 32, 32, playerX, playerY + 50 - 100, 100, 110);
    }
}
//this is for the background for the score and world so that the user is able to see the score and worlds more clearly.
    ctx.fillStyle="#202c45";
    ctx.fillRect(10, 10, 190, 80);
//this one is for the score that is being displayed in game whole running.
    ctx.textAlign="left";
    ctx.fillStyle = "#4970c4";
    ctx.font = "bold 24px monospace";
    ctx.fillText("Score: " + score, 20, 40);
//this is for the world clarification that identifies which world the player is in.
    ctx.fillStyle="#f36ae1db";
    ctx.font = "bold 20px monospace";
    ctx.fillText("World: "  + currentWorld, 20, 70);
    for (let x =0; x < 800; x += 32){
        
        if (currentWorld === 1){
        ctx.drawImage(groundImage, x, 350, 32, 50);
    } 
    else if (currentWorld === 2){
        ctx.drawImage(forestgroundImage, x, 350, 32, 50);
    }
    else if (currentWorld === 3){
        ctx.drawImage(lavafloor, x, 350, 32, 50);
    }
}

//drawing the obstacles.

if (!isSlowed || Math.floor(Date.now() / 150) % 2 ===1){

  if (currentWorld === 1){
    ctx.drawImage(obstacleImage, obstacleX, 310, 50, 55);
    ctx.drawImage(obstacleImage2, obstacleX2, 310, 50, 55);
  }
  else if(currentWorld ==2){
    ctx.drawImage(rockImage, obstacleX, 310, 50, 55);
    ctx.drawImage(logImage, obstacleX2, bushY, bushWidth, bushHeight);
  }
  else if(currentWorld === 3){
    ctx.drawImage(magmarock, obstacleX, 310, 50, 55);
    ctx.drawImage(minivolcano, obstacleX2, 250, 100, 150);
  }
}

}

drawPlayer();

//this function is to make the player jump as well as velocity to stop it from double jumping
function jump(){
    if (isJumping === true) {
        return;
    }

    isJumping = true;
    velocityY = -10;

    new Audio("sounds/jump.mp3").play();
}

// this i sthe collision detection function where this allows the game to know if the player has touched the obstacle.
function checkCollision() {

    // first obstacles for all the worlds.
    if (
        playerX + 10 < obstacleX + 30 &&
        playerX + 30 > obstacleX &&
        playerY < 320 &&
        playerY + 30 > 310
    ) {

        if (!obstacle1Hit) {
            obstacle1Hit = true;

            if(!isSlowed){
            player.takeDamage();
            playerHealth=player.health;

            new Audio("sounds/hitSound.mp3").play();
            }
        }

        if (!isSlowed) {
            isSlowed = true;
            playerSpeed = 2;

            setTimeout(function() {
                playerSpeed = normalSpeed;
                isSlowed = false;
            }, 2000);
        }
    }


    // second obstacles hit boxes for all the worlds.
    if (
        // World 1
        (currentWorld === 1 &&
            playerX + 12 < obstacleX2 + 20 &&
            playerX + 30 > obstacleX2 &&
            playerY < 350 &&
            playerY + 20 > 310
        )

        ||

        // World 2
        (currentWorld === 2 &&
            playerX + 65 > obstacleX2 + 20 &&
            playerX + 35 < obstacleX2 + 80 &&
            playerY + 50 > 330 &&
            playerY - 10 < 350
        )

        ||

        // World 3
        (currentWorld === 3 &&
            playerX + 65 > obstacleX2 + 20 &&
            playerX + 35 < obstacleX2 + 80 &&
            playerY + 50 > 310 &&
            playerY - 10 < 380
        )

    ) {

        if (!obstacle2Hit) {
            obstacle2Hit = true;

            if(!isSlowed){
                player.takeDamage();
                playerHealth=player.health;

                new Audio("sounds/hitSound.mp3").play();

            }
        }

        if (!isSlowed) {
            isSlowed = true;
            playerSpeed = 2;

            setTimeout(function() {
                playerSpeed = normalSpeed;
                isSlowed = false;
            }, 2000);
        }
    }
}

   if (obstacleX2 + 80 < playerX){
        obstacle2Hit = false;
    }


// this is the code where its the input of the code of what each key do such as moving and jumping.
document.addEventListener("keydown", function(event) {
    if (event.key === "d") {
        movingRight=true;
    }

    if (event.key === "a") {
        movingLeft=true;
    }
    if (event.code === "Space") {
        jump();
    }

});


// this is to make sure that when the the user releases the key the player stops moving.
document.addEventListener("keyup", function(event){
    if (event.key === "d") {
        movingRight=false;
    }

    if (event.key === "a"){
        movingLeft=false;
    }
})

// this is to make sure that the player is able to jump smoothly instead of telepoting to the pixels by assing velocity and gravity to the game.
// also adding a animation frame which tells the game to run the animation again for when the player jumps the next time.
function gameLoop(timestamp) {

if (lastTime ===0){
    lastTime = timestamp;
}

deltaTime = Math.min((timestamp - lastTime)/(1000 / 60), 3);
lastTime = timestamp;

//this if statement here is to tell th egame when the players hearts reaches 0 it should be game over display the scpore as well as 
//display the game over screen. it will also save the score so you can see oyur score on the leaderboard if you are able to.
if(playerHealth <=0){
    if(!scoreSaved){
        new Audio("sounds/gameover.mp3").play();
        saveScore();
        scoreSaved=true;
    }
    drawGameOver();
    requestAnimationFrame(gameLoop);
    return;
}

// this if statement is to tell the game to display the game won screen whe nthe game is won and to also ssave oyu score.
if(gameWon){

    if(!scoreSaved){
        scoreSaved=true;
        saveScore();
    }
    drawWinScreen();
    requestAnimationFrame(gameLoop);
    return;
}

// this is to show the start screen on the game when you first click play this is what you will see.
console.log("gamestarted");
if(!gameStarted){
    drawStarterScreen();
    requestAnimationFrame(gameLoop);
    return;
}

// this section is to apply gfravity to the player so the player can fall and also allowing for movement when in the air. as well as disallowing th eplayer from leaving the area.
        velocityY = velocityY + gravity * deltaTime;
    playerY = playerY + velocityY * deltaTime;

    isRunning=movingLeft || movingRight;

    //this if statement s in place to prevent the issue of the score going up even when the player is standing still.
    if(isRunning){
    frameCount = frameCount + 1;
    }


    if (cityX <= -800){
        cityX=0;
    }

    if (playerY >= groundY){
        playerY = groundY;
        velocityY = 0;
        isJumping = false;
    }

    if (movingRight) {
        playerX = playerX + playerSpeed * deltaTime;
    }

    if (movingLeft){
        playerX = playerX - playerSpeed * deltaTime;
    }

    if (playerX < 0){
        playerX =0;
    }

     if(playerX > 300){
        playerX = 300;
    }


    let speedMultiplier = isSlowed? 0.4 : 1;

    if(isRunning){
    obstacleX -= normalSpeed * speedMultiplier * deltaTime;
    obstacleX2 -= normalSpeed * speedMultiplier * deltaTime;
    cityX-=normalSpeed * deltaTime;


    }
    
// this is for points when the player dodges the obstacles perfectly is displays that.
     if (obstacleX < -30) {
        if (obstacle1Hit === false){
            scoreManager.addPoints(10);
            score=scoreManager.getScore();
            perfectText=" +10 Perfect!";
            perfectTimer=60;
        } 
        
        obstacle1Hit = false;
        obstacleX=800 + Math.random() *300;

        if (Math.abs(obstacleX - obstacleX2) < minimumGap){
            obstacleX = Math.max(800, obstacleX2 + minimumGap);
        }

    }

    if (obstacleX2 < -30){
        if (obstacle2Hit === false){
            scoreManager.addPoints(10);
            score=scoreManager.getScore();
            perfectText=" +10 Perfect!";
            perfectTimer=60;
        }
        
        obstacle2Hit = false;
        obstacleX2=800 + Math.random() * 300;

        if(Math.abs(obstacleX2 - obstacleX) < minimumGap){
            obstacleX2 = Math.max(800, obstacleX + minimumGap);
        }
    }
    
    // this is the score system wich increases the players score over time.
    //this if statement is saying that if the player is running and the framecount is 60 then only add a point so it will add a point if only the character is running not standing still .

    if (isRunning && frameCount>=60){
        scoreManager.addPoints(1);
        score=scoreManager.getScore();
        frameCount =0;
    }

    if (score >= 50){
        obsticleSpeed = 3;
    }

    if (score >= 100){
        obsticleSpeed = 4;
    }
//this is for the world switching where if the player gets a certain amount of points they are instantly in the next world.
    if (score >= 150 && currentWorld === 1){
        currentWorld = 2;
        normalSpeed = 6;
        playerSpeed = normalSpeed
       player.heal();
       playerHealth=player.health;
    }

    if (score >= 350 && currentWorld === 2){
        currentWorld = 3;
        normalSpeed = 9;
        playerSpeed = normalSpeed;
        player.heal();
        playerHealth=player.health;
    }

    if (currentWorld === 3 && score >= 600){
        gameWon = true;
    }

    if (isRunning){
        animationCounter+= isSlowed ? deltaTime * 0.4 : deltaTime;

        if(animationCounter >= 8){
            currentFrame++;

            if (currentFrame >= 4){
                currentFrame=0;
            }

            animationCounter=0;
        }

    }else{
        currentFrame=0;
        animationCounter=0;
    }

    checkCollision();

    if (currentWorld === 1){
        drawCity();
    }else if(currentWorld === 2){
        drawForest();
    }
    else if(currentWorld === 3){
        drawVolcano();
    }

    drawPlayer();

    drawPerfectPopup();

    drawHealth();

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
// for the perfect score pop up as bonus points fro perfect evasion.
function drawPerfectPopup(){
    if(perfectTimer > 0){
        ctx.fillStyle = "cream";
        ctx.font = "bold 30px monospace";
        ctx.textAlign = "center";

        ctx.fillText(perfectText, 400, 100);

        perfectTimer--;
    }
}

// starter screen function to show what the the screen will look like.
function drawStarterScreen(){
    ctx.fillStyle="rgba(0, 0, 0.7)";
    ctx.fillRect(0, 0, 800, 400);
    ctx.fillStyle="White";
    ctx.font="40px monospace";
    ctx.textAlign="center";
    ctx.fillText("LAST MILE", 400, 150);
    ctx.font="20px monospace";
    ctx.fillText("Press ENTER to Play", 400, 220);
    ctx.textAlign="left"
}
// this is the key to start the game when it is pressed th eplayer can play the game.
document.addEventListener("keydown", function(event){
    if(event.key==="Enter"){
        gameStarted=true;
    }
// when the game is over the player can press this key to restart the game as well as reply the game when they won the game.
    if(event.key.toLowerCase() === "r" && (playerHealth <=0 || gameWon)){
        restartGame();
    }
})

// this function is to display the amount of hearts the player has left on the screen .
function drawHealth(){
    ctx.fillStyle="red";
    ctx.font="24px monospace";
    ctx.fillText("❤️".repeat(Math.max(0, playerHealth)), 650, 30);
}
// this is to disply the game over screen when th eplayer looses all hteir lives.
function drawGameOver(){
    ctx.fillStyle="rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0,800, 400);
    ctx.fillStyle="White";
    ctx.textAlign="center";
    ctx.font="40px monospace";
    ctx.fillText("Game Over", 400, 150);
    ctx.font="20px monospace";
    ctx.fillText("Final Score: " + score, 400, 200);
    ctx.fillText("Press R to Restart", 400, 250);
    ctx.textAlign="left"; 
}  

// function to restart the game with th ehearts and in th ecity as well as th espeed and the velocity.
function restartGame(){
    player.heal();
    playerHealth=player.health;
    scoreManager.reset();
    score=scoreManager.getScore();
    currentWorld=1;
    playerX=100;
    playerY=groundY;
    velocityY=0;
    obstacleX=800;
    obstacleX2=1100;
    isSlowed=false;
    playerSpeed = normalSpeed;
    obstacle1Hit=false;
    obstacle2Hit=false;
    gameWon=false;
    normalSpeed=4;
    playerSpeed=normalSpeed;
    scoreSaved=false;
}

// this i to draw the win screen when the player has actually won the game.
function drawWinScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 400);
    ctx.fillStyle = "white";
    ctx.font = "bold 35px monospace";
    ctx.textAlign = "center";
    ctx.fillText("YOU WON!", 400, 130);
    ctx.FONT = "20px monospace";
    ctx.fillStyle = "#facc15";
    ctx.fillText("You Have Completed The Last Mile!!", 400, 180);
    ctx.fillStyle = "white";
    ctx.fillText("Final Score: " + score, 400, 230);
    ctx.font = "18px monospace";
    ctx.fillText("Press R to Play Again", 400, 300);
    ctx.textAlign = "left";
}
// this function is to save the games score so that the player is able to view thei scores on the leaderboard.
function saveScore(){
    let scores = JSON.parse(localStorage.getItem("lastMilescores") || "[]");

    let username = localStorage.getItem("loggedInUser") || "Guest";

    scores.push({
        name: username,
        score: score
    });

    localStorage.setItem("lastMilescores", JSON.stringify(scores));
}

// drawing the city function which is the first level of thge game.
function drawCity(){
    if (cityImage.complete && cityImage.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cityImage, cityX, 0, 800, 350);
        ctx.drawImage(cityImage, cityX + 800, 0, 800, 350);
    }
}

// this is the function to draw the forest world and level.
function drawForest(){
    ctx.drawImage(forestImage, cityX, 0, 800, 350);
    ctx.drawImage(forestImage, cityX + 800, 0, 800, 350);
}

//draws the volcano level.
function drawVolcano(){
    ctx.drawImage(lavaImage, cityX, 0, 800, 350);
    ctx.drawImage(lavaImage, cityX + 800, 0, 800, 350);
}
