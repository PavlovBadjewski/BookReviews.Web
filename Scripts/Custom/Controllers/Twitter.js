BRM.TwitterController = function ($scope, $http, Genres) {
    $scope.parseDateTime = BRM.Utilities.FormatDateTime;
    BRM.InitializeEvent({
        onInit: function () {
        },
        repeat: function () {
            $http.get(BRM.WebApi + 'Twitter/CurrentTweets')
                .success(function (data) {
                    if (!$scope.Tweets) {
                        $scope.Tweets = data;
                    }
                })
                .error(function (data, status, headers, config) {
                    var s = "";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },
        frequency: 240000
    });

    BRM.InitializeEvent({
        onInit: function () {
        },
        repeat: function () {
            if ($scope.Tweets && $scope.Tweets.length > 1) {
                var tweet = $scope.Tweets[0];
                var newArray = $scope.Tweets.slice(1); //$scope.Tweets.length
                newArray.push(tweet);
                $scope.Tweets = newArray;
                $scope.$apply();
            }
        },
        frequency: 8000
    });
    return $scope;
};