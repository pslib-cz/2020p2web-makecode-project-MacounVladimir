//Prostor pro proměnné
//Čas
let duration = 30
//Skóre
let goodscore = 0
let badscore = 0
//Hráč
let jumpforce = -150;
//Ostatní
let taskcounter = 0;
let pccounter = 0;
let test = 0;

//Tagy
namespace SpriteKind {
    export const Bad = SpriteKind.create()
    export const Good = SpriteKind.create()
    export const Subbad = SpriteKind.create()
}

let PC: Sprite = null
let Ukol: Sprite = null

//Uvodni dialogy
game.showLongText("Hlavním cílem je vyhnout se prokrastinaci ve formě různých pokušení a splnit VŠECHNY úkoly v časovém pressu!", DialogLayout.Center)
game.showLongText("WSAD - pohyb          SPACEBAR - skok", DialogLayout.Bottom)
//Sprity
//Hrac a jeho "animace"
let myHrac = sprites.create(assets.image`Hrac`, SpriteKind.Player)
//myHrac.say("Pohybuji se WSAD a skacu SPACEBAREM!", 3500)

game.onUpdate(function () {
    myHrac.setImage(assets.image`Hrac`)
    //console.log(Hrac.vx)
    if (myHrac.vy < 0 ) {
        myHrac.setImage(assets.image`HracHop`)
    }
    else if (myHrac.vy > 0 && myHrac.vx == 0){
        myHrac.setImage(assets.image`HracPad1`)
    }
    else if (myHrac.vy > 0 && myHrac.vx != 0) {
        myHrac.setImage(assets.image`HracPad`)
    }
    /*
    if (myHrac.vx != 0) {
        console.log("Chodím!")
    }
    */
    //console.log(Hrac.vx)
    //Otoci hrace, pokud jde doleva, pak ho vrati. - Flip
    if (myHrac.vx < 0) {
        myHrac.image.flipX()
    }
})

//Vytvoření hráče a základní hrací plochy
info.player1.setScore(0)
controller.moveSprite(myHrac, 100, 0)
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level1`)
info.startCountdown(duration)

//Ovládání a "fyzika" hráče
scene.cameraFollowSprite(myHrac)

myHrac.ay=200;
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (myHrac.vy == 0) {
        myHrac.vy = jumpforce;
    }
})

//Mechaniky
//Čas
//Počítá čas od spuštění (každou sekundu odečítá sekundu z duration)
game.onUpdateInterval(1000, function() {
    duration = duration - 1;
    if(duration < 0)
    {
        game.over(false)
    }
})

//Spawn položek
//Záporné
//pc
for (let value of tiles.getTilesByType(assets.tile`pcspawner`)) {
    pccounter = pccounter + 1;
    //Vytvoření PC
    PC = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 7 7 6 7 7 6 7 7 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 c b c b c b c b c b b c c c 1
        1 b c b c b c b c b b b b c b 1
        1 c b c b c b c b c b b c b c 1
        1 b c c c c c b c b b b b c b 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `, SpriteKind.Bad)

    //Animace PC
    animation.runImageAnimation(
    PC,
    [img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 7 7 6 7 7 6 7 7 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 c b c b c b c b c b b c c c 1 
        1 b c b c b c b c b b b b c b 1 
        1 c b c b c b c b c b b c b c 1 
        1 b c c c c c b c b b b b c b 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `,img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 7 7 6 7 7 6 7 7 6 7 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 c b c b c b c b c b b c c c 1 
        1 b c b c b c b c b b b b c b 1 
        1 c b c b c b c b c b b c b c 1 
        1 b c c c c c b c b b b b c b 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `,img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 7 7 6 7 7 6 7 7 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 c b c b c b c b c b b c c c 1 
        1 b c b c b c b c b b b b c b 1 
        1 c b c b c b c b c b b c b c 1 
        1 b c c c c c b c b b b b c b 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `,img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 7 7 6 7 7 6 7 7 6 7 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 c b c b c b c b c b b c c c 1 
        1 b c b c b c b c b b b b c b 1 
        1 c b c b c b c b c b b c b c 1 
        1 b c c c c c b c b b b b c b 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `],
    750,
    true
    )

    tiles.placeOnTile(PC, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}

//Kladné
//task
for (let value of tiles.getTilesByType(assets.tile`taskspawner`)) {
    taskcounter = taskcounter + 1;
    //Sprite úkolu
    Ukol = sprites.create(assets.image`task`, SpriteKind.Good)
    //Animace úkolu
    animation.runImageAnimation(
    Ukol,
    [assets.image`task`,img`
        . . . . . . . . . . . . . . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 f f f 1 d . . .
        . . . 1 1 f f f 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 f f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 1 f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 f f f 1 d . . .
        . . . 1 1 f f f 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 f f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 1 f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 f f f 1 d . . .
        . . . 1 1 f f f 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 f f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 1 f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 f f f 1 d . . .
        . . . 1 1 f f f 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 f f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 f f 1 1 1 d . . .
        . . . 1 1 1 f 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
        . . . 1 1 1 1 1 1 1 1 1 d . . .
    `],
    250,
    true
    )
    tiles.placeOnTile(Ukol, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}

//Pozitivní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Good, function (sprite, otherSprite) {
    game.showLongText("Splnil jsi podstatnou činnost, máš nějaký čas k dobru.", DialogLayout.Top)
    //myHrac.say("Produktivita stonks", 1000)
    info.player1.changeScoreBy(15)
    goodscore = goodscore + 15;
    otherSprite.destroy()
    music.baDing.play()

    //Čas
    duration = duration + 3;
    info.stopCountdown()
    info.startCountdown(duration)
    //Urceni vyhry
    if (goodscore == taskcounter * 15) {
        //Zaverecny dialog
        game.showLongText("Dokončil jsi všechnu svou práci v čas a odolal jsi prokrastinaci! Gratuluji!", DialogLayout.Top)
        game.over(true)
}
})

//Negativní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bad, function (sprite, otherSprite) {
    game.showLongText("Zase jsi do toho spadnul.", DialogLayout.Top)
    info.player1.changeScoreBy(-10)
    badscore = badscore - 10;
    otherSprite.destroy()
    music.smallCrash.play()
    
    //Koncept - vytvoření pronásledujících ovladačů
    let myHricky = sprites.create(assets.image`ovladac`, SpriteKind.Subbad)
    myHricky.setPosition(myHrac.x + randint(0, 100), myHrac.x - 100)
    myHricky.follow(myHrac, 50)

    //Urceni prohry
    if (duration <= 10){
        game.showLongText("Flákal ses a nestihl jsi své povinnosti.", DialogLayout.Bottom)
        game.over(false)
    }

    //Čas
    duration = duration - 10;
    info.stopCountdown()
    info.startCountdown(duration)
})

//Negativní podpoložka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Subbad, function (sprite, otherSprite) {
    info.player1.changeScoreBy(-5)
    badscore = badscore - 5;
    otherSprite.destroy()
    music.smallCrash.play()
})

//Urceni prohry
scene.onOverlapTile(SpriteKind.Player, assets.tile`lol`, function (sprite, location) {
    game.splash("Spadl jsi do lolka.")
    game.over(false)
})

info.onCountdownEnd(function() { 
    game.reset()
})