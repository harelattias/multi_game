input.onGesture(Gesture.Shake, function () {
    on_start_sps()
    on_start_mg()
})
function on_start_sps () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . # . #
        `)
    music.playMelody("- - - C5 B A B C5 ", 120)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    input.setSoundThreshold(SoundThreshold.Loud, 255)
    input.setSoundThreshold(SoundThreshold.Quiet, 254)
    led.setBrightness(128)
}
input.onButtonPressed(Button.A, function () {
    if (chosen_game == -1) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            # # . # #
            # # . # #
            `)
        temporary_chosen_game = 0
    }
})
function forever_sps () {
    if (input.lightLevel() < 70) {
        led.setBrightness(50)
    } else if (input.lightLevel() > 205) {
        led.setBrightness(255)
    } else {
        led.setBrightness(128)
    }
}
input.onSound(DetectedSound.Loud, function () {
    if (0 == chosen_game) {
        sound_loud_on_sps()
    }
})
input.onButtonPressed(Button.B, function () {
    if (chosen_game == -1) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            . # # # .
            `)
        temporary_chosen_game = 1
    }
})
function sound_loud_on_sps () {
    basic.showNumber(3)
    basic.pause(500)
    basic.showNumber(2)
    basic.pause(500)
    basic.showNumber(1)
    basic.pause(500)
    gg_sps = randint(1, 3)
    if (gg_sps == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
    } else if (gg_sps == 2) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            # # . # #
            # # . # #
            `)
    } else if (gg_sps == 3) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    chosen_game = temporary_chosen_game
})
function on_start_mg () {
    basic.showLeds(`
        . . # # .
        . # . . #
        . . . # .
        . . # . .
        . . # . .
        `)
    temporary_chosen_game = -1
    chosen_game = -1
}
let gg_sps = 0
let temporary_chosen_game = 0
let chosen_game = 0
on_start_mg()
basic.forever(function () {
    if (0 == chosen_game) {
        forever_sps()
    }
    if (1 == chosen_game) {
    	
    }
})
