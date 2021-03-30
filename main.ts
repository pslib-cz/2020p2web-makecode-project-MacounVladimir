//Prostor pro proměnné
let gravity = 0
gravity = 9.81 

//Vytvoření hráče a základní hrací plochy
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
`)

controller.moveSprite(Hrac, 100, 0)
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level3`)

//Ovládání a "fyzika" hráče
scene.cameraFollowSprite(Hrac)

Hrac.ay=200;
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hrac.vy == 0) {
        Hrac.vy = -150
    }
})

//Urceni vyhry/prohry

scene.onOverlapTile(SpriteKind.Player, assets.tile`cil`, function (sprite, location) {
    game.over(true)
})
