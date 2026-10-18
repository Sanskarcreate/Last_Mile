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

playerImage.onload = function(){
    drawPlayer();
};

//defining variables such as movement and the assets.
let playerX=100;
let playerY=200;
let isJumping=false;
let velocityY=0;
let gravity=0.6;
let groundY=300;
let obstacleX=500;
let obstacleX2=700;
let movingLeft=false;
let movingRight=false;
let playerSpeed=4;
let normalSpeed=4;
let isSlowed=false;
let score=0;
let frameCount=0;
let obsticleSpeed=2;
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



function drawCity(){
    if (cityImage.complete && cityImage.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cityImage, cityX, 0, 800, 350);
        ctx.drawImage(cityImage, cityX + 800, 0, 800, 350);
    }
}


//drawing the player as well as all the assets such as the groubd abd obstacles.
function drawPlayer() {

      if(isSlowed && Math.floor(Date.now() / 150) % 2 === 0){
        return;
    }


    if (playerImage.complete && playerImage.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerImage, currentFrame * 128, 0, 32, 32, playerX, playerY + 50 - 100, 100, 110);
    }


    ctx.fillStyle = "black";
    ctx.font = "24px monospace";
    ctx.fillText("Score: " + score, 20, 40);
    ctx.fillStyle = "black";
    ctx.font = "20px monospace";
    ctx.fillText("World: "  + currentWorld, 20, 70);
    for (let x =0; x < 800; x += 32){
        ctx.drawImage(groundImage, x, 350, 32, 50);
    }

    //first obsticle
    if (obstacleImage.complete && obstacleImage.naturalWidth > 0) {
        ctx.drawImage(obstacleImage, obstacleX, 310, 50, 55); 
    }

    //second obsticle
    if (obstacleImage2.complete && obstacleImage2.naturalWidth > 0) {
        ctx.drawImage(obstacleImage2, obstacleX2, 310, 50, 55);
    }


}

drawPlayer();

//this function is to make the player jump as well as velocity to stop it from double jumping
function jump(){
    if (isJumping === true) {
        return;
    }

    isJumping = true;
    velocityY = -10
}

function checkCollision(){
    if (
        playerX + 10 < obstacleX + 30 &&
        playerX + 30 > obstacleX &&
        playerY < 310 + 40 &&
        playerY + 30 > 310
    ) {
    
        obstacle1Hit = true;

        
    if (!isSlowed) {
        isSlowed = true;
        playerHealth--;
        playerSpeed = 2;

        setTimeout(function(){
            playerSpeed = normalSpeed;
            isSlowed = false;
        },2000);
    }
    }

    if (
        playerX + 12  < obstacleX2 +20 &&
        playerX + 30 > obstacleX2 &&
        playerY < 310 + 40 &&
        playerY + 20 > 310
    ) {

        obstacle2Hit = true;


        if (!isSlowed) {
            isSlowed = true;
            playerHealth--;
            playerSpeed = 2;

            setTimeout(function(){
                playerSpeed = normalSpeed;
                isSlowed = false;
        }, 2000);
    }
}
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

    drawPlayer();
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

if(playerHealth <=0){
    dreawGameOver();
    requestAnimationFrame(gameLoop);
    return;
}

if(!gameStarted){
    drawStarterScreen();
    requestAnimationFrame(gameLoop);
    return;
}

    

    velocityY = velocityY + gravity * deltaTime;
    playerY = playerY + velocityY * deltaTime;
    frameCount = frameCount + 1;

    isRunning=movingLeft || movingRight;

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

    if(playerX > 600){
        playerX = 600;
    }

    let speedMultiplier = isSlowed? 0.4 : 1;

    if(isRunning){
    obstacleX = obstacleX - obsticleSpeed * deltaTime;
    obstacleX2 = obstacleX2 - obsticleSpeed * deltaTime;
    cityX-=citySpeed * speedMultiplier * deltaTime;


    }
    

     if (obstacleX < -30) {
        if (obstacle1Hit === false){
            score += 10;
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
            score += 10;
            perfectText=" +10 Perfect!";
            perfectTimer=60;
        }
        
        obstacle2Hit = false;
        obstacleX2=800 + Math.random() * 300;

        if(Math.abs(obstacleX2 - obstacleX) < minimumGap){
            obstacleX2 = Math.max(800, obstacleX + minimumGap);
        }
    }

    if (frameCount >= 60){
        score = score + 1;
        frameCount =0;
    }

    if (score >= 50){
        obsticleSpeed = 3;
    }

    if (score >= 100){
        obsticleSpeed = 4;
    }

    if (score >= 150){
        currentWorld = 2;
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

    drawCity();

    drawPlayer();

    drawPerfectPopup();

    drawHealth();

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

function drawPerfectPopup(){
    if(perfectTimer > 0){
        ctx.fillStyle = "yellow";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";

        ctx.fillText(perfectText, 400, 100);

        perfectTimer--;
    }
}


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

document.addEventListener("keydown", function(event){
    if(event.key==="Enter"){
        gameStarted=true;
    }

    if(event.key.toLowerCase() === "r" && playerHealth <=0){
        restartGame();
    }
})

function drawHealth(){
    ctx.fillStyle="red";
    ctx.font="24px monospace";
    ctx.fillText("❤️".repeat(Math.max(0, playerHealth)), 650, 30);
}

function dreawGameOver(){
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

function restartGame(){
    playerHealth=3;
    score=0;
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
}