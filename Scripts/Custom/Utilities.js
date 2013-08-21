BRM.Utilities = function () {
    return {
        FormatDate: function (d) {
            var date = new Date(d);

            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        },
        FormatDateTime: function (d) {
            var date = new Date(d);

            var ampm = date.getHours() > 12 ? 'PM' : 'AM';
            var hours = (date.getHours() + 1) % 12;

            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + hours + ':' + date.getMinutes() + ampm;
        }
    };
}();

/**
* loadScript: adds a script to the DOM via. adding a <script> tag and runs extra functionality upon load.
* Author: Benjamin Chalovich (ben1amin)
* Date: 30/03/2011
* Parameters:
*            url <string>: The location of the script you are loading
*            onLoadFunction <function>: the function you want to run after the script has been loaded
* returns: void
*/
/*
function loadScript(url, onLoadFunction) {
    // check to make sure the function variable is a proper function
    if (typeof (onLoadFunction) == 'function') {
        if (typeof (url) == 'string') {
            var head = document.head || document.getElementsByTagName("head")[0] || document.documentumentElement,
                script = document.createElement("script");

            script.src = url;    // specify the target of the scripts source
            script.async = true; // let it load asynchronously

            //  Insert script into the <head> tag at first position
            head.insertBefore(script, head.firstChild);

            //add our listener
            script.addEventListener("load", onLoadFunction, false);
        } else {
            // you did not pass in a string
            throw ("loadScript ERROR: a string was not passed in to be the source of the script");
        }
    } else {
        // you did not pass in a function
        throw ("loadScript ERROR: a function was not passed in to be triggered when the script was loaded");
    }
}
*/
