module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Compat.Time as Time
import Html exposing (Html, div, h1, text)
import Task



-- COMPAT


fromInt : Int -> String
fromInt =
    Basics.toString


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { zone : Time.Zone
    , time : Time.Posix
    , start : Time.Posix
    }


init : ( Model, Cmd Msg )
init =
    ( Model Time.utc (Time.millisToPosix 0) (Time.millisToPosix 0)
    , Task.perform AdjustTimeZone <| Task.map2 (,) Time.here Time.now
    )


type Msg
    = Tick Time.Posix
    | AdjustTimeZone ( Time.Zone, Time.Posix )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( { model | time = newTime }
            , Cmd.none
            )

        AdjustTimeZone ( newZone, startTime ) ->
            ( { model | zone = newZone, start = startTime, time = startTime }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every 1000 Tick


view : Model -> Html Msg
view model =
    let
        timeToString t =
            let
                hour =
                    fromInt (Time.toHour model.zone t)

                minute =
                    fromInt (Time.toMinute model.zone t)

                second =
                    fromInt (Time.toSecond model.zone t)
            in
            hour ++ ":" ++ minute ++ ":" ++ second
    in
    div []
        [ h1 [] [ text (timeToString model.time) ]
        , h1 [] [ text ("Start Time: " ++ timeToString model.start) ]
        ]
