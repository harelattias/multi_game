function calculate_racket_location_pp (loc: number) {
    return (loc + 5) % 5
}
input.onGesture(Gesture.Shake, function () {
    on_start_sps()
    on_start_mg()
})
function on_start_pp () {
    reset_game_pp()
    num_of_fails_pp = 0
}
function on_start_sps () {
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
    if (chosen_game == 1) {
        on_buttonA_pp()
    }
})
function reset_game_pp () {
    ball_loc_x_pp = 1
    ball_loc_y_pp = 1
    ball_velocity_x_pp = 1
    ball_velocity_y_pp = 1
    the_end_game_pp = 0
}
function forever_sps () {
    if (input.lightLevel() < 70) {
        led.setBrightness(50)
    } else if (input.lightLevel() > 205) {
        led.setBrightness(255)
    } else {
        led.setBrightness(128)
    }
}
function on_buttonB_pp () {
    matka_location_pp = calculate_racket_location_pp(1 + matka_location_pp)
}
function on_buttonA_pp () {
    matka_location_pp = calculate_racket_location_pp(-1 + matka_location_pp)
}
function calc_ball_loc_pp () {
    if (3 == ball_loc_y_pp) {
        if (ball_loc_x_pp == 0 + matka_location_pp) {
            ball_velocity_x_pp = -1
            ball_velocity_y_pp = -1
        } else if (ball_loc_x_pp == 1 + matka_location_pp) {
            ball_velocity_x_pp = 0
            ball_velocity_y_pp = -1
        } else if (ball_loc_x_pp == 2 + matka_location_pp) {
            ball_velocity_x_pp = 1
            ball_velocity_y_pp = -1
        } else {
            the_end_game_pp = 1
            num_of_fails_pp += 1
        }
    }
    if (0 == ball_loc_y_pp) {
        ball_velocity_y_pp = 1
    }
    if (4 == ball_loc_x_pp) {
        ball_velocity_x_pp = -1
    }
    if (0 == ball_loc_x_pp) {
        ball_velocity_x_pp = 1
    }
    ball_loc_x_pp = ball_velocity_x_pp + ball_loc_x_pp
    ball_loc_y_pp = ball_velocity_y_pp + ball_loc_y_pp
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
    if (chosen_game == 1) {
        on_buttonB_pp()
    }
})
function forever_pp () {
    if (num_of_fails_pp == 3) {
        basic.showIcon(IconNames.Sad)
        music.playMelody("C5 C D E F G A B ", 500)
        basic.pause(2000)
    } else if (1 == the_end_game_pp) {
        reset_game_pp()
    } else {
        basic.clearScreen()
        draw_matka_pp()
        draw_ball_pp()
        calc_ball_loc_pp()
        basic.pause(1000)
    }
}
function draw_matka_pp () {
    led.plot(calculate_racket_location_pp(0 + matka_location_pp), 4)
    led.plot(calculate_racket_location_pp(1 + matka_location_pp), 4)
    led.plot(calculate_racket_location_pp(2 + matka_location_pp), 4)
}
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
function draw_ball_pp () {
    led.plot(ball_loc_x_pp, ball_loc_y_pp)
}
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
let matka_location_pp = 0
let the_end_game_pp = 0
let ball_velocity_y_pp = 0
let ball_velocity_x_pp = 0
let ball_loc_y_pp = 0
let ball_loc_x_pp = 0
let temporary_chosen_game = 0
let chosen_game = 0
let num_of_fails_pp = 0
on_start_mg()
basic.forever(function () {
    if (0 == chosen_game) {
        forever_sps()
    }
    if (1 == chosen_game) {
        forever_pp()
    }
})
