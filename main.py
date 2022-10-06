def on_gesture_shake():
    on_start_sps()
    on_start_mg()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_start_sps():
    basic.show_leds("""
        . . . . .
                . . . . .
                . . . . .
                . . . . .
                # . # . #
    """)
    music.play_melody("- - - C5 B A B C5 ", 120)
    basic.pause(100)
    basic.show_leds("""
        . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
    """)
    input.set_sound_threshold(SoundThreshold.LOUD, 255)
    input.set_sound_threshold(SoundThreshold.QUIET, 254)
    led.set_brightness(128)

def on_button_pressed_a():
    global temporary_chosen_game
    if chosen_game == -1:
        basic.show_leds("""
            # . . . #
                        . # . # .
                        . . # . .
                        # # . # #
                        # # . # #
        """)
        temporary_chosen_game = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def forever_sps():
    if input.light_level() < 70:
        led.set_brightness(50)
    elif input.light_level() > 205:
        led.set_brightness(255)
    else:
        led.set_brightness(128)

def on_sound_loud():
    if 0 == chosen_game:
        sound_loud_on_sps()
input.on_sound(DetectedSound.LOUD, on_sound_loud)

def on_button_pressed_b():
    global temporary_chosen_game
    if chosen_game == -1:
        basic.show_leds("""
            . . . . .
                        . . # . .
                        . . . . .
                        . . . . .
                        . # # # .
        """)
        temporary_chosen_game = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def sound_loud_on_sps():
    global gg_sps
    basic.show_number(3)
    basic.pause(500)
    basic.show_number(2)
    basic.pause(500)
    basic.show_number(1)
    basic.pause(500)
    gg_sps = randint(1, 3)
    if gg_sps == 1:
        basic.show_leds("""
            . . # . .
                        . # # # .
                        # # # # #
                        . # # # .
                        . . # . .
        """)
    elif gg_sps == 2:
        basic.show_leds("""
            # . . . #
                        . # . # .
                        . . # . .
                        # # . # #
                        # # . # #
        """)
    elif gg_sps == 3:
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
        """)

def on_logo_pressed():
    global chosen_game
    chosen_game = temporary_chosen_game
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_start_mg():
    global temporary_chosen_game, chosen_game
    basic.show_leds("""
        . . # # .
                . # . . #
                . . . # .
                . . # . .
                . . # . .
    """)
    temporary_chosen_game = -1
    chosen_game = -1
gg_sps = 0
temporary_chosen_game = 0
chosen_game = 0
on_start_mg()

def on_forever():
    if 0 == chosen_game:
        forever_sps()
    if 1 == chosen_game:
        pass
basic.forever(on_forever)
