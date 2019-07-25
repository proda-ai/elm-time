/*

import Time exposing (customZone, Name, Offset)
import Elm.Kernel.List exposing (Nil)
import Elm.Kernel.Scheduler exposing (binding, succeed)
_elm_lang$core$Native_Scheduler
*/


var _proda_ai$elm_time$Native_Compat_Time = function() {

    function now(millisToPosix)
    {
        return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
        {
            callback(_elm_lang$core$Native_Scheduler.succeed(millisToPosix(Date.now())));
        });
    }

    var setInterval_ = F2(function(interval, task)
    {
        return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
        {
            console.log("Setting an interval",interval);
            var id = setInterval(function() { _elm_lang$core$Native_Scheduler.rawSpawn(task); }, interval);
            return function() { clearInterval(id); };
        });
    });

    function here()
    {
        return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
        {
            callback(_elm_lang$core$Native_Scheduler.succeed(
                A2(_proda_ai$elm_time$Compat_Time$customZone, -(new Date().getTimezoneOffset()), _elm_lang$core$Native_List.Nil)
            ));
        });
    }


    function getZoneName()
    {
        return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
        {
            try
            {
                var name = _proda_ai$elm_time$Compat_Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
            }
            catch (e)
            {
                var name = _proda_ai$elm_time$Compat_Time$Offset(new Date().getTimezoneOffset());
            }
            callback(_elm_lang$core$Native_Scheduler.succeed(name));
        });
    }

    return {
        now: now,
        setInterval: setInterval_,
        here: here,
        getZoneName: getZoneName,
    };

}();



