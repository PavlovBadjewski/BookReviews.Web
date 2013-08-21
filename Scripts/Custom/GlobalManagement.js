var BRM = BookReviewsManager = [];

BRM.InitializeEvent = function (evt) {
    var createRepeatingFunction = function (fn, frequency) {
        var ongoingFunction = function () {
            fn();
            setTimeout(function () {
                ongoingFunction();
            }, frequency || 1000);
        };

        return ongoingFunction;
    };

    if (typeof (evt.repeat) === "function") {
        evt.repeat = createRepeatingFunction(evt.repeat, evt.frequency);
    }

    if (typeof (evt.onInit) === "function") {
        evt.onInit();
    }

    if (typeof (evt.repeat) === "function") {
        evt.repeat();
    }
};