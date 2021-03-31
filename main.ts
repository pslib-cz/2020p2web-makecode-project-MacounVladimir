//Prostor pro proměnné
let fixedduration = 50
let duration = fixedduration
let overallscore = 0
let goodscore = 0
let badscore = 0
let jumpforce = -150;
let taskcounter = 0;
let pccounter = 0;

namespace SpriteKind {
    export const Bad = SpriteKind.create()
    export const Good = SpriteKind.create()
}

let Hrac = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . f f f . . . . . .
    . . . . . d d d d d d d . . . .
    . . . . f d f d d d f d f . . .
    . . . f f d d d d d d d f f . .
    . . . . . d d b b b d d . . . .
    . . . . . d d d d d d d . . . .
    . . . . . . d d d d d . . . . .
    . . . . . . . 1 1 1 . . . . . .
    . . . . . . . d 1 d . . . . . .
    . . . . . . . d . d . . . . . .
    . . . . . . . d . d . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

let PC: Sprite = null
let Ukol: Sprite = null


//Vytvoření hráče a základní hrací plochy
//game.splash("Hlavním cílem je vyhnout se prokrastinaci ve formě různých pokušení a dojít až k cíli v časovém limitu!")
//spawni hrace na plose
info.player1.setScore(0)
controller.moveSprite(Hrac, 100, 0)
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level3`)
info.startCountdown(fixedduration)

//Ovládání a "fyzika" hráče
scene.cameraFollowSprite(Hrac)

Hrac.ay=200;
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hrac.vy == 0) {
        Hrac.vy = jumpforce;
    }
})

//Mechaniky
//Čas
//Počítá čas od spuštění
game.onUpdateInterval(fixedduration*1000, function() {
    duration = duration -1;
})


//Spawn polozek
for (let value of tiles.getTilesByType(assets.tile`pcspawner`)) {
    pccounter = pccounter + 1;
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
    tiles.placeOnTile(PC, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}

//task
for (let value of tiles.getTilesByType(assets.tile`taskspawner`)) {
    taskcounter = taskcounter + 1;
    Ukol = sprites.create(assets.image`ukol2`, SpriteKind.Good)
    tiles.placeOnTile(Ukol, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}

//Urceni vyhry/prohry
scene.onOverlapTile(SpriteKind.Player, assets.tile`lol`, function (sprite, location) {
    game.splash("Spadl jsi do lolka.")
    game.over(false)
})

//Pozitivní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Good, function (sprite, otherSprite) {
    game.splash("Splnil jsi podstatnou činnost, máš nějaký čas k dobru.")
	info.player1.changeScoreBy(1)
    goodscore = goodscore + 1;
    overallscore = overallscore + 1;
    otherSprite.destroy()
    music.baDing.play()
    //Čas
    duration = duration + 3;
    //info.stopCountdown()
    info.startCountdown(duration)
    //Urceni vyhry
    if (goodscore == taskcounter) {
        game.splash("Dokončil jsi všechnu svou práci v čas a odolal jsi prokrastinaci! Gratuluji!")
        game.over(true)
}
})

//Countdown se neaktualizuje. Nová proměnná, duration čistě pro výpočty? něco jako new duration? 







//Negativní položka
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bad, function (sprite, otherSprite) {
    game.splash("Zase jsi do toho spadnul.")
	info.player1.changeScoreBy(-1)
    badscore = badscore - 1;
    overallscore = overallscore - 1;
    otherSprite.destroy()
    music.smallCrash.play()
    //Čas
    duration = duration - 10;
    
    console.log(duration)
    if (duration <= 10){
        game.splash("Flákal ses, nestihl jsi své povinnosti.")
        game.over(false)
        console.log("funguji")
    }
    info.stopCountdown()
    info.startCountdown(duration)
})


info.onCountdownEnd(function() { 
    game.reset()
})