var meteor1, meteor2, meteor3, meteor4, meteor5;
var lifes = 3;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var points = 0
var moon
function preload() {
    bubblesjet = loadImage("fishnaut-removebg-preview.png");
    luna = loadImage("moon-removebg-preview.png");
    spacepurple = loadImage("spacebackground.png");

    bigceres = loadImage("bigasteroid-removebg-preview.png");
    magsteroid = loadImage("magmasteroid-removebg-preview.png");
    mediumrocks = loadImage("mediumasteroid-removebg-preview.png");
    smallrocks = loadImage("smallasteroid-removebg-preview.png");
    goldrocks = loadImage("smallrockasteroid-removebg-preview.png");
    gameOverImg = loadImage("gameover.png");
    resetImg = loadImage("reset_button.png");
    wingame = loadImage("you_win-removebg-preview.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    cenario = createSprite(800, 400, 50, 50);
    cenario.addImage(spacepurple);
    cenario.scale = 1.5;
    jetbubs = createSprite(width - 1350, height / 2);
    jetbubs.addImage(bubblesjet);
    jetbubs.scale = 0.5;
    gameover = createSprite(width / 2, height / 2);
    gameover.addImage(gameOverImg);
    gameover.scale = 1.5;
    reset = createSprite(width / 2, height / 2 + 90);
    reset.addImage(resetImg);
    reset.scale = 0.7;

    meteor1 = createGroup();
    meteor2 = createGroup();
    meteor3 = createGroup();
    meteor4 = createGroup();
    meteor5 = createGroup();

    points = 0
}

function draw() {
    background(255, 255, 255);

    drawSprites();
    fill("cyan");
    textSize(25);
    text("Lifes: " + lifes, width - 400, height - 750);
    text("Points: " + points, width - 600, height - 750);
    if (gameState === PLAY) {
        createceres();
        mediumceres();
        smallceres();
        smallbrownasteroidceres();
        fireasteroid();
        points = points + Math.round(frameCount / 150)
        if (meteor1.isTouching(jetbubs)) {
            meteor1.destroyEach();
            lifes = lifes - 1;
        }
        if (frameCount % 600 === 0){
            moon = createSprite(width + 100, height / 2)
            moon.addImage(luna)
            moon.velocityX = -1
        }
        if (meteor2.isTouching(jetbubs)) {
            meteor2.destroyEach();
            lifes = lifes - 1;
        }
        if (meteor3.isTouching(jetbubs)) {
            meteor3.destroyEach();
            lifes = lifes - 1;
        }
        if (meteor4.isTouching(jetbubs)) {
            meteor4.destroyEach();
            lifes = lifes - 1;
        }
        if (meteor5.isTouching(jetbubs)) {
            meteor5.destroyEach();
            lifes = lifes - 1;
        }

        if (keyIsDown(UP_ARROW)) {
            jetbubs.y = jetbubs.y - 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            jetbubs.y = jetbubs.y + 5;
        }

        jetbubs.setCollider("circle", -70, -10, 110);
        jetbubs.debug = false;

        gameover.visible = false;
        reset.visible = false;

        if (lifes <= 0) {
            gameState = END;
        }
    } else if (gameState === END) {
        gameover.visible = true;
        reset.visible = true;
       if(mousePressedOver(reset)){
        reiniciar()
       }
    }
}
function reiniciar(){
    gameState = PLAY
    gameover.visible = false
    reset.visible = false
    lifes = 3
    points = 0
}
function createceres() {
    if (frameCount % 60 === 0) {
        rockceres = createSprite(width + 30, height / 2);
        rockceres.addImage(bigceres);
        rockceres.velocityX = -5;
        rockceres.y = Math.round(random(0, height));
        rockceres.lifetime = 1000;
        meteor1.add(rockceres);
    }
}
function mediumceres() {
    if (frameCount % 90 === 0) {
        ballceres = createSprite(width + 30, height / 2);
        ballceres.addImage(mediumrocks);
        ballceres.velocityX = -3;
        ballceres.y = Math.round(random(0, height));
        ballceres.lifetime = 1000;
        meteor2.add(ballceres);
    }
}
function smallceres() {
    if (frameCount % 130 === 0) {
        miniceres = createSprite(width + 30, height / 2);
        miniceres.addImage(smallrocks);
        miniceres.velocityX = -2;
        miniceres.y = Math.round(random(0, height));
        miniceres.lifetime = 1500;
        meteor3.add(miniceres);
    }
}
function smallbrownasteroidceres() {
    if (frameCount % 200 === 0) {
        asterbrown = createSprite(width + 30, height / 2);
        asterbrown.addImage(goldrocks);
        asterbrown.velocityX = -8;
        asterbrown.y = Math.round(random(0, height));
        asterbrown.scale = Math.round(random(0.5, 1));
        asterbrown.lifetime = 1000;
        meteor4.add(asterbrown);
    }
}
function fireasteroid() {
    if (frameCount % 500 === 0) {
        astermagma = createSprite(width + 30, height / 2);
        astermagma.addImage(magsteroid);
        astermagma.velocityX = -1;
        astermagma.y = Math.round(random(0, height));
        astermagma.lifetime = 2000;
        meteor5.add(astermagma);
    }
}
