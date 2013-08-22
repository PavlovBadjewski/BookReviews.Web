BRM.ReviewsController = function ($scope, $http, $resource, Genres) {
	var randomReviewHistoryCount = 100;
	var NEXT = 1;
	var PREVIOUS = -1;
	var NO_IMAGE = '../content/images/no_book_cover.jpg';
	
    $scope.CurrentGenre = -1;
    $scope.MoreInfoShowing = false;
    $scope.FullReview = null;
	$scope.PauseRandomReviewSelection = false;
	$scope.PreviousReviews = [];
	$scope.PreviousReviewsIndex = 0;
    $scope.parseDate = BRM.Utilities.FormatDate;

    $scope.resetFullReview = function (review) {
        $scope.FullReview = review;
        $scope.MoreInfoShowing = false;
    };
	
	$scope.Switch = function() {
		$scope.PauseRandomReviewSelection = !$scope.PauseRandomReviewSelection;
	};
	
	$scope.GetReviewImage = function(review) {
		if (review.Google && review.Google.ImageLinks['thumbnail']) {
			return review.Google.ImageLinks['thumbnail'];
		} else {
			return NO_IMAGE;
		}
	};
	
	$scope.GetReviewAverageRating = function(review) {
		if (review.Google && review.Google.AverageRating) {
			return review.Google.AverageRating;
		} else {
			return -1;
		}
	};
	
	$scope.GetReviewRatingsCount = function(review) {
		if (review.Google && review.Google.RatingsCount) {
			return review.Google.RatingsCount;
		} else {
			return -1;
		}
	};
	
	$scope.GetReviewCategories = function(review) {
		if (review.Google && review.Google.Categories) {
			return review.Google.Categories;
		} else {
			return [];
		}
	};
	
	$scope.RecentReview = function(direction) {
		var id = '';
		$scope.PauseRandomReviewSelection = true;
		
		if (direction === NEXT && $scope.PreviousReviewsIndex > 0) {
			$scope.PreviousReviewsIndex--;
			id = $scope.PreviousReviews[$scope.PreviousReviewsIndex];
		} else if (direction === PREVIOUS && $scope.PreviousReviewsIndex < ($scope.PreviousReviews.length - 1)) {
			$scope.PreviousReviewsIndex++;
			id = $scope.PreviousReviews[$scope.PreviousReviewsIndex];
		}
		
		if (id !== '' ) {
			var config = {
                method: 'GET',
                url: BRM.WebApi + 'Reviews/ReviewById',
                params: { id: id }
            };

            var promise = $http(config)
                .success(function (data) {
					$scope.RandomReview = data;
                })
                .error(function (data, status, headers, config) {
                    var s = "";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });	
		}
	};

    Genres.query({}, function (data) {
        $scope.Genres = data;
    });

    $scope.Navigate = function (pageIndex) {
        if (pageIndex >= 0 && (!$scope.ReviewFilter || pageIndex < $scope.ReviewFilter.TotalPages)) {
            var config = {
                method: 'POST',
                url: BRM.WebApi + 'Reviews/SelectReviewsByDate',
                data: { PageIndex: pageIndex, ItemsPerPage: 6, Genre: $scope.CurrentGenre }
            };

            var promise = $http(config)
                .success(function (data) {
                    var reviews = data.Reviews || [];
                    for (var i = 0; i < reviews.length; i++) {
                        reviews[i] = massageReview(reviews[i]);
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

        return review;
    };

    BRM.InitializeEvent({
        onInit: function () {
            $scope.Navigate(0);
        },
        repeat: function () {
			if (!$scope.PauseRandomReviewSelection) {
				$http.get(BRM.WebApi + "Reviews/RandomReview")
					.success(function (data) {
						$scope.RandomReview = data;
						$scope.PreviousReviews.unshift(data.Id);
						$scope.PreviousReviews = $scope.PreviousReviews.slice(0, randomReviewHistoryCount);
						$scope.PreviousReviewsIndex = 0; //$scope.PreviousReviews.length - 1;
					})
					.error(function (data, status, headers, config) {
						var s = "";
						// called asynchronously if an error occurs
						// or server returns response with an error status.
					});
			}
        },
        frequency: 10000
    });

    return $scope;
};