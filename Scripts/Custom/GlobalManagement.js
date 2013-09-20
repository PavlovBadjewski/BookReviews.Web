//  NOTE: Maybe all of the global data can be managed right in angular.  Except perhaps for some utility functions

var BRM = BookReviewsManager = {};
BRM.WebApi = "http://bookreviewsapi.apphb.com/Api/";

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

BRM.AddAngularRequirement = function (moduleName, requiredName) {
    try {
        angular.module(moduleName).requires.push(requiredName);
    } catch (err) {
        angular.module(moduleName, [requiredName]);
    }
};
