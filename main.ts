input.onGesture(Gesture.Shake, function () {
    on_start_mg()
})
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
let temporary_chosen_game = 0
let chosen_game = 0
on_start_mg()
basic.forever(function () {
    if (0 == chosen_game) {
        basic.showIcon(IconNames.Yes)
    }
    if (1 == chosen_game) {
        basic.showIcon(IconNames.Yes)
    }
})
