BRM.AuthorsController = function ($scope, $http, Genres, Global) {
    var NO_IMAGE = '../content/images/no_book_cover.jpg';
    
    $scope.CurrentGenre = -1;
    $scope.MoreInfoShowing = false;
    $scope.FullAuthor = null;
    $scope.parseDate = BRM.Utilities.FormatDate;

    $scope.SetRandomAuthor = function (data) {
        $scope.RandomAuthor = data;
    };

    // Load Genre Information
    if (Genres && Genres.Data) {
        Genres.Data.Get({}, function (data) {
            $scope.Genres = data;
        });
    }

    $scope.GetAuthorImage = function (author) {
        if (author && author.GoodReads) {
            return author.GoodReads.ImageUrl;
        } else {
            return NO_IMAGE;
        }
    };

    $scope.GetSmallAuthorImage = function (author) {
        if (author && author.GoodReads) {
            return author.GoodReads.SmallImageUrl;
        } else {
            return NO_IMAGE;
        }
    };

    $scope.resetFullAuthor = function (author) {
        $scope.FullAuthor = author;
        $scope.MoreInfoShowing = false;
    };

    $scope.Navigate = function (pageIndex) {
        if (pageIndex >= 0 && (!$scope.AuthorFilter || pageIndex < $scope.AuthorFilter.TotalPages)) {
            var config = {
                method: 'POST',
                url: BRM.WebApi + 'Authors/SelectAuthorsByDate',
                data: { PageIndex: pageIndex, ItemsPerPage: 6, Genre: Genres.GetGenreId($scope.CurrentGenre) }
            };

            var promise = $http(config)
                .success(function (data) {
                    var authors = data.Authors || [];

                    for (var i = 0; i < config.data.ItemsPerPage; i++) {
                        if (i < authors.length) {
                            authors[i] = massageAuthor(authors[i]);
                        } else {
                            authors.push({ HasResults: false });
                        }
                    }

                    $scope.RecentAuthors = authors;
                    $scope.AuthorFilter = data.Filter;
                    $scope.AuthorPagerRegEx = '/@"^([0-9]|' + data.Filter.TotalPages + ')$"/';
                })
                .error(function (data, status, headers, config) {
                    var s = "";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    };

    var massageAuthor = function (author) {
        author.HasResults = true;
        return author;
    };


    $scope.Navigate(0);

    return $scope;
};
