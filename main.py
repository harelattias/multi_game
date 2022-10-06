def on_gesture_shake():
    on_start_mg()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

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
temporary_chosen_game = 0
chosen_game = 0
on_start_mg()

def on_forever():
    if 0 == chosen_game:
        basic.show_icon(IconNames.YES)
    if 1 == chosen_game:
        basic.show_icon(IconNames.YES)
basic.forever(on_forever)
