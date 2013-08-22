BRM.AuthorsController = function ($scope, $http, Genres) {
    var pageIndex = 0;
    var authorCount = 6;

    $scope.CurrentGenre = -1;
    $scope.MoreInfoShowing = false;
    $scope.FullAuthor = null;
    $scope.parseDate = BRM.Utilities.FormatDate;

    $scope.resetFullAuthor = function (author) {
        $scope.FullAuthor = author;
        $scope.MoreInfoShowing = false;
    };

    BRM.InitializeEvent({
        onInit: function () {
        },
        repeat: function () {
            $http.get(BRM.WebApi + 'Authors/RandomAuthor')
                .success(function (data) {
                    $scope.RandomAuthor = data;
                })
                .error(function (data, status, headers, config) {
                    var s = "";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },
        frequency: 10000
    });

    Genres.query({}, function (data) {
        $scope.Genres = data;
    });

    var x = $http.get(BRM.WebApi + 'Authors/SelectAuthorsByDate?pageIndex=0&authorCount=6')
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = massageAuthor(data[i]);
            }
            $scope.RecentAuthors = massageAuthor(data);
        })
        .error(function (data, status, headers, config) {
            var s = "";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    var massageAuthor = function (author) {
        return author;
    };

    return $scope;
};
