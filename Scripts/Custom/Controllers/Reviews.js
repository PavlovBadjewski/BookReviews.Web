BRM.ReviewsController = function ($scope, $http, $resource, Genres, Global) {
	var NO_IMAGE = '../content/images/no_book_cover.jpg';

	if (Genres && Genres.Data) {
	    Genres.Data.Get({}, function (data) {
	        $scope.Genres = data;
	    });
	}
	
    $scope.CurrentGenre = -1;
    $scope.MoreInfoShowing = false;
    $scope.FullReview = null;
    $scope.parseDate = BRM.Utilities.FormatDate;

    $scope.SetRandomReview = function (data) {
        $scope.RandomReview = data;
    };

    $scope.resetFullReview = function (review) {
        $scope.MoreInfoShowing = true;
        $scope.FullReview = review;
    };

    $scope.GetReviewImage = function (review) {
        if (review) {
            if (review.Google && review.Google.ImageLinks['thumbnail']) {
                return review.Google.ImageLinks['thumbnail'];
            } else {
                return NO_IMAGE;
            }
        }
	};
	
    $scope.GetReviewAverageRating = function(review) {
        if (review) {
            if (review.Google && review.Google.AverageRating) {
                return review.Google.AverageRating;
            } else {
                return -1;
            }
        }
	};
	
    $scope.GetReviewRatingsCount = function(review) {
        if (review) {
            if (review.Google && review.Google.RatingsCount) {
                return review.Google.RatingsCount;
            } else {
                return -1;
            }
        }
	};
	
    $scope.GetReviewCategories = function(review) {
        if (review) {
            if (review.Google && review.Google.Categories) {
                return review.Google.Categories;
            } else {
                return [];
            }
        }
	};

    $scope.Navigate = function (pageIndex) {
        if (pageIndex >= 0 && (!$scope.ReviewFilter || pageIndex < $scope.ReviewFilter.TotalPages)) {
            var config = {
                method: 'POST',
                url: BRM.WebApi + 'Reviews/SelectReviewsByDate',
                data: { PageIndex: pageIndex, ItemsPerPage: 6, Genre: Genres.GetGenreId($scope.CurrentGenre) }
            };

            var promise = $http(config)
                .success(function (data) {
                    var reviews = data.Reviews || [];

                    for (var i = 0; i < config.data.ItemsPerPage; i++) {
                        if (i < reviews.length) {
                            reviews[i] = massageReview(reviews[i]);
                        } else {
                            reviews.push({ HasResults: false });
                        }
                    }

                    $scope.RecentReviews = reviews;
                    $scope.ReviewFilter = data.Filter;
                    $scope.ReviewPagerRegEx = '/@"^([0-9]|' + data.Filter.TotalPages + ')$"/';
                })
                .error(function (data, status, headers, config) {
                    var s = "";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    };

    var massageReview = function (review) {
        if (review.Authors && review.Authors.length > 0) {
            for (var i = 0; i < review.Authors.length; i++) {
                review.Authors[i].Delimiter = ', ';
            }

            review.Authors[review.Authors.length - 1].Delimiter = '';
        }

        review.HasResults = true;

        return review;
    };

    $scope.Navigate(0);

    return $scope;
};