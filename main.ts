///Prostor pro proměnné
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
}

let PC: Sprite = null
let Ukol: Sprite = null

//Uvodni dialog
game.showLongText("Hlavním cílem je vyhnout se prokrastinaci ve formě různých pokušení a splnit VŠECHNY úkoly v časovém pressu!", DialogLayout.Center)

//Sprity
//Hrac a jeho "animace"
//let myHrac = sprites.create(assets.image`Hrac`, SpriteKind.Player)
let myHrac = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,SpriteKind.Player)

//----------------------------------
//Koncepty
//let myDuties = sprites.create(assets.image`duty`,SpriteKind.Enemy)
//myDuties.follow(myHrac)
//----------------------------------

game.onUpdate(function () {
    myHrac.setImage(assets.image`Hrac`)
    //console.log(Hrac.vx)
    if (myHrac.vy < 0 ) {
        myHrac.setImage(assets.image`HracHop`)
    }

    else if(myHrac.vy > 0 && myHrac.vx == 0){
        myHrac.setImage(assets.image`HracPad2`)
    }

    else if (myHrac.vy > 0 && myHrac.vx !=0) {
        myHrac.setImage(assets.image`HracPad1`)
    }
    
    if (myHrac.vx != 0) {
        console.log("Chodím!")
    }
    
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

//Spawn polozek
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
    [img`
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

//Urceni prohry
scene.onOverlapTile(SpriteKind.Player, assets.tile`lol`, function (sprite, location) {
    game.splash("Spadl jsi do lolka.")
    game.over(false)
})

//Pozitivní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Good, function (sprite, otherSprite) {
    game.splash("Splnil jsi podstatnou činnost, máš nějaký čas k dobru.")
    info.player1.changeScoreBy(1)
    goodscore = goodscore + 1;
    otherSprite.destroy()
    music.baDing.play()
    //Čas
    duration = duration + 3;
    info.stopCountdown()
    info.startCountdown(duration)
    //Urceni vyhry
    if (goodscore == taskcounter) {
        //Zaverecny dialog
        game.showLongText("Dokončil jsi všechnu svou práci v čas a odolal jsi prokrastinaci! Gratuluji!", DialogLayout.Top)
        game.over(true)
}
})

//Negativní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bad, function (sprite, otherSprite) {
    game.splash("Zase jsi do toho spadnul.")
    info.player1.changeScoreBy(-1)
    badscore = badscore - 1;
    otherSprite.destroy()
    music.smallCrash.play()
    
    //Urceni prohry
    if (duration <= 10){
        game.splash("Flákal ses, nestihl jsi své povinnosti.")
        game.over(false)
    }

    //Čas
    duration = duration - 10;
    info.stopCountdown()
    info.startCountdown(duration)
})

info.onCountdownEnd(function() { 
    game.reset()
})